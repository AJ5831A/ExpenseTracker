import React from 'react';
import { useExpenseContext } from '../../context/ExpenseContext';
import { formatCurrency } from '../../utils/helper';

const RecentTransactions = () => {
  const { expenses } = useExpenseContext();
  
  // Sort by date (newest first) and take the 5 most recent
  const recentTransactions = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      
      {recentTransactions.length > 0 ? (
        <div className="space-y-4">
          {recentTransactions.map(expense => (
            <div key={expense.id} className="flex justify-between items-center p-3 border-b">
              <div>
                <p className="font-medium">{expense.title}</p>
                <p className="text-sm text-gray-500">{expense.date} • {expense.category}</p>
              </div>
              <p className="font-medium text-red-500">{formatCurrency(expense.amount)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recent transactions</p>
      )}
    </div>
  );
};

export default RecentTransactions;