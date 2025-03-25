export const money = new Intl.NumberFormat('en-US', {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export const moneyCompact = new Intl.NumberFormat('en-US', {
  style: "currency",
  currency: "USD",
  notation: "compact",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export const integer = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
})

export const customInteger = (value: any) => {
  const integerDigits = value === 0 ? 1 : Math.floor(Math.log10(Math.abs(value))) + 1;

  const fractionDigits = integerDigits < 1 ? 2 - integerDigits : 2;

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  });

  return formatter.format(value);
}


export const customMoney = (value: any) => {
  const integerDigits = value === 0 ? 1 : Math.floor(Math.log10(Math.abs(value))) + 1;

  const fractionDigits = integerDigits < 1 ? 2 - integerDigits : 2;

  const formatter = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  });

  return formatter.format(value);
}
