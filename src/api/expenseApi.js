const API_URL = 'https://jsonplaceholder.typicode.com';

// Mock data since we're using a placeholder API
const mockExpenses = [
  { id: 1, title: 'Groceries', amount: 56.78, category: 'Food', date: '2025-04-15' },
  { id: 2, title: 'Movie tickets', amount: 24.99, category: 'Entertainment', date: '2025-04-12' },
  { id: 3, title: 'Gas', amount: 45.50, category: 'Transportation', date: '2025-04-10' },
  { id: 4, title: 'Dinner', amount: 89.75, category: 'Food', date: '2025-04-08' },
  { id: 5, title: 'Internet bill', amount: 65.00, category: 'Utilities', date: '2025-04-05' },
  { id: 6, title: 'Clothing', amount: 120.45, category: 'Shopping', date: '2025-04-03' },
  { id: 7, title: 'Coffee', amount: 4.50, category: 'Food', date: '2025-04-01' },
  { id: 8, title: 'Phone bill', amount: 75.00, category: 'Utilities', date: '2025-03-28' },
];

export const fetchExpenses = async () => {
  try {
    // We'll simulate an API call with a small delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockExpenses;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const addExpense = async (expense) => {
  try {
    // Simulate API POST request
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    
    const data = await response.json();
    
    // Return our mock data with new expense added
    return {
      ...expense,
      id: mockExpenses.length + 1,
    };
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    // Simulate API DELETE request
    await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    
    return id;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};
