import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

interface Activity {
  id: number;
  type: 'staking' | 'yield' | 'asset' | 'governance';
  title: string;
  description: string;
  time: string;
  amount?: string;
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'staking',
    title: 'Staked cUSD',
    description: 'Successfully staked 1,000 cUSD',
    time: '2 hours ago',
    amount: '+1,000 cUSD',
  },
  {
    id: 2,
    type: 'yield',
    title: 'Yield Earned',
    description: 'Daily yield from GPU compute assets',
    time: '5 hours ago',
    amount: '+12.5 cUSD',
  },
  {
    id: 3,
    type: 'asset',
    title: 'New oNFT Added',
    description: 'Solar Farm #42 added to portfolio',
    time: '1 day ago',
  },
  {
    id: 4,
    type: 'governance',
    title: 'Voted on Proposal',
    description: 'Voted YES on Protocol Upgrade v2.1',
    time: '2 days ago',
  },
];

const ActivityFeed: React.FC = () => {
  const typeColors = {
    staking: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    yield: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    asset: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    governance: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${typeColors[activity.type]}`}>
              <ClockIcon className="w-4 h-4" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                {activity.amount && (
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">{activity.amount}</span>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-edith-primary hover:text-edith-primary/80 font-medium transition-colors">
        View All Activity →
      </button>
    </div>
  );
};

export default ActivityFeed;