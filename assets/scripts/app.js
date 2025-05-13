let appData = {
    phase: 0,
    responses: responses
};

const getData = async () => {
    const res = await fetch('/.netlify/functions/api');

    const data = await res.json();

    return data;
};

const setData = async() => {
    const { adventures } = await getData();
    appData.allPrompts = adventures;
    const durations = [...new Set(appData.allPrompts.map(i => i.howMuch))];
    durations.forEach(duration => {
        appData[duration] = appData.allPrompts.filter(i => i.howMuch == duration);
    });
};

setData();

const responseHandler = () => {
    const msgElem = document.getElementById('message-board');
    const feedback = document.createElement('div');
    feedback.classList.add('ui-feedback');
    feedback.innerText = appData.responses[appData.phase].msg;
    msgElem.appendChild(feedback);
};

const userInputHandler = textarea => {
    const board = document.getElementById('message-board');
    const msgElem = document.createElement('div');
    msgElem.classList.add('user-msg');
    msgElem.innerText = textarea.value;
    textarea.value = '';
    board.appendChild(msgElem);

    // respond
    responseHandler();
};

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById("user-input");
    const submitBtn = document.getElementById('action-button');

    // Prevent return->new line without shift key
    textarea.addEventListener('keypress', evt => {
        if (!(window.innerWidth <= 720)
            && !evt.shiftKey && evt.key == "Enter") {
            evt.preventDefault();
            userInputHandler(textarea);
        }
    });

    submitBtn.addEventListener('click', evt => {
        userInputHandler(textarea);
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
