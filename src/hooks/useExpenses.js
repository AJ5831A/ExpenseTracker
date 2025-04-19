import { useState, useEffect } from 'react';
import { fetchExpenses, addExpense, deleteExpense } from '../api/expenseApi';

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        setLoading(true);
        const data = await fetchExpenses();
        setExpenses(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch expenses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getExpenses();
  }, []);

  const addNewExpense = async (newExpense) => {
    try {
      setLoading(true);
      const addedExpense = await addExpense(newExpense);
      setExpenses(prev => [...prev, addedExpense]);
      return addedExpense;
    } catch (err) {
      setError('Failed to add expense');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeExpense = async (id) => {
    try {
      setLoading(true);
      await deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    } catch (err) {
      setError('Failed to delete expense');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    expenses,
    loading,
    error,
    addNewExpense,
    removeExpense
  };
};

export default useExpenses;