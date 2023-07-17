function renderTotalPayment(props) {
    const jsxCode=`
    function Stam(){
        return <div></div>
    }
    function TotalPayment(props){
        const {totalPayment} = props
        if (totalPayment < 12){
            const moneyString = getMoneyString(12,props.currency)
            return <p style={{textAlign:'center'}}>Well done! Since your total earnings fall below the minimum of {moneyString}, we just increased them to <b>{moneyString}</b>.<br/>Hence, you will be paid {moneyString} for this study on Prolific, and you will not get a further bonus.</p>
        } else {
            return <p style={{textAlign:'center'}}>Well done! Your total earnings are <b>{getMoneyString(totalPayment,props.currency)}</b><br/>Hence, you will be paid {getMoneyString(12,props.currency)} for this study on Prolific, plus {getMoneyString(totalPayment - 12,props.currency)} as a bonus.</p>
        }
        return null
    }
    `
    renderReactComponent(jsxCode, "total-payment", "TotalPayment", JSON.stringify(props));
}

window.addEventListener('load',()=>{
    renderTotalPayment(js_vars)
})