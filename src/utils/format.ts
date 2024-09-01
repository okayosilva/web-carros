export const formatCurrency = (value: string) => {
  const numericValue = value.replace(/[^\d]/g, '');

  const formattedValue = numericValue
    .replace(/(\d)(\d{2})$/, '$1,$2')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    .replace(/^/, 'R$ ');

  return formattedValue;
};

export const formatKmValue = (value: string) => {
  const numericValue = value.replace(/[^\d]/g, '');

  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return formattedValue;
};
