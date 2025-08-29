import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import {
  MapPinIcon,
  HeartIcon,
  ShareIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
  XMarkIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  BoltIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

// Purchase-compatible interface
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
}

// Extended interface matching the screenshots
interface AssetDetails extends oNFT {
  currentPrice: number;
  totalReturn: number;
  expectedIncome: number;
  investors: number;
  totalLiquidity: number;
  liquidityPercentages: {
    primary: number;
    secondary: number;
  };
  images: string[];
  about: string;
  ticker: string;
  marketLink: string;
  specifications: {
    location: string;
    fullAddress: string;
    capacity: string;
    miningHardware?: string;
    model?: string;
    hashrate?: string;
    powerConsumption?: string;
    efficiency?: string;
    energySource?: string;
    energyCost?: string;
    costOfElectricity?: string;
    dailyProduction?: string;
    redundancy?: string;
    connectivity?: string;
    powerSource?: string;
    cooling?: string;
    security?: string;
  };
}

// Mock data matching the screenshots
const mockAssets: AssetDetails[] = [
  {
    id: 1,
    name: 'North Texas Datacenter LTD',
    location: 'Texas, USA',
    type: 'energy',
    currentPrice: 103.87,
    totalReturn: 4.03,
    expectedIncome: 44.83,
    investors: 65,
    totalLiquidity: 42629181.49,
    liquidityPercentages: {
      primary: 95.33,
      secondary: 4.67,
    },
    ticker: '1 NTBM',
    marketLink: 'Main Market',
    // Purchase-related fields
    totalSupply: 1000000,
    availableTokens: 850000,
    pricePerToken: 103.87,
    minPurchase: 10,
    maxPurchase: 50000,
    apy: 44.83,
    totalValue: '$42,629,181.49',
    status: 'active',
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/300/200',
      '/api/placeholder/300/200',
      '/api/placeholder/300/200',
      '/api/placeholder/300/200',
    ],
    about: "Welcome to North Texas BTC Miner, where cutting-edge technology meets sustainable energy to fuel the future of finance! Located in North Texas, this state-of-the-art cryptocurrency mining facility is designed for optimal Bitcoin production and cost efficiency. The facility is fully equipped with backup power systems and high-speed internet, including Starlink connectivity, ensuring 99.1% uptime.\n\nOperating 15,000 latest-gen miners with a hashrate of 185 PH/s, all while being powered by renewable energy sources at an incredible $500/kWh. Every day, it produces 22 BTC, contributing to the vibrant and ever-evolving cryptocurrency market.\n\nAs the cryptocurrency market matures, North Texas Bitcoin Miner offers an exciting opportunity to dive into one of the most dynamic sectors in modern finance.",
    specifications: {
      location: 'North Texas',
      fullAddress: '341, Lane 3, Alberton Port, TX, 345612',
      capacity: '15,000 latest-gen miners',
      miningHardware: 'ASIC Miners',
      model: 'S19 XP',
      hashrate: '185 PH/s',
      powerConsumption: '3,031 W',
      efficiency: '22 J/TH',
      energySource: 'Powered by renewable energy',
      energyCost: '$0.032/kWh',
      costOfElectricity: '$500/kWh',
      dailyProduction: '22 BTC',
      redundancy: 'Backup Power Systems',
      connectivity: 'High-Speed Internet + Starlink',
      powerSource: 'Renewable Energy',
      cooling: 'Air-cooled/Water-cooled',
      security: '24/7 Surveillance',
    }
  },
  // GPU Cluster
  {
    id: 2,
    name: 'GPU Cluster #3 - 8x RTX 4090',
    location: 'Iceland Data Center',
    type: 'gpu',
    currentPrice: 78.50,
    totalReturn: 18.5,
    expectedIncome: 35.2,
    investors: 142,
    totalLiquidity: 2500000,
    liquidityPercentages: {
      primary: 92.5,
      secondary: 7.5,
    },
    ticker: '1 GPUC',
    marketLink: 'GPU Market',
    // Purchase-related fields
    totalSupply: 500000,
    availableTokens: 425000,
    pricePerToken: 78.50,
    minPurchase: 5,
    maxPurchase: 25000,
    apy: 35.2,
    totalValue: '$2,500,000',
    status: 'active',
    images: ['/api/placeholder/600/400'],
    about: "High-performance GPU cluster optimized for AI/ML workloads and rendering tasks.",
    specifications: {
      location: 'Iceland',
      fullAddress: 'Tech Park, Reykjavik',
      capacity: '8x NVIDIA RTX 4090',
      model: 'NVIDIA RTX 4090',
      powerConsumption: '450W per GPU',
      efficiency: '32.5 TFLOPs',
      cooling: 'Liquid Cooling',
      security: '24/7 Monitoring',
    }
  },
  // Real Estate
  {
    id: 3,
    name: 'Miami Office Building Unit B12',
    location: 'Miami, FL',
    type: 'real-estate',
    currentPrice: 225.00,
    totalReturn: 8.2,
    expectedIncome: 12.5,
    investors: 89,
    totalLiquidity: 4500000,
    liquidityPercentages: {
      primary: 88.2,
      secondary: 11.8,
    },
    ticker: '1 MREB',
    marketLink: 'Property Market',
    // Purchase-related fields
    totalSupply: 200000,
    availableTokens: 175000,
    pricePerToken: 225.00,
    minPurchase: 1,
    maxPurchase: 10000,
    apy: 12.5,
    totalValue: '$4,500,000',
    status: 'active',
    images: ['/api/placeholder/600/400'],
    about: "Premium Class A office space in Miami's business district.",
    specifications: {
      location: 'Miami, Florida',
      fullAddress: '123 Business Ave, Miami, FL 33101',
      capacity: '15,000 sq ft',
    }
  },
  // Solar Farm
  {
    id: 4,
    name: 'Solar Farm #42 - 2MW Capacity',
    location: 'Arizona Desert',
    type: 'energy',
    currentPrice: 45.75,
    totalReturn: 12.5,
    expectedIncome: 22.8,
    investors: 234,
    totalLiquidity: 2400000,
    liquidityPercentages: {
      primary: 91.2,
      secondary: 8.8,
    },
    ticker: '1 SOLR',
    marketLink: 'Energy Market',
    // Purchase-related fields
    totalSupply: 800000,
    availableTokens: 650000,
    pricePerToken: 45.75,
    minPurchase: 20,
    maxPurchase: 40000,
    apy: 22.8,
    totalValue: '$2,400,000',
    status: 'active',
    images: ['/api/placeholder/600/400'],
    about: "Solar photovoltaic farm generating clean renewable energy.",
    specifications: {
      location: 'Arizona',
      fullAddress: 'Desert Solar Park, AZ',
      capacity: '2.0 MW',
      efficiency: '21.5%',
      energySource: 'Solar Photovoltaic',
    }
  },
  // GPU A100 Cluster
  {
    id: 5,
    name: 'GPU Cluster #7 - 16x A100',
    location: 'Singapore Hub',
    type: 'gpu',
    currentPrice: 156.25,
    totalReturn: 22.3,
    expectedIncome: 45.7,
    investors: 198,
    totalLiquidity: 7600000,
    liquidityPercentages: {
      primary: 94.1,
      secondary: 5.9,
    },
    ticker: '1 GPUA',
    marketLink: 'GPU Market',
    // Purchase-related fields
    totalSupply: 300000,
    availableTokens: 275000,
    pricePerToken: 156.25,
    minPurchase: 2,
    maxPurchase: 15000,
    apy: 45.7,
    totalValue: '$7,600,000',
    status: 'active',
    images: ['/api/placeholder/600/400'],
    about: "Enterprise-grade GPU cluster with NVIDIA A100 for AI and HPC workloads.",
    specifications: {
      location: 'Singapore',
      fullAddress: 'Tech Hub, Singapore',
      capacity: '16x NVIDIA A100',
      model: 'NVIDIA A100 80GB',
      powerConsumption: '400W per GPU',
      efficiency: '156 TFLOPs',
      cooling: 'Immersion Cooling',
    }
  },
  // London Retail
  {
    id: 6,
    name: 'London Retail Space #8',
    location: 'London, UK',
    type: 'real-estate',
    currentPrice: 312.50,
    totalReturn: 7.5,
    expectedIncome: 15.2,
    investors: 156,
    totalLiquidity: 6750000,
    liquidityPercentages: {
      primary: 89.7,
      secondary: 10.3,
    },
    ticker: '1 LRET',
    marketLink: 'Property Market',
    // Purchase-related fields
    totalSupply: 150000,
    availableTokens: 125000,
    pricePerToken: 312.50,
    minPurchase: 1,
    maxPurchase: 5000,
    apy: 15.2,
    totalValue: '$6,750,000',
    status: 'active',
    images: ['/api/placeholder/600/400'],
    about: "Prime retail location in central London.",
    specifications: {
      location: 'London, UK',
      fullAddress: 'High Street, London',
      capacity: '8,500 sq ft',
    }
  },
  // Wind Farm
  {
    id: 7,
    name: 'Wind Farm #15 - 5MW',
    location: 'Texas Plains',
    type: 'energy',
    currentPrice: 67.90,
    totalReturn: 11.8,
    expectedIncome: 28.5,
    investors: 178,
    totalLiquidity: 3840000,
    liquidityPercentages: {
      primary: 90.5,
      secondary: 9.5,
    },
    ticker: '1 WIND',
    marketLink: 'Energy Market',
    // Purchase-related fields
    totalSupply: 600000,
    availableTokens: 520000,
    pricePerToken: 67.90,
    minPurchase: 15,
    maxPurchase: 30000,
    apy: 28.5,
    totalValue: '$3,840,000',
    status: 'active',
    images: ['/api/placeholder/600/400'],
    about: "Wind turbine farm generating sustainable energy.",
    specifications: {
      location: 'Texas',
      fullAddress: 'Texas Wind Corridor',
      capacity: '5.0 MW',
      efficiency: '45%',
      energySource: 'Wind Turbine',
    }
  }
];

const AssetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();
  const [activeTab, setActiveTab] = useState('details');
  const [purchaseQuantity, setPurchaseQuantity] = useState<{ [key: number]: number }>({});
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [modalAsset, setModalAsset] = useState<AssetDetails | null>(null);
  
  const asset = mockAssets.find(a => a.id === parseInt(id || '0'));

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
        return 'bg-blue-500/20 text-blue-400';
      case 'real-estate':
        return 'bg-green-500/20 text-green-400';
      case 'energy':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'financial':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  const handleQuantityChange = (assetId: number, quantity: number, nft: AssetDetails) => {
    const clampedQuantity = Math.max(nft.minPurchase, Math.min(quantity, Math.min(nft.maxPurchase, nft.availableTokens)));
    setPurchaseQuantity(prev => ({
      ...prev,
      [assetId]: clampedQuantity
    }));
  };

  const openPurchaseModal = (nft: AssetDetails) => {
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

  const closeModals = () => {
    setShowPurchaseModal(false);
    setModalAsset(null);
  };

  if (!asset) {
    return (
      <div className={`${isCollapsed ? 'ml-16' : 'ml-[280px]'} pt-16 min-h-screen bg-[#2a2a2a] transition-all duration-300`}>
        <div className="p-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Asset Not Found</h1>
              <p className="text-gray-400 mb-6">The requested asset could not be found.</p>
              <button
                onClick={() => navigate('/rwa-vault')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
              >
                Back to RWA Vault
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'details', name: 'Details' },
    { id: 'financials', name: 'Financials' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'offering', name: 'Offering' },
    { id: 'trading', name: 'Trading History' },
  ];

  return (
    <div className={`${isCollapsed ? 'ml-16' : 'ml-[280px]'} pt-16 min-h-screen bg-[#2a2a2a] transition-all duration-300`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/rwa-vault')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <h1 className="text-3xl font-bold text-white">{asset.name}</h1>
              <span className="bg-green-800/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-800/30">
                {asset.type}
              </span>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                {asset.ticker} {asset.marketLink}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-400 text-sm">
                <MapPinIcon className="w-4 h-4 mr-1" />
                {asset.location}
              </div>
              <button className="text-gray-400 hover:text-red-400 transition-colors">
                <HeartIcon className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-200 transition-colors">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 row-span-2">
                  <img
                    src={asset.images[0]}
                    alt={asset.name}
                    className="w-full h-full object-cover rounded-lg border border-gray-600"
                  />
                </div>
                {asset.images.slice(1, 5).map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`${asset.name} ${index + 2}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-600"
                    />
                  </div>
                ))}
                <button className="bg-[#3a3a3a] rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#4a4a4a] hover:text-white transition-colors border border-gray-600">
                  <span className="text-sm font-medium">Show all photos</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-600 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-white'
                        : 'border-transparent text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'details' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">About</h2>
                <div className="text-gray-300 space-y-4 mb-8">
                  {asset.about.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-y-4">
                    {Object.entries(asset.specifications).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="font-medium text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'financials' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Financial Information</h2>
                <p className="text-gray-300">Financial details coming soon...</p>
              </div>
            )}

            {activeTab === 'blockchain' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Blockchain Details</h2>
                <p className="text-gray-300">Blockchain information coming soon...</p>
              </div>
            )}

            {activeTab === 'offering' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Offering Details</h2>
                <p className="text-gray-300">Offering information coming soon...</p>
              </div>
            )}

            {activeTab === 'trading' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Trading History</h2>
                <p className="text-gray-300">Trading history coming soon...</p>
              </div>
            )}
          </div>

          {/* Right Column - Stats and Actions */}
          <div className="lg:col-span-1">
            <div className="bg-[#3a3a3a] rounded-lg border border-gray-600 p-6 sticky top-20">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-600">
                  <span className="text-gray-400">Current Price</span>
                  <span className="font-bold text-xl text-white">${asset.currentPrice}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-600">
                  <span className="text-gray-400">Total Return</span>
                  <span className="font-medium text-white">{asset.totalReturn}%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-600">
                  <span className="text-gray-400">Expected Income</span>
                  <span className="font-medium text-white">{asset.expectedIncome}%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-600">
                  <span className="text-gray-400">Investors</span>
                  <span className="font-medium text-white">{asset.investors}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Total Liquidity</span>
                  <span className="font-bold text-white">${asset.totalLiquidity.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${asset.liquidityPercentages.primary}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{asset.liquidityPercentages.primary}% USDC</span>
                  <span>{asset.liquidityPercentages.secondary}% NTBM</span>
                </div>
              </div>

              <div className="w-full">
                <button 
                  onClick={() => openPurchaseModal(asset)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                >
                  Buy oNFTs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && modalAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#3a3a3a] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-600">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-600">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getColorClass(modalAsset.type)}`}>
                  <ShoppingCartIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Purchase</h3>
                  <p className="text-sm text-gray-400">Buy ownership oNFTs</p>
                </div>
              </div>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-gray-200 transition-colors"
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
                  <h4 className="font-semibold text-white mb-1">{modalAsset.name}</h4>
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {modalAsset.location}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">APY:</span>
                      <span className="font-semibold text-green-400 ml-1">{modalAsset.apy}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Price:</span>
                      <span className="font-semibold text-white ml-1">${modalAsset.pricePerToken}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Controls */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    oNFT Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(modalAsset.id, (purchaseQuantity[modalAsset.id] || modalAsset.minPurchase) - 1, modalAsset)}
                      disabled={(purchaseQuantity[modalAsset.id] || modalAsset.minPurchase) <= modalAsset.minPurchase}
                      className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:bg-gray-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={modalAsset.minPurchase}
                      max={Math.min(modalAsset.maxPurchase, modalAsset.availableTokens)}
                      value={purchaseQuantity[modalAsset.id] || modalAsset.minPurchase}
                      onChange={(e) => handleQuantityChange(modalAsset.id, parseInt(e.target.value) || modalAsset.minPurchase, modalAsset)}
                      className="flex-1 px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleQuantityChange(modalAsset.id, (purchaseQuantity[modalAsset.id] || modalAsset.minPurchase) + 1, modalAsset)}
                      disabled={(purchaseQuantity[modalAsset.id] || modalAsset.minPurchase) >= Math.min(modalAsset.maxPurchase, modalAsset.availableTokens)}
                      className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:bg-gray-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
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
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Purchase Summary */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4 mb-6 border border-blue-500/30">
                <h5 className="font-semibold text-white mb-3">Purchase Summary</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">oNFTs to Buy:</span>
                    <span className="font-semibold text-white">
                      {(purchaseQuantity[modalAsset.id] || modalAsset.minPurchase).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Price per oNFT:</span>
                    <span className="font-semibold text-white">${modalAsset.pricePerToken}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Ownership Percentage:</span>
                    <span className="font-semibold text-blue-400">
                      {(((purchaseQuantity[modalAsset.id] || modalAsset.minPurchase) / modalAsset.totalSupply) * 100).toFixed(3)}%
                    </span>
                  </div>
                  <div className="border-t border-gray-500 pt-2 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-white">Total Cost:</span>
                      <span className="font-bold text-xl text-blue-400">
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
                  className="flex-1 px-4 py-3 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
                  Purchase oNFTs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AssetDetails;