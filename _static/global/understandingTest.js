const expectedResults = {
    "first_situation_a": "Definitely False",
    "first_situation_b": "Definitely False",
    "first_situation_c": "Possibly True",
    "first_situation_d": "Definitely False",
    "second_situation_a": "Definitely False",
    "second_situation_b": "Definitely False",
    "second_situation_c": "Possibly True",
    "second_situation_d": "Possibly True",
    "third_situation_a": "Definitely False",
    "third_situation_b": "Definitely False",
    "third_situation_c": "Possibly True",
    "third_situation_d": "Possibly True",
}
const errorMessages = {
    "missing": "Please select an answer",
    "incorrect": "Incorrect answer",
}
document.querySelector(".otree-btn-next").addEventListener("click", function (e) {
    const isAllValid = checkAllElements(getAllRadioElementsGroups(), getAllErrors())
    if (!isAllValid) {
        e.preventDefault();
    }
})

function checkAllElements(allElements, allErrors) {
    let allValid = true;
    for (let radioElementsGroup of allElements) {
        /*
        radioElementsGroup is an array of radio elements
        for every group check that at least one element is checked.
        if not then show missing answer error message.
        if true, validate the checked answer.
        if incorrect then show incorrect answer error message.
         */
        if (Array(...radioElementsGroup).some(radioElement => radioElement.checked)){
            // at least one element is checked
            const checkedElement = Array(...radioElementsGroup).find(radioElement => radioElement.checked)
            if (checkedElement.value.trim() !== expectedResults[checkedElement.name]){
                // checked answer is incorrect
                allErrors[allElements.indexOf(radioElementsGroup)].innerHTML = errorMessages["incorrect"]
                allValid = false;
                continue
            }
        }
        else{
            // no element is checked
            allErrors[allElements.indexOf(radioElementsGroup)].innerHTML = errorMessages["missing"]
            allValid = false;
            continue
        }
        /* answer is correct */
        allErrors[allElements.indexOf(radioElementsGroup)].innerHTML = ""
    }
    return allValid;
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
    const third_situation_a_radios = document.querySelectorAll('[name = "third_situation_a"]')
    const third_situation_b_radios = document.querySelectorAll('[name = "third_situation_b"]')
    const third_situation_c_radios = document.querySelectorAll('[name = "third_situation_c"]')
    const third_situation_d_radios = document.querySelectorAll('[name = "third_situation_d"]')
    return [
        first_situation_a_radios,
        first_situation_b_radios,
        first_situation_c_radios,
        first_situation_d_radios,
        second_situation_a_radios,
        second_situation_b_radios,
        second_situation_c_radios,
        second_situation_d_radios,
        third_situation_a_radios,
        third_situation_b_radios,
        third_situation_c_radios,
        third_situation_d_radios,
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
    const third_situation_a_error = document.querySelector("#third_situation_a_error")
    const third_situation_b_error = document.querySelector("#third_situation_b_error")
    const third_situation_c_error = document.querySelector("#third_situation_c_error")
    const third_situation_d_error = document.querySelector("#third_situation_d_error")
    return [
        first_situation_a_error,
        first_situation_b_error,
        first_situation_c_error,
        first_situation_d_error,
        second_situation_a_error,
        second_situation_b_error,
        second_situation_c_error,
        second_situation_d_error,
        third_situation_a_error,
        third_situation_b_error,
        third_situation_c_error,
        third_situation_d_error,
    ]
}