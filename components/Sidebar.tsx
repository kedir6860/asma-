
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-line' },
    { id: View.DATA_ENTRY, label: 'Data Entry', icon: 'fa-edit' },
    { id: View.DATA_QUALITY, label: 'Data Quality', icon: 'fa-check-double' },
    { id: View.REPORTS, label: 'Reports', icon: 'fa-file-alt' },
    { id: View.PIVOT_TABLE, label: 'Pivot Table', icon: 'fa-table' },
    { id: View.VISUALIZER, label: 'Data Visualizer', icon: 'fa-chart-bar' },
    { id: View.MAPS, label: 'GIS / Maps', icon: 'fa-map-marked-alt' },
    { id: View.SCORECARD, label: 'Scorecard', icon: 'fa-th' },
    { id: View.SETTINGS, label: 'Settings', icon: 'fa-cog' },
  ];

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen flex flex-col shadow-xl">
      <div className="p-4 bg-slate-900 border-b border-slate-700 flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded shadow-lg">
          <i className="fa-solid fa-hospital text-xl"></i>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">DHIS2 Ethiopia</h1>
          <p className="text-xs text-slate-400">HMIS Portal v2.30</p>
        </div>
      </div>
      
      <nav className="flex-grow mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-all duration-200 border-l-4 ${
              currentView === item.id 
                ? 'bg-slate-700/50 border-blue-500 text-blue-400' 
                : 'border-transparent text-slate-400 hover:bg-slate-700/30 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-700/30 rounded-lg p-3 text-xs text-slate-400">
          <p>Logged in as:</p>
          <p className="font-semibold text-white truncate">sysadmin_et@fmoh.gov.et</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
