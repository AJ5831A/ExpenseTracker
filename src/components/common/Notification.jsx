import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'success' ? 'bg-green-50 border-green-500' :
                  type === 'error' ? 'bg-red-50 border-red-500' :
                  'bg-blue-50 border-blue-500';
  
  const textColor = type === 'success' ? 'text-green-800' :
                    type === 'error' ? 'text-red-800' :
                    'text-blue-800';

  return (
    <div className={`border-l-4 p-4 mb-4 ${bgColor}`}>
      <div className="flex items-center justify-between">
        <div className={`font-medium ${textColor}`}>{message}</div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
