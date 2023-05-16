const toFixedNumber = (number: number, fractionDigits = 2) =>
  Number(number.toFixed(fractionDigits));

export { toFixedNumber };
