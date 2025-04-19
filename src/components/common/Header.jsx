import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'font-bold text-blue-600' : 'text-gray-700 hover:text-blue-500';
  };
  
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Expense Tracker</h1>
        <nav className="flex space-x-6">
          <Link to="/" className={isActive('/')}>Dashboard</Link>
          <Link to="/expenses" className={isActive('/expenses')}>Expenses</Link>
          <Link to="/reports" className={isActive('/reports')}>Reports</Link>
          <Link to="/settings" className={isActive('/settings')}>Settings</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;