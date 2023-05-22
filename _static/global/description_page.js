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
        /* check if the value is less than 1 */
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
        if (currency === 'USD') {
            return `$${evaluatedPrizeValue}`;
        }
        if (currency === "GBP") {
            return `£${evaluatedPrizeValue}`;
        }
    }

    const evaluatedPrizeValue = data.payoff;
    const currentCurrency = getCurrentCurrency();
    const evaluatedPrizeString = getEvaluatedPrizeString(evaluatedPrizeValue, currentCurrency);
    $("#prize-won").text(data.prize);
    $("#points-won").text(evaluatedPrizeString)

    //$("#load").slideUp();
    $("#round-results").slideDown();
}

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
    $(this).hide();
    $("#step-5").slideDown();
    button = document.getElementById('proceed-step-6-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-6-btn").click(function () {
    $(this).hide();
    $("#step-6").slideDown();
    button = document.getElementById('proceed-step-7-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-7-btn").click(function () {
    $(this).hide();
    $("#step-7").slideDown();
    button = document.getElementById('proceed-step-8-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-8-btn").click(function () {
    $(this).hide();
    $("#step-8").slideDown();
    button = document.getElementById('proceed-step-9-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-9-btn").click(function () {
    $(this).hide();
    $("#step-9").slideDown();
    button = document.getElementById('proceed-step-10-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-10-btn").click(function () {
    $(this).hide();
    $("#step-10").slideDown();
    button = document.getElementById('proceed-step-11-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-11-btn").click(function () {
    $(this).hide();
    $("#step-11").slideDown();
    button = document.getElementById('proceed-step-12-btn');
    button.scrollIntoView(true);
});
/*$("#proceed-step-12-btn").click(function () {
    $(this).hide();
    $("#step-12").slideDown();
    button = document.getElementById('proceed-step-13-btn');
    button.scrollIntoView(true);
});*/
$("#proceed-step-13-btn").click(function () {
    $(this).hide();
    $("#step-13").slideDown();
    button = document.getElementById('proceed-step-14-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-14-btn").click(function () {
    $(this).hide();
    $("#step-14").slideDown();
    /*change the timing of the timer*/
    setTimeout(() => {
        $("#load").slideUp();
    }, 3000);
    button = document.getElementById('proceed-step-15-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-15-btn").click(function () {
    $(this).hide();
    $("#step-15").slideDown();
    button = document.getElementById('proceed-step-16-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-16-btn").click(function () {
    $(this).hide();
    $("#step-16").slideDown();
    button = document.getElementById('proceed-step-17-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-17-btn").click(function () {
    $(this).hide();
    $("#step-17").slideDown();
    button = document.getElementById('proceed-step-18-btn');
    button.scrollIntoView(true);
});
$("#proceed-step-18-btn").click(function () {
    $(this).hide();
    /*    $("#step-13").slideDown();
        button = document.getElementById('proceed-step-14-btn');
        button.scrollIntoView(true);*/
});
/*
$("#proceed-step-15-btn").click(function () {
    $(this).hide();
    $("#step-15").slideDown();
});
*/

$("#submit-btn").click(function () {
    $("#step-11 .incorrect-msg").hide();

    var humanPlayerRanking = [parseInt(forminputs.first_priority.value) - 1, parseInt(forminputs.second_priority.value) - 1, parseInt(forminputs.third_priority.value) - 1, parseInt(forminputs.fourth_priority.value) - 1]

    var unique = humanPlayerRanking.filter((value, index, array) => array.indexOf(value) === index);
    if (unique.length < 4) {
        $("#step-11 .incorrect-msg").show();
        return;
    }
    /* disbale inout element */
    $("#id_player_bid_text").prop('disabled', true);

    $(this).hide();

    var playersRankings = [humanPlayerRanking].concat(otherPlayersRankings);

    liveSend({
        "preferences": [playersRankings, prizesPriorities], "prizes": prizes, "values": prizesValues
    });

    $("#step-12").slideDown();
    button = document.getElementById('proceed-step-13-btn');
    button.scrollIntoView(true);
});

var players = js_vars.players;
var prizes = js_vars.prizes;

var prizesValues = js_vars.prizes_values;
var prizesPriorities = js_vars.prizes_priorities;

var otherPlayersRankings = js_vars.players_rankings;

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

/*
$("#step-15").hide();
*/
$("#round-results").hide();
$(".incorrect-msg").hide();

///*POP UP WINDOW (REMINDERS)*/
//// Get the modal
//var modal = document.getElementById("myModal");
//
//// Get the button that opens the modal
//var btn = document.getElementById("myBtn");
//
//// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];
//
//// When the user clicks the button, open the modal
//btn.onclick = function() {
//  modal.style.display = "block";
//}
//
//// When the user clicks on <span> (x), close the modal
//span.onclick = function() {
//  modal.style.display = "none";
//}
//
//// When the user clicks anywhere outside of the modal, close it
//window.onclick = function(event) {
//  if (event.target == modal) {
//    modal.style.display = "none";
//  }
//}