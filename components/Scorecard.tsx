
import React from 'react';

const Scorecard: React.FC = () => {
  const regions = [
    "Addis Ababa Regional Health Bureau",
    "Afar Regional Health Bureau",
    "Amhara Regional Health Bureau",
    "Benishangul Gumuz Regional Health Bureau",
    "Gambella Regional Health Bureau",
    "Harari Regional Health Bureau",
    "Oromiya Regional Health Bureau",
    "Somali Regional Health Bureau",
    "Tigray Regional Health Bureau"
  ];

  const indicators = [
    { name: "ANC 1st visit coverage (%)", cat: "Antenatal Care" },
    { name: "ANC 4th visit coverage (%)", cat: "Antenatal Care" },
    { name: "Penta 3 coverage (%)", cat: "Immunization" },
    { name: "Measles coverage (%)", cat: "Immunization" },
    { name: "Facility delivery (%)", cat: "Delivery" },
    { name: "Postnatal care coverage (%)", cat: "PNC" }
  ];

  // Helper to get random status color
  const getCellColor = (val: number) => {
    if (val > 85) return 'bg-emerald-500 text-white';
    if (val > 70) return 'bg-yellow-400 text-gray-900';
    if (val > 50) return 'bg-orange-400 text-white';
    return 'bg-red-500 text-white';
  };

  const getRandomValue = () => Math.floor(Math.random() * 50) + 50;

  return (
    <div className="p-6 overflow-hidden flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">RMNCAH Scorecard</h2>
          <p className="text-gray-500">Ethiopia National Health Performance Indicators - 2024</p>
        </div>
        <div className="flex items-center space-x-2">
            <span className="flex items-center text-xs"><span className="w-3 h-3 bg-emerald-500 rounded-full mr-1"></span> Achieved</span>
            <span className="flex items-center text-xs"><span className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></span> Warning</span>
            <span className="flex items-center text-xs"><span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span> Critical</span>
        </div>
      </div>

      <div className="overflow-auto flex-grow rounded-lg border border-gray-100">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white sticky top-0 z-10">
              <th className="p-4 font-bold uppercase tracking-wider text-xs border-r border-slate-700 min-w-[300px]">Organizational Unit</th>
              {indicators.map((ind, i) => (
                <th key={i} className="p-4 font-bold text-center text-[10px] uppercase tracking-tight leading-tight w-32 border-r border-slate-700">
                  <span className="block text-slate-400 mb-1">{ind.cat}</span>
                  {ind.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {regions.map((region, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold text-gray-700 border-r border-gray-100">{region}</td>
                {indicators.map((_, cIdx) => {
                  const val = getRandomValue();
                  return (
                    <td key={cIdx} className={`p-4 text-center font-bold border-r border-gray-100 ${getCellColor(val)}`}>
                      {val}%
                      <div className="text-[10px] opacity-60 flex justify-center mt-1">
                        <i className={`fa-solid fa-caret-${val > 75 ? 'up' : 'down'} mr-1`}></i>
                        {(Math.random() * 5).toFixed(1)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg flex justify-between items-center text-xs text-gray-500 italic">
        <p>Source: Federal Ministry of Health DHIS2 Production Server</p>
        <div className="flex space-x-4">
            <button className="text-blue-600 font-bold hover:underline">DRAG TO REORDER</button>
            <button className="text-blue-600 font-bold hover:underline">EXPORT TO PDF</button>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
