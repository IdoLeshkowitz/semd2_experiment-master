console.log(js_vars)
const initialState = {
    'selectedParticipant': null,
    "currentMatching": js_vars.currentMatching,
    'maxParticipantsPerPrize': js_vars.maxParticipantsPerPrize,
    'participantsPriorities': js_vars.participantsPriorities,
    'prizesPriorities': js_vars.prizesPriorities,
    'currentStep': js_vars.currentStep,
    'currentStage': js_vars.currentStage,
    'currentRound': js_vars.currentRound,
    'mistakesCounter': 0
}
const ACTION_TYPES = {
    START_STEP: 'START_STEP',
    END_STEP: 'END_STEP',
    PARTICIPANT_SELECTED: 'PARTICIPANT_SELECTED',
    PLUS_BUTTON_CLICKED: 'PLUS_BUTTON_CLICKED',
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
        formFields: {element: "question_33", correctAnswerIndex: 2},
    },
    {
        id: "step-9",
        type: 'matching',
        stage: 3,
    },
    {
        id: "step-10",
        type: "radio",
        formFields: {element: "question_44", correctAnswerIndex: 3},
    },
    {
        id: "step-11",
        type: "matching",
        stage: 4,
    },
    {
        id: "step-12",
        type: "radio",
        formFields: {element: "question5", correctAnswerIndex: 4},
    },
    {
        id: "step-13",
        type: "matching",
        stage: 5,
    },
    {
        id: "step-14",
        type: "radio",
        formFields: {element: "question6", correctAnswerIndex: 5},
    },
    {
        id: "step-15",
        type: "matching",
        stage: 6,
    },
    {
        id: "step-16",
        type: "radio",
        formFields: {element: "question7", correctAnswerIndex: 6},
    },
    {
        id: "step-17",
        type: "matching",
        stage: 7,
    },
    {
        id: "step-18",
        type: "radio",
        formFields: {element: "prize_a_obtainable", correctAnswerIndex: 7},
    },
    {
        id: "step-19",
        type: "radio",
        formFields: {element: "prize_b_obtainable", correctAnswerIndex: 8},
    },
    {
        id: "step-20",
        type: "radio",
        formFields: {element: "prize_c_obtainable", correctAnswerIndex: 9},
    },
    {
        id: "step-21",
        type: "radio",
        formFields: {element: "prize_d_obtainable", correctAnswerIndex: 10},
    },
    {
        id: "step-22",
        type: "radio",
        formFields: {element: "question_prize", correctAnswerIndex: 11},
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
        type: "instructions",
    }
]

function reducer(state = initialState, action) {
    console.log("reducer", action)
    if (action.type === ACTION_TYPES.START_STEP) {
        return state
    }
    if (action.type === ACTION_TYPES.PLUS_BUTTON_CLICKED) {
        /*
        when user clicks plus button do the following :
            state changes:
                1. update currentMatching set the value of the participant to the prize that he was matched with
                2. livesend currentMatching to the server
                3. reset selectedParticipant to null
                4. side effect:
                    1. remove iButtonSelected class from last selected participant button
                    2. hide plus buttons
         */
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
        /* remove iButtonSelected class from last selected participant button */
        const lastSelectedParticipantButton = document.getElementById(`participant${state.selectedParticipant}Button`)
        lastSelectedParticipantButton?.classList.remove("iButtonSelected")
        /* set selectedParticipant to the participant that was clicked */
        const selectedParticipantButton = document.getElementById(`participant${selectedParticipant}Button`)
        selectedParticipantButton?.classList.add("iButtonSelected")
        /* show plus buttons */
        const plusButtons = Array.from(document.querySelectorAll("[id^='plusButton']"))
        plusButtons.forEach(button => button.style.display = "inline-block")
        return {...state, selectedParticipant}
    }
    return state
}

const delay = 1000;
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
    /* render prizes priorities table */
    renderPrizesPrioritiesTable(initialState.prizesPriorities);
    renderParticipantsPrioritiesTable(initialState.participantsPriorities)
    updateCurrentMatching();
    /* initialize live server */
    liveSend({'information_type': 'onload', 'time': Date.now()})

    store = Redux.createStore(reducer);
    /*
        this action is dispatched each time that the page is loaded
        if the server is sending the current step, then the page is reloaded. start the step that the server is sending
        if the server is not sending the current step, then the page is loaded for the first time. start the first step
        */
    let stepToBeStarted;
    if (store.getState().currentStep) {
        stepToBeStarted = store.getState().currentStep
    } else {
        const currentRoundSteps = getStepsByRound(store.getState().currentRound)
        stepToBeStarted = currentRoundSteps[0]
    }
    store.dispatch({type: ACTION_TYPES.START_STEP, step: stepToBeStarted})
    const jsx = `
     const MyComponent = () => {
    return <div>Hello, React!</div>;
  };
`;

    renderReactComponent(jsx,"react-root","MyComponent")
});

function submitButton() {
    $('#finishModal').modal('show');
}

function dismissFinishModal() {
    $('#finishModal').modal('hide');
}

function confirmSubmission() {
    let d = new Date();
    M = d.getTime();
    liveSend({'information_type': 'submission', 'time': JSON.stringify(M),});
}

function updateMatching(matching) {
    if (matching[0] != -10) {
        if (partial[0] == -10) {
            liveSend({'information_type': 'match_participant', 'student': '1',});
        } else {
            liveSend({'information_type': 'rematch_participant', 'school': partial[0], 'student': '1',});
        }
        liveSend({'information_type': 'school_plus_button', 'school': matching[0], 'student': '1',});
    } else {
        liveSend({'information_type': 'match_participant', 'student': '1',});
        liveSend({'information_type': 'match_participant', 'student': '1',});
    }
    if (matching[1] != -10) {
        if (partial[01] == -10) {
            liveSend({'information_type': 'match_participant', 'student': '2',});
        } else {
            liveSend({'information_type': 'rematch_participant', 'school': partial[1], 'student': '2',});
        }
        liveSend({'information_type': 'school_plus_button', 'school': matching[1], 'student': '2',});
    } else {
        liveSend({'information_type': 'match_participant', 'student': '2',});
        liveSend({'information_type': 'match_participant', 'student': '2',});
    }
    if (matching[2] != -10) {
        if (partial[2] == -10) {
            liveSend({'information_type': 'match_participant', 'student': '3',});
        } else {
            liveSend({'information_type': 'rematch_participant', 'school': partial[2], 'student': '3',});
        }
        liveSend({'information_type': 'school_plus_button', 'school': matching[2], 'student': '3',});
    } else {
        liveSend({'information_type': 'match_participant', 'student': '3',});
        liveSend({'information_type': 'match_participant', 'student': '3',});
    }
    if (matching[3] != -10) {
        if (partial[3] == -10) {
            liveSend({'information_type': 'match_participant', 'student': '4',});
        } else {
            liveSend({'information_type': 'rematch_participant', 'school': partial[3], 'student': '4',});
        }
        liveSend({'information_type': 'school_plus_button', 'school': matching[3], 'student': '4',});
    } else {
        liveSend({'information_type': 'match_participant', 'student': '4',});
        liveSend({'information_type': 'match_participant', 'student': '4',});
    }
}

function matchStudent(val) {
    liveSend({'information_type': 'match_participant', 'student': val,});
}

function matchToSchool(val) {
    liveSend({'information_type': 'school_plus_button', 'school': val, 'student': student,});
}

function rematchStudent(val, text) {
    liveSend({'information_type': 'rematch_participant', 'school': schools_dict[val], 'student': student_dict[text],});
}

function updateCurrentMatching() {
//     for (let j = 1; j <= js_vars.students_number; j++) {
//         if (j === parseInt(student)) { // a student's button is selected
//             document.getElementById('StudentBackground'.concat(j)).className = 'flexItemButtonsBackgroundSelected';
//             if (partial[j - 1] > 0) {
//                 document.getElementById('ButtonStudent'.concat(j)).className = 'pButton';
//                 document.getElementById('ButtonStudent'.concat(j)).disabled = false;
//                 document.getElementById('School'.concat(alphabet[partial[j - 1] - 1], 'MatchedToStudent', student, 'Button')).className = 'iButtonSelected';
//             } else {
//                 document.getElementById('ButtonStudent'.concat(student)).className = 'iButtonSelected';
//                 document.getElementById('ButtonStudent'.concat(j)).disabled = false;
//             }
//         } else { // no student button is selected.
//             document.getElementById('StudentBackground'.concat(j)).className = 'flexItemButtonsBackground';
//             if (partial[j - 1] > 0) {
//                 document.getElementById('ButtonStudent'.concat(j)).className = 'offButton';
//                 document.getElementById('ButtonStudent'.concat(j)).disabled = true;
//             } else {
//                 document.getElementById('ButtonStudent'.concat(j)).className = 'iButton';
//                 document.getElementById('ButtonStudent'.concat(j)).disabled = false;
//             }
//         }
//     }
//     for (let i = 0; i < js_vars.schools_number; i++) {
//         document.getElementById('plusButtonSchool'.concat(alphabet[i])).style.display = 'none';
//         for (let l = 1; l <= js_vars.students_number; l++) {
//             document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l, 'Button')).className = 'iButton';
//             if (partial[l - 1] === i + 1) {
//                 document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l)).style.order = containment[i];
//                 document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l)).style.display = 'inline-block';
//                 document.getElementById('Student'.concat(l, 'PrefSchool', alphabet[i])).className = 'dButtonMatched';
//                 document.getElementById('School'.concat(alphabet[i], 'PrefStudent', l)).className = 'dButtonMatched';
//             } else {
//                 document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l)).style.order = '30';
//                 document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l)).style.display = 'none';
//                 document.getElementById('Student'.concat(l, 'PrefSchool', alphabet[i])).className = 'dButton';
//                 document.getElementById('School'.concat(alphabet[i], 'PrefStudent', l)).className = 'dButton';
//             }
//         }
//     }
}

function openPlus() {
    for (let i = 0; i < js_vars.schools_number; i++) {
        if (i + 1 !== partial[student - 1] && containment[i] < max_students[i]) {
            document.getElementById('plusButtonSchool'.concat(alphabet[i])).style.display = 'inline-block'; // Display plus button in the lines where the student is not already matched to, and for schools which didn't attain their quotas yet..
        }
    }
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

function confirmStage() {
    liveSend({'information_type': 'matching_submission', 'matching': partial, 'stage': stage})
}


function renderPrizesPrioritiesTable(prizesPriorities) {
    function createColumnsCollection() {
        /*
         Create column for each prize priorities
         The top row of each column represents the prize name which is the key of the prizePriorities object
         The rest of the column represents the priorities of the prize which is the value of the prizePriorities object
          */
        const columns = Object.keys(prizesPriorities).map((prizeName, index) => {
            const columnElement = document.createElement("div")
            columnElement.classList.add("flexItemButtonsBackground")
            columnElement.id = (`SchoolsBackground${index}`)
            columnElement.classList.add("table-column")
            /* if first column add class verticalRight */
            if (index === 0) {
                columnElement.classList.add("verticalRight")
            }
            /* if last column add class verticalLeft */
            else if (index === Object.keys(prizesPriorities).length - 1) {
                columnElement.classList.add("verticalLeft")
            }
            /* else add class verticalBoth */
            else {
                columnElement.classList.add("verticalBoth")
            }

            /*
            create the upper row of the column which represents the prize name
            */
            const prizeNameElement = document.createElement("div")
            prizeNameElement.classList.add("dButtonTop")
            prizeNameElement.classList.add("dButton")
            prizeNameElement.id = `School${prizeName}`
            prizeNameElement.innerText = prizeName
            columnElement.appendChild(prizeNameElement)
            /*
            create the rest of the column which represents the priorities of the prize
             */
            prizesPriorities[prizeName].forEach((priority, index) => {
                const priorityElement = document.createElement("div")
                priorityElement.id = `School${prizeName}PrefSchool${priority}`
                priorityElement.innerText = priority
                columnElement.appendChild(priorityElement)
            })
            return columnElement
        })
        return columns
    }

    const columns = createColumnsCollection()
    const tableElement = document.getElementById("prizes-priorities-table-container")
    columns.forEach(column => {
        tableElement.appendChild(column)
    })
}

function renderParticipantsPrioritiesTable(participantsPriorities) {
    function createColumnsCollection() {
        /*
         Create column for each participant priorities
         The top row of each column represents the participant name which is the key of the participantPriorities object
         The rest of the column represents the priorities of the participant which is the value of the participantPriorities object
          */
        const columns = Object.keys(participantsPriorities).map((participantName, index) => {
            const columnElement = document.createElement("div")
            columnElement.classList.add("flexItemButtonsBackground")
            columnElement.id = (`SchoolsBackground${index}`)
            columnElement.classList.add("table-column")
            /* if first column add class verticalRight */
            if (index === 0) {
                columnElement.classList.add("verticalRight")
            }
            /* if last column add class verticalLeft */
            else if (index === Object.keys(participantsPriorities).length - 1) {
                columnElement.classList.add("verticalLeft")
            }
            /* else add class verticalBoth */
            else {
                columnElement.classList.add("verticalBoth")
            }

            /*
            create the upper row of the column which represents the participant name
            */
            const participantNameElement = document.createElement("div")
            participantNameElement.classList.add("dButtonTop")
            participantNameElement.classList.add("dButton")
            participantNameElement.id = `School${participantName}`
            participantNameElement.innerText = participantName
            columnElement.appendChild(participantNameElement)
            /*
            create the rest of the column which represents the priorities of the participant
             */
            participantsPriorities[participantName].forEach((priority, index) => {
                const priorityElement = document.createElement("div")
                priorityElement.id = `School${participantName}PrefSchool${priority}`
                priorityElement.innerText = priority
                columnElement.appendChild(priorityElement)
            })
            return columnElement
        })
        return columns
    }

    const columns = createColumnsCollection()
    const tableElement = document.getElementById("participants-priorities-table")
    columns.forEach(column => {
        tableElement.appendChild(column)
    })
}


function getStepsByRound(round) {
    if (round === 1) {
        return steps.filter(step => !step.id.includes("rounds"))
    } else {
        return steps.filter(step => step.id.includes("rounds"))
    }
}


function renderUiFromState(state) {
    function renderMiddleRow() {
        /*
        the middle row is presenting the participant that is currently Unmatched.
        if a participant is currently selected than it is being highlighted.
        */
        const middleRowElement = document.getElementById("middle-row")
        const allParticipants = Object.keys(state.currentMatching)
        const unmatchedParticipants = allParticipants.filter(participant => state.currentMatching[participant] === -10)
        unmatchedParticipants.forEach(participant => {
            /* check if the participant is currently selected */
            const isSelected = state.selectedParticipant === participant
            const participantButtonContainer = document.createElement("div").classList.add("column")
        })
    }
}

function renderReactComponent(jsxCode,renderAt,componentName,props) {
    const renderString = jsxCode.concat(`ReactDOM.render(<${componentName} {...${props}} />, document.getElementById('${renderAt}'));`)
    /* transpile jsx code to js code */
    const transPiledCode = Babel.transform(renderString, {
        presets: ['react'],
    }).code;
    /* evaluate the transpiled code */
    eval(transPiledCode);
}