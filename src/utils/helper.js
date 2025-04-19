export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

export const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
};

export const groupExpensesByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    acc[category] = (acc[category] || 0) + parseFloat(amount);
    return acc;
  }, {});
};

export const getRandomColor = () => {
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
    '#9966FF', '#FF9F40', '#8AC926', '#1982C4',
    '#6A4C93', '#F94144', '#F3722C', '#F8961E'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};