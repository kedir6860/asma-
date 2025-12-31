
import React, { useState } from 'react';

const DataEntry: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const datasets = [
    'ANC Monthly Summary',
    'EPI Weekly Report',
    'Health Center Service Delivery',
    'Gross Disease Registration',
    'PHEM Weekly Data Set'
  ];

  const orgUnits = [
    'Abebe Bikila Health Center',
    'Adama Referral Hospital',
    'Mekelle General Hospital',
    'Jimma Medical Center'
  ];

  const sections = [
    {
      title: 'Reproductive and Maternal Health',
      fields: [
        { label: 'ANC 1st visits - Total', id: 'anc1_total' },
        { label: 'ANC 1st visits - < 16 weeks', id: 'anc1_early' },
        { label: 'ANC 4th visits - Total', id: 'anc4_total' },
        { label: 'Syphilis tests performed', id: 'syph_test' },
        { label: 'Positive syphilis tests', id: 'syph_pos' },
      ]
    },
    {
      title: 'Immunization Services',
      fields: [
        { label: 'Penta 1st dose given', id: 'penta1' },
        { label: 'Penta 3rd dose given', id: 'penta3' },
        { label: 'BCG doses given', id: 'bcg' },
        { label: 'Measles 1st dose', id: 'measles' },
      ]
    }
  ];

  const handleInputChange = (id: string, val: string) => {
    setFormData((prev: any) => ({ ...prev, [id]: val }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 bg-slate-50 border-b border-gray-200">
           <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
                <i className="fa-solid fa-clipboard-list text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Routine Data Entry</h2>
                <p className="text-gray-500">HMIS Form 001 - Monthly Report</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Organization Unit</label>
                <select className="w-full border-gray-300 border p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Select Facility...</option>
                  {orgUnits.map(unit => <option key={unit}>{unit}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Data Set</label>
                <select className="w-full border-gray-300 border p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Select Report...</option>
                  {datasets.map(ds => <option key={ds}>{ds}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Reporting Period</label>
                <input type="month" className="w-full border-gray-300 border p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="2024-03" />
              </div>
           </div>
        </div>

        {/* Form Body */}
        <div className="p-8">
           <div className="space-y-10">
              {sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-800 border-b pb-2 flex items-center">
                    <i className="fa-solid fa-layer-group mr-2 opacity-50"></i>
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {section.fields.map((field) => (
                      <div key={field.id} className="flex items-center justify-between group">
                        <label className="text-sm font-medium text-gray-600 group-hover:text-blue-700 transition-colors">{field.label}</label>
                        <input
                          type="number"
                          placeholder="0"
                          className={`w-24 p-2 border-2 rounded-lg text-right font-mono focus:border-blue-500 outline-none transition-all ${
                            formData[field.id] ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-gray-50 border-gray-200'
                          }`}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-gray-200 flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="text-gray-500 font-bold hover:text-red-600 transition-colors uppercase text-sm">
              <i className="fa-solid fa-trash-can mr-2"></i> Clear Values
            </button>
            <button className="text-gray-500 font-bold hover:text-blue-600 transition-colors uppercase text-sm">
              <i className="fa-solid fa-save mr-2"></i> Save Offline
            </button>
          </div>
          <div className="flex space-x-3">
             <button className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-bold hover:bg-gray-100 uppercase tracking-wider">
               Fill Zeros
             </button>
             <button className="px-10 py-3 bg-blue-600 text-white rounded-lg text-sm font-black hover:bg-blue-700 uppercase tracking-widest shadow-lg shadow-blue-500/30">
               Complete Report
             </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center space-x-8 text-slate-400">
        <div className="flex items-center space-x-2 text-xs">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span>Online and Synced</span>
        </div>
        <div className="text-xs">v2.30.12 Stable Build</div>
      </div>
    </div>
  );
};

export default DataEntry;
