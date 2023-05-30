let M;
let student = 0; // holds the state of currently picked prize. If no prize is picked equals 0 .
let containment; // array.each item represents participant's number of prizes.
let partial; // array. each item represents which participant was matched to the prize. if not matched equals -10.
let max_students; // array. each item represents the max number of prizes per participant.
const alphabet = Array.from(Array(js_vars.schools_number)).map((e, i) => i + 65).map((x) => String.fromCharCode(x)); // array of alphabetical letters. length is the number of schools.
let stage = 1; // the stage of the mechanism we are at
let prizeMatchedHistory = []; // array. each item represents a prize that was matched to a participant. the purpose is to save the order in which the prizes were matched.
let student_dict = {'A': 1, 'B': 2, 'C': 3, 'D': 4,}
let schools_dict = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5}
var bonus_flag = true;
var bonus = 0

var mistakes_counter = 0;

var modal = document.getElementById("GenModal"); // Get the modal
var btn = document.getElementById("GenBtn"); // Get the button that opens the modal
var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

var currQuestionIncorrectAnswers = [];

btn.onclick = function() {modal.style.display = "block";} // When the user clicks the button, open the modal
span.onclick = function() {modal.style.display = "none";}// When the user clicks on <span> (x), close the modal
window.onclick = function(event) {if (event.target == modal) {modal.style.display = "none";}}// When the user clicks anywhere outside of the modal, close it

window.onload = function () {
    containment = js_vars.matched_number;
    partial = js_vars.partialmatching;
    max_students = js_vars.max_students_per_school;
    /* set initialState */
    initialState = {
        'containment': containment,
        'partial': partial,
        'student': student,
    }
    updatePrizeMatchedHistory(clicks)
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
    $("#step-18").hide();
    $("#step-19").hide();
    $("#step-20").hide();
    $("#step-21").hide();
    $("#step-22").hide();
    $(".correct-msg").hide();
    $(".incorrect-msg").hide();
    $("#last").hide();

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
        liveSend({'information_type':'training_rounds','matching':partial})
    });

    $("#proceed-step-4-btn-rounds").click(function () {
        a = forminputs['prize_a_obtainable'].value;
        b = forminputs['prize_b_obtainable'].value;
        c = forminputs['prize_c_obtainable'].value;
        d = forminputs['prize_d_obtainable'].value;
        if (a != js_vars.correct_answers[0] || b != js_vars.correct_answers[1] || c != js_vars.correct_answers[2] || d != js_vars.correct_answers[3]) {
            $("#step-3-rounds .incorrect-msg").show();
        } else {
            $("#step-3-rounds .incorrect-msg").hide();
            $("#step-3-rounds .correct-msg").show();
             setTimeout(() => {
                 $("#step-3-rounds").hide();
                $("#step-4-rounds").toggle();
            }, 2000);
        }
    });

    $("#proceed-step-5-btn-rounds").click(function () {
        answer = forminputs['obtainable_prize'].value;
        if (answer != js_vars.correct_answers[4]){
            $("#step-4-rounds .incorrect-msg").show();
        } else  {
            $("#step-4-rounds .incorrect-msg").hide();
            $("#step-4-rounds .correct-msg").show();
             setTimeout(() => {
                    $("#step-4-rounds .btn-container").hide();
                    $("#step-5-rounds").show();
            }, 2000);
        }
    });

     $("#proceed-step-6-btn-rounds").click(function () {
        document.getElementById("form").submit();
    });


    $("#proceed-step-4-btn").click(function () {
        liveSend({'information_type':'matching_update','matching':partial,'stage':stage})
    });

    $("#proceed-step-5-btn").click(function () {
        liveSend({'information_type':'matching_update','matching':partial,'stage':stage})
    });

    $("#proceed-step-6-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_1";
        var formInputName = "question_1";
        if (forminputs[formInputName].value != js_vars.correct_answers[0]){
            $("#step-5 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        $("#step-5 .incorrect-msg").hide();
        $("#step-5 .correct-msg").show();
        setTimeout(() => {
             $("#step-5").hide();
            $("#step-6").toggle();
        }, 5000);

    });

    $("#proceed-step-7-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_2";
        var formInputName = "question_2";
        if (forminputs[formInputName].value != js_vars.correct_answers[1]){
            $("#step-6 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        $("#step-6 .incorrect-msg").hide();
        $("#step-6 .correct-msg").show();
        setTimeout(() => {
             $("#step-6").hide();
            $("#step-7").toggle();
        }, 5000);
    });

    $("#proceed-step-8-btn").click(function () {
        liveSend({'information_type':'matching_update','matching':partial,'stage':stage})
    });
    $("#proceed-step-9-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_3";
        var formInputName = "question_3";
        if (forminputs[formInputName].value != js_vars.correct_answers[2]){
            $("#step-8 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        $("#step-8 .incorrect-msg").hide();
        $("#step-8 .correct-msg").show();
        setTimeout(() => {
             $("#step-8").hide();
            $("#step-9").toggle();
        }, 5000);
    });
    $("#proceed-step-10-btn").click(function () {
        liveSend({'information_type':'matching_update','matching':partial,'stage':stage})
    });

    $("#proceed-step-11-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_4";
        var formInputName = "question_4";
        if (forminputs[formInputName].value != js_vars.correct_answers[3]){
            $("#step-10 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        $("#step-10 .incorrect-msg").hide();
        $("#step-10 .correct-msg").show();
        setTimeout(() => {
             $("#step-10").hide();
            $("#step-11").toggle();
        }, 5000);
    });

    $("#proceed-step-12-btn").click(function () {
        liveSend({'information_type':'matching_update','matching':partial,'stage':stage})
    });

    $("#proceed-step-13-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_5";
        var formInputName = "question_5";
        if (forminputs[formInputName].value != js_vars.correct_answers[4]){
            $("#step-12 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        $("#step-12 .incorrect-msg").hide();
        $("#step-12 .correct-msg").show();
        setTimeout(() => {
             $("#step-12").hide();
            $("#step-13").toggle();
        }, 5000);
    });

    $("#proceed-step-14-btn").click(function () {
        liveSend({'information_type':'matching_update','matching':partial,'stage':stage})
    });

    $("#proceed-step-15-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_6";
        var formInputName = "question_6";
        if (forminputs[formInputName].value != js_vars.correct_answers[5]){
            $("#step-12 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        $("#step-14 .incorrect-msg").hide();
        $("#step-14 .correct-msg").show();
        setTimeout(() => {
             $("#step-14").hide();
            $("#step-15").toggle();
        }, 5000);
    });

    $("#proceed-step-16-btn").click(function () {
        liveSend({'information_type':'matching_update','matching':partial,'stage':stage})
    });

    $("#proceed-step-17-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_7";
        var formInputName = "question_7";
        if (forminputs[formInputName].value != js_vars.correct_answers[6]){
            $("#step-16 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        $("#step-16 .incorrect-msg").hide();
        $("#step-16 .correct-msg").show();
        setTimeout(() => {
             $("#step-16").hide();
            $("#step-17").toggle();
        }, 5000);
    });

    $("#proceed-step-18-btn").click(function () {
        var incorrectSequenceFieldName = "incorrect_seq_question_8";
        var formInputName = "question_8";
        if (forminputs[formInputName].value != js_vars.correct_answers[7]){
            $("#step-16 .incorrect-msg").show();
            currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
            return;
        }
        forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
        currQuestionIncorrectAnswers = [];
        $("#step-17 .incorrect-msg").hide();
        $("#step-17 .correct-msg").show();
        setTimeout(() => {
             $("#step-17").hide();
            $("#step-18").toggle();
        }, 5000);
    });

    $("#prize-a-btn").click(function () {
        var formInputName = "prize_a_obtainable";
        if (forminputs[formInputName].value != js_vars.correct_answers[8]){
            $("#step-18 .incorrect-msg").show();
            return;
        }
        $("#prize-a-btn").hide();
        $("#step-18 .incorrect-msg").hide();
        $("#step-18 .correct-msg").show();
        setTimeout(() => {
            $("#step-19").toggle();
        }, 1000);

    });

    $("#prize-b-btn").click(function () {
        var formInputName = "prize_b_obtainable";
        if (forminputs[formInputName].value != js_vars.correct_answers[9]){
            $("#step-19 .incorrect-msg").show();
            return;
        }
        $("#prize-b-btn").hide();
        $("#step-19 .incorrect-msg").hide();
        $("#step-19 .correct-msg").show();
        setTimeout(() => {
            $("#step-20").toggle();
        }, 1000);

    });

    $("#prize-c-btn").click(function () {
        var formInputName = "prize_c_obtainable";
        if (forminputs[formInputName].value != js_vars.correct_answers[10]){
            $("#step-20 .incorrect-msg").show();
            return;
        }
        $("#prize-c-btn").hide();
        $("#step-20 .incorrect-msg").hide();
        $("#step-20 .correct-msg").show();
        setTimeout(() => {
            $("#step-21").toggle();
        }, 1000);

    });

    $("#prize-d-btn").click(function () {
        var formInputName = "prize_d_obtainable";
        if (forminputs[formInputName].value != js_vars.correct_answers[11]){
            $("#step-21 .incorrect-msg").show();
        }
        $("#prize-d-btn").hide();
        $("#step-21 .incorrect-msg").hide();
        $("#step-21 .correct-msg").show();
        setTimeout(() => {
            $("#step-18").hide();
            $("#step-19").hide();
            $("#step-20").hide();
            $("#step-21").hide();
            $("#step-22").toggle();
        }, 2000);

    });

    $("#prize_question").click(function () {
        var formInputName = "question_prize";
        if (forminputs[formInputName].value != js_vars.correct_answers[12]){
            $("#step-22 .incorrect-msg").show();
            return;
        }
        $("#step-22 .incorrect-msg").hide();
        $("#step-22 .correct-msg").show();
        setTimeout(() => {
            $("#step-22").hide();
            $("#last").toggle();
        }, 1000);

    });


    $("#submit-page").click(function () {
        document.getElementById("form").submit();
    });
    /* reset button event listener */
    resetButton = document.getElementById("reset-button");
    if (resetButton) {
        resetButton.addEventListener("click", onReset)
    }
    /* plus Button hover event listener */
    $(".pButton").hover(function () {
        /* on hover should trigger highlight on the matching participant column in participants table  */
        /* get the participant number */
        const participantNumber = $(this).attr("value");
        /* get the participant column */
        const participantColumn = document.getElementById(`SchoolBackground${participantNumber}`);
        /* highlight the column */
        if (!participantColumn) return
        participantColumn.classList.add("flexItemButtonsBackgroundSelected");
    })
    /* plus button unhover event listener */
    $(".pButton").mouseleave(function () {
        /* on mouse leave should trigger unhighlight on the matching participant column in participants table  */
        /* get the participant number */
        const participantNumber = $(this).attr("value");
        /* get the participant column */
        const participantColumn = document.getElementById(`SchoolBackground${participantNumber}`);
        /* unhighlight the column */
        if (participantColumn) {
            participantColumn.classList.remove("flexItemButtonsBackgroundSelected");
        }
    })

    /*
     prize button hover event listener
     when hovering over prize should check if any of the prizes buttons is selected
     if so, do nothing
     if not, highlight the matching prize column
     */
    $('[id^=ButtonStudent]').mouseenter(function () {
        /* check if any prize is currently selected, if not continue */
        if (student) return
        /* get the prize number */
        const prizeNumber = $(this).attr("value");
        /* get the prize column */
        const prizeColumn = document.getElementById(`StudentBackground${prizeNumber}`);
        /* highlight the column */
        prizeColumn.classList.add("flexItemButtonsBackgroundSelected");
    })

    /*
        prize button unhover event listener
        when unhovering over prize should check if any of the prizes is selected
        if so, do nothing
        if not, unhighlight the matching prize column
     */
    $('[id^=ButtonStudent]').mouseleave(function () {
        /* check if any prize is currently selected, if not continue */
        if (student) return
        /* get the prize number */
        const prizeNumber = $(this).attr("value");
        /* get the prize column */
        const prizeColumn = document.getElementById(`StudentBackground${prizeNumber}`);
        /* unhighlight the column */
        prizeColumn.classList.remove("flexItemButtonsBackgroundSelected");
    })

    $('.flexItemStudentButton').mouseenter(function () {
        if (student) return
        /* get the prize number */
        const prizeAlphabetical = $(this).text().trim();
        /* convert alphabetical value to numerical value */
        const prizeNumber = student_dict[prizeAlphabetical];
        /* get the prize column */
        const prizeColumn = document.getElementById(`StudentBackground${prizeNumber}`);
        if (!prizeColumn) return
        /* highlight the column */
        prizeColumn.classList.add("flexItemButtonsBackgroundSelected");
    })
    $('.flexItemStudentButton').mouseleave(function () {
        if (student) return
        /* get the prize number */
        const prizeAlphabetical = $(this).text().trim();
        /* convert alphabetical value to numerical value */
        const prizeNumber = student_dict[prizeAlphabetical];
        /* get the prize column */
        const prizeColumn = document.getElementById(`StudentBackground${prizeNumber}`);
        /* highlight the column */
        if (!prizeColumn) return
        prizeColumn.classList.remove("flexItemButtonsBackgroundSelected");
    })
}

window.addEventListener('DOMContentLoaded', (event) => {
    containment = js_vars.matched_number;
    partial = js_vars.partialmatching;
    max_students = js_vars.max_students_per_school;
    clicks = js_vars.initial_clicks
    updatePrizeMatchedHistory(clicks)
    updateCurrentMatching();
    let d = new Date();
    M = d.getTime();
    liveSend({'information_type': 'onload', 'time': JSON.stringify(M),});
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
            liveSend({'information_type': 'student_button', 'student': '1',});
        } else {
            liveSend({'information_type': 'rematch_button', 'school': partial[0], 'student': '1',});
        }
        liveSend({'information_type': 'school_plus_button', 'school': matching[0], 'student': '1',});
    } else {
        liveSend({'information_type': 'student_button', 'student': '1',});
        liveSend({'information_type': 'student_button', 'student': '1',});
    }
    if (matching[1] != -10) {
        if (partial[1] == -10) {
            liveSend({'information_type': 'student_button', 'student': '2',});
        } else {
            liveSend({'information_type': 'rematch_button', 'school': partial[1], 'student': '2',});
        }
        liveSend({'information_type': 'school_plus_button', 'school': matching[1], 'student': '2',});
    } else {
        liveSend({'information_type': 'student_button', 'student': '2',});
        liveSend({'information_type': 'student_button', 'student': '2',});
    }
    if (matching[2] != -10) {
        if (partial[2] == -10) {
            liveSend({'information_type': 'student_button', 'student': '3',});
        } else {
            liveSend({'information_type': 'rematch_button', 'school': partial[2], 'student': '3',});
        }
        liveSend({'information_type': 'school_plus_button', 'school': matching[2], 'student': '3',});
    } else {
        liveSend({'information_type': 'student_button', 'student': '3',});
        liveSend({'information_type': 'student_button', 'student': '3',});
    }
    if (matching[3] != -10) {
        if (partial[3] == -10) {
            liveSend({'information_type': 'student_button', 'student': '4',});
        } else {
            liveSend({'information_type': 'rematch_button', 'school': partial[3], 'student': '4',});
        }
        liveSend({'information_type': 'school_plus_button', 'school': matching[3], 'student': '4',});
    } else {
        liveSend({'information_type': 'student_button', 'student': '4',});
        liveSend({'information_type': 'student_button', 'student': '4',});
    }
}

function matchStudent(val) {
    liveSend({'information_type': 'student_button', 'student': val,});
}

function matchToSchool(val) {
    liveSend({'information_type': 'school_plus_button', 'school': val, 'student': student,});
}

function rematchStudent(val, text) {
    liveSend({'information_type': 'rematch_button', 'school': schools_dict[val], 'student': student_dict[text],});
}

function updateCurrentMatching() {
    /* iterate over prizes */
    for (let j = 1; j <= js_vars.students_number; j++) {
        /* check if the prize is currently selected */
        if (j === parseInt(student)) {
            document.getElementById('StudentBackground'.concat(j)).className = 'flexItemButtonsBackgroundSelected';
            if (partial[j - 1] > 0) {
                document.getElementById('ButtonStudent'.concat(j)).className = 'pButton';
                document.getElementById('ButtonStudent'.concat(j)).disabled = false;
                document.getElementById('School'.concat(alphabet[partial[j - 1] - 1], 'MatchedToStudent', student, 'Button')).className = 'iButtonSelected';
            } else {
                document.getElementById('ButtonStudent'.concat(student)).className = 'iButtonSelected';
                document.getElementById('ButtonStudent'.concat(j)).disabled = false;
            }
        } else { // no student button is selected.
            document.getElementById('StudentBackground'.concat(j)).className = 'flexItemButtonsBackground';
            if (partial[j - 1] > 0) {
                document.getElementById('ButtonStudent'.concat(j)).className = 'offButton';
                document.getElementById('ButtonStudent'.concat(j)).disabled = true;
            } else {
                document.getElementById('ButtonStudent'.concat(j)).className = 'iButton';
                document.getElementById('ButtonStudent'.concat(j)).disabled = false;
            }
        }
    }
    for (let i = 0; i < js_vars.schools_number; i++) {
        /* iterate over participants */
        document.getElementById('plusButtonSchool'.concat(alphabet[i])).style.display = 'none';
        const unorderedPrizesMatchedToParticipant = [];
        for (let l = 1; l <= js_vars.students_number; l++) {
            /* iterate over prizes */
            document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l, 'Button')).className = 'iButton';
            if (partial[l - 1] === i + 1) {
                unorderedPrizesMatchedToParticipant.push(l);
            } else {
                document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l)).style.order = '30';
                document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l)).style.display = 'none';
                const participantPriority = document.getElementById('School'.concat(alphabet[i], 'PrefStudent', l))
                if (participantPriority) {
                    participantPriority.className = 'dButton';
                }
                const plusButtonElement = document.getElementById('Student'.concat(l, 'PrefSchool', alphabet[i]))
                if (plusButtonElement) {
                    plusButtonElement.className = 'dButton';
                }
            }
        }
        /* sort the prizes matched to the participant */
        const orderedPrizesMatchedToParticipant = []
        for (let index = prizeMatchedHistory.length - 1; index >= 0; index--) {
            if (unorderedPrizesMatchedToParticipant.includes(parseInt(prizeMatchedHistory[index]))) {
                orderedPrizesMatchedToParticipant.unshift(prizeMatchedHistory[index]);
            }
        }
        /* iterate over the ordered prizes matched to the participant */
        orderedPrizesMatchedToParticipant.forEach((matchedPrize, index) => {
            document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', matchedPrize)).style.order = index;
            document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', matchedPrize)).style.display = 'inline-block';
            const plusButtonElement = document.getElementById('Student'.concat(matchedPrize, 'PrefSchool', alphabet[i]))
            if (plusButtonElement) {
                plusButtonElement.className = 'dButtonMatched';
            }
            const schoolButtonElement = document.getElementById('School'.concat(alphabet[i], 'PrefStudent', matchedPrize))
            if (schoolButtonElement) {
                schoolButtonElement.classList.add('dButtonMatched')
            }
        })
    }
}

function openPlus() {
    for (let participantNumber = 0; participantNumber < js_vars.schools_number; participantNumber++) {
        /* check if the chosen prize was already matched to the participant */
        if (partial[student - 1] === participantNumber + 1) continue;
        /* check if the current participant passed the max prizes allowed */
        if (max_students[participantNumber] === 0) continue;
        if (containment[participantNumber] >= max_students[participantNumber]) continue;
        /* display the plus button */
        document.getElementById('plusButtonSchool'.concat(alphabet[participantNumber])).style.display = 'inline-block';
    }
}

function liveRecv(data) {
    console.log(data)
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
        /* update the prize matched history */
        clicks = data.clicks
        updatePrizeMatchedHistory(clicks)
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
            if (data['status']){
                mistakes_counter = 0;
                if (stage == 1){
                    $("#step-3 .incorrect-msg").hide();
                    $("#step-3 .correct-msg").show();
                    setTimeout(() => {
                         $("#step-3").hide();
                        $("#step-4").toggle();
                    }, 2000);
                }
                if (stage == 2){
                    $("#step-4 .incorrect-msg").hide();
                    $("#step-4 .correct-msg").show();
                    setTimeout(() => {
                         $("#step-4").hide();
                        $("#step-5").toggle();
                    }, 2000);
                }
                if (stage == 3){
                    $("#step-7 .incorrect-msg").hide();
                    $("#step-7 .correct-msg").show();
                    setTimeout(() => {
                         $("#step-7").hide();
                        $("#step-8").toggle();
                    }, 2000);
                }
                if (stage == 4){
                    $("#step-9 .incorrect-msg").hide();
                    $("#step-9 .correct-msg").show();
                    setTimeout(() => {
                         $("#step-9").hide();
                        $("#step-10").toggle();
                    }, 2000);
                }
                if (stage == 5){
                    $("#step-11 .incorrect-msg").hide();
                    $("#step-11 .correct-msg").show();
                    setTimeout(() => {
                         $("#step-11").hide();
                        $("#step-12").toggle();
                    }, 2000);
                }
                if (stage == 6){
                    $("#step-13 .incorrect-msg").hide();
                    $("#step-13 .correct-msg").show();
                    setTimeout(() => {
                         $("#step-13").hide();
                        $("#step-14").toggle();
                    }, 2000);
                }
                if (stage == 7){
                    $("#step-15 .incorrect-msg").hide();
                    $("#step-15 .correct-msg").show();
                    setTimeout(() => {
                         $("#step-15").hide();
                        $("#step-16").toggle();
                    }, 2000);
                }
                stage = stage + 1;
            } else {
                if (stage == 1){
                    mistakes_counter = mistakes_counter + 1;
                    if (mistakes_counter < 3){
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
                if (stage == 2){
                    mistakes_counter = mistakes_counter + 1;
                    if (mistakes_counter < 3){
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
                if (stage == 3){
                    if (mistakes_counter < 3){
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
                if (stage == 4){
                    if (mistakes_counter < 3){
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
                if (stage == 5){
                    if (mistakes_counter < 3){
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
                if (stage == 6){
                    if (mistakes_counter < 3){
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
                if (stage == 7){
                    if (mistakes_counter < 3){
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
                        return;
                    }
                }
            }
        } else {
            if (data['status']){
                $("#step-2-rounds .incorrect-msg").hide();
                $("#step-2-rounds .correct-msg").show();
                setTimeout(() => {
                        $("#step-1-rounds").hide();
                        $("#step-2-rounds").hide();
                        $("#step-3-rounds").toggle();
                    }, 2000);
            } else {
                $("#step-2-rounds .incorrect-msg").show();
            }
        }
    } else if (data['information_type'] === 'submit') {
        document.getElementById('form').submit();
    } else if (data['information_type'] === 'reset') {
        partial = initialState.partial
        containment = initialState.containment
        student = initialState.student
        updatePrizeMatchedHistory(clicks)
        updateCurrentMatching();
    }
}

function confirmStage() {
    liveSend({'information_type': 'matching_update', 'matching': partial, 'stage': stage})
}

function onReset(e) {
    e.preventDefault()
    e.stopPropagation()
    liveSend({'information_type': 'reset_button'})
}

function updatePrizeMatchedHistory(clicks) {
    const regex = /\b\d:\d/g;
    const clicksFromLastReset = clicks.slice(clicks.lastIndexOf('reset') + 5)
    const matchingStrings = clicksFromLastReset.match(regex);
    if (matchingStrings) {
        const prizes = matchingStrings.map(matchingString => matchingString[0])
        prizeMatchedHistory = prizes
    }
}