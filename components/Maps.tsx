
import React, { useState } from 'react';

interface MapRegion {
  id: string;
  name: string;
  value: number;
  facilities: number;
  outbreakLevel: 'low' | 'medium' | 'high';
}

const REGIONS: MapRegion[] = [
  { id: 'AA', name: 'Addis Ababa', value: 95, facilities: 420, outbreakLevel: 'low' },
  { id: 'AF', name: 'Afar', value: 45, facilities: 85, outbreakLevel: 'medium' },
  { id: 'AM', name: 'Amhara', value: 78, facilities: 310, outbreakLevel: 'low' },
  { id: 'BG', name: 'Benishangul-Gumuz', value: 55, facilities: 62, outbreakLevel: 'high' },
  { id: 'GA', name: 'Gambella', value: 40, facilities: 45, outbreakLevel: 'medium' },
  { id: 'HA', name: 'Harari', value: 88, facilities: 30, outbreakLevel: 'low' },
  { id: 'OR', name: 'Oromia', value: 82, facilities: 540, outbreakLevel: 'medium' },
  { id: 'SO', name: 'Somali', value: 35, facilities: 120, outbreakLevel: 'high' },
  { id: 'SN', name: 'SNNP', value: 70, facilities: 290, outbreakLevel: 'low' },
  { id: 'TI', name: 'Tigray', value: 65, facilities: 150, outbreakLevel: 'medium' }
];

const REGION_OFFSETS: Record<string, string> = {
  AA: "M500,380 L520,380 L520,400 L500,400 Z",
  AF: "M550,250 L750,220 L780,350 L600,380 Z",
  AM: "M350,150 L550,120 L600,380 L400,350 Z",
  BG: "M250,250 L350,250 L380,450 L280,450 Z",
  GA: "M250,450 L300,450 L320,550 L240,550 Z",
  HA: "M620,385 L650,385 L650,410 L620,410 Z",
  OR: "M300,450 L600,380 L800,550 L400,750 Z",
  SO: "M800,350 L950,400 L900,650 L750,550 Z",
  SN: "M350,550 L550,550 L600,750 L380,750 Z",
  TI: "M450,50 L600,80 L550,150 L400,120 Z"
};

const LABEL_POSITIONS: Record<string, [number, number]> = {
  AA: [510, 390],
  AF: [650, 280],
  AM: [450, 250],
  TI: [500, 100],
  OR: [500, 600],
  SO: [850, 500],
  SN: [480, 680],
  BG: [310, 350],
  GA: [270, 500],
  HA: [635, 397]
};

const Maps: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null);
  const [activeLayer, setActiveLayer] = useState<'facilities' | 'thematic' | 'heatmap'>('thematic');
  const [outbreakType, setOutbreakType] = useState('Malaria');
  const [opacities, setOpacities] = useState({
    thematic: 1,
    heatmap: 1,
    facilities: 1
  });

  const getRegionColor = (region: MapRegion) => {
    if (activeLayer === 'facilities') {
      return region.facilities > 400 ? '#1e3a8a' : region.facilities > 200 ? '#3b82f6' : '#93c5fd';
    }
    
    if (activeLayer === 'heatmap') {
      if (region.value >= 85) return '#7f1d1d';
      if (region.value >= 70) return '#b91c1c';
      if (region.value >= 50) return '#ea580c';
      if (region.value >= 30) return '#f59e0b';
      return '#fde047';
    }

    switch (region.outbreakLevel) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#e2e8f0';
    }
  };

  const currentOpacity = opacities[activeLayer];

  const handleOpacityChange = (val: number) => {
    setOpacities(prev => ({ ...prev, [activeLayer]: val }));
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden bg-slate-50">
      <div className="w-full lg:w-80 bg-white border-r border-gray-200 p-6 flex flex-col space-y-6 overflow-y-auto">
        <div>
          <h2 className="text-xl font-bold text-gray-800">GIS / Maps</h2>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Ethiopia HMIS Layer Control</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-gray-100">
            <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Base Layer</label>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => setActiveLayer('thematic')}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${activeLayer === 'thematic' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                <i className="fa-solid fa-layer-group"></i>
                <span className="text-sm font-medium">Thematic Outbreak</span>
              </button>
              <button 
                onClick={() => setActiveLayer('heatmap')}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${activeLayer === 'heatmap' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                <i className="fa-solid fa-fire"></i>
                <span className="text-sm font-medium">Heatmap Analysis</span>
              </button>
              <button 
                onClick={() => setActiveLayer('facilities')}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${activeLayer === 'facilities' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                <i className="fa-solid fa-hospital"></i>
                <span className="text-sm font-medium">Health Facilities</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-gray-100">
            <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Outbreak Type</label>
            <select 
              value={outbreakType} 
              onChange={(e) => setOutbreakType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none bg-white"
            >
              <option>Malaria</option>
              <option>Cholera</option>
              <option>COVID-19</option>
              <option>Measles</option>
            </select>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Layer Opacity</label>
              <span className="text-xs font-bold text-blue-600">{Math.round(currentOpacity * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={currentOpacity}
              onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
        </div>

        {selectedRegion && (
          <div className="mt-auto p-4 bg-blue-50 rounded-xl border border-blue-100 animate-fadeIn">
            <h4 className="font-bold text-blue-800">{selectedRegion.name}</h4>
            <div className="mt-2 space-y-1 text-xs text-blue-600">
              <div className="flex justify-between">
                <span>Coverage:</span>
                <span className="font-bold">{selectedRegion.value}%</span>
              </div>
              <div className="flex justify-between">
                <span>Facilities:</span>
                <span className="font-bold">{selectedRegion.facilities}</span>
              </div>
              <div className="flex justify-between">
                <span>Outbreak Risk:</span>
                <span className={`font-bold uppercase ${selectedRegion.outbreakLevel === 'high' ? 'text-red-500' : 'text-blue-600'}`}>
                  {selectedRegion.outbreakLevel}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 bg-slate-200 relative overflow-hidden flex items-center justify-center p-8">
        <svg viewBox="0 0 1000 800" className="w-full h-full drop-shadow-2xl filter transition-all duration-700">
          <g transform="translate(0, 0)">
            {REGIONS.map((region) => (
              <path
                key={region.id}
                d={REGION_OFFSETS[region.id]}
                fill={getRegionColor(region)}
                fillOpacity={currentOpacity}
                stroke="#fff"
                strokeWidth={selectedRegion?.id === region.id ? 4 : 1}
                className="cursor-pointer transition-all hover:brightness-90"
                onClick={() => setSelectedRegion(region)}
              />
            ))}
            
            {Object.entries(LABEL_POSITIONS).map(([id, [x, y]]) => (
              <text
                key={id}
                x={x}
                y={y}
                textAnchor="middle"
                className="text-[12px] font-bold fill-white pointer-events-none drop-shadow-md"
                style={{ paintOrder: 'stroke', stroke: '#000', strokeWidth: '0.5px' }}
              >
                {id}
              </text>
            ))}
          </g>
        </svg>

        <div className="absolute bottom-6 left-6 bg-white p-3 rounded-lg shadow-lg text-[10px] font-bold space-y-2 border border-gray-200">
          <p className="text-gray-400 uppercase tracking-widest border-b pb-1 mb-1">Legend</p>
          {activeLayer === 'thematic' ? (
            <>
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-red-500 rounded"></div> <span>High Risk</span></div>
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-orange-500 rounded"></div> <span>Medium Risk</span></div>
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-emerald-500 rounded"></div> <span>Low Risk</span></div>
            </>
          ) : activeLayer === 'heatmap' ? (
            <>
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-[#7f1d1d] rounded"></div> <span>85%+</span></div>
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-[#ea580c] rounded"></div> <span>50-70%</span></div>
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-[#fde047] rounded"></div> <span>Below 30%</span></div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-[#1e3a8a] rounded"></div> <span>400+ Facilities</span></div>
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-[#3b82f6] rounded"></div> <span>200-400</span></div>
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-[#93c5fd] rounded"></div> <span>Below 200</span></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Add the missing default export
export default Maps;
