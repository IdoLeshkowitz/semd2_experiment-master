function liveRecv(data) {
    function getCurrentCurrency() {
        /* grab the current bonsu element */
        const bonusElement = document.getElementById("bonus-indicator");
        /* grab the bonus value */
        const bonusValue = bonusElement.innerText;
        /* grab the currency from the bonus value */
        const isUsd = bonusValue.includes("$") | bonusValue.includes("¢");
        const isGbp = bonusValue.includes("£") | bonusValue.includes("p");
        if (isUsd) {
            return "USD";
        }
        if (isGbp) {
            return "GBP";
        }
    }

    function getEvaluatedPrizeString(evaluatedPrizeValue, currency) {
        /* check if value is less than 1 */
        if (evaluatedPrizeValue < 1) {
            /* convert to cents */
            evaluatedPrizeValue = (evaluatedPrizeValue * 100).toFixed();
            /* if currency is USD convert the money to cents */
            if (currency === 'USD') {
                return `${evaluatedPrizeValue}¢`;
            }
            if (currency === "GBP") {
                return `${evaluatedPrizeValue}p`;
            }
        }
        /* if value is greater than 1 */
        if (currency === 'USD') {
            return `$${evaluatedPrizeValue}`;
        }
        if (currency === "GBP") {
            return `£${evaluatedPrizeValue}`;
        }
    }

    const evaluatedPrizeValue = data.payoff;
    const currentCurrency = getCurrentCurrency()
    const evaluatedPrizeString = getEvaluatedPrizeString(evaluatedPrizeValue, currentCurrency);
    $("#prize-won").text(data.prize);
    $("#points-won").text(evaluatedPrizeString);
    $("#load").slideUp();
    $("#round-results").slideDown();
//    var firstQuestion = $(".question").first();
//    firstQuestion.slideDown();
//
//    var subQuestions = firstQuestion.find(".question");
//    subQuestions.first().slideDown();
}


/*FRAMES*/
$("#proceed-step-1a-btn").click(function () {
    $(this).hide();
    $("#step-1a").slideDown();
    button = document.getElementById('proceed-question1-btn');
    button.scrollIntoView(true);
});
$("#proceed-question1-btn").click(function () {
    $(this).hide();
    $("#question1").slideDown();
    button = document.getElementById('question1-btn');
    button.scrollIntoView(true);
});
$("#question1-btn").click(function () {
    var formInputName = "independence";
    if (forminputs[formInputName].value != "False") {
        $("#question1 .incorrect-msg").show();
        return;
    }
    /* disbale input elements */
    document.querySelector("#question1 input").disabled = true;
    $("#question1-btn").hide();
    $("#question1 .incorrect-msg").hide();
    $("#question1 .correct-msg").show();
    $("#question2").slideDown();
    button = document.getElementById('question2-btn');
    button.scrollIntoView(true);
});
$("#question2-btn").click(function () {
    var formInputName = "value_table";
    if (forminputs[formInputName].value != "False") {
        $("#question2 .incorrect-msg").show();
        return;
    }
    /* disbale input elements */
    document.querySelector("#question2 input").disabled = true;
    $("#question2-btn").hide();
    $("#question2 .incorrect-msg").hide();
    $("#question2 .correct-msg").show();
    $("#step-2").slideDown();
    button = document.getElementById('proceed-question3-btn');
    button.scrollIntoView(true);
});
$("#proceed-question3-btn").click(function () {
    $(this).hide();
    $("#question3").slideDown();
    button = document.getElementById('question3-btn');
    button.scrollIntoView(true);
});
$("#question3-btn").click(function () {
    var formInputName = "self_rank_independence";
    if (forminputs[formInputName].value != "False") {
        $("#question3 .incorrect-msg").show();
        return;
    }
    /* disbale input elements */
    document.querySelector("#question3 input").disabled = true;
    $("#question3-btn").hide();
    $("#question3 .incorrect-msg").hide();
    $("#question3 .correct-msg").show();
    $("#step-3").slideDown();
    button = document.getElementById('proceed-step-3-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-3-btn").click(function () {
    $(this).hide();
    $("#step-3").slideDown();
    button = document.getElementById('proceed-step-4-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-4-btn").click(function () {
    $(this).hide();
    $("#step-4").slideDown();
    button = document.getElementById('proceed-step-5-btn');
    button.scrollIntoView(true);
});
/*SUBMIT (frame, button, validation*/
$("#submit-btn").click(function () {
    $("#step-3 .incorrect-msg").hide();

    var humanPlayerRanking = [parseInt(forminputs.first_priority.value) - 1, parseInt(forminputs.second_priority.value) - 1, parseInt(forminputs.third_priority.value) - 1, parseInt(forminputs.fourth_priority.value) - 1]

    var unique = humanPlayerRanking.filter((value, index, array) => array.indexOf(value) === index);
    if (unique.length < 4) {
        $("#step-3 .incorrect-msg").show();
        return;
    }

    $(this).hide();
    /* disable input elements */
    document.querySelector("#step-3 input").disabled = true;
    var playersRankings = [humanPlayerRanking].concat(otherPlayersRankings);

    liveSend({
        "preferences": [playersRankings, prizesPriorities], "prizes": prizes, "values": prizesValues
    });
    $("#step-4").slideDown();
    button = document.getElementById('proceed-step-4-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-4-btn").click(function () {
    $(this).hide();
    $("#question4").slideDown();
    button = document.getElementById('proceed-question4-btn');
    button.scrollIntoView(true);
});
$("#proceed-question4-btn").click(function () {
    $(this).hide();
    $("#question4").slideDown();
    button = document.getElementById('question4-btn');
    button.scrollIntoView(true);
});
$("#question4-btn").click(function () {
    var formInputName = "competitors_rank_independence";
    if (forminputs[formInputName].value != "False") {
        $("#question4 .incorrect-msg").show();
        return;
    }
    /* disbale input elements */
    document.querySelector("#question4 input").disabled = true;
    $("#question4-btn").hide();
    $("#question4 .incorrect-msg").hide();
    $("#question4 .correct-msg").show();
    $("#next").slideDown();
    /*    button = document.getElementById('proceed-step-3-btn');
        button.scrollIntoView(true);*/
});
$("#next").click(function () {
    $(this).hide();
});


//buttons with submit
//    var currQuestion = $(this).parents(".question").first();
//    var currQuestionID = currQuestion.attr("id");

//    currQuestion.children(".incorrect-msg").hide();
//    if (forminputs[formInputName].value !== questionsAnswers[currQuestionID]) {
//        currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
//        currQuestion.children(".incorrect-msg").slideDown();
//        return;
//    }

//    var incorrectSequenceFieldName = `incorrect_seq_${formInputName}`;
//    forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
//    currQuestionIncorrectAnswers = [];


//$(".btn-question").click(function () {
//alert(3)
//    var currQuestion = $(this).parents(".question").first();
//    var currQuestionID = currQuestion.attr("id");
//    var formInputName = currQuestionID.replaceAll("-", "_");
//    var nextQuestionIndex;
//
//    currQuestion.children(".incorrect-msg").hide();
//    if (forminputs[formInputName].value !== questionsAnswers[currQuestionID]) {
//        currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
//        currQuestion.children(".incorrect-msg").slideDown();
//        return;
//    }
//
//    var incorrectSequenceFieldName = `incorrect_seq_${formInputName}`;
//    forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
//    currQuestionIncorrectAnswers = [];

//    $(this).hide();
//    currQuestion.children(".correct-msg").slideDown();
//    nextQuestionIndex = currQuestion.index(".question") + 1;
//
//    var nextQuestion = $(".question").eq(nextQuestionIndex);
//    if (nextQuestion.length === 0) {
//        $("#next").show();
//        return;
//    }
//alert(4)
//
//    nextQuestion.slideDown();
//    nextQuestion.find(".question").first().slideDown();
//});


var players = js_vars.players;
var prizes = js_vars.prizes;

var prizesValues = js_vars.prizes_values;
var prizesPriorities = js_vars.prizes_priorities;

var otherPlayersRankings = js_vars.players_rankings;

//stuff for the questions
var questionsAnswers = js_vars.questions_answers;

var currQuestionIncorrectAnswers = [];
$("#step-1a").hide();
$("#step-2").hide();
$("#step-3").hide();
$("#step-4").hide();
$("#step-5").hide();
$("#step-6").hide();
$("#next").hide();
$("#question1").hide();
$("#question2").hide();
$("#question3").hide();
$("#question4").hide();
$("#round-results").hide();
$(".incorrect-msg").hide();
$(".correct-msg").hide();
//stuff for the questions
$(".correct-msg").hide();
$("#training-questions").hide();
$("#next").hide();
$(".question").hide();
$(".sub-question").hide();
$(".sub-question").hide();
$(".incorrect_seq_independence").hide();
$(".incorrect_seq_value_table").hide();
$(".incorrect_seq_self_rank_independence").hide();
$(".incorrect_seq_competitors_rank_independence").hide();


/*POP UPS (REMINDERS)*/
/*first - general*/
var modal = document.getElementById("GenModal"); // Get the modal
var btn = document.getElementById("GenBtn"); // Get the button that opens the modal
var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
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

/*second*/
var modal1 = document.getElementById("GenModal1");
var btn1 = document.getElementById("GenBtn1");
var span1 = document.getElementsByClassName("close1")[0];
btn1.onclick = function () {
    modal1.style.display = "block";
}
span1.onclick = function () {
    modal1.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}

/*third*/
var modal2 = document.getElementById("GenModal2");
var btn2 = document.getElementById("GenBtn2");
var span2 = document.getElementsByClassName("close2")[0];
btn2.onclick = function () {
    modal2.style.display = "block";
}
span2.onclick = function () {
    modal2.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

/*fourth*/
var modal3 = document.getElementById("GenModal3");
var btn3 = document.getElementById("GenBtn3");
var span3 = document.getElementsByClassName("close3")[0];
btn3.onclick = function () {
    modal3.style.display = "block";
}
span3.onclick = function () {
    modal3.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
}
