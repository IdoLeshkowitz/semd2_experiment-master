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
/*    button = document.getElementById('proceed-step-6-btn');
    button.scrollIntoView(true);*/
});

$("#step-2").hide();
$("#step-3").hide();
$("#step-4").hide();
$("#step-5").hide();

