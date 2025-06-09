const responses = {
    0: {
        msg: 'Would you like me to help you think of something to do?',
        cue: [
            {
                txt: 'Yes please!',
                action: function(){
                    const nextPhase = 1;
                    buttonHandler(this, nextPhase);
                }
            }
        ]
    },
    1: {
        msg: 'How much time would you like to spend on it?'
    },
    2: {
        msg: "I'm feeling a bit tired...",
        cue: [
            {
                txt: 'Think of something else',
                action: function(){
                    const nextPhase = 2;
                    buttonHandler(this, nextPhase);
                }
            },
            {
                txt: 'Change the timeframe',
                action: function(){
                    const nextPhase = 1;
                    buttonHandler(this, nextPhase);
                }
            }
        ]
    }
};