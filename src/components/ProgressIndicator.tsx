import React from 'react';

interface ProgressIndicatorProps {
  title: string;
  value: number;
  color: 'green' | 'blue' | 'yellow' | 'red';
  size?: 'small' | 'large';
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ title, value, color, size = 'large' }) => {
  const colorClasses = {
    green: 'text-green-500',
    blue: 'text-blue-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500',
  };

  const strokeColor = {
    green: '#10b981',
    blue: '#3b82f6',
    yellow: '#f59e0b',
    red: '#ef4444',
  };

  const sizeClasses = size === 'large' ? 'w-40 h-40' : 'w-24 h-24';
  const fontSize = size === 'large' ? 'text-3xl' : 'text-xl';
  const titleSize = size === 'large' ? 'text-sm' : 'text-xs';

  const radius = size === 'large' ? 60 : 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClasses}`}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx={size === 'large' ? '80' : '48'}
            cy={size === 'large' ? '80' : '48'}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx={size === 'large' ? '80' : '48'}
            cy={size === 'large' ? '80' : '48'}
            r={radius}
            stroke={strokeColor[color]}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${fontSize} font-bold ${colorClasses[color]}`}>{value}%</span>
        </div>
      </div>
      <p className={`mt-3 ${titleSize} font-medium text-gray-700 dark:text-gray-300 text-center`}>{title}</p>
    </div>
  );
};

export default ProgressIndicator;