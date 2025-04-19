import React from 'react';
import { useExpenseContext } from '../../context/ExpenseContext';
import { formatCurrency, calculateTotalExpenses, groupExpensesByCategory } from '../../utils/helper';

const ExpenseSummary = () => {
  const { expenses } = useExpenseContext();
  
  const totalExpenses = calculateTotalExpenses(expenses);
  const categorySummary = groupExpensesByCategory(expenses);
  
  const topCategories = Object.entries(categorySummary)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Expense Summary</h2>
      
      <div className="mb-6">
        <p className="text-gray-600">Total Expenses</p>
        <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalExpenses)}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Top Categories</h3>
        {topCategories.length > 0 ? (
          topCategories.map(([category, amount]) => (
            <div key={category} className="flex justify-between items-center mb-2">
              <span className="text-gray-700">{category}</span>
              <span className="font-medium">{formatCurrency(amount)}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No expenses recorded yet</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseSummary;
