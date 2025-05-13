document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById("user-input");

    // Prevent return->new line without shift key
    textarea.addEventListener('keypress', evt => {
        if (!(window.innerWidth <= 720)
            && !evt.shiftKey && evt.key == "Enter") {
            evt.preventDefault();
            // Do something
        }
    });

    // Resize user input to match line number
    textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    });

    // Prevent textarea being hidden by virtual keyboard on mobile
    textarea.addEventListener("focus", () => {
        window.scrollTo(0, document.body.scrollHeight);
    })
    
    // Push previous text up (Do again when text added to main)
    window.scrollTo(0, document.body.scrollHeight);
});
