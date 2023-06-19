const expectedResults = {
    "first_situation_a": "False",
    "first_situation_b": "False",
    "first_situation_c": "True",
    "first_situation_d": "False",
    "second_situation_a": "False",
    "second_situation_b": "False",
    "second_situation_c": "True",
    "second_situation_d": "True",
    "maximize_earnings_a": "False",
    "maximize_earnings_b": "True",
    "maximize_earnings_c": "True",
    "maximize_earnings_d": "False",
    "maximize_earnings_e": "False",
}
const errorMessages = "Please select an answer";
document.querySelector(".otree-btn-next").addEventListener("click", function (e) {
    /*
    iterate over all radio elements groups and check that at least one element is checked.
    if not then show missing answer error message. and prevent the form from submitting.
    if not, submit the form. and send the understanding bonus counter to the server.
     */
    let understanding_bonus_counter = 0;
    const allElements = getAllRadioElementsGroups();
    const allErrors = getAllErrors();
    allElements.forEach(radioElementsGroup => {
        if (!isQuestionAnswered(radioElementsGroup)) {
            activateErrorMessage(allErrors[allElements.indexOf(radioElementsGroup)])
            e.preventDefault();
        } else {
            /* clear error message */
            allErrors[allElements.indexOf(radioElementsGroup)].innerHTML = ""
            /* check if the checked answer is incorrect */
            const checkedElement = Array(...radioElementsGroup).find(radioElement => radioElement.checked)
            if (checkedElement.value.trim() === expectedResults[checkedElement.name]) {
                // checked answer is incorrect
                const isMaximizeEarnings = checkedElement.name.startsWith("maximize_earnings")
                if (isMaximizeEarnings) {
                    understanding_bonus_counter += 2;
                } else {
                    understanding_bonus_counter += 1;
                }
            }
        }
    })
    liveSend({
        "information_type": "add_understanding_bonus",
        "points": understanding_bonus_counter,
    })
})

function isQuestionAnswered(radioElementsGroup) {
    return Array(...radioElementsGroup).some(radioElement => radioElement.checked)
}

function activateErrorMessage(errorElement) {
    errorElement.innerHTML = errorMessages
}

function getAllRadioElementsGroups() {
    const first_situation_a_radios = document.querySelectorAll('[name = "first_situation_a"]')
    const first_situation_b_radios = document.querySelectorAll('[name = "first_situation_b"]')
    const first_situation_c_radios = document.querySelectorAll('[name = "first_situation_c"]')
    const first_situation_d_radios = document.querySelectorAll('[name = "first_situation_d"]')
    const second_situation_a_radios = document.querySelectorAll('[name = "second_situation_a"]')
    const second_situation_b_radios = document.querySelectorAll('[name = "second_situation_b"]')
    const second_situation_c_radios = document.querySelectorAll('[name = "second_situation_c"]')
    const second_situation_d_radios = document.querySelectorAll('[name = "second_situation_d"]')
    const maximize_earnings_a_radios = document.querySelectorAll('[name = "maximize_earnings_a"]')
    const maximize_earnings_b_radios = document.querySelectorAll('[name = "maximize_earnings_b"]')
    const maximize_earnings_c_radios = document.querySelectorAll('[name = "maximize_earnings_c"]')
    const maximize_earnings_d_radios = document.querySelectorAll('[name = "maximize_earnings_d"]')
    const maximize_earnings_e_radios = document.querySelectorAll('[name = "maximize_earnings_e"]')
    return [
        first_situation_a_radios,
        first_situation_b_radios,
        first_situation_c_radios,
        first_situation_d_radios,
        second_situation_a_radios,
        second_situation_b_radios,
        second_situation_c_radios,
        second_situation_d_radios,
        maximize_earnings_a_radios,
        maximize_earnings_b_radios,
        maximize_earnings_c_radios,
        maximize_earnings_d_radios,
        maximize_earnings_e_radios,
    ]
}

function getAllErrors() {
    const first_situation_a_error = document.querySelector("#first_situation_a_error")
    const first_situation_b_error = document.querySelector("#first_situation_b_error")
    const first_situation_c_error = document.querySelector("#first_situation_c_error")
    const first_situation_d_error = document.querySelector("#first_situation_d_error")
    const second_situation_a_error = document.querySelector("#second_situation_a_error")
    const second_situation_b_error = document.querySelector("#second_situation_b_error")
    const second_situation_c_error = document.querySelector("#second_situation_c_error")
    const second_situation_d_error = document.querySelector("#second_situation_d_error")
    const maximize_earnings_a_error = document.querySelector("#maximize_earnings_a_error")
    const maximize_earnings_b_error = document.querySelector("#maximize_earnings_b_error")
    const maximize_earnings_c_error = document.querySelector("#maximize_earnings_c_error")
    const maximize_earnings_d_error = document.querySelector("#maximize_earnings_d_error")
    const maximize_earnings_e_error = document.querySelector("#maximize_earnings_e_error")
    return [
        first_situation_a_error,
        first_situation_b_error,
        first_situation_c_error,
        first_situation_d_error,
        second_situation_a_error,
        second_situation_b_error,
        second_situation_c_error,
        second_situation_d_error,
        maximize_earnings_a_error,
        maximize_earnings_b_error,
        maximize_earnings_c_error,
        maximize_earnings_d_error,
        maximize_earnings_e_error,
    ]
}