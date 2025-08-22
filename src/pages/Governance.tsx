import React, { useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  MinusCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface Proposal {
  id: number;
  title: string;
  description: string;
  type: 'parameter' | 'upgrade' | 'treasury' | 'governance';
  status: 'active' | 'passed' | 'failed' | 'pending';
  votesFor: number;
  votesAgainst: number;
  abstain: number;
  totalVotes: number;
  quorum: number;
  endTime: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  proposer: string;
  userVoted?: 'for' | 'against' | 'abstain' | null;
}

const proposals: Proposal[] = [
  {
    id: 1,
    title: 'Protocol Upgrade v2.1',
    description: 'Implement new yield optimization algorithms and improve gas efficiency by 30%',
    type: 'upgrade',
    status: 'active',
    votesFor: 12500000,
    votesAgainst: 2800000,
    abstain: 450000,
    totalVotes: 15750000,
    quorum: 10000000,
    endTime: '2 days remaining',
    impact: 'high',
    proposer: 'EDITH Core Team',
    userVoted: null,
  },
  {
    id: 2,
    title: 'Increase Vault Fee to 2.5%',
    description: 'Adjust management fee from 2% to 2.5% to fund additional security audits',
    type: 'parameter',
    status: 'active',
    votesFor: 8200000,
    votesAgainst: 6800000,
    abstain: 200000,
    totalVotes: 15200000,
    quorum: 10000000,
    endTime: '5 days remaining',
    impact: 'medium',
    proposer: 'Security Committee',
    userVoted: 'for',
  },
  {
    id: 3,
    title: 'Treasury Allocation for Marketing',
    description: 'Allocate 500K cUSD from treasury for Q4 marketing and partnership initiatives',
    type: 'treasury',
    status: 'passed',
    votesFor: 18200000,
    votesAgainst: 3400000,
    abstain: 800000,
    totalVotes: 22400000,
    quorum: 10000000,
    endTime: 'Ended 3 days ago',
    impact: 'low',
    proposer: 'Marketing DAO',
    userVoted: 'for',
  },
  {
    id: 4,
    title: 'Emergency Pause Implementation',
    description: 'Add emergency pause functionality to all vault contracts for security purposes',
    type: 'upgrade',
    status: 'failed',
    votesFor: 6800000,
    votesAgainst: 12200000,
    abstain: 1200000,
    totalVotes: 20200000,
    quorum: 10000000,
    endTime: 'Ended 1 week ago',
    impact: 'critical',
    proposer: 'Community Member',
    userVoted: 'against',
  },
];

const Governance: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  const [voteChoice, setVoteChoice] = useState<'for' | 'against' | 'abstain' | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'passed':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'failed':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low':
        return 'text-green-600 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'high':
        return 'text-orange-600 dark:text-orange-400';
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'parameter':
        return ChartBarIcon;
      case 'upgrade':
        return ExclamationTriangleIcon;
      case 'treasury':
        return UserGroupIcon;
      case 'governance':
        return ClockIcon;
      default:
        return ClockIcon;
    }
  };

  const filteredProposals = filter === 'all' 
    ? proposals 
    : proposals.filter(p => p.status === filter);

  const userVotingPower = 25000; // User's $ED token balance
  const totalSupply = 100000000;
  const votingPowerPercent = ((userVotingPower / totalSupply) * 100).toFixed(4);

  const participationRate = 68.5; // Mock participation rate
  const proposalSuccessRate = 72.3; // Mock success rate

  return (
    <div className="ml-64 pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Governance</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Participate in protocol governance and shape the future of EDITH
          </p>
        </div>

        {/* Governance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Your $ED Balance</p>
              <UserGroupIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{userVotingPower.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{votingPowerPercent}% voting power</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Participation Rate</p>
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{participationRate}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Proposal Success Rate</p>
              <CheckCircleIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{proposalSuccessRate}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Governance Rewards</p>
              <UserGroupIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-edith-secondary">$456.78</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'all', name: 'All Proposals', count: proposals.length },
              { id: 'active', name: 'Active', count: proposals.filter(p => p.status === 'active').length },
              { id: 'passed', name: 'Passed', count: proposals.filter(p => p.status === 'passed').length },
              { id: 'failed', name: 'Failed', count: proposals.filter(p => p.status === 'failed').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  filter === tab.id
                    ? 'border-edith-primary text-edith-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Proposals */}
        <div className="space-y-6">
          {filteredProposals.map((proposal) => {
            const TypeIcon = getTypeIcon(proposal.type);
            const forPercent = (proposal.votesFor / proposal.totalVotes) * 100;
            const againstPercent = (proposal.votesAgainst / proposal.totalVotes) * 100;
            const abstainPercent = (proposal.abstain / proposal.totalVotes) * 100;
            const quorumPercent = (proposal.totalVotes / proposal.quorum) * 100;

            return (
              <div key={proposal.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-edith-primary/10 rounded-lg">
                      <TypeIcon className="w-6 h-6 text-edith-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{proposal.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(proposal.status)}`}>
                          {proposal.status.toUpperCase()}
                        </span>
                        <span className={`text-sm font-medium ${getImpactColor(proposal.impact)}`}>
                          {proposal.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{proposal.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>Proposed by {proposal.proposer}</span>
                        <span>•</span>
                        <span>{proposal.endTime}</span>
                        <span>•</span>
                        <span className="capitalize">{proposal.type.replace('-', ' ')} Proposal</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voting Results */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Voting Progress</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {(quorumPercent).toFixed(1)}% of quorum reached
                    </span>
                  </div>

                  {/* Vote Bars */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <div className="w-16 text-sm text-gray-600 dark:text-gray-400">For</div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mx-3">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${forPercent}%` }}
                        ></div>
                      </div>
                      <div className="w-20 text-sm text-right">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {(proposal.votesFor / 1000000).toFixed(1)}M
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">
                          ({forPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-16 text-sm text-gray-600 dark:text-gray-400">Against</div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mx-3">
                        <div
                          className="bg-red-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${againstPercent}%` }}
                        ></div>
                      </div>
                      <div className="w-20 text-sm text-right">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {(proposal.votesAgainst / 1000000).toFixed(1)}M
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">
                          ({againstPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-16 text-sm text-gray-600 dark:text-gray-400">Abstain</div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mx-3">
                        <div
                          className="bg-gray-400 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${abstainPercent}%` }}
                        ></div>
                      </div>
                      <div className="w-20 text-sm text-right">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {(proposal.abstain / 1000).toFixed(0)}K
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">
                          ({abstainPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quorum Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Quorum Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {(proposal.totalVotes / 1000000).toFixed(1)}M / {(proposal.quorum / 1000000).toFixed(0)}M
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          quorumPercent >= 100 ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(quorumPercent, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    {proposal.userVoted ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          You voted {proposal.userVoted.toUpperCase()}
                        </span>
                      </div>
                    ) : proposal.status === 'active' ? (
                      <div className="flex space-x-2">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          <CheckCircleIcon className="w-4 h-4" />
                          <span>Vote For</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          <XCircleIcon className="w-4 h-4" />
                          <span>Vote Against</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                          <MinusCircleIcon className="w-4 h-4" />
                          <span>Abstain</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">Voting ended</span>
                    )}
                  </div>
                  <button className="px-4 py-2 bg-edith-primary text-white rounded-lg hover:bg-edith-primary/90 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Your Governance Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Governance Activity</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-edith-primary">8</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Proposals Voted</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-edith-secondary">$456.78</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Governance Rewards</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Proposals Created</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Delegate Voting Power</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You can delegate your voting power to another address
                </p>
              </div>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Delegate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;