function getMoneyAmountsElementsFromDom() {
    /* get all elements with id="money-amount" */
    return document.querySelectorAll('.money-amount');
}

function getMoneyStringByAmountAndCurrency(moneyAmount, currency) {
    /* get the money string by amount and currency */
    /* if currency is USD convert the money to cents */
    if (currency === 'USD') {
        return `${moneyAmount * 100}¢`;
    }
    if (currency === "GBP") {
        return `${moneyAmount * 100}p`;
    }
}

function getCurrencyFromMoneyString(moneyString) {
    /* get the currency from the money amount */
    const currencySign = moneyString.substring(0, 1);
    if (currencySign === '€') {
        return 'EUR';
    }
    if (currencySign === '$') {
        return 'USD';
    }
    if (currencySign === '£') {
        return 'GBP';
    }
}


function getMoneyAmountFromMoneyString(moneyString) {
    /* returns float value of money amount */
    // INPUT --> "$0.00"
    // OUTPUT --> 0.00
    return parseFloat(moneyString.slice(1));
}

function replaceMoneyAmountsInDom(moneyAmountsElements) {
    /*
        replace the money amounts in the DOM
        if the money amount is less than one
     */
    moneyAmountsElements.forEach((moneyAmountElement) => {
        /* get the value of the money amount */
        const moneyValue = getMoneyAmountFromMoneyString(moneyAmountElement.innerText);
        /* if value is greater than 1$ or 1€ do nothing  */
        if (moneyValue > 1) return;
        /* get the currency from the money amount */
        const currency = getCurrencyFromMoneyString(moneyAmountElement.innerText);
        /* get the money string by amount and currency */
        const moneyString = getMoneyStringByAmountAndCurrency(moneyValue, currency);
        /* replace the money amount in the DOM */
        moneyAmountElement.innerText = moneyString;
    });
}

replaceMoneyAmountsInDom(getMoneyAmountsElementsFromDom());
