function renderTotalPayment(props) {
    const jsxCode=`
    function Stam(){
        return <div></div>
    }
    function TotalPayment(props){
        const {totalPayment} = props
        if (totalPayment < 10){
            const moneyString = getMoneyString(10,props.currency)
            return <p>Well done! Since your total earnings fall below the minimum of {moneyString}, we just increased them to <b>{moneyString}</b>.</p>
        } else {
            return <p>Well done! Your total earnings are <b>{getMoneyString(totalPayment,props.currency)}</b></p>
        }
        return null
    }
    `
    renderReactComponent(jsxCode, "total-payment", "TotalPayment", JSON.stringify(props));
}

window.addEventListener('load',()=>{
    renderTotalPayment(js_vars)
})