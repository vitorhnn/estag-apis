export function v2tov1(cents) {
    const whole = Math.floor(cents / 100);
    const fractional = String(cents % 100).padStart(2, "0");

    return `${whole}.${fractional}`;
}

export function v1tov2(moneyStr) {
    const separator = moneyStr.indexOf(".");

    const whole = moneyStr.slice(0, separator);
    const fractional = moneyStr.slice(separator + 1);

    if (fractional.length !== 2) {
        throw new Error("Número de casas decimais !== 2");
    }

    return parseInt(whole, 10) * 100 + parseInt(fractional, 10);
}