import React from 'react';
import { useExpenseContext } from '../../context/ExpenseContext';
import { groupExpensesByCategory, formatCurrency, getRandomColor } from '../../utils/helper';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ExpenseChart = () => {
  const { expenses } = useExpenseContext();
  
  const categoryData = groupExpensesByCategory(expenses);
  
  const chartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value
  }));
  
  // Generate colors for each category
  const COLORS = chartData.map(() => getRandomColor());
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
      
      {chartData.length > 0 ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No data available.</p>
      )}
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Category Breakdown</h3>
        <div className="space-y-2">
          {Object.entries(categoryData)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount], index) => (
              <div key={category} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span>{category}</span>
                </div>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;