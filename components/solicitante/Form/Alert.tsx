import React from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  return (
    <div className={`p-4 mb-4 text-white rounded-lg ${bgColor}`}>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
