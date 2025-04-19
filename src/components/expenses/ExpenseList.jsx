import React, { useState } from 'react';
import { useExpenseContext } from '../../context/ExpenseContext';
import { formatCurrency } from '../../utils/helper';
import Notification from '../common/Notification';

const ExpenseList = () => {
  const { expenses, removeExpense, loading } = useExpenseContext();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [notification, setNotification] = useState(null);

  // Get unique categories for filter dropdown
  const categories = [...new Set(expenses.map(expense => expense.category))];

  // Filter expenses by category
  const filteredExpenses = filter 
    ? expenses.filter(expense => expense.category === filter) 
    : expenses;
  
  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sort === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (sort === 'amount') {
      return sortDirection === 'asc' 
        ? parseFloat(a.amount) - parseFloat(b.amount)
        : parseFloat(b.amount) - parseFloat(a.amount);
    }
    return 0;
  });

  const handleDelete = async (id) => {
    try {
      await removeExpense(id);
      setNotification({ message: 'Expense deleted successfully!', type: 'success' });
    } catch (err) {
      setNotification({ message: 'Failed to delete expense', type: 'error' });
    }
  };

  const handleSort = (field) => {
    if (sort === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">Your Expenses</h2>
        
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <button 
            onClick={() => handleSort('date')}
            className={`px-3 py-1 border rounded-md text-sm ${sort === 'date' ? 'bg-blue-50 border-blue-300' : ''}`}
          >
            Date {sort === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          
          <button 
            onClick={() => handleSort('amount')}
            className={`px-3 py-1 border rounded-md text-sm ${sort === 'amount' ? 'bg-blue-50 border-blue-300' : ''}`}
          >
            Amount {sort === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
      
      {sortedExpenses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-right">Amount</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map(expense => (
                <tr key={expense.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{expense.title}</td>
                  <td className="px-4 py-3">{expense.category}</td>
                  <td className="px-4 py-3">{expense.date}</td>
                  <td className="px-4 py-3 text-right font-medium text-red-500">{formatCurrency(expense.amount)}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No expenses found. Add some expenses to get started!</p>
      )}
    </div>
  );
};

export default ExpenseList;