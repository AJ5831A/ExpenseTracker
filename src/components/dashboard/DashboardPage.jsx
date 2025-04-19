import React from 'react';
import ExpenseSummary from './ExpenseSummary';
import RecentTransactions from './RecentTransactions';
import { useExpenseContext } from '../../context/ExpenseContext';
import Loading from '../common/Loading';

const DashboardPage = () => {
  const { loading } = useExpenseContext();
  
  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseSummary />
        <RecentTransactions />
      </div>
    </div>
  );
};

export default DashboardPage;
