const state = {
    "prizesNames": js_vars.prizesNames,
    "participantsNames": js_vars.participantsNames,
    "expectedRanking": js_vars.expectedRanking,
    "participantsPriorities": js_vars.participantsPriorities,
    "prizesPriorities": js_vars.prizesPriorities,
    "participantsFullNames": js_vars.participantsFullNames,
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

function convertExpectedRankingToString(state) {
    function findKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    let output = "";
    for (let i = 0; i < state.expectedRanking.length; i++) {
        output += findKeyByValue(state.prizesNames, state.expectedRanking[i]);
        if (i < state.expectedRanking.length - 1) {
            output += "–";
        }
    }
    return output;
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
    button = document.getElementById('submit-btn');
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
    button = document.querySelector("#next_btn");
    button.scrollIntoView(true);
});

/*SUBMIT (frame, button, validation*/
$("#submit-btn").click(function () {
    console.log("submit")
    $("#step-3 .incorrect-msg").hide();
    const userRanking = [
        parseInt(forminputs.first_priority.value) - 1,
        parseInt(forminputs.second_priority.value) - 1,
        parseInt(forminputs.third_priority.value) - 1,
        parseInt(forminputs.fourth_priority.value) - 1
    ]

    const isUnique = () => {
        userRanking.filter((value, index, array) => array.indexOf(value) === index);
        return userRanking.length === 4;
    }
    const isRankingMatchExpected = () => {
        return state.expectedRanking.every((value, index) => value === userRanking[index]);
    }
    const userReceivedPrize = () => {
        return state.participantsPriorities["Y"][0]
    }
    if (!isUnique() || !isRankingMatchExpected()) {
        $("#step-3 .incorrect-msg").show();
        return;
    } else {
        $("#id_player_bid_text").prop("disabled", true);
        $(this).hide();
    }
    $("#step-4").slideDown();
    setTimeout(function () {
        $("#step-4 #round-results #prize-won").text(userReceivedPrize());
        $("#step-4 #load").hide();
        $("#step-4 #round-results").show();
    }, 3000);
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

$(".expected-rank").text(convertExpectedRankingToString(state));

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

function generatePrioritiesTable() {
    var prioritiesTabel = document.querySelector("#priorities-table");
    var tabelBody = document.createElement("tbody");

    var prioritiesTextList = [
        "1<sup>st</sup> priority (highest)",
        "2<sup>nd</sup> priority",
        "3<sup>rd</sup> priority",
        "4<sup>th</sup> priority (lowest)"
    ];
    console.log(state.participantsNames)
    // for (var i = 0; i < prioritiesTextList.length; i++) {
    //     // Create a <tr> element and the leftmost <td> element
    //     // that contains a description of the values in that row
    //     var row = document.createElement("tr");
    //     var rowInfoCell = document.createElement("td");
    //     rowInfoCell.innerHTML = prioritiesTextList[i];
    //     row.appendChild(rowInfoCell);
    //
    //     for (var j = 0; j < priorities.length; j++) {
    //         // Create a <td> element and a text node, make the text
    //         // node the contents of the <td>, and put the <td> at
    //         // the end of the table row
    //         var cell = document.createElement("td");
    //         var playerIdx = priorities[j][i];
    //         var cellText = document.createTextNode(`${players[playerIdx]}`);
    //         cell.appendChild(cellText);
    //         row.appendChild(cell);
    //     }
    //
    //     // add the row to the end of the table body
    //     tabelBody.appendChild(row);
    // }
    //
    // // put the <tbody> in the <table>
    // prioritiesTabel.appendChild(tabelBody);
    const numberOfParticipants = Object.keys(state.participantsNames).length;
    const numberOfPrizes = Object.keys(state.prizesNames).length;
    for (let i = 0; i < numberOfParticipants; i++) {
        const row = document.createElement("tr");
        const rowInfoCell = document.createElement("td");
        rowInfoCell.innerHTML = prioritiesTextList[i];
        row.appendChild(rowInfoCell);
        for (let prize in state.prizesNames) {
            const cell = document.createElement("td");
            const participantFirstLetter = state.prizesPriorities[prize][i];
            const participantName = state.participantsFullNames[participantFirstLetter];
            const cellText = document.createTextNode(`${participantName}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tabelBody.appendChild(row);
    }
    prioritiesTabel.appendChild(tabelBody);
}

generatePrioritiesTable();