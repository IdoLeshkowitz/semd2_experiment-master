const initialState = {
    'selectedParticipant': null,
    "currentMatching": js_vars.currentMatching,
    'maxParticipantsPerPrize': js_vars.maxParticipantsPerPrize,
    'participantsPriorities': js_vars.participantsPriorities,
    'prizesPriorities': js_vars.prizesPriorities,
    'currentStep': js_vars.currentStep,
    'currentRound': js_vars.currentRound,
    'prizesNames': js_vars.prizesNames,
    'participantsNumbers': js_vars.participantsNumbers,
    'mistakesCounter': 0,
    'mouseOnParticipant': null,
    'mouseOnPrize': null,
    'correctAnswers': js_vars.correctAnswers,
    "participantsMatchMemo": js_vars.matchingMemo,
    "expectedMatchingByRound": js_vars.expectedMatchingByRound,
}
const ACTION_TYPES = {
    START_STEP: 'START_STEP',
    END_STEP: 'END_STEP',
    PARTICIPANT_SELECTED: 'PARTICIPANT_SELECTED',
    PLUS_BUTTON_CLICKED: 'PLUS_BUTTON_CLICKED',
    RENDER: 'RENDER',
    MOUSE_ENTERED_PRIZE_ROW: 'MOUSE_ENTERED_PRIZE_ROW',
    MOUSE_LEFT_PRIZE_ROW: 'MOUSE_LEFT_PRIZE_ROW',
    MOUSE_ENTERED_PARTICIPANT_BUTTON: 'MOUSE_ENTERED_PARTICIPANT_BUTTON',
    MOUSE_LEFT_PARTICIPANT_BUTTON: 'MOUSE_LEFT_PARTICIPANT_BUTTON',
    HIDE_ALL_SECTIONS: 'HIDE_ALL_SECTIONS',
    NEXT_BUTTON_CLICKED: 'NEXT_BUTTON_CLICKED',
    RESET: 'RESET',
    SET_CURRENT_STEP: 'SET_CURRENT_STEP',

}
const steps = [
    {
        id: "step-1",
        type: "instructions",
    },
    {
        id: "step-2",
        type: "instructions",
    },
    {
        id: 'instructions-3',
        type: 'instructions',
    },
    {
        id: "instructions-4",
        type: 'instructions',
    },
    {
        id: "step-3",
        type: "matching",
        stage: 0,
    },
    {
        id: "step-4",
        type: "matching",
        stage: 1,
    },
    {
        id: "step-5",
        type: "radio",
        formFields: {element: "question_1", correctAnswerIndex: 0},
    },
    {
        id: "step-6",
        type: "radio",
        formFields: {element: "question_2", correctAnswerIndex: 1},
    },
    {
        id: "step-7",
        type: 'matching',
        stage: 2,
    },
    {
        id: "step-8",
        type: "radio",
        formFields: {element: "question_3", correctAnswerIndex: 2},
    },
    {
        id: "step-9",
        type: 'matching',
        stage: 3,
    },
    {
        id: "step-10",
        type: "radio",
        formFields: {element: "question_4", correctAnswerIndex: 3},
    },
    {
        id: "step-11",
        type: "matching",
        stage: 4,
    },
    {
        id: "step-12",
        type: "radio",
        formFields: {element: "question_5", correctAnswerIndex: 4},
    },
    {
        id: "step-13",
        type: "matching",
        stage: 5,
    },
    {
        id: "step-14",
        type: "radio",
        formFields: {element: "question_6", correctAnswerIndex: 5},
    },
    {
        id: "step-15",
        type: "matching",
        stage: 6,
    },
    {
        id: "step-16",
        type: "radio",
        formFields: {element: "question_7", correctAnswerIndex: 6},
    },
    {
        id: "step-17",
        type: "radio",
        formFields: {element: "question_8", correctAnswerIndex: 7},
    },
    {
        id: "step-18",
        type: "radio",
        formFields: {element: "prize_a_obtainable", correctAnswerIndex: 8},
    },
    {
        id: "step-19",
        type: "radio",
        formFields: {element: "prize_b_obtainable", correctAnswerIndex: 9},
    },
    {
        id: "step-20",
        type: "radio",
        formFields: {element: "prize_c_obtainable", correctAnswerIndex: 10},
    },
    {
        id: "step-21",
        type: "radio",
        formFields: {element: "prize_d_obtainable", correctAnswerIndex: 11},
    },
    {
        id: "step-22",
        type: "radio",
        formFields: {element: "question_9", correctAnswerIndex: 12},
    },
    {
        id: "step-23",
        type: "radio",
        formFields: {element: "question_10", correctAnswerIndex: 13},
    },
    {
        id: "step-1-rounds",
        type: "instructions",
    },
    {
        id: "step-2-rounds",
        type: "matching",
        stage: 0,
    },
    {
        id: "step-3-rounds",
        type: "dropdown",
        formFields: [
            {element: "prize_a_obtainable", correctAnswerIndex: 0},
            {element: "prize_b_obtainable", correctAnswerIndex: 1},
            {element: "prize_c_obtainable", correctAnswerIndex: 2},
            {element: "prize_d_obtainable", correctAnswerIndex: 3},
        ],
    },
    {
        id: "step-4-rounds",
        type: "dropdown",
        formFields: [
            {element: "obtainable_prize", correctAnswerIndex: 4},
        ],
    }
]

function reducer(state = initialState, action) {
    console.log(action)
    if (action.type === ACTION_TYPES.MOUSE_ENTERED_PARTICIPANT_BUTTON) {
        const newState = {...state, mouseOnParticipant: action.payload}
        renderUiFromState(newState)
    }
    if (action.type === ACTION_TYPES.MOUSE_LEFT_PARTICIPANT_BUTTON) {
        const newState = {...state, mouseOnParticipant: null}
        renderUiFromState(newState)
    }
    if (action.type === ACTION_TYPES.MOUSE_ENTERED_PRIZE_ROW) {
        const newState = {...state, mouseOnPrize: action.payload}
        renderUiFromState(newState)
    }
    if (action.type === ACTION_TYPES.MOUSE_LEFT_PRIZE_ROW) {
        const newState = {...state, mouseOnPrize: null}
        renderUiFromState(newState)
    }
    if (action.type === ACTION_TYPES.PLUS_BUTTON_CLICKED) {
        /*
        when user clicks plus button do the following :
            state changes:
                1. update currentMatching set the value of the participant to the prize that he was matched with
                2. livesend currentMatching to the server
                3. reset selectedParticipant to null
                4. push currentMatching to history
         */
        const participant = state.selectedParticipant
        const prize = action.payload
        const currentMatching = {...state.currentMatching, [participant]: prize}
        const newState = {
            ...state,
            currentMatching,
            selectedParticipant: null,
            participantsMatchMemo: [...state.participantsMatchMemo, participant]
        }
        renderUiFromState(newState)
        liveSend({
            'information_type': "matching_update",
            'matching': newState.currentMatching,
            'participant_to_match': participant,
            'match_to_prize': prize,
            'matching_memo': newState.participantsMatchMemo,
        })
        return newState
    }
    if (action.type === ACTION_TYPES.PARTICIPANT_SELECTED) {
        /*
        when user clicks participant button do the following :
            1. set selectedParticipant to the participant that was clicked
            2. side effect:
             add iButtonSelected class to the button that was clicked
             remove iButtonSelected class from last selected participant button
             show plus buttons
         */
        const selectedParticipant = action.payload
        // /* remove iButtonSelected class from last selected participant button */
        // const lastSelectedParticipantButton = document.getElementById(`participant${state.selectedParticipant}Button`)
        // lastSelectedParticipantButton?.classList.remove("iButtonSelected")
        // /* set selectedParticipant to the participant that was clicked */
        // const selectedParticipantButton = document.getElementById(`participant${selectedParticipant}Button`)
        // selectedParticipantButton?.classList.add("iButtonSelected")
        // /* show plus buttons */
        // const plusButtons = Array.from(document.querySelectorAll("[id^='plusButton']"))
        // plusButtons.forEach(button => button.style.display = "inline-block")
        const newState = {...state, selectedParticipant}
        renderUiFromState(newState)
        return {...state, selectedParticipant}
    }
    if (action.type === ACTION_TYPES.RENDER) {
        renderUiFromState(state)
    }
    if (action.type === ACTION_TYPES.HIDE_ALL_SECTIONS) {
        $("section").hide();
    }
    if (action.type === ACTION_TYPES.NEXT_BUTTON_CLICKED) {
        /* in case this is the first step in the round */
        const currentStep = state.currentStep
        if (currentStep.type === "instructions") {
            /* disable button */
            const buttonElement = action.payload ?? null
            buttonElement?.prop("disabled", true)
            const sectionId = currentStep.id
            $(`#${sectionId}`).hide()
            const stepsInRound = getStepsByRound(state.currentRound)
            const currentStepIndex = stepsInRound.findIndex(step => step.id === currentStep.id)
            const nextStep = stepsInRound[currentStepIndex + 1]
            startStep(nextStep)
            return {...state, currentStep: nextStep}
        }
        /* check the type of the current step */
        if (currentStep.type === "matching") {
            /*
            if matching is correct do the following:
                - hide incorrect message if it is shown
                - disable the button
                - show  correct/ first-correct message for "delay" seconds, then:
                    - hide current step
                    - show next step
                - reset increment counter
                - set current step to the next step
                - set current stage to next stage
            if matching is incorrect do the following:
                if user didn't exceed three attempts:
                    - show incorrect message
                    - increment mistakes counter
                if user exceeded three attempts:
                    - show incorrect skip message. for "delay" seconds, then:
                        - hide current step
                        - show next step
                    - reset increment counter
                    - set current step to the next step
                    - set current matching to expected matching and render ui
            */
            /* check if matching is correct */
            const expectedMatchingForStage = state.expectedMatchingByRound[currentStep.stage]

            /* check if matching is correct */
            function validateMatching(expectedMatching, userMatching) {
                return Object.keys(expectedMatching).every(participant => {
                    const expectedPrize = expectedMatching[participant]
                    const userPrize = userMatching[participant]
                    return expectedPrize === userPrize
                })
            }

            const isMatchingCorrect = validateMatching(expectedMatchingForStage, state.currentMatching)
            const currentStepIndex = getStepsByRound(state.currentRound).findIndex(step => step.id === currentStep.id)
            const nextStep = getStepsByRound(state.currentRound)[currentStepIndex + 1]
            const understandingBonus = (() => {
                /*
                if round is 1 :
                    1. add 1 to the understanding bonus if the matching is correct.
                else :
                    if matching is correct :
                        if first attempt:
                            add 5 points .
                        if second attempt:
                            add 2 points .
                        if third attempt:
                            add 1 point .
                 */
                if (state.currentRound === 1) {
                    if (isMatchingCorrect && state.mistakesCounter === 0) {
                        return 1
                    } else {
                        return 0
                    }
                }
                if (isMatchingCorrect) {
                    if (state.mistakesCounter === 0) {
                        return 5
                    } else if (state.mistakesCounter === 1) {
                        return 2
                    } else {
                        return 1
                    }
                }
                return 0
            })()
            liveSend({
                "information_type": "matching_submission",
                "matching": state.currentMatching,
                "is_correct": isMatchingCorrect,
                "understanding_bonus": understandingBonus,
                "stage": currentStep.stage,
            })
            if (isMatchingCorrect) {
                /* disable button */
                const buttonElement = action.payload ?? null;
                buttonElement?.prop('disabled', true)
                /* hide incorrect message if it is shown */
                $(`#${state.currentStep.id} .incorrect-msg`).hide();
                /* display the matching correct message */
                if (state.mistakesCounter === 0) {
                    $(`#${state.currentStep.id} .correct-first-msg`).show();
                } else if (state.mistakesCounter === 1 && state.currentRound > 1) {
                    $(`#${state.currentStep.id} .correct-second-msg`).show();
                } else {
                    $(`#${state.currentStep.id} .correct-msg`).show();
                }
                setTimeout(() => {
                    /* hide current step */
                    $(`#${state.currentStep.id}`).hide();
                    /* show next step */
                    startStep(nextStep)
                    /* reset mistakes counter and update current step and current stage */
                }, delay)
                const newState = {
                    ...state,
                    currentStep: nextStep,
                    mistakesCounter: 0,
                }
                return newState
            } else {
                /* if user didn't exceed three attempts */
                if (state.mistakesCounter < 2) {
                    /* show incorrect message */
                    $(`#${state.currentStep.id} .incorrect-msg`).show();
                    /* update state */
                    const newState = {
                        ...state,
                        mistakesCounter: state.mistakesCounter + 1,
                    }
                    return newState
                }
                /* if user exceeded three attempts */
                else {
                    /* disable button */
                    const buttonElement = action.payload ?? null;
                    buttonElement?.prop('disabled', true)
                    /* hide incorrect message if it is shown */
                    $(`#${state.currentStep.id} .incorrect-msg`).hide();
                    /* show incorrect skip message */
                    $(`#${state.currentStep.id} .incorrect-skip-msg`).show();
                    const currentStepIndex = getStepsByRound(state.currentRound).findIndex(step => step.id === currentStep.id)
                    const nextStep = getStepsByRound(state.currentRound)[currentStepIndex + 1]
                    setTimeout(() => {
                        /* hide current step */
                        $(`#${state.currentStep.id}`).hide();
                        /* show next step */
                        startStep(nextStep)
                    }, delay)
                    /* reset mistakes counter and update current step and current stage */
                    const newState = {
                        ...state,
                        currentStep: nextStep,
                        mistakesCounter: 0,
                        currentMatching: expectedMatchingForStage,
                        participantsMatchMemo: [
                            ...state.participantsMatchMemo, ...Object.keys(expectedMatchingForStage).map(participant => {
                                if (expectedMatchingForStage[participant] !== 'none') {
                                    return participant
                                }
                            })
                        ]
                    }
                    renderUiFromState(newState)
                    return newState
                }
            }
        }
        if (currentStep.type === "radio") {
            /*
            check if the user answered correctly :
                - if yes, do the following:
                    - hide incorrect message if it is shown
                    - disable the button
                    - reset mistakes counter
                    - set current step to the next step
                    - show  correct message for "delay" seconds, then:
                        - hide current step
                        - start next step
                - if no, do the following:
                    - show incorrect message
                    - increment mistakes counter
             */
            const expectedAnswer = state.correctAnswers[currentStep.formFields.correctAnswerIndex]
            const userAnswer = parseInt(forminputs[currentStep.formFields.element].value)
            const isCorrect = expectedAnswer === userAnswer
            const understandingBonus = (() => {
                /* if mistakes counter is 0, add 1 to the understanding bonus */
                if (state.mistakesCounter === 0 && isCorrect) {
                    return 1
                }
                return 0
            })()
            liveSend({
                "information_type": "question_submission",
                question_id: currentStep.formFields.element,
                "is_correct": isCorrect,
                "understanding_bonus": understandingBonus,
                "answer": userAnswer,
            })
            if (isCorrect) {
                /* hide incorrect message if it is shown */
                $(`#${state.currentStep.id} .incorrect-msg`).hide();
                /* disable button */
                const buttonElement = action.payload ?? null;
                buttonElement?.prop('disabled', true)
                /* display the matching correct message */
                const isFirstAttempt = state.mistakesCounter === 0
                if (isFirstAttempt) {
                    $(`#${state.currentStep.id} .correct-first-msg`).show();
                } else {
                    $(`#${state.currentStep.id} .correct-msg`).show();
                }
                const currentStepIndex = getStepsByRound(state.currentRound).findIndex(step => step.id === currentStep.id)
                const nextStep = getStepsByRound(state.currentRound)[currentStepIndex + 1]
                setTimeout(() => {
                    /* hide current step */
                    $(`#${state.currentStep.id}`).hide();
                    /* show next step */
                    startStep(nextStep)
                }, delay)
                const newState = {
                    ...state,
                    currentStep: nextStep,
                    mistakesCounter: 0,
                }
                return newState
            }
            if (!isCorrect) {
                /* show incorrect message */
                $(`#${state.currentStep.id} .incorrect-msg`).show();
                /* update state */
                const newState = {
                    ...state,
                    mistakesCounter: state.mistakesCounter + 1,
                }
                return newState
            }
        }
        if (currentStep.type === "dropdown") {
            const formFields = currentStep.formFields
            const inputElements = formFields.map(formField => {
                return forminputs[formField.element]
            })
            const expectedAnswers = formFields.map(formField => {
                return state.correctAnswers[formField.correctAnswerIndex]
            })
            const userAnswers = inputElements.map(inputElement => {
                return parseInt(inputElement.value)
            })
            const isCorrect = expectedAnswers.every((expectedAnswer, index) => {
                return expectedAnswer === userAnswers[index]
            })
            const understandingBonus = (() => {
                /* if mistakes counter is 0, add 1 to the understanding bonus */
                if (state.mistakesCounter === 0 && isCorrect) {
                    return 1
                }
                return 0
            })
            liveSend({
                "information_type": "question_submission",
                question_id: currentStep.formFields.element,
                "is_correct": isCorrect,
                "understanding_bonus": understandingBonus,
                "answer": userAnswers,
            })
            if (isCorrect) {
                /* hide incorrect message if it is shown */
                $(`#${state.currentStep.id} .incorrect-msg`).hide();
                /* disable button */
                const buttonElement = action.payload ?? null;
                buttonElement?.prop('disabled', true)
                /* display the matching correct message */
                const isFirstAttempt = state.mistakesCounter === 0
                if (isFirstAttempt) {
                    $(`#${state.currentStep.id} .correct-first-msg`).show();
                } else {
                    $(`#${state.currentStep.id} .correct-msg`).show();
                }
                const currentStepIndex = getStepsByRound(state.currentRound).findIndex(step => step.id === currentStep.id)
                const nextStep = getStepsByRound(state.currentRound)[currentStepIndex + 1]
                setTimeout(() => {
                    /* hide current step */
                    $(`#${state.currentStep.id}`).hide();
                    /* show next step */
                    startStep(nextStep)
                }, delay)
                const newState = {
                    ...state,
                    currentStep: nextStep,
                    mistakesCounter: 0,
                }
                return newState
            }
            if (!isCorrect) {
                /* show incorrect message */
                $(`#${state.currentStep.id} .incorrect-msg`).show();
                /* update state */
                const newState = {
                    ...state,
                    mistakesCounter: state.mistakesCounter + 1,
                }
                return newState
            }
        }
        return state
    }
    if (action.type === ACTION_TYPES.RESET) {
        /* reset currentMatching */
        const newCurrentMatching = {};
        for (const participant in state.participantsNumbers) {
            newCurrentMatching[participant] = 'none'
        }
        /* reset participantsMatchMemo */
        const newParticipantsMatchMemo = [];
        const newState = {
            ...state,
            currentMatching: newCurrentMatching,
            participantsMatchMemo: newParticipantsMatchMemo,
        }
        renderUiFromState(newState)
        liveSend({
            'information_type': 'reset',
        })
        return newState
    }
    if (action.type === ACTION_TYPES.SET_CURRENT_STEP) {
        const newState = {
            ...state,
            currentStep: action.payload,
        }
        return newState
    }
    return state;
}

function startStep(stepToBeStarted) {
    if (!stepToBeStarted) {
        // $("#last").show()
        document.querySelector("form").submit()
        return
    }
    liveSend({
        "information_type": "set_step",
        "step": stepToBeStarted.id,
    })
    if (stepToBeStarted.type === 'instructions') {
        const sectionId = stepToBeStarted.id
        // show section
        $(`#${sectionId}`).show()
        return
    }
    if (stepToBeStarted.type === "matching") {
        const sectionId = stepToBeStarted.id
        /* hide error and success messages */
        $(`#${sectionId} .incorrect-msg`).hide()
        $(`#${sectionId} .correct-msg`).hide()
        $(`#${sectionId} .correct-first-msg`).hide()
        $(`#${sectionId} .correct-second-msg`).hide()
        $(`#${sectionId} .incorrect-msg`).hide()
        $(`#${sectionId} .incorrect-skip-msg`).hide()
        // show section
        $(`#${sectionId}`).show()
        return
    }
    if (stepToBeStarted.type === "radio" || stepToBeStarted.type === "dropdown") {
        const sectionId = stepToBeStarted.id
        /* hide error and success messages */
        $(`#${sectionId} .incorrect-msg`).hide()
        $(`#${sectionId} .correct-msg`).hide()
        $(`#${sectionId} .correct-first-msg`).hide()
        $(`#${sectionId} .incorrect-seq-field`).hide()
        // show section
        $(`#${sectionId}`).show()
    }
}

const delay = 200;
let store;
let modal = document.getElementById("GenModal"); // Get the modal
let btn = document.getElementById("GenBtn"); // Get the button that opens the modal
let span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

btn.onclick = function () {
    modal.style.display = "block";
} // When the user clicks the button, open the modal
span.onclick = function () {
    modal.style.display = "none";
}// When the user clicks on <span> (x), close the modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}// When the user clicks anywhere outside of the modal, close it

/*window.onload = function () {

    updateCurrentMatching();
    $("#step-2").hide();
    $("#step-3").hide();
    $("#step-4").hide();
    $("#step-5").hide();
    $("#step-6").hide();
    $("#step-7").hide();
    $("#step-8").hide();
    $("#step-9").hide();
    $("#step-10").hide();
    $("#step-11").hide();
    $("#step-12").hide();
    $("#step-13").hide();
    $("#step-14").hide();
    $("#step-15").hide();
    $("#step-16").hide();
    $("#step-17").hide();
    $("#step-3 .incorrect-msg").hide();
    $("#step-3 .correct-msg").hide();
    $("#step-4 .incorrect-msg").hide();
    $("#step-4 .correct-msg").hide();
    $("#step-5 .incorrect-msg").hide();
    $("#step-5 .correct-msg").hide();
    $("#step-5 .incorrect-seq-field").hide();
    $("#step-6 .incorrect-msg").hide();
    $("#step-6 .correct-msg").hide();
    $("#step-6 .incorrect-seq-field").hide();
    $("#step-7 .incorrect-msg").hide();
    $("#step-7 .correct-msg").hide();
    $("#step-8 .incorrect-msg").hide();
    $("#step-8 .correct-msg").hide();
    $("#step-8 .incorrect-seq-field").hide();
    $("#step-9 .incorrect-msg").hide();
    $("#step-9 .correct-msg").hide();
    $("#step-10 .incorrect-msg").hide();
    $("#step-10 .correct-msg").hide();
    $("#step-10 .incorrect-seq-field").hide();
    $("#step-11 .incorrect-msg").hide();
    $("#step-11 .correct-msg").hide();
    $("#step-12 .incorrect-msg").hide();
    $("#step-12 .correct-msg").hide();
    $("#step-12 .incorrect-seq-field").hide();
    $("#step-13 .incorrect-msg").hide();
    $("#step-13 .correct-msg").hide();
    $("#step-14 .incorrect-msg").hide();
    $("#step-14 .correct-msg").hide();
    $("#step-14 .incorrect-seq-field").hide();
    $("#step-15 .incorrect-msg").hide();
    $("#step-15 .correct-msg").hide();
    $("#step-16 .incorrect-msg").hide();
    $("#step-16 .correct-msg").hide();
    $("#step-16 .incorrect-seq-field").hide();
    $("#step-17 .incorrect-msg").hide();
    $("#step-17 .correct-msg").hide();
    $("#step-17 .incorrect-seq-field").hide();

    $(".incorrect-skip-msg").hide();
    $(".correct-first-msg").hide();
    $(".correct-second-msg").hide();
    $("#step-2-rounds").hide();
    $("#step-2-rounds .incorrect-msg").hide();
    $("#step-2-rounds .correct-msg").hide();
    $("#step-3-rounds").hide();
    $("#step-4-rounds").hide();
    $("#step-5-rounds").hide();

    $("#proceed-step-2-btn").click(function () {
        $(this).hide();
        $("#step-1").toggle();
        $("#step-2").slideDown();
    });

    $("#proceed-step-3-btn").click(function () {
        $(this).hide();
        $("#step-2").toggle();
        $("#step-3").slideDown();
    });

    $("#proceed-step-2-btn-rounds").click(function () {
        $(this).hide();
        $("#step-2-rounds").slideDown();
    });

    $("#proceed-step-3-btn-rounds").click(function () {
        liveSend({'information_type': 'training_rounds', 'matching': partial})
    });

    $("#proceed-step-4-btn-rounds").click(function () {
        a = forminputs['prize_a_obtainable'].value;
        b = forminputs['prize_b_obtainable'].value;
        c = forminputs['prize_c_obtainable'].value;
        d = forminputs['prize_d_obtainable'].value;
        if (a != js_vars.correct_answers[0] || b != js_vars.correct_answers[1] || c != js_vars.correct_answers[2] || d != js_vars.correct_answers[3]) {
            mistakes_counter += 1;
            $("#step-3-rounds .incorrect-msg").show();
        } else {
            $(this).prop('disabled', true);
            if (mistakes_counter > 0) {
                $("#step-3-rounds .incorrect-msg").hide();
                $("#step-3-rounds .correct-msg").show();
                $("#step-3-rounds .correct-first-msg").hide();
            } else {
                $("#step-3-rounds .incorrect-msg").hide();
                $("#step-3-rounds .correct-first-msg").show();
            }
            setTimeout(() => {
                $("#step-3-rounds").hide();
                $("#step-4-rounds").toggle();
            }, delay);
            mistakes_counter = 0;
        }
    });

    $("#proceed-step-5-btn-rounds").click(function () {
        let answer;
        const roundNumber = js_vars.round_number;
        if (roundNumber === 2) {
            answer = forminputs['obtainable_prize_round_2'].value;
        } else {
            answer = forminputs['obtainable_prize_round_3_4'].value;
        }
        if (answer != js_vars.correct_answers[4]) {
            mistakes_counter += 1;
            $("#step-4-rounds .incorrect-msg").show();
        } else {
            $(this).prop('disabled', true);
            $("#step-4-rounds .incorrect-msg").hide();
            if (mistakes_counter > 0) {
                $("#step-4-rounds .correct-msg").show();
            } else {
                $("#step-4-rounds .correct-first-msg").show();
            }
            setTimeout(() => {
                $("#step-4-rounds").hide();
                $("#step-5-rounds").toggle();
            }, 2000);
            mistakes_counter = 0;
        }
    });

    $("#proceed-step-4-btn").click(function () {
        liveSend({'information_type': 'matching_submission', 'matching': partial, 'stage': stage})
    });

    $("#proceed-step-5-btn").click(function () {
        liveSend({'information_type': 'matching_submission', 'matching': partial, 'stage': stage})
    });

    $("#proceed-step-6-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_1";
        var formInputName = "question_1";
        if (forminputs[formInputName].value != js_vars.correct_answers[0]) {
            bonus_flag = false;
            $("#step-5 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        $(this).prop('disabled', true)
        $("#step-5 .incorrect-msg").hide();
        if (bonus_flag) {
            bonus = bonus + 1;
            $("#step-5 .correct-first-msg").show();
        } else {
            $("#step-5 .correct-msg").show();
        }
        bonus_flag = true;
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];

        setTimeout(() => {
            $("#step-5").hide();
            $("#step-6").toggle();
        }, delay);
        mistakes_counter = 0;
    });

    $("#proceed-step-7-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_2";
        var formInputName = "question_2";
        if (forminputs[formInputName].value != js_vars.correct_answers[1]) {
            bonus_flag = false;
            $("#step-6 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        $("#step-6 .incorrect-msg").hide();
        if (bonus_flag) {
            bonus = bonus + 1;
            $("#step-6 .correct-first-msg").show();
        } else {
            $("#step-6 .correct-msg").show();
        }
        bonus_flag = true;
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        setTimeout(() => {
            $("#step-6").hide();
            $("#step-7").toggle();
        }, 5000);
    });

    $("#proceed-step-8-btn").click(function () {
        liveSend({'information_type': 'matching_submission', 'matching': partial, 'stage': stage})
    });
    $("#proceed-step-9-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_3";
        var formInputName = "question_3";
        if (forminputs[formInputName].value != js_vars.correct_answers[2]) {
            bonus_flag = false;
            $("#step-8 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        $("#step-8 .incorrect-msg").hide();
        if (bonus_flag) {
            bonus = bonus + 1;
            $("#step-8 .correct-first-msg").show();
        } else {
            $("#step-8 .correct-msg").show();
        }
        bonus_flag = true;
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        setTimeout(() => {
            $("#step-8").hide();
            $("#step-9").toggle();
        }, 5000);
    });
    $("#proceed-step-10-btn").click(function () {
        liveSend({'information_type': 'matching_submission', 'matching': partial, 'stage': stage})
    });

    $("#proceed-step-11-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_4";
        var formInputName = "question_4";
        if (forminputs[formInputName].value != js_vars.correct_answers[3]) {
            bonus_flag = false;
            $("#step-10 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        $("#step-10 .incorrect-msg").hide();
        if (bonus_flag) {
            bonus = bonus + 1;
            $("#step-10 .correct-first-msg").show();
        } else {
            $("#step-10 .correct-msg").show();
        }
        bonus_flag = true;
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        setTimeout(() => {
            $("#step-10").hide();
            $("#step-11").toggle();
        }, 5000);
    });

    $("#proceed-step-12-btn").click(function () {
        liveSend({'information_type': 'matching_submission', 'matching': partial, 'stage': stage})
    });

    $("#proceed-step-13-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_5";
        var formInputName = "question_5";
        if (forminputs[formInputName].value != js_vars.correct_answers[4]) {
            bonus_flag = false;
            $("#step-12 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        $("#step-12 .incorrect-msg").hide();
        if (bonus_flag) {
            bonus = bonus + 1;
            $("#step-12 .correct-first-msg").show();
        } else {
            $("#step-12 .correct-msg").show();
        }
        bonus_flag = true;
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        setTimeout(() => {
            $("#step-12").hide();
            $("#step-13").toggle();
        }, 5000);
    });


    $("#proceed-step-14-btn").click(function () {
        liveSend({'information_type': 'matching_submission', 'matching': partial, 'stage': stage})
    });

    $("#proceed-step-15-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_5";
        var formInputName = "question_6";
        if (forminputs[formInputName].value != js_vars.correct_answers[4]) {
            bonus_flag = false;
            $("#step-14 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        $("#step-14 .incorrect-msg").hide();
        if (bonus_flag) {
            bonus = bonus + 1;
            $("#step-14 .correct-first-msg").show();
        } else {
            $("#step-14 .correct-msg").show();
        }
        bonus_flag = true;
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        setTimeout(() => {
            $("#step-14").hide();
            $("#step-15").toggle();
        }, 5000);
    });

    $("#proceed-step-16-btn").click(function () {
        liveSend({'information_type': 'matching_submission', 'matching': partial, 'stage': stage})
    });

    $("#proceed-step-17-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_5";
        var formInputName = "question_5";
        if (forminputs[formInputName].value != js_vars.correct_answers[4]) {
            bonus_flag = false;
            $("#step-16 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        $("#step-16 .incorrect-msg").hide();
        if (bonus_flag) {
            bonus = bonus + 1;
            $("#step-16 .correct-first-msg").show();
        } else {
            $("#step-16 .correct-msg").show();
        }
        bonus_flag = true;
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        setTimeout(() => {
            $("#step-16").hide();
            $("#step-17").toggle();
        }, 5000);
    });

    $("#submit-page").click(function () {
        forminputs["bonus_field"].value = bonus;
        document.getElementById("form").submit();
    });

};*/

window.addEventListener('DOMContentLoaded', (event) => {
    store = Redux.createStore(reducer);
    /*
        this action is dispatched each time that the page is loaded
        if the server is sending the current step, then the page is reloaded. start the step that the server is sending
        if the server is not sending the current step, then the page is loaded for the first time. start the first step
        */
    let stepToBeStarted;
    if (store.getState().currentStep) {
        stepToBeStarted = steps.find((step) => store.getState().currentStep === step.id)
    } else {
        const currentRoundSteps = getStepsByRound(store.getState().currentRound)
        console.log(currentRoundSteps)
        stepToBeStarted = currentRoundSteps[0]
    }
    store.dispatch({type: ACTION_TYPES.SET_CURRENT_STEP, payload: stepToBeStarted})
    store.dispatch({type: ACTION_TYPES.HIDE_ALL_SECTIONS})
    startStep(stepToBeStarted)
    // store.dispatch({type: ACTION_TYPES.NEXT_BUTTON_CLICKED})
    store.dispatch({type: ACTION_TYPES.RENDER})
    liveSend({'information_type': 'onload', 'time': Date.now()})
    $("button").click(function (event) {
        event.preventDefault()
    })
    $("section button").click(function (event) {
        console.log($(this).attr("id"))
        if ($(this).attr("id") == "submit-page") {
            document.getElementById("form").submit();
            return
        }
        store.dispatch({type: ACTION_TYPES.NEXT_BUTTON_CLICKED, payload: $(this)})
    })
});

function submitButton() {
    $('#finishModal').modal('show');
}

function dismissFinishModal() {
    $('#finishModal').modal('hide');
}

/*function liveRecv(data) {
    if (data['information_type'] === 'student_matching') { // An unmatched student's button was pressed.
        student = data['student'];
        updateCurrentMatching(); // It is important for this function to be executed before the rest!! Yet after student is defined.
        openPlus();
    } else if (data['information_type'] === 'student_unmatched') { // The student was unmatched if it was previously matched. Else, it wasn't matched.
        containment = data['matched_number'];
        partial = data['partialmatching'];
        student = 0; // before the update function is executed.
        updateCurrentMatching();
    } else if (data['information_type'] === 'student_matched') { // student was matched by clicking on a plus button.
        containment = data['matched_number'];
        partial = data['partialmatching'];
        student = 0; // before the update function is executed.
        updateCurrentMatching();
    } else if (data['information_type'] === 'ready_for_rematch') { // A matched student's button was pressed, ready to remach.
        student = data['student']; // before the update function is executed.
        updateCurrentMatching(); // It is important for this function to be executed first (but after setting the student variable)!! It is like a reset of the system before the rest is activated.
        openPlus();
    } else if (data['information_type'] === 'canceled_rematch') {
        student = 0;
        updateCurrentMatching();
    } else if (data['information_type'] === 'matching_status') {
        if (data['round'] == 1) {
            if (data['status']) {
                mistakes_counter = 0;
                if (stage == 1) {
                    $("#step-3 .incorrect-msg").hide();
                    if (bonus_flag) {
                        bonus = bonus + 1;
                        $("#step-3 .correct-first-msg").show();
                    } else {
                        $("#step-3 .correct-msg").show();
                    }
                    bonus_flag = true;
                    setTimeout(() => {
                        $("#step-3").hide();
                        $("#step-4").toggle();
                    }, 2000);
                }
                if (stage == 2) {
                    $("#step-4 .incorrect-msg").hide();
                    if (bonus_flag) {
                        bonus = bonus + 1;
                        $("#step-4 .correct-first-msg").show();
                    } else {
                        $("#step-4 .correct-msg").show();
                    }
                    bonus_flag = true;
                    setTimeout(() => {
                        $("#step-4").hide();
                        $("#step-5").toggle();
                    }, 2000);
                }
                if (stage == 3) {
                    $("#step-7 .incorrect-msg").hide();
                    if (bonus_flag) {
                        bonus = bonus + 1;
                        $("#step-7 .correct-first-msg").show();
                    } else {
                        $("#step-7 .correct-msg").show();
                    }
                    bonus_flag = true;
                    setTimeout(() => {
                        $("#step-7").hide();
                        $("#step-8").toggle();
                    }, 2000);
                }
                if (stage == 4) {
                    $("#step-9 .incorrect-msg").hide();
                    if (bonus_flag) {
                        bonus = bonus + 1;
                        $("#step-9 .correct-first-msg").show();
                    } else {
                        $("#step-9 .correct-msg").show();
                    }
                    bonus_flag = true;
                    setTimeout(() => {
                        $("#step-9").hide();
                        $("#step-10").toggle();
                    }, 2000);
                }
                if (stage == 5) {
                    $("#step-11 .incorrect-msg").hide();
                    if (bonus_flag) {
                        bonus = bonus + 1;
                        $("#step-11 .correct-first-msg").show();
                    } else {
                        $("#step-11 .correct-msg").show();
                    }
                    bonus_flag = true;
                    setTimeout(() => {
                        $("#step-11").hide();
                        $("#step-12").toggle();
                    }, 2000);
                }
                if (stage == 6) {
                    $("#step-13 .incorrect-msg").hide();
                    if (bonus_flag) {
                        bonus = bonus + 1;
                        $("#step-13 .correct-first-msg").show();
                    } else {
                        $("#step-13 .correct-msg").show();
                    }
                    bonus_flag = true;
                    setTimeout(() => {
                        $("#step-13").hide();
                        $("#step-14").toggle();
                    }, 2000);
                }
                if (stage == 7) {
                    $("#step-15 .incorrect-msg").hide();
                    if (bonus_flag) {
                        bonus = bonus + 1;
                        $("#step-15 .correct-first-msg").show();
                    } else {
                        $("#step-11 .correct-msg").show();
                    }
                    bonus_flag = true;
                    setTimeout(() => {
                        $("#step-15").hide();
                        $("#step-16").toggle();
                    }, 2000);
                }
                stage = stage + 1;
            } else {
                bonus_flag = false;
                mistakes_counter = mistakes_counter + 1;
                if (stage == 1) {
                    if (mistakes_counter < 3) {
                        $("#step-3 .incorrect-msg").show();
                        updateMatching(data['matching']);
                    } else {
                        mistakes_counter = 0;
                        bonus_flag = true;
                        $("#step-3 .incorrect-msg").hide();
                        $("#step-3 .incorrect-skip-msg").show();
                        updateMatching(data['next_matching']);
                        stage = stage + 1;
                        setTimeout(() => {
                            $("#step-3").hide();
                            $("#step-4").toggle();
                        }, 5000);
                        return;
                    }
                }
                if (stage == 2) {
                    if (mistakes_counter < 3) {
                        $("#step-4 .incorrect-msg").show();
                        updateMatching(data['matching']);
                    } else {
                        mistakes_counter = 0;
                        bonus_flag = true;
                        $("#step-4 .incorrect-msg").hide();
                        $("#step-4 .incorrect-skip-msg").show();
                        updateMatching(data['next_matching']);
                        stage = stage + 1;
                        setTimeout(() => {
                            $("#step-4").hide();
                            $("#step-5").toggle();
                        }, 5000);
                        return;
                    }
                }
                if (stage == 3) {
                    if (mistakes_counter < 3) {
                        $("#step-7 .incorrect-msg").show();
                        updateMatching(data['matching']);
                    } else {
                        mistakes_counter = 0;
                        bonus_flag = true;
                        $("#step-7 .incorrect-msg").hide();
                        $("#step-7 .incorrect-skip-msg").show();
                        updateMatching(data['next_matching']);
                        stage = stage + 1;
                        setTimeout(() => {
                            $("#step-7").hide();
                            $("#step-8").toggle();
                        }, 5000);
                        return;
                    }
                }
                if (stage == 4) {
                    if (mistakes_counter < 3) {
                        $("#step-9 .incorrect-msg").show();
                        updateMatching(data['matching']);
                    } else {
                        mistakes_counter = 0;
                        bonus_flag = true;
                        $("#step-9 .incorrect-msg").hide();
                        $("#step-9 .incorrect-skip-msg").show();
                        updateMatching(data['next_matching']);
                        stage = stage + 1;
                        setTimeout(() => {
                            $("#step-9").hide();
                            $("#step-10").toggle();
                        }, 5000);
                        return;
                    }
                }
                if (stage == 5) {
                    if (mistakes_counter < 3) {
                        $("#step-11 .incorrect-msg").show();
                        updateMatching(data['matching']);
                    } else {
                        mistakes_counter = 0;
                        bonus_flag = true;
                        $("#step-11 .incorrect-msg").hide();
                        $("#step-11 .incorrect-skip-msg").show();
                        updateMatching(data['next_matching']);
                        stage = stage + 1;
                        setTimeout(() => {
                            $("#step-11").hide();
                            $("#step-12").toggle();
                        }, 5000);
                        return;
                    }
                }
                if (stage == 6) {
                    if (mistakes_counter < 3) {
                        $("#step-13 .incorrect-msg").show();
                        updateMatching(data['matching']);
                    } else {
                        mistakes_counter = 0;
                        bonus_flag = true;
                        $("#step-13 .incorrect-msg").hide();
                        $("#step-13 .incorrect-skip-msg").show();
                        updateMatching(data['next_matching']);
                        stage = stage + 1;
                        setTimeout(() => {
                            $("#step-13").hide();
                            $("#step-14").toggle();
                        }, 5000);
                        return;
                    }
                }
                if (stage == 7) {
                    if (mistakes_counter < 3) {
                        $("#step-15 .incorrect-msg").show();
                        updateMatching(data['matching']);
                    } else {
                        mistakes_counter = 0;
                        bonus_flag = true;
                        $("#step-15 .incorrect-msg").hide();
                        $("#step-15 .incorrect-skip-msg").show();
                        updateMatching(data['next_matching']);
                        stage = stage + 1;
                        setTimeout(() => {
                            $("#step-15").hide();
                            $("#step-16").toggle();
                        }, 5000);

                    }
                }
            }
        } else {
            if (data['status']) {
                $("#step-2-rounds .incorrect-msg").hide();
                $("#step-2-rounds .correct-msg").show();
                setTimeout(() => {
                    $("#step-2-rounds .btn-container").hide();
                    $("#step-3-rounds").show();
                }, 2000);
            } else {
                mistakes_counter = mistakes_counter + 1;
                if (mistakes_counter < 3) {
                    $("#step-2-rounds .incorrect-msg").show();
                } else {
                    $("#step-2-rounds .incorrect-msg").hide();
                    $("#step-2-rounds .incorrect-skip-msg").show();
                    updateMatching(data['correct_allocation']);
                    setTimeout(() => {
                        $("#step-2-rounds .btn-container").hide();
                        $("#step-3-rounds").show();
                    }, 5000);
                }
            }
        }
    } else if (data['information_type'] === 'submit') {
        document.getElementById('form').submit();
    }
}*/
function getStepsByRound(round) {
    if (round === 1) {
        return steps.filter(step => !step.id.includes("rounds"))
    } else {
        return steps.filter(step => step.id.includes("rounds"))
    }
}

function renderUiFromState(state) {
    function renderPrizesPrioritiesTable() {
        /*
        the prizesPriorities table is a table that contains all the prizes priorities.
        each column represents a prize and each row represents a priority of the prize.
        a column is highlighted if all of these terms are met:
            1.there is no currently selected participant
            2.the user is hovering over prize row that matches the column prize
        a participant in a cell is highlited if it is matched to the prize that this column represents
         */
        const jsxCode = `
        function Stam(){
        return <div></div>
        }
        function PrizesPrioritiesTable(props) {
            return (
                <>
                          {
                            Array.from(Object.keys(props)).map((_,index)=>{
                                const { isHighlited, prizeName, columnIndex, highlitedParticipants,isLast, priorities} = props[index]
                                const classNames = () => {
                                    let classNames = "table-column flexItemButtonsBackground"
                                    if (columnIndex === 0) {
                                        classNames += " verticalRight"
                                    } else if (columnIndex === Object.keys(props).length - 1) {
                                        classNames += " verticalLeft"
                                    } else {
                                        classNames += " verticalBoth"
                                    }
                                    if (isHighlited) {
                                        classNames += " highlited"
                                    }
                                    return classNames
                                 }
                                return (
                                    <div className={classNames()} id={\`SchoolsBackground\${index}\`} key={index}>
                                        <div className="dButtonTop dButton" id={\`School\${prizeName}\`}>{prizeName}</div>
                                        {
                                            priorities.map((priority, cellIndex) => {                                           
                                                const classNames=()=>{
                                                    let classNames = "dButton"                                                 
                                                    if (highlitedParticipants.includes(priority)) {
                                                        classNames += " dButtonMatched"
                                                    }
                                                    return classNames
                                                }
                                                return (
                                                    <div className={classNames()} id={\`School\${prizeName}PrefSchool\${priority}\`} key={cellIndex}>{priority}</div>
                                                ) 
                                            })
                                         }
                                    </div>
                                )
                            })
                        }
                </>
            )
        }
        `
        const prizesPrioritiesProps = Object.keys(state.prizesPriorities).map((prizeName, index) => {
            const prizePriorities = state.prizesPriorities[prizeName]
            const highlitedParticipants = () => {
                /* a participant cell should be highlited if the prize that the columns relates to was chosen by the participant */
                return Object.keys(state.currentMatching).filter(participantName => {
                    const prizeMatchedToParticipant = state.currentMatching[participantName]
                    return prizeMatchedToParticipant === prizeName
                })
            }
            const isHighlited = () => {
                /*
                  a column is highlighted if all of these terms are met:
                     1.there is no currently selected participant
                     2.the user is hovering over prize row that matches the column prize
                 */
                return state.selectedParticipant === null && state.mouseOnPrize === prizeName
            }
            const isLast = index === Object.keys(state.prizesPriorities).length - 1
            return {
                isHighlited: isHighlited(),
                prizeName,
                columnIndex: index,
                highlitedParticipants: highlitedParticipants(),
                isLast,
                priorities: prizePriorities
            }
        })
        renderReactComponent(jsxCode, "prizes-priorities-table", "PrizesPrioritiesTable", JSON.stringify(prizesPrioritiesProps))

    }

    function renderParticipantsPrioritiesTable() {
        /*
        the participantsPriorities table is a table that contains all the participants priorities.
        it is highlighted if one or more of these terms are met:
        1. the participant is currently selected
        2. the user is hovering over the matching participant button
        the prizes that are displayed in the column is highlited if this term is met: :
            1. the prize is the current match of the participant that this column represents
         */
        const jsxCode = `

        function Stam() {
            return <div></div>
        }

        function ParticipantsPrioritiesTable(props) {
            return (
                <>
                       {
                           Array.from(Object.keys(props)).map((_, index) => {
                               const {
                                   isHighlited,
                                   participantName,
                                   columnIndex,
                                   highlitedPrize,
                                   isLast,
                                   priorities
                               } = props[index]
                               const classNames = () => {
                                   let classNames = "table-column flexItemButtonsBackground"
                                   if (columnIndex === 0) {
                                       classNames += " verticalRight"
                                   } else if (isLast) {
                                       classNames += " verticalLeft"
                                   } else {
                                       classNames += " verticalBoth"
                                   }
                                   if (isHighlited) {
                                       classNames += " highlited"
                                   }
                                   return classNames
                               }
                               return (
                                   <div className={classNames()} key={columnIndex}>
                                        <div className="dButtonTop dButton" id={participantName}>{participantName}</div>
                                       {
                                           priorities.map((priority, cellIndex) => {
                                               const className = () => {
                                                   let classNames = "dButton"
                                                   if (highlitedPrize === priority) {
                                                       classNames += " dButtonMatched"
                                                   }
                                                   return classNames
                                               }
                                               return (
                                                   <div className={className()} id={participantName + "PrefSchool" + priority} key={cellIndex}>{priority}</div>
                                               )
                                           })
                                       }
                                    </div>
                               )
                           })
                       }
                 </>
            )
        }

        `
        const participantsPrioritiesTableProps = Object.keys(state.participantsPriorities).map((participantName, index) => {
            const isHighlited = () => {
                if (state.selectedParticipant !== null) {
                    return state.selectedParticipant === participantName
                } else if (state.mouseOnParticipant) {
                    return state.mouseOnParticipant === participantName
                }
            }
            const highlitedPrize = state.currentMatching[participantName] === 'none' ? null : state.currentMatching[participantName]
            const isLast = index === Object.keys(state.participantsPriorities).length - 1
            return {
                isHighlited: isHighlited(),
                participantName,
                columnIndex: index,
                priorities: state.participantsPriorities[participantName],
                highlitedPrize,
                isLast
            }
        })
        renderReactComponent(jsxCode, "participants-priorities-table", "ParticipantsPrioritiesTable", JSON.stringify(participantsPrioritiesTableProps))
    }

    function renderMiddleRow() {
        /*
        the middle row is presenting the participant that is currently Unmatched.
        if a participant is currently selected than it is being highlighted.
        */
        const jsxCode = `

        function ParticipantButton(isMatched, isSelected, participantName) {
            if (isMatched === true) return null

            function onClick() {
                if (isMatched || isSelected) return;
                store.dispatch({type: '${ACTION_TYPES.PARTICIPANT_SELECTED}', payload: participantName})
            }

            const className = isSelected ? "iButtonSelected" : "iButton"
            return (
                <div className="column" style={{flex: "1 1 auto"}}>
                        <button className={className} onClick={onClick} children={participantName}>
                        </button>
                    </div>
            )
        }

        function MiddleRow(participants) {
        var markdownText = '# Hello, *world*!\\n\\nThis is some **bold** text.\\n\\n- Item 1\\n- Item 2\\n- Item 3';
        var ReactMarkdown = window.ReactMarkdown;
            return (
                <>
                        <span>
                            <b style={{fontSize: "1.5rem"}}>Pick participants to pair →</b>
                        </span>
                    {Object.keys(participants).map((_, index) => {
                        const participantName = participants[index].participantName
                        const isMatched = participants[index].isMatched
                        if (isMatched === true) return null
                        const isSelected = participants[index].isSelected
                        const className = isSelected ? "iButtonSelected" : "iButton"
                        return (
                            <button 
                            className={className}
                            onClick={(e) => {
                                e.preventDefault()
                                store.dispatch({type: '${ACTION_TYPES.PARTICIPANT_SELECTED}', payload: participantName})
                            }} 
                            key={index}
                            >
                                {participantName}
                            </button>
                        )
                    })}
                    </>
            )
        }

        `
        const participants = Object.keys(state.participantsNumbers).map((participantName, index) => {
            const isMatched = state.currentMatching[participantName] !== 'none'
            const isSelected = state.selectedParticipant && state.selectedParticipant === participantName
            return {
                isMatched,
                isSelected,
                participantName
            }
        })
        renderReactComponent(jsxCode, "middle-row", "MiddleRow", JSON.stringify(participants))
    }

    function renderPrizesRows() {
        /*
         this component is divided to sub-rows.
         each sub-row represents a prize.
         each sub row contains :
            1. the prize name
            2. the participant that is currently matched to the prize
            3. plus button that allows to add a participant to the prize.
               (shown only if there is a selected participant).
               (shown only if the current number of participants currently matched to the prize is less than the max number of participants that can be matched to the prize)
               Onclick - dispatch plus button clicked action.
            4. onHover - dispatches onHover action.
            5. non-hoverable - if the prize is already full.
         */
        const jsxCode = `

        function Stam() {
            return <div></div>
        }

        function PrizesRows(prizesRowsProps) {
            return (
                <>
                            {Array.from(Object.keys(prizesRowsProps)).map((_, index) => {
                                return (
                                        <div 
                                            key={index}
                                            onMouseEnter={() => {
                                                store.dispatch({
                                                                 type: ACTION_TYPES.MOUSE_ENTERED_PRIZE_ROW,
                                                                 payload: prizesRowsProps[index].prizeName
                                                })
                                            }}
                                            onMouseLeave={() => {
                                                store.dispatch({
                                                                type: ACTION_TYPES.MOUSE_LEFT_PRIZE_ROW,
                                                                payload: prizesRowsProps[index].prizeName
                                                })
                                            }}
                                            > 
                                            {/* prize name */}
                                            <span>{prizesRowsProps[index].prizeName}</span>
                                            {/* participants that are currently matched to the prize */}
                                            <div className="buttons-grid">
                                                {
                                                    prizesRowsProps[index].matchedParticipants.map((participantName, index) => {
                                                        function isSelected() {
                                                            return prizesRowsProps[index].selectedParticipant === participantName
                                                        }
                                                        const className = isSelected() ? "iButtonSelected" : "iButton"
                                                        return (
                                                           <button
                                                            key={index}
                                                            onClick={(e)=>{
                                                                e.preventDefault()
                                                                store.dispatch({type:ACTION_TYPES.PARTICIPANT_SELECTED, payload: participantName})
                                                            }} 
                                                            className={className}>
                                                                 {participantName}
                                                           </button>
                                                           )
                                                    })
                                                }
                                                {/* plus button */}
                                                { prizesRowsProps[index].showPlus &&
                                                    <button 
                                                        className="pButton"
                                                        onClick={(e) => {
                                                          e.preventDefault()
                                                          store.dispatch({type:ACTION_TYPES.PLUS_BUTTON_CLICKED, payload: prizesRowsProps[index].prizeName})
                                                          store.dispatch({type:ACTION_TYPES.MOUSE_ENTERED_PRIZE_ROW, payload: prizesRowsProps[index].prizeName})  
                                                        }}
                                                    >
                                                    +
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                   )
                            })}
                        </>
            )
        }

        `
        const prizesRowsProps = Object.keys(state.prizesNames).sort().map((prizeName, index) => {
                const isFull = () => {
                    const maxParticipants = state.maxParticipantsPerPrize[prizeName]
                    const numberOfParticipantsMatched = Object.keys(state.participantsNumbers).reduce((acc, participantName) => {
                        if (state.currentMatching[participantName] === prizeName) {
                            acc++
                        }
                        return acc
                    })
                    return numberOfParticipantsMatched < maxParticipants
                }
                /* show plus button if there is a selected participant and the prize is not full */

                /* get the participants that are currently matched to the prize */
                const matchedParticipants = Object.keys(state.participantsNumbers).filter(participantName => state.currentMatching[participantName] === prizeName)
                /* sort them by participnats match memo */
                const orderedMatchedParticipants = []
                for (let i = state.participantsMatchMemo.length - 1; i >= 0; i--) {
                    const participantName = state.participantsMatchMemo[i]
                    if (matchedParticipants.includes(participantName) && !orderedMatchedParticipants.includes(participantName)) {
                        orderedMatchedParticipants.unshift(participantName)
                    }
                    if (orderedMatchedParticipants.length === matchedParticipants.length) {
                        break
                    }
                }
                const showPlus = () => {
                    if (state.selectedParticipant && !isFull() && !matchedParticipants.includes(state.selectedParticipant)) {
                        return true
                    } else {
                        return false
                    }
                }
                return {
                    prizeName,
                    showPlus: showPlus(),
                    matchedParticipants: orderedMatchedParticipants,
                    selectedParticipant: state.selectedParticipant
                }
            }
        )
        renderReactComponent(jsxCode, "prizes-rows", "PrizesRows", JSON.stringify(prizesRowsProps))
    }

    renderPrizesPrioritiesTable()
    renderParticipantsPrioritiesTable()
    renderMiddleRow()
    renderPrizesRows()
}

function renderReactComponent(jsxCode, renderAt, componentName, props) {
    const renderString = jsxCode.concat(`
        ReactDOM.render(<${componentName} {...${props}} />, document.getElementById('${renderAt}'));
        `)
    /* transpile jsx code to js code */
    const transPiledCode = Babel.transform(renderString, {
        presets: ['react'],
    }).code;
    /* evaluate the transpiled code */
    eval(transPiledCode);
}