function expectedRankingString(prizes, ranking) {
    var orderedPrizes = ranking.map(i => prizes[i]);
    return orderedPrizes.join("–");
}

function liveRecv(data) {
    $(".prize-won").text(data.prize)
    $("#points-won").text(data.value)
    $("#load").slideUp();
    $("#round-results").slideDown();

    var firstQuestion = $(".question").first();
    firstQuestion.slideDown();

    var subQuestions = firstQuestion.find(".question");
    subQuestions.first().slideDown();
}

/*FRAMES*/
$("#proceed-step-1a-btn").click(function () {
    $(this).hide();
    $("#step-1a").slideDown();
    button = document.getElementById('proceed-step-2-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-2-btn").click(function () {
    $(this).hide();
    $("#step-2").slideDown();
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
$("#proceed-step-5-btn").click(function () {
    document.getElementById("form").submit();
});

/*SUBMIT (frame, button, validation*/
$("#submit-btn").click(function () {
    $("#step-3 .incorrect-msg").hide();
    var humanPlayerRanking = [
        parseInt(forminputs.first_priority.value) - 1,
        parseInt(forminputs.second_priority.value) - 1,
        parseInt(forminputs.third_priority.value) - 1,
        parseInt(forminputs.fourth_priority.value) - 1
    ]

    var unique = humanPlayerRanking.filter((value, index, array) => array.indexOf(value) === index);
    if (unique.length < 4) {
        $("#step-3 .incorrect-msg").show();
        return;
    }
    /* check if priorities are in the right order */
    if (playerExpectedRanking.every((value, index) => value === humanPlayerRanking[index]) === false) {
        console.log(humanPlayerRanking, playerExpectedRanking)
        $("#step-3 .incorrect-msg").show();
        return;
    }
    /* disable input element */
    $("#id_player_bid_text").prop("disabled", true);
    $(this).hide();

    var playersRankings = [humanPlayerRanking].concat(otherPlayersRankings);

    $("#step-4").slideDown();
    button = document.getElementById('proceed-step-5-btn');
    button.scrollIntoView(true);
});


$(".btn-question").click(function () {
    var currQuestion = $(this).parents(".question").first();
    var currQuestionID = currQuestion.attr("id");
    var formInputName = currQuestionID.replaceAll("-", "_");
    var nextQuestionIndex;

    currQuestion.children(".incorrect-msg").hide();
    if (forminputs[formInputName].value !== questionsAnswers[currQuestionID]) {
        currQuestionIncorrectAnswers.push(forminputs[formInputName].value);
        currQuestion.children(".incorrect-msg").slideDown();
        return;
    }

    var incorrectSequenceFieldName = `incorrect_seq_${formInputName}`;
    forminputs[incorrectSequenceFieldName].value = currQuestionIncorrectAnswers.join(",");
    currQuestionIncorrectAnswers = [];

    $(this).hide();
    currQuestion.children(".correct-msg").slideDown();
    nextQuestionIndex = currQuestion.index(".question") + 1;

    var nextQuestion = $(".question").eq(nextQuestionIndex);
    if (nextQuestion.length === 0) {
        $("#next").show();
        return;
    }

    nextQuestion.slideDown();
    nextQuestion.find(".question").first().slideDown();
});

var players = js_vars.players;
var prizes = js_vars.prizes;

var prizesPriorities = js_vars.prizes_priorities;

var otherPlayersRankings = js_vars.players_rankings;
var playerExpectedRanking = js_vars.player_expected_ranking;

var expectedRanknigString = expectedRankingString(prizes, playerExpectedRanking);

var questionsAnswers = js_vars.questions_answers;

var currQuestionIncorrectAnswers = [];

$("#step-1a").hide();
$("#step-2").hide();
$("#step-3").hide();
$("#step-4").hide();
$("#step-5").hide();
$("#round-results").hide();
$("#training-questions").hide();
$("#next").hide();
$(".question").hide();
$(".sub-question").hide();
$(".incorrect-seq-field").hide();
$(".correct-msg").hide();
$(".incorrect-msg").hide();

$(".expected-rank").text(expectedRanknigString);

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
