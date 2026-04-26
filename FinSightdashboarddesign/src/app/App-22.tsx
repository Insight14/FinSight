import { useState } from 'react';
import { Menu, Bell, Settings, User, Search, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#1C1612] relative">
      {/* Background */}
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

      {/* Main Content */}
      <div className={`mt-[60px] px-6 py-6 relative z-10 transition-all duration-300 ${isSidebarCollapsed ? 'ml-0' : 'ml-0'}`}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#D4C5B9] via-[#A0826D] to-[#8B6F56] bg-clip-text text-transparent">
            Financial Overview
          </h1>
          <p className="text-[#A0826D] text-sm">Track your wealth with organic precision</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-3 bg-[#2A2520]/90 backdrop-blur-xl rounded-xl p-6 border border-[#52664F]/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#52664F]/20 rounded-lg border border-[#52664F]/20">
                  <Wallet className="w-5 h-5 text-[#8B9D88]" />
                </div>
                <span className="text-[#A0826D] font-medium text-sm">Net Balance</span>
              </div>
            </div>
            <div className="text-4xl font-bold mb-1.5 text-white">$7,500.00</div>
            <p className="text-[#A0826D] text-xs">Your wealth at a glance</p>
          </div>

          <div className="bg-[#2A2520]/80 backdrop-blur-xl rounded-xl p-5 border border-[#52664F]/20">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 bg-[#52664F]/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-[#8B9D88]" />
              </div>
              <span className="text-[#A0826D] font-medium text-sm">Income</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1.5">$23,700.00</div>
            <p className="text-[#A5B9A3] text-xs">+12.5% from last period</p>
          </div>

          <div className="bg-[#2A2520]/80 backdrop-blur-xl rounded-xl p-5 border border-[#784338]/20">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 bg-[#784338]/10 rounded-lg">
                <TrendingDown className="w-4 h-4 text-[#A87B6F]" />
              </div>
              <span className="text-[#A0826D] font-medium text-sm">Expenses</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1.5">$16,200.00</div>
            <p className="text-[#C19488] text-xs">+8.3% from last period</p>
          </div>

          <div className="bg-[#2A2520]/80 backdrop-blur-xl rounded-xl p-5 border border-[#8B6F56]/20">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 bg-[#8B6F56]/10 rounded-lg">
                <Wallet className="w-4 h-4 text-[#A0826D]" />
              </div>
              <span className="text-[#A0826D] font-medium text-sm">Savings Rate</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1.5">31.6%</div>
            <p className="text-[#A0826D] text-xs">of your income saved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
