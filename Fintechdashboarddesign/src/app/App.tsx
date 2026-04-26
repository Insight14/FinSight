import { useState } from 'react';
import { Menu, Bell, Settings, User, Search, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Charts } from './components/Charts';
import { motion } from 'motion/react';

const trendData = [
  { date: 'Mar 1', income: 3200, expenses: 2100 },
  { date: 'Mar 8', income: 3500, expenses: 2300 },
  { date: 'Mar 15', income: 3100, expenses: 2600 },
  { date: 'Mar 22', income: 3800, expenses: 2400 },
  { date: 'Mar 29', income: 4200, expenses: 2800 },
  { date: 'Apr 5', income: 3900, expenses: 2500 },
];

const categoryData = [
  { category: 'Shopping', amount: 1240 },
  { category: 'Food', amount: 890 },
  { category: 'Transport', amount: 560 },
  { category: 'Entertainment', amount: 430 },
  { category: 'Bills', amount: 1120 },
];

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const totalIncome = trendData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = trendData.reduce((sum, item) => sum + item.expenses, 0);
  const netBalance = totalIncome - totalExpenses;
  const isPositive = netBalance >= 0;

  return (
    <div className="min-h-screen w-full bg-[#1C1612] relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(82,102,79,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,67,56,0.06),transparent_50%)]"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#2A2520]/90 backdrop-blur-xl">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-1.5 rounded-lg hover:bg-white/5">
                <Menu className="w-5 h-5 text-[#A0826D]" />
              </button>
              <div className="relative">
                <div className="absolute inset-0 bg-[#52664F] rounded-lg blur opacity-50"></div>
                <div className="relative bg-gradient-to-br from-[#52664F] to-[#3D4E3B] p-2 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-[#D4C5B9] to-[#A0826D] bg-clip-text text-transparent">finSight</h1>
                <p className="text-[10px] text-[#8B6F56]">Financial Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10">
                <Bell className="w-4 h-4 text-[#A0826D]" />
              </button>
              <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10">
                <Settings className="w-4 h-4 text-[#A0826D]" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar isCollapsed={isSidebarCollapsed} />

      <div className={`mt-[60px] px-6 py-6 relative z-10 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#D4C5B9] via-[#A0826D] to-[#8B6F56] bg-clip-text text-transparent">
            Financial Overview
          </h1>
          <div className="h-0.5 w-16 bg-gradient-to-r from-[#52664F] via-[#6B8268] to-transparent rounded-full mb-2"></div>
          <p className="text-[#A0826D] text-sm">Track your wealth with organic precision</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex-1 min-w-[200px] relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B6F56]" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm rounded-xl border border-[#52664F]/20 bg-[#2A2520]/60 backdrop-blur-xl text-white placeholder:text-[#8B6F56] focus:outline-none focus:ring-2 focus:ring-[#52664F]/50"
            />
          </div>

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 text-sm rounded-xl border border-[#52664F]/20 bg-[#2A2520]/60 backdrop-blur-xl text-white focus:outline-none focus:ring-2 focus:ring-[#52664F]/50 cursor-pointer"
          >
            <option value="7days" className="bg-[#2A2520]">Last 7 days</option>
            <option value="30days" className="bg-[#2A2520]">Last 30 days</option>
            <option value="90days" className="bg-[#2A2520]">Last 90 days</option>
            <option value="year" className="bg-[#2A2520]">This year</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 text-sm rounded-xl border border-[#52664F]/20 bg-[#2A2520]/60 backdrop-blur-xl text-white focus:outline-none focus:ring-2 focus:ring-[#52664F]/50 cursor-pointer"
          >
            <option value="all" className="bg-[#2A2520]">All categories</option>
            <option value="shopping" className="bg-[#2A2520]">Shopping</option>
            <option value="food" className="bg-[#2A2520]">Food & Dining</option>
            <option value="transport" className="bg-[#2A2520]">Transport</option>
            <option value="entertainment" className="bg-[#2A2520]">Entertainment</option>
            <option value="bills" className="bg-[#2A2520]">Bills & Utilities</option>
          </select>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            key="net-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 relative"
          >
            <div className="bg-[#2A2520]/90 backdrop-blur-xl rounded-xl p-6 border border-[#52664F]/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#52664F]/20 rounded-lg border border-[#52664F]/20">
                    <Wallet className="w-5 h-5 text-[#8B9D88]" />
                  </div>
                  <span className="text-[#A0826D] font-medium text-sm">Net Balance</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  isPositive ? 'bg-[#52664F]/10 text-[#A5B9A3]' : 'bg-[#784338]/10 text-[#C19488]'
                }`}>
                  {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{isPositive ? '+' : ''}{((netBalance / (totalIncome || 1)) * 100).toFixed(1)}%</span>
                </div>
              </div>
              <div className="text-4xl font-bold mb-1.5 text-white">
                ${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[#A0826D] text-xs">Your wealth at a glance</p>
            </div>
          </motion.div>

          <motion.div
            key="income-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-[#2A2520]/80 backdrop-blur-xl rounded-xl p-5 border border-[#52664F]/20">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 bg-[#52664F]/10 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-[#8B9D88]" />
                </div>
                <span className="text-[#A0826D] font-medium text-sm">Income</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1.5">
                ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[#A5B9A3] text-xs">+12.5% from last period</p>
            </div>
          </motion.div>

          <motion.div
            key="expenses-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#2A2520]/80 backdrop-blur-xl rounded-xl p-5 border border-[#784338]/20">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 bg-[#784338]/10 rounded-lg">
                  <TrendingDown className="w-4 h-4 text-[#A87B6F]" />
                </div>
                <span className="text-[#A0826D] font-medium text-sm">Expenses</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1.5">
                ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[#C19488] text-xs">+8.3% from last period</p>
            </div>
          </motion.div>

          <motion.div
            key="savings-rate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-[#2A2520]/80 backdrop-blur-xl rounded-xl p-5 border border-[#8B6F56]/20">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 bg-[#8B6F56]/10 rounded-lg">
                  <Wallet className="w-4 h-4 text-[#A0826D]" />
                </div>
                <span className="text-[#A0826D] font-medium text-sm">Savings Rate</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1.5">
                {((netBalance / (totalIncome || 1)) * 100).toFixed(1)}%
              </div>
              <p className="text-[#A0826D] text-xs">of your income saved</p>
            </div>
          </motion.div>
        </div>

        <Charts trendData={trendData} categoryData={categoryData} />
      </div>
    </div>
  );
}
