
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { analyzeHealthData } from '../services/geminiService';

const MOCK_DATA = [
  { name: 'Jan', anc1: 4000, anc4: 2400, deliveries: 2400 },
  { name: 'Feb', anc1: 3000, anc4: 1398, deliveries: 2210 },
  { name: 'Mar', anc1: 2000, anc4: 9800, deliveries: 2290 },
  { name: 'Apr', anc1: 2780, anc4: 3908, deliveries: 2000 },
  { name: 'May', anc1: 1890, anc4: 4800, deliveries: 2181 },
  { name: 'Jun', anc1: 2390, anc4: 3800, deliveries: 2500 },
  { name: 'Jul', anc1: 3490, anc4: 4300, deliveries: 2100 },
];

const PIE_DATA = [
  { name: 'Achieved', value: 65, color: '#10b981' },
  { name: 'In Progress', value: 25, color: '#f59e0b' },
  { name: 'Pending', value: 10, color: '#ef4444' },
];

const Dashboard: React.FC = () => {
  const [aiInsight, setAiInsight] = useState<string>('Analyzing data for insights...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      const insight = await analyzeHealthData(MOCK_DATA);
      setAiInsight(insight || 'Unable to load insights.');
      setLoading(false);
    };
    fetchInsight();
  }, []);

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Operational Dashboard</h2>
          <p className="text-gray-500 text-sm">Real-time HMIS summary for Ethiopia FMOH</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white border border-gray-300 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 flex items-center">
            <i className="fa-solid fa-calendar mr-2"></i> Last 6 Months
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 flex items-center shadow-lg">
            <i className="fa-solid fa-download mr-2"></i> Export Report
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'ANC 1st Visit', value: '42,390', change: '+12%', icon: 'fa-person-pregnant', color: 'blue' },
          { title: 'Penta 3 Coverage', value: '88.4%', change: '-2%', icon: 'fa-syringe', color: 'emerald' },
          { title: 'Facility Deliveries', value: '18,502', change: '+5%', icon: 'fa-bed-pulse', color: 'purple' },
          { title: 'Reporting Rate', value: '94.2%', change: '+0.5%', icon: 'fa-clipboard-check', color: 'orange' },
        ].map((metric, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-lg bg-${metric.color}-100 flex items-center justify-center text-${metric.color}-600`}>
              <i className={`fa-solid ${metric.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{metric.title}</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                <span className={`text-xs font-bold ${metric.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Maternal Health Trends (ANC vs Deliveries)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorAnc1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="anc1" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAnc1)" />
                <Area type="monotone" dataKey="deliveries" stroke="#10b981" fillOpacity={0.3} fill="#10b981" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-white/20 p-2 rounded-full">
              <i className="fa-solid fa-robot animate-bounce"></i>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight">AI Health Assistant</h3>
          </div>
          <div className="bg-white/10 rounded-lg p-4 min-h-[200px] border border-white/20">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-sm font-medium">Synthesizing insights...</p>
              </div>
            ) : (
              <div className="text-sm leading-relaxed prose prose-invert">
                {aiInsight.split('\n').map((line, idx) => (
                  <p key={idx} className="mb-2">{line}</p>
                ))}
              </div>
            )}
          </div>
          <div className="mt-6">
            <button className="w-full bg-white text-blue-700 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors shadow-md">
              Ask More Questions
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Indicator Targets</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-4">Top Performing Regions</h3>
           <div className="space-y-4">
              {[
                { name: 'Addis Ababa', value: 98, color: 'blue' },
                { name: 'Oromia', value: 85, color: 'emerald' },
                { name: 'Amhara', value: 82, color: 'indigo' },
                { name: 'SNNP', value: 78, color: 'orange' },
              ].map((reg, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{reg.name}</span>
                    <span>{reg.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`bg-${reg.color}-500 h-2 rounded-full`} style={{ width: `${reg.value}%` }}></div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
