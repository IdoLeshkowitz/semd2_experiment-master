function getMoneyString(amount, currency) {
            if (amount < 1) {
                const cents = Math.round(amount * 100,2);
                if (currency === "USD") {
                    return cents + "¢";
                }
                if (currency === "GBP") {
                    return cents + "p";
                }
            }
            if (amount >= 1) {
                if (currency === "USD") {
                    return "$" + amount;
                }
                if (currency === "GBP") {
                    return "£" + amount;
                }
            }
}