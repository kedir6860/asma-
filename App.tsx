
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Scorecard from './components/Scorecard';
import DataEntry from './components/DataEntry';
import Maps from './components/Maps';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [showProfile, setShowProfile] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard />;
      case View.SCORECARD:
        return <Scorecard />;
      case View.DATA_ENTRY:
        return <DataEntry />;
      case View.MAPS:
        return <Maps />;
      case View.REPORTS:
        return (
          <div className="p-20 text-center space-y-4">
            <i className="fa-solid fa-file-invoice text-6xl text-slate-300"></i>
            <h2 className="text-2xl font-bold text-slate-800">Standard Reports</h2>
            <p className="text-slate-500 max-w-md mx-auto">This module allows generation of pre-defined standard HMIS reports in PDF/Excel format.</p>
            <button onClick={() => setCurrentView(View.DASHBOARD)} className="text-blue-600 font-bold">Back to Dashboard</button>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-10 animate-fadeIn">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
              <i className="fa-solid fa-screwdriver-wrench text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Module Under Maintenance</h2>
            <p className="text-gray-500 max-w-sm">The <b>{currentView.replace('_', ' ')}</b> module is being optimized for the 2.30 Ethiopia deployment.</p>
            <button 
              onClick={() => setCurrentView(View.DASHBOARD)}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-sm shadow-md"
            >
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Header */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 lg:hidden">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
            <div className="bg-slate-100 px-3 py-1.5 rounded-full flex items-center space-x-2 border border-gray-200">
               <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
               <span className="text-xs font-bold text-slate-600 uppercase">Production Server</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <button className="text-gray-500 hover:text-blue-600 relative transition-colors">
                <i className="fa-solid fa-bell text-xl"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
              </button>
            </div>
            
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-3 focus:outline-none hover:opacity-80 transition-opacity"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-800 leading-none">Abebe Kebede</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tighter">HMIS Specialist</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-lg">
                  AK
                </div>
              </button>
              
              {showProfile && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeInScale">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <p className="text-sm font-bold">Abebe Kebede</p>
                    <p className="text-xs text-gray-500">FMOH Ethiopia</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center">
                    <i className="fa-solid fa-user-circle mr-3 text-gray-400"></i> Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center">
                    <i className="fa-solid fa-key mr-3 text-gray-400"></i> Account Settings
                  </button>
                  <div className="border-t border-gray-50 mt-2 pt-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                      <i className="fa-solid fa-right-from-bracket mr-3"></i> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="max-w-[1600px] mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
