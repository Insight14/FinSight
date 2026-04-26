import { LayoutDashboard, CreditCard, TrendingUp, Target, Wallet, PieChart, Settings, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: CreditCard, badge: '12' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'budget', label: 'Budget', icon: PieChart },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'accounts', label: 'Accounts', icon: Wallet },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <aside className={`fixed left-0 top-[60px] bottom-0 border-r border-white/10 bg-[#2A2520]/90 backdrop-blur-xl z-40 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full p-4">
        <div className="flex-1 space-y-1.5">
          {!isCollapsed && (
            <p className="text-[10px] font-semibold text-[#8B6F56] uppercase tracking-wider mb-3 px-2">Main Menu</p>
          )}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-lg transition-all group ${
                activeItem === item.id
                  ? 'bg-[#52664F]/20 border border-[#52664F]/30 text-white'
                  : 'text-[#A0826D] hover:bg-white/5 hover:text-white border border-transparent'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <div className={`flex items-center ${isCollapsed ? '' : 'gap-2.5'}`}>
                <item.icon className={`w-4 h-4 ${
                  activeItem === item.id ? 'text-[#6B8268]' : 'text-[#8B6F56] group-hover:text-[#6B8268]'
                } transition-colors`} />
                {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
              </div>
              {!isCollapsed && item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#784338]/20 text-[#A87B6F] border border-[#784338]/30">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          {!isCollapsed && (
            <div className="mt-4 p-4 rounded-xl bg-[#52664F]/10 border border-[#52664F]/20">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="p-1.5 bg-[#52664F]/20 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5 text-[#8B9D88]" />
                </div>
                <span className="text-xs font-medium text-white">Monthly Goal</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A0826D]">Progress</span>
                  <span className="text-white font-semibold">68%</span>
                </div>
                <div className="h-1.5 bg-[#4A3F35] rounded-full overflow-hidden">
                  <div className="h-full bg-[#52664F] rounded-full" style={{ width: '68%' }}></div>
                </div>
                <p className="text-[10px] text-[#A0826D] mt-1.5">$3,400 of $5,000</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1.5 pt-4 border-t border-white/10">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'} px-3 py-2.5 rounded-lg transition-all ${
                activeItem === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-[#A0826D] hover:bg-white/5 hover:text-white'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4" />
              {!isCollapsed && <span className="font-medium text-xs">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
