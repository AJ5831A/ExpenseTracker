import React from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { useExpenseContext } from '../../context/ExpenseContext';
import Loading from '../common/Loading';

const ExpensesPage = () => {
  const { loading } = useExpenseContext();
  
  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Expenses</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <ExpenseForm />
        </div>
        <div className="lg:col-span-2">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
