function expectedRankingString(prizes, ranking) {
    var orderedPrizes = ranking.map(i => prizes[i]);
    return orderedPrizes.join("-");
}

function liveRecv(data) {
    $(".prize-won").text(data.prize)
    $("#points-won").text(data.value)
    $("#load").slideUp();
    $("#round-results").slideDown();
    $("#training-questions").slideDown();
    
    var firstQuestion = $(".question").first();
    firstQuestion.slideDown();

    var subQuestions = firstQuestion.find(".question");
    subQuestions.first().slideDown();
}

$("#proceed-step-2-btn").click(function () {
    $(this).hide();
    $("#step-2").slideDown();
});

$("#ranking-submit-btn").click(function () {
    $("#step-2 .incorrect-msg").hide();

    var humanPlayerRanking = [
        parseInt(forminputs.first_priority.value) - 1,
        parseInt(forminputs.second_priority.value) - 1,
        parseInt(forminputs.third_priority.value) - 1,
        parseInt(forminputs.fourth_priority.value) - 1
    ];

    if (humanPlayerRanking.toString() !== playerExpectedRanking.toString()) {
        $("#step-2 .incorrect-msg").show();
        return;
    }

    $(this).hide();

    var playersRankings = [humanPlayerRanking].concat(otherPlayersRankings);

    liveSend({"preferences": [
        playersRankings,
        prizesPriorities
    ],
    "prizes": prizes});

    $("#step-3").slideDown();
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
var playerExpectedRanking =  js_vars.player_expected_ranking;

var expectedRanknigString = expectedRankingString(prizes, playerExpectedRanking);

var questionsAnswers = js_vars.questions_answers;

var currQuestionIncorrectAnswers = [];

$("#step-2").hide();
$("#step-3").hide();
$("#round-results").hide();
$("#training-questions").hide();
$("#next").hide();
$(".question").hide();
$(".sub-question").hide();
$(".incorrect-seq-field").hide();
$(".correct-msg").hide();
$(".incorrect-msg").hide();

$(".expected-rank").text(expectedRanknigString);