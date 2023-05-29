const errorMessages = {
    "missing": "Please answer the question.",
}
/* on submit */
document.querySelector("#Next").addEventListener("click", function (e) {
    let isAllValid = [
        validateTypicallyRank(),
        validateIsHighToLow(),
        validateIsExplainHelp(),
        validateUnderstandChooseRankings(),
    ].every(isValid => isValid)
})

function validateTypicallyRank() {
    const inputElement = document.querySelector('[name = "typically_rank"]')
    const errorElement = document.getElementById('typically_rank_error')
    if (inputElement.value.trim() === "") {
        /* if no answer is provided */
        errorElement.innerHTML = errorMessages["missing"]
        return false
    } else {
        /* if answer is provided */
        errorElement.innerHTML = ""
    }
    return true
}

function validateIsHighToLow() {
    /*
    check that at least one radio element is checked.
    if not then show missing answer error message.
    if true, clean the error message.
     */
    const radioElementsGroup = document.querySelectorAll('[name = "is_high_to_low"]')
    const errorElement = document.getElementById('is_high_to_low_error')
    if (Array(...radioElementsGroup).some(radioElement => radioElement.checked)) {
        /* at least one element is checked */
        errorElement.innerHTML = ""
        return true
    } else {
        /* no element is checked */
        errorElement.innerHTML = errorMessages["missing"]
        return false
    }
}

function validateIsExplainHelp() {
    /*
    check that at least one radio element is checked.
    if not then show missing answer error message.
    if true, clean the error message.
     */
    const radioElementsGroup = document.querySelectorAll('[name = "is_explain_help"]')
    const errorElement = document.getElementById('is_explain_help_error')
    if (Array(...radioElementsGroup).some(radioElement => radioElement.checked)) {
        /* at least one element is checked */
        errorElement.innerHTML = ""
        return true
    } else {
        /* no element is checked */
        errorElement.innerHTML = errorMessages["missing"]
        return false
    }
}

function validateUnderstandChooseRankings() {
    /*
    check that input has a value.
    if not then show missing answer error message.
    if true, clean the error message.
     */
    const inputElement = document.querySelector('[name="understand_choose_ranking"]')
    const errorElement = document.getElementById('understand_choose_ranking_error')
    console.log(inputElement.value)
    if (inputElement.value.trim() === "") {
        /* if no answer is provided */
        errorElement.innerHTML = errorMessages["missing"]
        return false
    } else {
        /* if answer is provided */
        errorElement.innerHTML = ""
        return true
    }
}

/* sliders */
window.onload = function () {
    const allSliders = getAllSliders()
    allSliders.forEach(slider => {
        const sliderIndicator = document.getElementById(slider.id + "_indicator")
        slider.addEventListener("input", function () {
            sliderIndicator.innerHTML = slider.value
        })
    })
}

function getAllSliders() {
    const allSliders = document.querySelectorAll("[type=range]")
    return Array(...allSliders)
}