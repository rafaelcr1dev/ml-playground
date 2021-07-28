export const formatMoney = (value: number, country: string = 'pt-BR', currency: string = 'BRL') => {
  // Create our number formatter.
  var formatter = new Intl.NumberFormat(country, {
    style: 'currency',
    currency,
  });

  return formatter.format(value);
}