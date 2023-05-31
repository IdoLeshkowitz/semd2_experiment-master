var M;
var student = 0; // Very important variable ! Equals the number of the student if selected. Otherwise equyals to 0.
var containment; // The number of matched students per school.
var partial; // The current partial matching according to the participant's choices until that point. The length of the list equals the number of students. The value of each entery is the number of the school that the student has been matched too. Equals -10 if the student hasn't been matched yet.
var max_students; // # The nth number in the list represents the maximal number of students that can be matched to the nth school.
const alpha = Array.from(Array(js_vars.schools_number)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
var stage = 1; // the stage of the mechanism we are at
var student_dict = {'R': 1, 'S': 2, 'T': 3, 'Y': 4,}
var schools_dict = {'A': 1, 'B': 2, 'C': 3, 'D': 4,}

var bonus_flag = true;
var bonus = 0

var mistakes_counter = 0;

var modal = document.getElementById("GenModal"); // Get the modal
var btn = document.getElementById("GenBtn"); // Get the button that opens the modal
var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

var currQuestionIncorrectAnswers = [];

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

window.onload = function () {
    containment = js_vars.matched_number;
    partial = js_vars.partialmatching;
    max_students = js_vars.max_students_per_school;
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

    $("#step-2-rounds").hide();
    $("#step-2-rounds .incorrect-msg").hide();
    $("#step-2-rounds .correct-msg").hide();
    $("#step-3-rounds").hide();

    $("#bonus_section").hide();

    $(".incorrect-skip-msg").hide();
    $(".correct-first-msg").hide();

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
        document.getElementById('form').submit();
    });

    $("#proceed-step-4-btn").click(function () {
        liveSend({'information_type': 'matching_update', 'matching': partial, 'stage': stage})
    });

    $("#proceed-step-5-btn").click(function () {
        liveSend({'information_type': 'matching_update', 'matching': partial, 'stage': stage})
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
        }, 5000);

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
        liveSend({'information_type': 'matching_update', 'matching': partial, 'stage': stage})
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
        liveSend({'information_type': 'matching_update', 'matching': partial, 'stage': stage})
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
        liveSend({'information_type': 'matching_update', 'matching': partial, 'stage': stage})
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
        liveSend({'information_type': 'matching_update', 'matching': partial, 'stage': stage})
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
        liveSend({'information_type': 'matching_update', 'matching': partial, 'stage': stage})
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

};
window.addEventListener('DOMContentLoaded', (event) => {
    containment = js_vars.matched_number;
    partial = js_vars.partialmatching;
    max_students = js_vars.max_students_per_school;
    updateCurrentMatching();
    let d = new Date();
    M = d.getTime();
    liveSend({'information_type': 'onload', 'time': JSON.stringify(M),})
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
        if (partial[01] == -10) {
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
    for (let j = 1; j <= js_vars.students_number; j++) {
        if (j === parseInt(student)) { // a student's button is selected
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
        document.getElementById('plusButtonSchool'.concat(alphabet[i])).style.display = 'none';
        for (let l = 1; l <= js_vars.students_number; l++) {
            document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l, 'Button')).className = 'iButton';
            if (partial[l - 1] === i + 1) {
                document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l)).style.order = containment[i];
                document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l)).style.display = 'inline-block';
                document.getElementById('Student'.concat(l, 'PrefSchool', alphabet[i])).className = 'dButtonMatched';
                document.getElementById('School'.concat(alphabet[i], 'PrefStudent', l)).className = 'dButtonMatched';
            } else {
                document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l)).style.order = '30';
                document.getElementById('School'.concat(alphabet[i], 'MatchedToStudent', l)).style.display = 'none';
                document.getElementById('Student'.concat(l, 'PrefSchool', alphabet[i])).className = 'dButton';
                document.getElementById('School'.concat(alphabet[i], 'PrefStudent', l)).className = 'dButton';
            }
        }
    }


}

function openPlus() {
    for (let i = 0; i < js_vars.schools_number; i++) {
        if (i + 1 !== partial[student - 1] && containment[i] < max_students[i]) {
            document.getElementById('plusButtonSchool'.concat(alphabet[i])).style.display = 'inline-block'; // Display plus button in the lines where the student is not already matched to, and for schools which didn't attain their quotas yet..
        }
    }
}

function liveRecv(data) {
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
}

function confirmStage() {
    liveSend({'information_type': 'matching_update', 'matching': partial, 'stage': stage})
}


