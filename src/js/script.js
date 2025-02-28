// Start Index Script
const buttons = document.querySelectorAll("[data-slider-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.sliderButton === "next" ? 1 : -1
        const slides = button.closest("[data-slider").querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})
// End Index Script

// Start Tool Script
const fileInput = document.getElementById("file-input");
const dropUpload = document.getElementById("file-drop-upload");
const fileResolution = document.getElementById("file-resolution");

function processFile(file){
    if(!file || !file.type.startsWith("image/")) {
        alert("Upload a valid image file.");
        return;
    };

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = function() {
        fileResolution.textContent = `Resolution: ${img.width} x ${img.height}`;
        URL.revokeObjectURL(img.src);
    };

    img.onerror = function() {
        alert("Error loading this image.")
    };
}

fileInput.addEventListener("change", function(event) {
    if(fileInput.files.length > 1) {
        alert("You can only upload one image.");
        fileInput.value = "";
        return;
    }
    processFile(fileInput.files[0])
});

dropUpload.addEventListener("dragover", function(event) {
    event.preventDefault();
    dropUpload.style.borderColor = "#412b85";
});

dropUpload.addEventListener("dragleave", function(event) {
    dropUpload.style.borderColor = "#291b53";
});

dropUpload.addEventListener("drop", function(event) {
    event.preventDefault();

    const files = event.dataTransfer.files;
    if (files.length > 1) {
        alert("You can only upload on image.");
        return;
    }

    processFile(files[0]);
});

dropUpload.addEventListener("click", function(event) {
    fileInput.click();
});

// End Tool Script
