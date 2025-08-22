import React, { useState } from 'react';
import {
  CpuChipIcon,
  BuildingOfficeIcon,
  BoltIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  MapPinIcon,
  XMarkIcon,
  ShoppingCartIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

interface oNFT {
  id: number;
  name: string;
  type: 'gpu' | 'real-estate' | 'energy' | 'financial';
  location: string;
  totalSupply: number;
  availableTokens: number;
  pricePerToken: number;
  minPurchase: number;
  maxPurchase: number;
  apy: number;
  totalValue: string;
  status: 'active' | 'maintenance' | 'offline';
  image?: string;
  // Additional details based on asset type
  details: {
    // GPU specific
    gpuModel?: string;
    computePower?: string;
    uptime?: string;
    powerConsumption?: string;
    coolingType?: string;
    datacenterTier?: string;
    // Real Estate specific
    propertyType?: string;
    squareFootage?: string;
    buildYear?: number;
    occupancyRate?: string;
    rentalYield?: string;
    propertyManager?: string;
    // Energy specific
    energyType?: string;
    capacity?: string;
    efficiency?: string;
    carbonOffset?: string;
    gridConnection?: string;
    maintenanceSchedule?: string;
    // Financial specific
    instrumentType?: string;
    creditRating?: string;
    maturity?: string;
    issuer?: string;
    riskLevel?: string;
  };
}

const mockONFTs: oNFT[] = [
  {
    id: 1,
    name: 'GPU Cluster #3 - 8x RTX 4090',
    type: 'gpu',
    location: 'Iceland Data Center',
    totalSupply: 10000,
    availableTokens: 7500,
    pricePerToken: 25,
    minPurchase: 10,
    maxPurchase: 1000,
    apy: 18.5,
    totalValue: '$2,500,000',
    status: 'active',
    details: {
      gpuModel: 'NVIDIA RTX 4090',
      computePower: '32.5 TFLOPs',
      uptime: '99.8%',
      powerConsumption: '450W per GPU',
      coolingType: 'Liquid Cooling',
      datacenterTier: 'Tier IV'
    }
  },
  {
    id: 2,
    name: 'Miami Office Building Unit B12',
    type: 'real-estate',
    location: 'Miami, FL',
    totalSupply: 5000,
    availableTokens: 3200,
    pricePerToken: 180,
    minPurchase: 5,
    maxPurchase: 500,
    apy: 8.2,
    totalValue: '$4,500,000',
    status: 'active',
    details: {
      propertyType: 'Class A Office Building',
      squareFootage: '15,000 sq ft',
      buildYear: 2018,
      occupancyRate: '92%',
      rentalYield: '6.5%',
      propertyManager: 'Miami Commercial Properties LLC'
    }
  },
  {
    id: 3,
    name: 'Solar Farm #42 - 2MW Capacity',
    type: 'energy',
    location: 'Arizona Desert',
    totalSupply: 20000,
    availableTokens: 15600,
    pricePerToken: 12,
    minPurchase: 20,
    maxPurchase: 2000,
    apy: 12.5,
    totalValue: '$2,400,000',
    status: 'active',
    details: {
      energyType: 'Solar Photovoltaic',
      capacity: '2.0 MW',
      efficiency: '21.5%',
      carbonOffset: '3,200 tons CO2/year',
      gridConnection: 'Arizona Public Service',
      maintenanceSchedule: 'Quarterly'
    }
  },
  {
    id: 4,
    name: 'GPU Cluster #7 - 16x A100',
    type: 'gpu',
    location: 'Singapore Hub',
    totalSupply: 8000,
    availableTokens: 0,
    pricePerToken: 95,
    minPurchase: 8,
    maxPurchase: 800,
    apy: 22.3,
    totalValue: '$7,600,000',
    status: 'maintenance',
    details: {
      gpuModel: 'NVIDIA A100 80GB',
      computePower: '156 TFLOPs',
      uptime: '99.5%',
      powerConsumption: '400W per GPU',
      coolingType: 'Immersion Cooling',
      datacenterTier: 'Tier III+'
    }
  },
  {
    id: 5,
    name: 'London Retail Space #8',
    type: 'real-estate',
    location: 'London, UK',
    totalSupply: 15000,
    availableTokens: 12800,
    pricePerToken: 45,
    minPurchase: 15,
    maxPurchase: 1500,
    apy: 7.5,
    totalValue: '$6,750,000',
    status: 'active',
    details: {
      propertyType: 'Prime Retail Space',
      squareFootage: '8,500 sq ft',
      buildYear: 2015,
      occupancyRate: '100%',
      rentalYield: '5.8%',
      propertyManager: 'Crown Estate Management'
    }
  },
  {
    id: 6,
    name: 'Wind Farm #15 - 5MW',
    type: 'energy',
    location: 'Texas Plains',
    totalSupply: 12000,
    availableTokens: 8900,
    pricePerToken: 32,
    minPurchase: 12,
    maxPurchase: 1200,
    apy: 11.8,
    totalValue: '$3,840,000',
    status: 'active',
    details: {
      energyType: 'Wind Turbine',
      capacity: '5.0 MW',
      efficiency: '45%',
      carbonOffset: '12,500 tons CO2/year',
      gridConnection: 'ERCOT',
      maintenanceSchedule: 'Bi-annual'
    }
  },
];

const RWAVault: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState<{ [key: number]: number }>({});
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [modalAsset, setModalAsset] = useState<oNFT | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'gpu':
        return CpuChipIcon;
      case 'real-estate':
        return BuildingOfficeIcon;
      case 'energy':
        return BoltIcon;
      case 'financial':
        return CurrencyDollarIcon;
      default:
        return CpuChipIcon;
    }
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case 'gpu':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'real-estate':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'energy':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'financial':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'maintenance':
        return 'text-yellow-500';
      case 'offline':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const filteredONFTs = filterType === 'all' 
    ? mockONFTs 
    : mockONFTs.filter(nft => nft.type === filterType);

  const tabs = [
    { id: 'all', name: 'All Assets', count: mockONFTs.length },
    { id: 'gpu', name: 'GPU Clusters', count: mockONFTs.filter(n => n.type === 'gpu').length },
    { id: 'real-estate', name: 'Real Estate', count: mockONFTs.filter(n => n.type === 'real-estate').length },
    { id: 'energy', name: 'Energy Assets', count: mockONFTs.filter(n => n.type === 'energy').length },
    { id: 'financial', name: 'Financial Assets', count: mockONFTs.filter(n => n.type === 'financial').length },
  ];

  const totalAvailableTokens = mockONFTs.reduce((sum, nft) => sum + nft.availableTokens, 0);
  const totalAssetValue = mockONFTs.reduce((sum, nft) => {
    const value = parseFloat(nft.totalValue.replace('$', '').replace(',', ''));
    return sum + value;
  }, 0);
  const avgAPY = mockONFTs.reduce((sum, nft) => sum + nft.apy, 0) / mockONFTs.length;

  const getOwnershipPercent = (nft: oNFT) => {
    return ((1 / nft.totalSupply) * 100).toFixed(4);
  };

  const handleQuantityChange = (assetId: number, quantity: number, nft: oNFT) => {
    const clampedQuantity = Math.max(nft.minPurchase, Math.min(quantity, Math.min(nft.maxPurchase, nft.availableTokens)));
    setPurchaseQuantity(prev => ({
      ...prev,
      [assetId]: clampedQuantity
    }));
  };

  const getTotalCost = (nft: oNFT) => {
    const quantity = purchaseQuantity[nft.id] || nft.minPurchase;
    return quantity * nft.pricePerToken;
  };

  const getOwnershipPercentage = (nft: oNFT) => {
    const quantity = purchaseQuantity[nft.id] || nft.minPurchase;
    return ((quantity / nft.totalSupply) * 100).toFixed(3);
  };

  const openPurchaseModal = (nft: oNFT) => {
    setModalAsset(nft);
    setShowPurchaseModal(true);
    // Initialize quantity if not set
    if (!purchaseQuantity[nft.id]) {
      setPurchaseQuantity(prev => ({
        ...prev,
        [nft.id]: nft.minPurchase
      }));
    }
  };

  const openDetailsModal = (nft: oNFT) => {
    setModalAsset(nft);
    setShowDetailsModal(true);
  };

  const closeModals = () => {
    setShowPurchaseModal(false);
    setShowDetailsModal(false);
    setModalAsset(null);
  };

  return (
    <div className="ml-64 pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">RWA Asset Marketplace</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Purchase fractional ownership of tokenized real-world assets
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Available Assets</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{mockONFTs.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Asset Value</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">${(totalAssetValue / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average APY</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{avgAPY.toFixed(1)}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Available Tokens</p>
            <p className="text-2xl font-bold text-edith-secondary mt-2">{totalAvailableTokens.toLocaleString()}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  filterType === tab.id
                    ? 'border-edith-primary text-edith-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Filter Options */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FunnelIcon className="w-5 h-5" />
              <span className="text-sm">Filter</span>
            </button>
            <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
              <option>All Locations</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia</option>
            </select>
            <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
              <option>All Performance</option>
              <option>High APY (&gt;15%)</option>
              <option>Medium APY (8-15%)</option>
              <option>Low APY (&lt;8%)</option>
            </select>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Select quantity and buy ownership tokens for real-world assets
          </div>
        </div>

        {/* Asset Purchase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredONFTs.map((nft) => {
            const Icon = getIcon(nft.type);
            const currentQuantity = purchaseQuantity[nft.id] || nft.minPurchase;
            const totalCost = getTotalCost(nft);
            const ownershipPercentage = getOwnershipPercentage(nft);
            const isExpanded = selectedAsset === nft.id;
            const isSoldOut = nft.availableTokens === 0;
            
            return (
              <div 
                key={nft.id} 
                className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer ${isExpanded ? 'ring-2 ring-edith-primary shadow-lg' : ''}`}
                onClick={() => setSelectedAsset(selectedAsset === nft.id ? null : nft.id)}
              >
                {/* Compact Header */}
                <div className={`h-24 relative ${getColorClass(nft.type)} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 opacity-40" />
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-white/95 dark:bg-gray-800/95 ${getStatusColor(nft.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1 ${nft.status === 'active' ? 'bg-green-500' : nft.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                      {nft.status}
                    </span>
                  </div>
                  {isSoldOut && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">SOLD OUT</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColorClass(nft.type)}`}>
                      {nft.type.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Compact Content */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-edith-primary transition-colors">
                    {nft.name}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <MapPinIcon className="w-3 h-3 mr-1" />
                    {nft.location}
                  </div>

                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">APY</p>
                      <p className="text-sm font-bold text-green-600 dark:text-green-400">{nft.apy}%</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Token Price</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">${nft.pricePerToken}</p>
                    </div>
                  </div>

                  {/* Availability Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Available</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {((nft.availableTokens / nft.totalSupply) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${isSoldOut ? 'bg-red-500' : 'bg-gradient-to-r from-edith-secondary to-edith-primary'}`}
                        style={{ width: `${(nft.availableTokens / nft.totalSupply) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Expandable Purchase Section */}
                  {isExpanded && !isSoldOut && (
                    <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
                      {/* Compact Purchase Controls */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Purchase Quantity
                        </label>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(nft.id, currentQuantity - 1, nft);
                            }}
                            disabled={currentQuantity <= nft.minPurchase}
                            className="w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min={nft.minPurchase}
                            max={Math.min(nft.maxPurchase, nft.availableTokens)}
                            value={currentQuantity}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(nft.id, parseInt(e.target.value) || nft.minPurchase, nft);
                            }}
                            className="flex-1 px-2 py-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-center text-sm focus:outline-none focus:ring-1 focus:ring-edith-primary"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(nft.id, currentQuantity + 1, nft);
                            }}
                            disabled={currentQuantity >= Math.min(nft.maxPurchase, nft.availableTokens)}
                            className="w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Compact Slider */}
                        <div className="mt-2">
                          <input
                            type="range"
                            min={nft.minPurchase}
                            max={Math.min(nft.maxPurchase, nft.availableTokens)}
                            value={currentQuantity}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(nft.id, parseInt(e.target.value), nft);
                            }}
                            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>

                      {/* Purchase Summary */}
                      <div className="bg-gradient-to-r from-edith-primary/10 to-edith-secondary/10 dark:from-edith-primary/20 dark:to-edith-secondary/20 rounded-lg p-3">
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Tokens:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{currentQuantity.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Ownership:</span>
                            <span className="font-semibold text-edith-primary">{ownershipPercentage}%</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-200 dark:border-gray-600">
                            <span className="font-semibold text-gray-900 dark:text-white">Total:</span>
                            <span className="font-bold text-sm text-edith-primary">${totalCost.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Compact Action Button */}
                  <div className="flex space-x-2 mt-3">
                    {!isSoldOut ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openPurchaseModal(nft);
                        }}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-edith-primary to-edith-secondary text-white rounded-lg text-xs font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                      >
                        {isExpanded ? 'Buy Now' : 'Quick Buy'}
                      </button>
                    ) : (
                      <button disabled className="flex-1 px-3 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg text-xs cursor-not-allowed">
                        Sold Out
                      </button>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailsModal(nft);
                      }}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Purchase Modal */}
        {showPurchaseModal && modalAsset && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getColorClass(modalAsset.type)}`}>
                    <ShoppingCartIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Purchase</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Buy ownership tokens</p>
                  </div>
                </div>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Asset Info */}
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl ${getColorClass(modalAsset.type)} flex items-center justify-center`}>
                    {React.createElement(getIcon(modalAsset.type), { className: "w-8 h-8" })}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{modalAsset.name}</h4>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {modalAsset.location}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">APY:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400 ml-1">{modalAsset.apy}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Price:</span>
                        <span className="font-semibold text-gray-900 dark:text-white ml-1">${modalAsset.pricePerToken}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase Controls */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Purchase Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(modalAsset.id, (purchaseQuantity[modalAsset.id] || modalAsset.minPurchase) - 1, modalAsset)}
                        disabled={(purchaseQuantity[modalAsset.id] || modalAsset.minPurchase) <= modalAsset.minPurchase}
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={modalAsset.minPurchase}
                        max={Math.min(modalAsset.maxPurchase, modalAsset.availableTokens)}
                        value={purchaseQuantity[modalAsset.id] || modalAsset.minPurchase}
                        onChange={(e) => handleQuantityChange(modalAsset.id, parseInt(e.target.value) || modalAsset.minPurchase, modalAsset)}
                        className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-edith-primary"
                      />
                      <button
                        onClick={() => handleQuantityChange(modalAsset.id, (purchaseQuantity[modalAsset.id] || modalAsset.minPurchase) + 1, modalAsset)}
                        disabled={(purchaseQuantity[modalAsset.id] || modalAsset.minPurchase) >= Math.min(modalAsset.maxPurchase, modalAsset.availableTokens)}
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <span>Min: {modalAsset.minPurchase}</span>
                      <span>Max: {Math.min(modalAsset.maxPurchase, modalAsset.availableTokens).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Slider */}
                  <div>
                    <input
                      type="range"
                      min={modalAsset.minPurchase}
                      max={Math.min(modalAsset.maxPurchase, modalAsset.availableTokens)}
                      value={purchaseQuantity[modalAsset.id] || modalAsset.minPurchase}
                      onChange={(e) => handleQuantityChange(modalAsset.id, parseInt(e.target.value), modalAsset)}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>

                {/* Purchase Summary */}
                <div className="bg-gradient-to-r from-edith-primary/10 to-edith-secondary/10 dark:from-edith-primary/20 dark:to-edith-secondary/20 rounded-xl p-4 mb-6">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Purchase Summary</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Tokens to Buy:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {(purchaseQuantity[modalAsset.id] || modalAsset.minPurchase).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Price per Token:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">${modalAsset.pricePerToken}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Ownership Percentage:</span>
                      <span className="font-semibold text-edith-primary">
                        {(((purchaseQuantity[modalAsset.id] || modalAsset.minPurchase) / modalAsset.totalSupply) * 100).toFixed(3)}%
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900 dark:text-white">Total Cost:</span>
                        <span className="font-bold text-xl text-edith-primary">
                          ${((purchaseQuantity[modalAsset.id] || modalAsset.minPurchase) * modalAsset.pricePerToken).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="flex space-x-3">
                  <button
                    onClick={closeModals}
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-edith-primary to-edith-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                    Purchase Tokens
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && modalAsset && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getColorClass(modalAsset.type)}`}>
                    <InformationCircleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Asset Details</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Complete asset information</p>
                  </div>
                </div>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Asset Overview */}
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-20 h-20 rounded-2xl ${getColorClass(modalAsset.type)} flex items-center justify-center`}>
                    {React.createElement(getIcon(modalAsset.type), { className: "w-10 h-10" })}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{modalAsset.name}</h4>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {modalAsset.location}
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(modalAsset.status)}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${modalAsset.status === 'active' ? 'bg-green-500' : modalAsset.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                        {modalAsset.status.charAt(0).toUpperCase() + modalAsset.status.slice(1)}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getColorClass(modalAsset.type)}`}>
                        {modalAsset.type.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{modalAsset.totalValue}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">APY</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{modalAsset.apy}%</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Price/Token</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">${modalAsset.pricePerToken}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Available</p>
                    <p className="text-lg font-bold text-edith-primary">{modalAsset.availableTokens.toLocaleString()}</p>
                  </div>
                </div>

                {/* Technical Details based on asset type */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-6">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-4">
                    {modalAsset.type === 'gpu' && 'GPU Cluster Specifications'}
                    {modalAsset.type === 'real-estate' && 'Property Information'}
                    {modalAsset.type === 'energy' && 'Energy Asset Details'}
                    {modalAsset.type === 'financial' && 'Financial Instrument Details'}
                  </h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modalAsset.type === 'gpu' && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">GPU Model</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.gpuModel}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Compute Power</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.computePower}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{modalAsset.details.uptime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Power Consumption</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.powerConsumption}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Cooling System</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.coolingType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Datacenter Tier</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.datacenterTier}</p>
                        </div>
                      </>
                    )}
                    
                    {modalAsset.type === 'real-estate' && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Property Type</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.propertyType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Square Footage</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.squareFootage}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Year Built</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.buildYear}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Occupancy Rate</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{modalAsset.details.occupancyRate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Rental Yield</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.rentalYield}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Property Manager</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.propertyManager}</p>
                        </div>
                      </>
                    )}
                    
                    {modalAsset.type === 'energy' && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Energy Type</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.energyType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.capacity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Efficiency</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{modalAsset.details.efficiency}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Carbon Offset</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{modalAsset.details.carbonOffset}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Grid Connection</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.gridConnection}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Maintenance</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{modalAsset.details.maintenanceSchedule}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={closeModals}
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                  {modalAsset.availableTokens > 0 && (
                    <button
                      onClick={() => {
                        closeModals();
                        openPurchaseModal(modalAsset);
                      }}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-edith-primary to-edith-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Purchase Tokens
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RWAVault;