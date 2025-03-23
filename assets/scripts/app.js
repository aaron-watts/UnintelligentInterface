

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById("user-input");

    textarea.addEventListener("input", () => {
        textarea.style.height = "auto"; // Reset height
        textarea.style.height = textarea.scrollHeight + "px"; // Set height based on content
    });
    
    window.scrollTo(0, document.body.scrollHeight);
});
