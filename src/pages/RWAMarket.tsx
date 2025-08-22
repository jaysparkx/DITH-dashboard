import React, { useState } from 'react';
import {
  CpuChipIcon,
  BuildingOfficeIcon,
  BoltIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  StarIcon,
  MapPinIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface MarketListing {
  id: number;
  name: string;
  type: 'gpu' | 'real-estate' | 'energy' | 'financial';
  location: string;
  price: string;
  ownershipAvailable: number;
  apy: number;
  healthScore: number;
  rating: number;
  seller: string;
  isSecondary: boolean;
  image?: string;
  specifications: string;
  isFavorite: boolean;
}

const marketListings: MarketListing[] = [
  {
    id: 1,
    name: 'GPU Cluster #15 - 12x RTX 4090',
    type: 'gpu',
    location: 'Norway Data Center',
    price: '$85,000',
    ownershipAvailable: 100,
    apy: 19.5,
    healthScore: 98,
    rating: 4.8,
    seller: 'EDITH Protocol',
    isSecondary: false,
    specifications: '12x RTX 4090, 192GB VRAM, 3000W PSU',
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Downtown Seattle Office Tower',
    type: 'real-estate',
    location: 'Seattle, WA',
    price: '$2,450,000',
    ownershipAvailable: 25,
    apy: 7.8,
    healthScore: 92,
    rating: 4.6,
    seller: 'RealtyDAO',
    isSecondary: false,
    specifications: '40,000 sq ft, Class A, 95% occupied',
    isFavorite: true,
  },
  {
    id: 3,
    name: 'Solar Farm #88 - 5MW Installation',
    type: 'energy',
    location: 'California Desert',
    price: '$450,000',
    ownershipAvailable: 50,
    apy: 11.2,
    healthScore: 96,
    rating: 4.9,
    seller: 'GreenEnergy Collective',
    isSecondary: false,
    specifications: '5MW capacity, 20,000 panels, 25yr warranty',
    isFavorite: false,
  },
  {
    id: 4,
    name: 'GPU Mining Rig #42',
    type: 'gpu',
    location: 'Canada Facility',
    price: '$35,000',
    ownershipAvailable: 75,
    apy: 22.3,
    healthScore: 87,
    rating: 4.2,
    seller: 'CryptoMiner85',
    isSecondary: true,
    specifications: '8x RTX 4070, Custom cooling, ROI 18mo',
    isFavorite: false,
  },
  {
    id: 5,
    name: 'London Commercial Property',
    type: 'real-estate',
    location: 'London, UK',
    price: '$890,000',
    ownershipAvailable: 15,
    apy: 6.5,
    healthScore: 89,
    rating: 4.4,
    seller: 'PropTech Ltd',
    isSecondary: true,
    specifications: '12,000 sq ft, Retail/Office mix, Zone 1',
    isFavorite: true,
  },
  {
    id: 6,
    name: 'Wind Turbine Array #23',
    type: 'energy',
    location: 'Texas Plains',
    price: '$675,000',
    ownershipAvailable: 30,
    apy: 9.8,
    healthScore: 94,
    rating: 4.7,
    seller: 'WindPower Inc',
    isSecondary: false,
    specifications: '10x 500kW turbines, Grid connected, PPA 15yr',
    isFavorite: false,
  },
];

const RWAMarket: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterAPY, setFilterAPY] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [showSecondary, setShowSecondary] = useState(true);
  const [favorites, setFavorites] = useState(new Set([2, 5]));

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
        return 'bg-gradient-to-br from-blue-400 to-blue-600';
      case 'real-estate':
        return 'bg-gradient-to-br from-green-400 to-green-600';
      case 'energy':
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
      case 'financial':
        return 'bg-gradient-to-br from-purple-400 to-purple-600';
      default:
        return 'bg-gradient-to-br from-gray-400 to-gray-600';
    }
  };

  const getRiskLevel = (apy: number) => {
    if (apy < 8) return 'Low';
    if (apy < 15) return 'Medium';
    return 'High';
  };

  const getRiskColor = (apy: number) => {
    if (apy < 8) return 'text-green-600 dark:text-green-400';
    if (apy < 15) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredListings = marketListings.filter(listing => {
    const searchMatch = listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = filterType === 'all' || listing.type === filterType;
    const secondaryMatch = showSecondary || !listing.isSecondary;
    
    return searchMatch && typeMatch && secondaryMatch;
  });

  const totalVolume = marketListings.reduce((sum, listing) => {
    const price = parseFloat(listing.price.replace('$', '').replace(',', ''));
    return sum + price;
  }, 0);

  const avgPrice = totalVolume / marketListings.length;

  return (
    <div className="ml-64 pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">RWA Market</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover and invest in tokenized real-world assets from around the globe
          </p>
        </div>

        {/* Market Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Market Volume</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${(totalVolume / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Price</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${(avgPrice / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Trending Asset</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">GPU Clusters</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Available Assets</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{marketListings.length}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search assets by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-edith-primary"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center space-x-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
              >
                <option value="all">All Types</option>
                <option value="gpu">GPU Clusters</option>
                <option value="real-estate">Real Estate</option>
                <option value="energy">Energy Assets</option>
                <option value="financial">Financial Assets</option>
              </select>

              <select className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm">
                <option>All Prices</option>
                <option>Under $100K</option>
                <option>$100K - $500K</option>
                <option>$500K - $1M</option>
                <option>Over $1M</option>
              </select>

              <select className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm">
                <option>All APY</option>
                <option>Under 10%</option>
                <option>10% - 20%</option>
                <option>Over 20%</option>
              </select>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showSecondary}
                  onChange={(e) => setShowSecondary(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Include Secondary Market</span>
              </label>
            </div>
          </div>
        </div>

        {/* Market Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.map((listing) => {
            const Icon = getIcon(listing.type);
            const isFav = favorites.has(listing.id);
            
            return (
              <div key={listing.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Asset Image/Icon Section */}
                <div className={`h-48 relative ${getColorClass(listing.type)} flex items-center justify-center`}>
                  <Icon className="w-24 h-24 text-white/30" />
                  <div className="absolute top-4 left-4">
                    {listing.isSecondary && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300">
                        Secondary Market
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleFavorite(listing.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  >
                    {isFav ? (
                      <HeartIconSolid className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{listing.name}</h3>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{listing.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {listing.location}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{listing.specifications}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Price</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{listing.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Ownership Available</p>
                      <p className="text-xl font-bold text-edith-primary">{listing.ownershipAvailable}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-600 dark:text-gray-400">APY</p>
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400">{listing.apy}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Health Score</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{listing.healthScore}/100</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Risk</p>
                      <p className={`text-sm font-medium ${getRiskColor(listing.apy)}`}>
                        {getRiskLevel(listing.apy)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Seller</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{listing.seller}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-edith-primary text-white rounded-lg hover:bg-edith-primary/90 transition-colors font-medium">
                      Buy Now
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium">
                      Make Offer
                    </button>
                    <button className="px-4 py-2 bg-edith-secondary text-white rounded-lg hover:bg-edith-secondary/90 transition-colors font-medium">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Load More Assets
          </button>
        </div>
      </div>
    </div>
  );
};

export default RWAMarket;