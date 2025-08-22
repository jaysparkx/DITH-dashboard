import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  SparklesIcon,
  FireIcon,
  PlusIcon,
  EyeIcon,
  ShoppingCartIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  Square3Stack3DIcon,
  GlobeAltIcon,
  BoltIcon,
  BanknotesIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface oNFT {
  id: string;
  name: string;
  collection: 'gpu' | 'real-estate' | 'energy' | 'financial';
  image: string;
  price: number;
  usdPrice: number;
  apy: number;
  ownership: number;
  assetValue: number;
  status: 'active' | 'maintenance' | 'offline';
  trending: 'up' | 'down' | 'stable';
  owner: string;
  location: string;
  specs: string;
  isFavorite: boolean;
  isVerified: boolean;
  hasOffers: boolean;
  lastSale?: number;
  listingType: 'buy-now' | 'auction';
  auctionEnds?: string;
}

interface Collection {
  id: string;
  name: string;
  type: 'gpu' | 'real-estate' | 'energy' | 'financial';
  floorPrice: number;
  volume24h: number;
  items: number;
  owners: number;
  image: string;
}

interface Activity {
  id: string;
  type: 'sale' | 'listing' | 'offer';
  asset: string;
  price: number;
  from: string;
  to?: string;
  time: string;
  image: string;
}

const mockONFTs: oNFT[] = [
  {
    id: '1',
    name: 'Data Center Austin #3',
    collection: 'gpu',
    image: '/api/placeholder/400/400',
    price: 125000,
    usdPrice: 124750,
    apy: 22.4,
    ownership: 5.5,
    assetValue: 2272727,
    status: 'active',
    trending: 'up',
    owner: '0x1234...5678',
    location: 'Austin, TX',
    specs: '32x H100 GPUs, 1024GB RAM',
    isFavorite: false,
    isVerified: true,
    hasOffers: true,
    lastSale: 115000,
    listingType: 'buy-now',
  },
  {
    id: '2',
    name: 'Miami Office Tower #12',
    collection: 'real-estate',
    image: '/api/placeholder/400/400',
    price: 450000,
    usdPrice: 449100,
    apy: 8.2,
    ownership: 2.3,
    assetValue: 19565217,
    status: 'active',
    trending: 'stable',
    owner: '0x9876...4321',
    location: 'Miami, FL',
    specs: '45,000 sq ft, Class A Office',
    isFavorite: true,
    isVerified: true,
    hasOffers: false,
    listingType: 'auction',
    auctionEnds: '2d 14h 23m',
  },
  {
    id: '3',
    name: 'Solar Farm Nevada #7',
    collection: 'energy',
    image: '/api/placeholder/400/400',
    price: 85000,
    usdPrice: 84830,
    apy: 11.8,
    ownership: 10,
    assetValue: 850000,
    status: 'active',
    trending: 'up',
    owner: '0x5555...9999',
    location: 'Nevada Desert',
    specs: '5MW Capacity, 20,000 panels',
    isFavorite: false,
    isVerified: true,
    hasOffers: true,
    listingType: 'buy-now',
  },
  {
    id: '4',
    name: 'H100 Cluster SF #7',
    collection: 'gpu',
    image: '/api/placeholder/400/400',
    price: 235000,
    usdPrice: 234530,
    apy: 28.5,
    ownership: 8.2,
    assetValue: 2865854,
    status: 'active',
    trending: 'up',
    owner: '0x7777...3333',
    location: 'San Francisco, CA',
    specs: '64x H100 GPUs, 2TB RAM',
    isFavorite: true,
    isVerified: true,
    hasOffers: false,
    lastSale: 195000,
    listingType: 'buy-now',
  },
];

const featuredCollections: Collection[] = [
  {
    id: '1',
    name: 'Premium GPU Clusters',
    type: 'gpu',
    floorPrice: 45000,
    volume24h: 2850000,
    items: 156,
    owners: 89,
    image: '/api/placeholder/300/200',
  },
  {
    id: '2',
    name: 'Commercial Real Estate',
    type: 'real-estate',
    floorPrice: 125000,
    volume24h: 5420000,
    items: 342,
    owners: 156,
    image: '/api/placeholder/300/200',
  },
  {
    id: '3',
    name: 'Renewable Energy Assets',
    type: 'energy',
    floorPrice: 35000,
    volume24h: 1250000,
    items: 89,
    owners: 45,
    image: '/api/placeholder/300/200',
  },
];

const recentActivity: Activity[] = [
  {
    id: '1',
    type: 'sale',
    asset: 'GPU Cluster #42',
    price: 156000,
    from: '0x1234...5678',
    to: '0x8765...4321',
    time: '2 minutes ago',
    image: '/api/placeholder/50/50',
  },
  {
    id: '2',
    type: 'listing',
    asset: 'Solar Farm #15',
    price: 78000,
    from: '0x5555...9999',
    time: '15 minutes ago',
    image: '/api/placeholder/50/50',
  },
  {
    id: '3',
    type: 'offer',
    asset: 'Office Building #8',
    price: 340000,
    from: '0x3333...7777',
    time: '1 hour ago',
    image: '/api/placeholder/50/50',
  },
];

const ONFTMarketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [yieldRange, setYieldRange] = useState({ min: 0, max: 50 });
  const [ownershipRange, setOwnershipRange] = useState({ min: 0, max: 100 });
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-low');
  const [showFilters, setShowFilters] = useState(true);
  const [favorites, setFavorites] = useState(new Set(['2', '4']));
  const [selectedAsset, setSelectedAsset] = useState<oNFT | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCollections, setShowCollections] = useState(true);

  const getCollectionIcon = (collection: string) => {
    switch (collection) {
      case 'gpu':
        return CpuChipIcon;
      case 'real-estate':
        return BuildingOfficeIcon;
      case 'energy':
        return BoltIcon;
      case 'financial':
        return BanknotesIcon;
      default:
        return Square3Stack3DIcon;
    }
  };

  const getCollectionColor = (collection: string) => {
    switch (collection) {
      case 'gpu':
        return 'bg-blue-500';
      case 'real-estate':
        return 'bg-green-500';
      case 'energy':
        return 'bg-yellow-500';
      case 'financial':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
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

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const openAssetDetail = (asset: oNFT) => {
    setSelectedAsset(asset);
    setShowDetailModal(true);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(2)}M`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return price.toString();
  };

  const filteredONFTs = mockONFTs.filter(nft => {
    const categoryMatch = selectedCategory === 'all' || nft.collection === selectedCategory;
    const priceMatch = nft.price >= priceRange.min && nft.price <= priceRange.max;
    const yieldMatch = nft.apy >= yieldRange.min && nft.apy <= yieldRange.max;
    const ownershipMatch = nft.ownership >= ownershipRange.min && nft.ownership <= ownershipRange.max;
    const statusMatch = selectedStatus === 'all' || nft.status === selectedStatus;
    const searchMatch = searchTerm === '' || 
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && priceMatch && yieldMatch && ownershipMatch && statusMatch && searchMatch;
  });

  return (
    <div className="ml-64 pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-edith-primary to-edith-secondary h-80">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 p-8 flex flex-col justify-center h-full max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">EDITH oNFT Marketplace</h1>
          <p className="text-xl text-white/90 mb-6">Discover, collect, and trade ownership of real-world assets</p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-white text-edith-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <PlusIcon className="w-5 h-5 inline mr-2" />
              Create Listing
            </button>
            <button className="px-6 py-3 bg-white/20 text-white border border-white/50 rounded-lg font-semibold hover:bg-white/30 transition-colors">
              How It Works
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {['Explore', 'Collections', 'Activity', 'Stats', 'Create'].map((item) => (
              <button
                key={item}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  item === 'Explore'
                    ? 'border-edith-primary text-edith-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Collection Categories */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { id: 'gpu', name: 'GPU Clusters', icon: CpuChipIcon, color: 'from-blue-500 to-blue-600' },
            { id: 'real-estate', name: 'Real Estate', icon: BuildingOfficeIcon, color: 'from-green-500 to-green-600' },
            { id: 'energy', name: 'Energy Assets', icon: BoltIcon, color: 'from-yellow-500 to-yellow-600' },
            { id: 'financial', name: 'Financial Assets', icon: BanknotesIcon, color: 'from-purple-500 to-purple-600' },
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
              className={`relative overflow-hidden rounded-xl p-6 transition-all ${
                selectedCategory === category.id
                  ? 'ring-2 ring-edith-primary transform scale-105'
                  : 'hover:transform hover:scale-105'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-90`}></div>
              <div className="relative z-10 text-white">
                <category.icon className="w-8 h-8 mb-2" />
                <p className="font-semibold">{category.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex gap-6">
          {/* Modern Filter Sidebar */}
          <div className={`${showFilters ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden`}>
            <div className="space-y-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FunnelIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Quick Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {['🔥 Hot', '✨ New', '💎 Rare', '📈 Trending'].map((filter) => (
                  <button
                    key={filter}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Status Pills */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Status</h4>
                <div className="flex flex-wrap gap-2">
                  {['Buy Now', 'On Auction', 'Has Offers'].map((status) => (
                    <button
                      key={status}
                      className="px-4 py-2 bg-gray-50 dark:bg-gray-900 hover:bg-edith-primary hover:text-white border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 transition-all"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range - Modern Input */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min || ''}
                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-edith-primary"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max === 1000000 ? '' : priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 1000000 })}
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-edith-primary"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              {/* Collections - Modern Accordion */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <button
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setShowCollections(!showCollections)}
                >
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Collections</h4>
                  <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${showCollections ? 'rotate-180' : ''}`} />
                </button>
                {showCollections && (
                  <div className="px-4 pb-4 space-y-2">
                    {[
                      { id: 'gpu', name: 'GPU Clusters', count: 156, icon: CpuChipIcon },
                      { id: 'real-estate', name: 'Real Estate', count: 342, icon: BuildingOfficeIcon },
                      { id: 'energy', name: 'Energy Assets', count: 89, icon: BoltIcon },
                      { id: 'financial', name: 'Financial Assets', count: 67, icon: BanknotesIcon },
                    ].map((collection) => (
                      <button
                        key={collection.id}
                        onClick={() => setSelectedCategory(selectedCategory === collection.id ? 'all' : collection.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                          selectedCategory === collection.id
                            ? 'bg-edith-primary text-white'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <collection.icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{collection.name}</span>
                        </div>
                        <span className="text-xs">{collection.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* APY Filter - Modern Pills */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">APY Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: '0-10%', min: 0, max: 10 },
                    { label: '10-20%', min: 10, max: 20 },
                    { label: '20-30%', min: 20, max: 30 },
                    { label: '30%+', min: 30, max: 100 },
                  ].map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setYieldRange({ min: range.min, max: range.max })}
                      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        yieldRange.min === range.min && yieldRange.max === range.max
                          ? 'bg-edith-primary text-white'
                          : 'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Properties - Modern Chips */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Properties</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">GPU Type</p>
                    <div className="flex flex-wrap gap-2">
                      {['RTX 4090', 'H100', 'A100'].map((gpu) => (
                        <button
                          key={gpu}
                          className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 hover:bg-edith-primary hover:text-white border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 transition-all"
                        >
                          {gpu}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Location</p>
                    <div className="flex flex-wrap gap-2">
                      {['USA', 'Europe', 'Asia'].map((location) => (
                        <button
                          key={location}
                          className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 hover:bg-edith-primary hover:text-white border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 transition-all"
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear All Button */}
              <button className="w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-edith-primary transition-colors">
                Clear all filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-edith-primary"
                  />
                </div>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="ml-4 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="apy-high">APY: High to Low</option>
                <option value="recent">Recently Listed</option>
              </select>
            </div>

            {/* oNFT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredONFTs.map((nft) => {
                const Icon = getCollectionIcon(nft.collection);
                const isFav = favorites.has(nft.id);
                
                return (
                  <div
                    key={nft.id}
                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Section */}
                    <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Collection Badge */}
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${getCollectionColor(nft.collection)}`}>
                        <Icon className="w-4 h-4 inline mr-1" />
                        {nft.collection.replace('-', ' ').toUpperCase()}
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => openAssetDetail(nft)}
                          className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                          <EyeIcon className="w-5 h-5 inline mr-2" />
                          Quick View
                        </button>
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(nft.id)}
                        className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
                      >
                        {isFav ? (
                          <HeartIconSolid className="w-5 h-5 text-red-500" />
                        ) : (
                          <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                      </button>

                      {/* Verified Badge */}
                      {nft.isVerified && (
                        <div className="absolute bottom-4 right-4">
                          <CheckBadgeIcon className="w-6 h-6 text-blue-500" />
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{nft.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{nft.location}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <ShareIcon className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Price Section */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {nft.price.toLocaleString()} cUSD
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              ${nft.usdPrice.toLocaleString()}
                            </p>
                          </div>
                          {nft.listingType === 'auction' && nft.auctionEnds && (
                            <div className="text-right">
                              <ClockIcon className="w-4 h-4 text-gray-400 inline mr-1" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{nft.auctionEnds}</span>
                            </div>
                          )}
                        </div>
                        {nft.lastSale && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Last sale: {nft.lastSale.toLocaleString()} cUSD
                          </p>
                        )}
                      </div>

                      {/* Asset Metrics */}
                      <div className="grid grid-cols-3 gap-2 mb-3 py-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-400">APY</p>
                          <p className="text-sm font-semibold text-green-600 dark:text-green-400">{nft.apy}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-400">Ownership</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{nft.ownership}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-400">Value</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">${formatPrice(nft.assetValue)}</p>
                        </div>
                      </div>

                      {/* Status Indicators */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center ${getStatusColor(nft.status)}`}>
                            <span className={`w-2 h-2 rounded-full mr-1 ${
                              nft.status === 'active' ? 'bg-green-500' :
                              nft.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></span>
                            <span className="text-xs capitalize">{nft.status}</span>
                          </span>
                          {nft.trending !== 'stable' && (
                            <span className="inline-flex items-center">
                              {nft.trending === 'up' ? (
                                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                              ) : (
                                <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                              )}
                            </span>
                          )}
                        </div>
                        {nft.hasOffers && (
                          <span className="text-xs text-edith-primary font-medium">Has Offers</span>
                        )}
                      </div>

                      {/* Action Button */}
                      <button className="w-full py-2 bg-edith-primary text-white rounded-lg font-medium hover:bg-edith-primary/90 transition-colors">
                        {nft.listingType === 'auction' ? 'Place Bid' : 'Buy Now'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Featured Collections */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trending Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredCollections.map((collection) => (
                  <div key={collection.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gray-200 dark:bg-gray-700">
                      <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{collection.name}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Floor Price</p>
                          <p className="font-medium text-gray-900 dark:text-white">{formatPrice(collection.floorPrice)} cUSD</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">24h Volume</p>
                          <p className="font-medium text-gray-900 dark:text-white">{formatPrice(collection.volume24h)} cUSD</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Items</p>
                          <p className="font-medium text-gray-900 dark:text-white">{collection.items}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Owners</p>
                          <p className="font-medium text-gray-900 dark:text-white">{collection.owners}</p>
                        </div>
                      </div>
                      <button className="w-full mt-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        View Collection
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="w-80">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img src={activity.image} alt={activity.asset} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.asset}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                        {activity.type === 'sale' && (
                          <>
                            <span className="text-green-600 dark:text-green-400">Sold</span>
                            <span>for {formatPrice(activity.price)} cUSD</span>
                          </>
                        )}
                        {activity.type === 'listing' && (
                          <>
                            <span className="text-blue-600 dark:text-blue-400">Listed</span>
                            <span>for {formatPrice(activity.price)} cUSD</span>
                          </>
                        )}
                        {activity.type === 'offer' && (
                          <>
                            <span className="text-purple-600 dark:text-purple-400">Offer</span>
                            <span>of {formatPrice(activity.price)} cUSD</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-edith-primary hover:text-edith-primary/80 font-medium">
                View All Activity →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Detail Modal */}
      {showDetailModal && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedAsset.name}</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Image and Details */}
                <div>
                  <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                    <img src={selectedAsset.image} alt={selectedAsset.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Properties</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 dark:text-gray-400">Location</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedAsset.location}</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 dark:text-gray-400">Status</p>
                          <p className={`text-sm font-medium capitalize ${getStatusColor(selectedAsset.status)}`}>
                            {selectedAsset.status}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Specifications</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAsset.specs}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Trading Info */}
                <div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Current Price</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {selectedAsset.price.toLocaleString()} cUSD
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ${selectedAsset.usdPrice.toLocaleString()}
                        </p>
                      </div>
                      <button
                        className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                        onClick={() => toggleFavorite(selectedAsset.id)}
                      >
                        {favorites.has(selectedAsset.id) ? (
                          <HeartIconSolid className="w-6 h-6 text-red-500" />
                        ) : (
                          <HeartIcon className="w-6 h-6 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <button className="w-full py-3 bg-edith-primary text-white rounded-lg font-semibold hover:bg-edith-primary/90 transition-colors mb-2">
                      {selectedAsset.listingType === 'auction' ? 'Place Bid' : 'Buy Now'}
                    </button>
                    <button className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                      Make Offer
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Asset Performance</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Current APY</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">{selectedAsset.apy}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Ownership Share</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedAsset.ownership}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Total Asset Value</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            ${selectedAsset.assetValue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Ownership History</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Current Owner</span>
                          <span className="font-mono text-gray-900 dark:text-white">{selectedAsset.owner}</span>
                        </div>
                        {selectedAsset.lastSale && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Last Sale Price</span>
                            <span className="text-gray-900 dark:text-white">
                              {selectedAsset.lastSale.toLocaleString()} cUSD
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ONFTMarketplace;