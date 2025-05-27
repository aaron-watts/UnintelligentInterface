const responses = {
    0: {
        msg: 'Would you like me to help you think of something to do?',
        cue: [
            {
                txt: 'Yes please!',
                action: function(){
                    const nextPhase = 1;
                    buttonHandler(this, 1);
                }
            }
        ]
    },
    1: {
        msg: 'How much time would you like to spend on it?'
    }
};