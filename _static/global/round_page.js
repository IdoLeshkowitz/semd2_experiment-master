function liveRecv(data) {
    $("#prize-won").text(data.prize);
    $("#points-won").text(data.value);
    $("#load").slideUp();
    $("#round-results").slideDown();
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

    $(this).hide();

    var playersRankings = [humanPlayerRanking].concat(otherPlayersRankings);

    liveSend({"preferences": [
        playersRankings,
        prizesPriorities
    ],
    "prizes": prizes,
    "values": prizesValues});

    $("#step-4").slideDown();
    button = document.getElementById('proceed-step-5-btn');
    button.scrollIntoView(true);
});

var players = js_vars.players;
var prizes = js_vars.prizes;

var prizesValues = js_vars.prizes_values;
var prizesPriorities = js_vars.prizes_priorities;

var otherPlayersRankings = js_vars.players_rankings;

$("#step-1a").hide();
$("#step-2").hide();
$("#step-3").hide();
$("#step-4").hide();
$("#step-5").hide();
$("#round-results").hide();
$(".incorrect-msg").hide();

/*POP UPS (REMINDERS)*/
/*first - general*/
var modal = document.getElementById("GenModal"); // Get the modal
var btn = document.getElementById("GenBtn"); // Get the button that opens the modal
var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
btn.onclick = function() {modal.style.display = "block";} // When the user clicks the button, open the modal
span.onclick = function() {modal.style.display = "none";}// When the user clicks on <span> (x), close the modal
window.onclick = function(event) {if (event.target == modal) {modal.style.display = "none";}}// When the user clicks anywhere outside of the modal, close it

/*second*/
var modal1 = document.getElementById("GenModal1");
var btn1 = document.getElementById("GenBtn1");
var span1 = document.getElementsByClassName("close1")[0];
btn1.onclick = function() {modal1.style.display = "block";}
span1.onclick = function() {modal1.style.display = "none";}
window.onclick = function(event) {if (event.target == modal1) {modal1.style.display = "none";}}

/*third*/
var modal2 = document.getElementById("GenModal2");
var btn2 = document.getElementById("GenBtn2");
var span2 = document.getElementsByClassName("close2")[0];
btn2.onclick = function() {modal2.style.display = "block";}
span2.onclick = function() {modal2.style.display = "none";}
window.onclick = function(event) {if (event.target == modal2) {modal2.style.display = "none";}}

/*fourth*/
var modal3 = document.getElementById("GenModal3");
var btn3 = document.getElementById("GenBtn3");
var span3 = document.getElementsByClassName("close3")[0];
btn3.onclick = function() {modal3.style.display = "block";}
span3.onclick = function() {modal3.style.display = "none";}
window.onclick = function(event) {if (event.target == modal3) {modal3.style.display = "none";}}
