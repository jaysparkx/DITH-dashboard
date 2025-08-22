import React, { useState } from 'react';
import {
  ShieldCheckIcon,
  ChartBarIcon,
  LockClosedIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface Vault {
  id: number;
  name: string;
  description: string;
  apy: number;
  tvl: string;
  risk: 'low' | 'medium' | 'high';
  userStake: string;
  yieldSources: string[];
  lockPeriods: {
    days: number;
    bonus: number;
  }[];
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
}

const vaults: Vault[] = [
  {
    id: 1,
    name: 'Stable Vault',
    description: 'Low-risk stablecoin yields from lending and liquidity provision',
    apy: 8.5,
    tvl: '$45.2M',
    risk: 'low',
    userStake: '$12,450',
    yieldSources: ['RWA Rental Income', 'Bond Yields', 'Lending'],
    lockPeriods: [
      { days: 30, bonus: 0.5 },
      { days: 60, bonus: 1.0 },
      { days: 90, bonus: 1.5 },
      { days: 180, bonus: 2.5 },
      { days: 365, bonus: 4.0 },
    ],
  },
  {
    id: 2,
    name: 'Growth Vault',
    description: 'Balanced risk-reward from diverse RWA yield strategies',
    apy: 14.2,
    tvl: '$28.7M',
    risk: 'medium',
    userStake: '$8,200',
    yieldSources: ['Trading Fees', 'RWA Appreciation', 'Yield Farming'],
    lockPeriods: [
      { days: 30, bonus: 0.8 },
      { days: 60, bonus: 1.5 },
      { days: 90, bonus: 2.2 },
      { days: 180, bonus: 3.5 },
      { days: 365, bonus: 5.5 },
    ],
  },
  {
    id: 3,
    name: 'Revenue Vault',
    description: 'Direct revenue sharing from protocol earnings with tier bonuses',
    apy: 18.7,
    tvl: '$15.3M',
    risk: 'medium',
    userStake: '$25,000',
    yieldSources: ['Protocol Fees', 'RWA Revenue Share', 'Performance Fees'],
    lockPeriods: [
      { days: 30, bonus: 1.0 },
      { days: 60, bonus: 2.0 },
      { days: 90, bonus: 3.0 },
      { days: 180, bonus: 4.5 },
      { days: 365, bonus: 7.0 },
    ],
    tier: 'gold',
  },
  {
    id: 4,
    name: 'Degen Vault',
    description: 'High-risk, high-reward strategies for experienced investors',
    apy: 32.5,
    tvl: '$5.8M',
    risk: 'high',
    userStake: '0',
    yieldSources: ['Leveraged Yields', 'Options Premium', 'Arbitrage'],
    lockPeriods: [
      { days: 30, bonus: 2.0 },
      { days: 60, bonus: 3.5 },
      { days: 90, bonus: 5.0 },
      { days: 180, bonus: 7.5 },
      { days: 365, bonus: 10.0 },
    ],
  },
];

const YieldVaults: React.FC = () => {
  const [selectedVault, setSelectedVault] = useState<number | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedLockPeriod, setSelectedLockPeriod] = useState(30);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'high':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'bronze':
        return 'text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
      case 'silver':
        return 'text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700';
      case 'gold':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'platinum':
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      default:
        return '';
    }
  };

  const totalStaked = vaults.reduce((sum, vault) => {
    const stake = parseFloat(vault.userStake.replace('$', '').replace(',', ''));
    return sum + stake;
  }, 0);

  const weightedAPY = vaults.reduce((sum, vault) => {
    const stake = parseFloat(vault.userStake.replace('$', '').replace(',', ''));
    return sum + (vault.apy * stake);
  }, 0) / (totalStaked || 1);

  const monthlyYield = (totalStaked * weightedAPY) / 100 / 12;

  return (
    <div className="ml-64 pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Yield Vaults</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Earn yields from diversified strategies with flexible lock periods
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Staked</p>
              <BanknotesIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalStaked.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Weighted APY</p>
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{weightedAPY.toFixed(1)}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Rewards</p>
              <ArrowTrendingUpIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-edith-secondary">$1,842.50</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Est. Monthly Yield</p>
              <BanknotesIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${monthlyYield.toFixed(2)}</p>
          </div>
        </div>

        {/* Vault Cards */}
        <div className="space-y-6">
          {vaults.map((vault) => (
            <div
              key={vault.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-300 ${
                selectedVault === vault.id
                  ? 'border-edith-primary shadow-lg'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-edith-primary/10 rounded-lg">
                      <ShieldCheckIcon className="w-8 h-8 text-edith-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{vault.name}</h3>
                        {vault.tier && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTierColor(vault.tier)}`}>
                            {vault.tier.toUpperCase()} TIER
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{vault.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{vault.apy}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">APY</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Value Locked</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{vault.tvl}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Risk Level</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(vault.risk)}`}>
                      {vault.risk === 'low' && <ShieldCheckIcon className="w-3 h-3 mr-1" />}
                      {vault.risk === 'high' && <ExclamationTriangleIcon className="w-3 h-3 mr-1" />}
                      {vault.risk.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Your Stake</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{vault.userStake}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Yield Sources</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {vault.yieldSources.slice(0, 2).map((source, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {source}
                        </span>
                      ))}
                      {vault.yieldSources.length > 2 && (
                        <span className="text-xs text-gray-500">+{vault.yieldSources.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Lock Period Grid */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Lock Period Bonuses</p>
                  <div className="grid grid-cols-5 gap-2">
                    {vault.lockPeriods.map((period) => (
                      <button
                        key={period.days}
                        onClick={() => {
                          setSelectedVault(vault.id);
                          setSelectedLockPeriod(period.days);
                        }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedVault === vault.id && selectedLockPeriod === period.days
                            ? 'border-edith-primary bg-edith-primary/10'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{period.days}d</p>
                        <p className="text-xs text-green-600 dark:text-green-400">+{period.bonus}%</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedVault(vault.id)}
                    className="flex-1 px-4 py-2 bg-edith-primary text-white rounded-lg hover:bg-edith-primary/90 transition-colors"
                  >
                    Stake More
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Unstake
                  </button>
                  <button className="px-4 py-2 bg-edith-secondary text-white rounded-lg hover:bg-edith-secondary/90 transition-colors">
                    View Details
                  </button>
                </div>

                {/* Staking Interface (Expanded) */}
                {selectedVault === vault.id && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">Stake cUSD</h4>
                      <button
                        onClick={() => setSelectedVault(null)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Amount to Stake
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full px-4 py-2 pr-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-edith-primary"
                          />
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                            cUSD
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Available: 50,000 cUSD</span>
                          <button className="text-xs text-edith-primary hover:text-edith-primary/80">
                            MAX
                          </button>
                        </div>
                      </div>
                      <div className="bg-edith-primary/10 p-3 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-gray-300">Base APY</span>
                          <span className="font-medium">{vault.apy}%</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-700 dark:text-gray-300">Lock Bonus ({selectedLockPeriod}d)</span>
                          <span className="font-medium text-green-600">
                            +{vault.lockPeriods.find(p => p.days === selectedLockPeriod)?.bonus}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1 pt-1 border-t border-gray-300 dark:border-gray-600">
                          <span className="font-medium">Total APY</span>
                          <span className="font-bold text-green-600">
                            {(vault.apy + (vault.lockPeriods.find(p => p.days === selectedLockPeriod)?.bonus || 0)).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-edith-primary text-white rounded-lg hover:bg-edith-primary/90 transition-colors font-medium">
                        Stake & Lock for {selectedLockPeriod} Days
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YieldVaults;