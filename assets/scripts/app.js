const appData = {
    phase: 0,
    duration: ''
};

const getData = async () => {
    const res = await fetch('/.netlify/functions/api');
    const data = await res.json();
    return data;
};

const setData = async() => {
    const { adventures } = await getData();
    appData.allPrompts = adventures;
    appData.durations = [...new Set(appData.allPrompts.map(i => i.howMuch))];
    appData.durations.forEach(duration => {
        appData[duration] = appData.allPrompts.filter(i => i.howMuch == duration).map(i => i.what);
        appData[`${duration}Origin`] = appData[duration].slice();
    });

    // add durations set as user suggestions in responses object
    responses[1].cue = appData.durations.map(duration => {
        return {
            txt: duration,
            action: function() {
                // set phase 2 msg
                appData.duration = duration;
                suggestionHandler()

                const nextPhase = 2;
                buttonHandler(this, nextPhase);
            }
        }
    });

    responses[2].cue[0].action = function() {
        // set phase 2 msg
        suggestionHandler();

        const nextPhase = 2;
        buttonHandler(this, nextPhase);
    }
};
setData();

const suggestionHandler = () => {
    responses[2].msg = `Maybe you could ${function(){
        let arr = appData[appData.duration];
        const randomIndex = Math.floor(Math.random() * arr.length);
        const suggest = arr.splice(randomIndex, 1);
        if (!arr.length) {
            appData[appData.duration] = appData[`${appData.duration}Origin`].slice();
        }
        return suggest;
    }()}`;
}

const responseHandler = (nextPhase=appData.phase) => {
    // set current phase of operations
    appData.phase=nextPhase;

    const board = document.getElementById('message-board');
    const composer = document.getElementById('composer');
    const feedback = document.createElement('div');
    feedback.classList.add('ui-feedback');
    feedback.innerText = responses[appData.phase].msg;
    board.appendChild(feedback);

    // generate suggestions
    responses[appData.phase].cue.forEach(q => {
        const btn = document.createElement('button');
        btn.classList.add('suggestion');
        btn.innerText = q.txt;
        btn.addEventListener('click', q.action)
        composer.prepend(btn);
    });
};

const userInputHandler = (input, nextPhase=appData.phase) => {
    const board = document.getElementById('message-board');
    const msgElem = document.createElement('div');
    msgElem.classList.add('user-msg');
    msgElem.innerText = input;
    board.appendChild(msgElem);

    responseHandler(nextPhase);
};

const buttonHandler = (btn, nextPhase=appData.phase) => {
    const btns = document.querySelectorAll('.suggestion');
    btns.forEach(b => b.remove());

    userInputHandler(btn.innerText, nextPhase);
};

const textareaHandler = textarea => {
    userInputHandler(textarea.value);

    textarea.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById("user-input");
    const submitBtn = document.getElementById('action-button');

    // Prevent return->new line without shift key
    textarea.addEventListener('keypress', evt => {
        if (!(window.innerWidth <= 720)
            && !evt.shiftKey && evt.key == "Enter") {
            evt.preventDefault();
            textareaHandler(textarea);
        }
    });

    submitBtn.addEventListener('click', evt => {
        textareaHandler(textarea);
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
