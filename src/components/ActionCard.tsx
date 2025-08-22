import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface ActionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  percentage?: number;
  actionText: string;
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

const ActionCard: React.FC<ActionCardProps> = ({ icon: Icon, title, description, percentage, actionText, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  };

  const buttonClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {percentage !== undefined && (
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{percentage}%</span>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      
      <button className={`w-full py-2 px-4 rounded-lg text-white font-medium flex items-center justify-center space-x-2 ${buttonClasses[color]} transition-colors duration-200`}>
        <span>{actionText}</span>
        <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ActionCard;