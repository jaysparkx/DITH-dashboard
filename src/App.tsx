import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { SidebarProvider } from './contexts/SidebarContext';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RWAVault from './pages/RWAVault';
import YieldVaults from './pages/YieldVaults';
import AssetsMonitoring from './pages/AssetsMonitoring';
import RWAMarket from './pages/RWAMarket';
import TransactionHistory from './pages/TransactionHistory';
import Governance from './pages/Governance';
import ONFTMarketplace from './pages/ONFTMarketplace';
import InstitutionsTokenizer from './pages/InstitutionsTokenizer';
import AssetDetails from './pages/AssetDetails';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SidebarProvider>
          <Router>
            <div className="min-h-screen bg-[#2a2a2a]">
              <Sidebar />
              <Header />
              <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rwa-vault" element={<RWAVault />} />
            <Route path="/yield-vaults" element={<YieldVaults />} />
            <Route path="/assets-monitoring" element={<AssetsMonitoring />} />
            <Route path="/rwa-market" element={<RWAMarket />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/institutions-tokenizer" element={<InstitutionsTokenizer />} />
            <Route path="/asset/:id" element={<AssetDetails />} />
            <Route path="/cusd-management" element={
              <div className="ml-[280px] pt-16 min-h-screen bg-[#2a2a2a] transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center max-w-md">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <h1 className="text-3xl font-bold text-white mb-4">DeFi Management</h1>
                      <p className="text-gray-400 mb-6">
                        Comprehensive DeFi portfolio management tools are currently in development. Track, manage, and optimize your decentralized finance positions with powerful analytics and automation.
                      </p>
                      <div className="inline-flex items-center px-4 py-2 bg-blue-900/30 text-blue-400 rounded-lg text-sm font-medium">
                        🚀 Launching Q2 2024
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/settings" element={
              <div className="ml-[280px] pt-16 min-h-screen bg-[#2a2a2a] transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center max-w-md">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h1 className="text-3xl font-bold text-white mb-4">Settings & Account</h1>
                      <p className="text-gray-400 mb-6">
                        Customize your experience with advanced settings, account management, security preferences, and notification controls.
                      </p>
                      <div className="inline-flex items-center px-4 py-2 bg-gray-700 text-gray-400 rounded-lg text-sm font-medium">
                        ⚙️ Feature Complete Soon
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
              </Routes>
            </div>
          </Router>
        </SidebarProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
