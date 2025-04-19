import React, { useState, useEffect } from 'react';
import { useExpenseContext } from '../../context/ExpenseContext';
import Loading from '../common/Loading';
import Notification from '../common/Notification';

const SettingsPage = () => {
  const { expenses, loading } = useExpenseContext();
  const [notification, setNotification] = useState(null);
  
  // Load settings from localStorage (or use defaults)
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('expenseTrackerSettings');
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
    
    // Default settings - INR as the default currency
    return {
      defaultCategory: 'Food',
      notifications: true,
      darkMode: false
    };
  };
  
  const [settings, setSettings] = useState(loadSettings);
  
  // Effect to apply dark mode if enabled
  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [settings.darkMode]);
  
  // Load settings on initial render
  useEffect(() => {
    const storedSettings = loadSettings();
    setSettings(storedSettings);
    
    // Apply dark mode immediately on page load
    if (storedSettings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newSettings = {
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    };
    
    setSettings(newSettings);
    
    // Apply dark mode immediately when toggle changes
    if (name === 'darkMode') {
      if (checked) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  };
  
  const handleSaveSettings = () => {
    try {
      // Save to localStorage
      localStorage.setItem('expenseTrackerSettings', JSON.stringify(settings));
      setNotification({ message: 'Settings saved successfully!', type: 'success' });
    } catch (error) {
      console.error("Error saving settings:", error);
      setNotification({ message: 'Failed to save settings', type: 'error' });
    }
  };
  
  const handleExportData = () => {
    try {
      if (expenses.length === 0) {
        setNotification({ message: 'No expense data to export', type: 'error' });
        return;
      }
      
      const dataStr = JSON.stringify(expenses, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const dataUrl = URL.createObjectURL(dataBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = 'expense-data.json';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      setNotification({ message: 'Data exported successfully!', type: 'success' });
    } catch (error) {
      console.error("Error exporting data:", error);
      setNotification({ message: 'Failed to export data', type: 'error' });
    }
  };
  
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all expense data? This cannot be undone.')) {
      try {
        localStorage.removeItem('expenses');
        setNotification({ message: 'All data cleared successfully!', type: 'success' });
        // Reload the page to reflect the changes
        setTimeout(() => window.location.reload(), 1500);
      } catch (error) {
        console.error("Error clearing data:", error);
        setNotification({ message: 'Failed to clear data', type: 'error' });
      }
    }
  };
  
  if (loading) {
    return <Loading />;
  }
  
  const categories = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare', 'Education', 'Other'];
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="defaultCategory">Default Category</label>
            <select
              id="defaultCategory"
              name="defaultCategory"
              value={settings.defaultCategory}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="notifications" className="text-gray-700">Enable notifications</label>
          </div> */}
          
          {/* <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="darkMode"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="darkMode" className="text-gray-700">Dark mode</label>
          </div> */}
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleExportData}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Export Data
            </button>
            
            <button 
              onClick={handleClearData}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Clear All Data
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleSaveSettings}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;