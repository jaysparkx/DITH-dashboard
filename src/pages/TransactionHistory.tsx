import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CurrencyDollarIcon,
  PercentBadgeIcon,
  PlusIcon,
  MinusIcon,
  DocumentArrowDownIcon,
  PrinterIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowPathIcon,
  EyeIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  date: string;
  time: string;
  type: 'deposit' | 'withdraw' | 'assets-return' | 'stake-return' | 'buy' | 'sell' | 'yield' | 'bridge';
  description: string;
  details: string;
  asset: string;
  category: 'gpu' | 'real-estate' | 'energy' | 'financial' | 'vault' | 'bridge';
  amount: number;
  currency: string;
  exchangeRate?: string;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  hash: string;
  blockNumber?: number;
  gasUsed?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: 'Mar 15, 2024',
    time: '2:34 PM',
    type: 'yield',
    description: 'Claimed yield rewards',
    details: 'Monthly yield from GPU Cluster #3',
    asset: 'GPU Cluster #3 - RTX 4090',
    category: 'gpu',
    amount: 284.50,
    currency: 'cUSD',
    status: 'completed',
    hash: '0x1a2b3c4d5e6f789...',
    blockNumber: 12456789,
  },
  {
    id: '2',
    date: 'Mar 14, 2024',
    time: '10:15 AM',
    type: 'buy',
    description: 'Purchased oNFT',
    details: '15% ownership stake',
    asset: 'Solar Farm #88 - 5MW',
    category: 'energy',
    amount: -45000.00,
    currency: 'cUSD',
    exchangeRate: '1 cUSD = $0.998',
    status: 'completed',
    hash: '0x2b3c4d5e6f7890a...',
    blockNumber: 12456234,
  },
  {
    id: '3',
    date: 'Mar 13, 2024',
    time: '4:22 PM',
    type: 'stake-return',
    description: 'Vault staking rewards',
    details: 'Growth Vault - 30 day lock bonus',
    asset: 'Growth Vault',
    category: 'vault',
    amount: 156.80,
    currency: 'cUSD',
    status: 'completed',
    hash: '0x3c4d5e6f7890ab1...',
    blockNumber: 12455678,
  },
  {
    id: '4',
    date: 'Mar 12, 2024',
    time: '9:45 AM',
    type: 'deposit',
    description: 'Deposited cUSD',
    details: 'Bank transfer via bridge',
    asset: 'cUSD',
    category: 'bridge',
    amount: 25000.00,
    currency: 'cUSD',
    status: 'completed',
    hash: '0x4d5e6f7890abc12...',
    blockNumber: 12455123,
  },
  {
    id: '5',
    date: 'Mar 11, 2024',
    time: '11:30 AM',
    type: 'sell',
    description: 'Sold oNFT shares',
    details: '5% ownership stake',
    asset: 'London Retail Space #8',
    category: 'real-estate',
    amount: 12500.00,
    currency: 'cUSD',
    status: 'completed',
    hash: '0x5e6f7890abcd123...',
    blockNumber: 12454567,
  },
  {
    id: '6',
    date: 'Mar 10, 2024',
    time: '3:18 PM',
    type: 'assets-return',
    description: 'Asset rental income',
    details: 'Monthly rental from Miami Office Building',
    asset: 'Miami Office Building Unit B12',
    category: 'real-estate',
    amount: 1250.00,
    currency: 'cUSD',
    status: 'pending',
    hash: '0x6f7890abcdef234...',
  },
  {
    id: '7',
    date: 'Mar 9, 2024',
    time: '1:55 PM',
    type: 'withdraw',
    description: 'Withdrew to wallet',
    details: 'Transfer to external wallet',
    asset: 'cUSD',
    category: 'bridge',
    amount: -5000.00,
    currency: 'cUSD',
    status: 'failed',
    hash: '0x7890abcdef23456...',
  },
];

const TransactionHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [transactionType, setTransactionType] = useState('all');
  const [assetCategory, setAssetCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTransactions, setSelectedTransactions] = useState(new Set<string>());
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownIcon className="w-4 h-4" />;
      case 'withdraw':
        return <ArrowUpIcon className="w-4 h-4" />;
      case 'assets-return':
        return <CurrencyDollarIcon className="w-4 h-4" />;
      case 'stake-return':
        return <PercentBadgeIcon className="w-4 h-4" />;
      case 'buy':
        return <PlusIcon className="w-4 h-4" />;
      case 'sell':
        return <MinusIcon className="w-4 h-4" />;
      case 'yield':
        return <CurrencyDollarIcon className="w-4 h-4" />;
      case 'bridge':
        return <ArrowUpIcon className="w-4 h-4" />;
      default:
        return <CurrencyDollarIcon className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'withdraw':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'assets-return':
      case 'yield':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'stake-return':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'buy':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      case 'sell':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircleIcon className="w-4 h-4 text-red-500" />;
      case 'processing':
        return <ArrowPathIcon className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'processing':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  const getAmountColor = (amount: number) => {
    return amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  const formatAmount = (amount: number, currency: string) => {
    const sign = amount > 0 ? '+' : '';
    return `${sign}${Math.abs(amount).toLocaleString()} ${currency}`;
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  const filteredTransactions = mockTransactions.filter(tx => {
    const searchMatch = searchTerm === '' || 
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase());
    
    const typeMatch = transactionType === 'all' || tx.type === transactionType;
    const categoryMatch = assetCategory === 'all' || tx.category === assetCategory;
    const statusMatch = statusFilter === 'all' || tx.status === statusFilter;
    
    return searchMatch && typeMatch && categoryMatch && statusMatch;
  });

  const totalTransactions = filteredTransactions.length;
  const totalVolume = filteredTransactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const completedTxs = filteredTransactions.filter(tx => tx.status === 'completed').length;
  const successRate = totalTransactions > 0 ? (completedTxs / totalTransactions) * 100 : 0;

  const mostActiveCategory = 'GPU Clusters'; // Mock calculation
  const taxYearSummary = '+$12,456'; // Mock calculation

  const openTransactionModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const quickFilters = [
    { label: 'This Week', active: false },
    { label: 'Yield Payments', active: false },
    { label: 'oNFT Trades', active: false },
    { label: 'Vault Operations', active: false },
    { label: 'Large Transactions (>$1000)', active: false },
  ];

  return (
    <div className="ml-64 pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Complete record of all your EDITH protocol activities
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <DocumentArrowDownIcon className="w-5 h-5" />
              <span>Export to CSV</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <DocumentTextIcon className="w-5 h-5" />
              <span>Tax Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <PrinterIcon className="w-5 h-5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{totalTransactions}</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">+12% vs last month</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Volume</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">${totalVolume.toLocaleString()}</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">↗ +8.5%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Most Active Asset</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{mostActiveCategory}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">45% of transactions</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Tax Year Summary</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{taxYearSummary}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">2024 gains</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-4">
            {/* Date Range */}
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
            >
              <option value="last-7-days">Last 7 days</option>
              <option value="last-30-days">Last 30 days</option>
              <option value="last-3-months">Last 3 months</option>
              <option value="last-year">Last year</option>
              <option value="custom">Custom range</option>
            </select>

            {/* Transaction Type */}
            <select 
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
              <option value="assets-return">Assets Return</option>
              <option value="stake-return">Stake Return</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="yield">Yield</option>
              <option value="bridge">Bridge</option>
            </select>

            {/* Asset Category */}
            <select 
              value={assetCategory}
              onChange={(e) => setAssetCategory(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
            >
              <option value="all">All Assets</option>
              <option value="gpu">GPU Clusters</option>
              <option value="real-estate">Real Estate</option>
              <option value="energy">Energy</option>
              <option value="financial">Financial Assets</option>
              <option value="vault">Vaults</option>
            </select>

            {/* Status */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="processing">Processing</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by transaction hash, asset name, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-edith-primary"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {quickFilters.map((filter, index) => (
            <button
              key={index}
              className={`px-3 py-2 rounded-full text-sm transition-colors ${
                filter.active
                  ? 'bg-edith-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Transaction Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Asset/Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{tx.date}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{tx.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${getTypeColor(tx.type)}`}>
                        {getTypeIcon(tx.type)}
                        <span className="text-sm font-medium capitalize">{tx.type.replace('-', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{tx.description}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{tx.details}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{tx.asset}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{tx.category.replace('-', ' ')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className={`text-sm font-medium ${getAmountColor(tx.amount)}`}>
                          {formatAmount(tx.amount, tx.currency)}
                        </div>
                        {tx.exchangeRate && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">{tx.exchangeRate}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(tx.status)}`}>
                        {getStatusIcon(tx.status)}
                        <span className="text-sm font-medium capitalize">{tx.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openTransactionModal(tx)}
                          className="text-edith-primary hover:text-edith-primary/80 text-sm font-medium"
                        >
                          View Details
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <LinkIcon className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <DocumentArrowDownIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {truncateHash(tx.hash)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing 1-{Math.min(25, filteredTransactions.length)} of {filteredTransactions.length} transactions
          </div>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
              <option>25 per page</option>
              <option>50 per page</option>
              <option>100 per page</option>
            </select>
            <div className="flex space-x-1">
              <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                Previous
              </button>
              <button className="px-3 py-2 bg-edith-primary text-white rounded-lg text-sm">
                1
              </button>
              <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                2
              </button>
              <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Transaction Details Modal */}
        {showModal && selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transaction Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transaction Hash</p>
                    <p className="text-sm font-mono text-gray-900 dark:text-white">{selectedTransaction.hash}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Block Number</p>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedTransaction.blockNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Date & Time</p>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedTransaction.date} at {selectedTransaction.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Gas Used</p>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedTransaction.gasUsed || 'N/A'}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-edith-primary text-white rounded-lg hover:bg-edith-primary/90 transition-colors">
                      Download Receipt
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      View on Explorer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;