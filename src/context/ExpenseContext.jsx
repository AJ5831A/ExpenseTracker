import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load expenses from localStorage on initial render
  useEffect(() => {
    const loadExpenses = () => {
      try {
        setLoading(true);
        const storedExpenses = localStorage.getItem('expenses');
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        }
      } catch (error) {
        console.error("Error loading expenses from localStorage:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadExpenses();
  }, []);
  
  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (!loading) { // Only save if not in loading state (prevents overwriting on initial load)
      try {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        console.log("Expenses saved to localStorage:", expenses);
      } catch (error) {
        console.error("Error saving expenses to localStorage:", error);
      }
    }
  }, [expenses, loading]);

  // Add a new expense
  const addNewExpense = (expenseData) => {
    try {
      const newExpense = {
        id: Date.now().toString(),
        ...expenseData,
        amount: parseFloat(expenseData.amount)
      };
      
      setExpenses(prevExpenses => [...prevExpenses, newExpense]);
      return Promise.resolve(newExpense);
    } catch (error) {
      console.error("Error adding expense:", error);
      return Promise.reject(error);
    }
  };

  // Remove an expense
  const removeExpense = (id) => {
    try {
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
      return Promise.resolve(true);
    } catch (error) {
      console.error("Error removing expense:", error);
      return Promise.reject(error);
    }
  };

  const contextValue = {
    expenses,
    loading,
    addNewExpense,
    removeExpense
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);