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

    const evaluatedPrizeValue = data['value'];
    const currentCurrency = getCurrentCurrency()
    const evaluatedPrizeString = getEvaluatedPrizeString(evaluatedPrizeValue, currentCurrency);
    $("#prize-won").text(data.prize);
    $("#points-won").text(evaluatedPrizeString);
    $("#load").slideUp();
    $("#round-results").slideDown();
    $("#step-5").slideDown();
//    $("#next_btn").show();

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
    /* if valid disable the input field */
    $("#id_player_bid_text").prop("disabled", true);

    $(this).hide();
    var playersRankings = [humanPlayerRanking].concat(otherPlayersRankings);
    console.log([playersRankings, prizesPriorities])
    liveSend({
        "preferences": [playersRankings, prizesPriorities], "prizes": prizes, "values": prizesValues
    });

    $("#step-4").slideDown();
    button = document.getElementById('proceed-step-5-btn');
    button.scrollIntoView(true);
});

var players = js_vars.players;
var prizes = js_vars.prizes;
var prizesValues = js_vars.prizes_values;
var prizesPriorities = js_vars.prizes_priorities;
var otherPlayersRankings = js_vars.players_rankings;
console.log(otherPlayersRankings+'otherPlayersRankings')
console.log(prizesPriorities+'prizesPriorities')
$("#step-1a").hide();
$("#step-2").hide();
$("#step-3").hide();
$("#step-4").hide();
$("#step-5").hide();
$("#round-results").hide();
$(".incorrect-msg").hide();

/*POP UPS (REMINDERS)*/
// the order on the HTML is not by number
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

var modal1 = document.getElementById("GenModal1");
var modal2 = document.getElementById("GenModal2");
var btn2 = document.getElementById("GenBtn2");
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

var modal4 = document.getElementById("GenModal4");
var btn4 = document.getElementById("GenBtn4");
var span4 = document.getElementsByClassName("close4")[0];
btn4.onclick = function () {
    modal4.style.display = "block";
}
span4.onclick = function () {
    modal4.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
}

var modal5 = document.getElementById("GenModal5");
var btn5 = document.getElementById("GenBtn5");
var span5 = document.getElementsByClassName("close5")[0];
btn5.onclick = function () {
    modal5.style.display = "block";
}
span5.onclick = function () {
    modal5.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal5) {
        modal5.style.display = "none";
    }
}

