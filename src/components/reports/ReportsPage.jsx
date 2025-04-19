import React, { useState, useEffect } from 'react';
import { useExpenseContext } from '../../context/ExpenseContext';
import { formatCurrency, groupExpensesByCategory, getRandomColor } from '../../utils/helper';
import Loading from '../common/Loading';

const ReportsPage = () => {
  const { expenses, loading } = useExpenseContext();
  const [timeframe, setTimeframe] = useState('all');
  const [categoryData, setCategoryData] = useState([]);
  
  // Process data for the selected timeframe
  useEffect(() => {
    if (!expenses.length) return;
    
    let filteredExpenses = [...expenses];
    
    // Filter expenses based on timeframe
    if (timeframe !== 'all') {
      const now = new Date();
      const startDate = new Date();
      
      if (timeframe === 'week') {
        startDate.setDate(now.getDate() - 7);
      } else if (timeframe === 'month') {
        startDate.setMonth(now.getMonth() - 1);
      } else if (timeframe === 'year') {
        startDate.setFullYear(now.getFullYear() - 1);
      }
      
      filteredExpenses = expenses.filter(expense => 
        new Date(expense.date) >= startDate && new Date(expense.date) <= now
      );
    }
    
    // Group by category
    const groupedData = groupExpensesByCategory(filteredExpenses);
    
    // Convert to array format for display
    const formattedData = Object.entries(groupedData).map(([category, amount]) => ({
      category,
      amount,
      color: getRandomColor()
    }));
    
    setCategoryData(formattedData);
  }, [expenses, timeframe]);
  
  // Calculate total expenses
  const totalExpenses = categoryData.reduce((sum, item) => sum + item.amount, 0);
  
  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Expense Reports</h1>
      
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Expense Breakdown</h2>
            
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-1 border rounded-md"
            >
              <option value="all">All Time</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
          </div>
          
          {expenses.length > 0 ? (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Total Expenses: {formatCurrency(totalExpenses)}</h3>
              </div>
              
              <div className="space-y-4">
                {categoryData.map(item => (
                  <div key={item.category} className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-700">{item.category}</span>
                      <span className="text-gray-700 font-medium">{formatCurrency(item.amount)}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className="h-4 rounded-full" 
                          style={{
                            width: `${(item.amount / totalExpenses) * 100}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {Math.round((item.amount / totalExpenses) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Category Breakdown</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {categoryData.map(item => (
                    <div 
                      key={item.category}
                      className="p-3 rounded-md"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <div className="flex items-center mb-1">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="text-lg font-semibold">{formatCurrency(item.amount)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No expense data available. Add some expenses to generate reports.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;