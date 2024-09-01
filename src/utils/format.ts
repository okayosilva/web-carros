export const formatCurrency = (value: string) => {
  const numericValue = parseFloat(value.replace(/[^\d]/g, '')) / 100;
  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
