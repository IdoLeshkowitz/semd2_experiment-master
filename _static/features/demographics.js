const state={
    approvedToSendUnfilled: false,
}
document.querySelector("form").addEventListener("submit", (e)=>{
    e.preventDefault()
    const inputNamesSet = new Set(Array.from(e.target.querySelectorAll("input")).map((input)=>input.name))
    let allInputsFilled = false;
    /* check if all inputs are filled */
    if(Array.from(inputNamesSet).every((inputName)=>{
        return e.target.querySelector(`input[name="${inputName}"]`).value
    })){
        allInputsFilled = true
    }
    if(allInputsFilled){
        state.approvedToSendUnfilled = true
        e.target.submit()
    }
    else{
        if (state.approvedToSendUnfilled){
            e.target.submit()
            return
        }
        /* display error message */
        const errorMessage = document.querySelector("#approve-submition").classList.remove("hidden")
        /* change button text to Proceed */
        const submitButton = document.querySelector("button[id='Next']")
        submitButton.textContent = "Proceed"
        submitButton.classList.add("btn-danger")
        state.approvedToSendUnfilled = true
    }
})