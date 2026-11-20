"use client";

import { useState, useEffect } from "react";

const LAYERS = ["Reported Cases", "Growth Rate"];

export default function MapExplorer() {
  const [activeLayer, setActiveLayer] = useState("Reported Cases");
  const [mapData, setMapData] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMapData() {
      try {
        const response = await fetch('/api/map/ghaziabad');
        const data = await response.json();
        if (data.success) {
          setMapData(data);
        }
      } catch (error) {
        console.error('Error loading map data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMapData();
  }, []);

  return (
    <div className="lg:col-span-8 flex flex-col gap-gutter">
      {/* Filters */}
      <div className="bg-surface-container-lowest border border-outline-variant p-stack-sm rounded flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-sm">
            filter_list
          </span>
          <span className="font-label-md text-label-md text-secondary">
            Filters:
          </span>
        </div>
        <select className="border border-outline-variant rounded-sm text-body-sm px-2 py-1 bg-surface focus:border-primary focus:border-2 focus:outline-none">
          <option>Date Range (Last 30 Days)</option>
        </select>
        <select className="border border-outline-variant rounded-sm text-body-sm px-2 py-1 bg-surface focus:border-primary focus:border-2 focus:outline-none">
          <option>All Pathogens</option>
        </select>
        <select className="border border-outline-variant rounded-sm text-body-sm px-2 py-1 bg-surface focus:border-primary focus:border-2 focus:outline-none">
          <option>State</option>
        </select>

        <div className="w-px h-6 bg-outline-variant mx-2" />

        <span className="font-label-md text-label-md text-secondary">
          Layers:
        </span>
        {LAYERS.map((layer) => {
          const isActive = layer === activeLayer;
          return (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={
                isActive
                  ? "bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-body-sm flex items-center gap-1 border border-primary-container"
                  : "bg-surface text-secondary px-3 py-1 rounded-full text-body-sm border border-outline-variant hover:bg-surface-variant transition-colors"
              }
            >
              {isActive && (
                <span className="material-symbols-outlined text-sm">
                  check
                </span>
              )}
              {layer}
            </button>
          );
        })}
      </div>

      {/* Interactive map */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded h-[600px] relative overflow-hidden flex flex-col">
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button className="bg-surface border border-outline-variant p-2 rounded-sm shadow-sm hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined">add</span>
          </button>
          <button className="bg-surface border border-outline-variant p-2 rounded-sm shadow-sm hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined">remove</span>
          </button>
          <button className="bg-surface border border-outline-variant p-2 rounded-sm shadow-sm hover:bg-surface-variant transition-colors mt-2">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {/* Map visualization */}
        <div className="w-full h-full bg-surface-variant relative flex items-center justify-center overflow-auto p-8">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="font-label-md text-secondary">Loading map data...</span>
            </div>
          ) : mapData?.areas && mapData.areas.length > 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              {/* Grid-based map visualization */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-4xl">
                {mapData.areas.map((area) => {
                  const isSelected = selectedArea?.id === area.id;
                  const getBgColor = (level) => {
                    switch(level) {
                      case 'Stable': return 'bg-green-100 hover:bg-green-200 border-green-400';
                      case 'Moderate Activity': return 'bg-yellow-100 hover:bg-yellow-200 border-yellow-500';
                      case 'Increasing Activity': return 'bg-orange-100 hover:bg-orange-200 border-orange-500';
                      case 'Requires Closer Monitoring': return 'bg-red-100 hover:bg-red-200 border-red-500';
                      default: return 'bg-gray-100 hover:bg-gray-200 border-gray-400';
                    }
                  };
                  
                  return (
                    <button
                      key={area.id}
                      onClick={() => setSelectedArea(area)}
                      className={`
                        ${getBgColor(area.monitoringLevel)}
                        border-2 rounded-lg p-4 transition-all duration-200
                        ${isSelected ? 'ring-4 ring-primary scale-105 shadow-lg' : 'shadow-sm'}
                        flex flex-col items-start text-left min-h-[120px]
                      `}
                    >
                      <span className="font-label-sm text-xs text-gray-700 mb-1 line-clamp-2">
                        {area.name}
                      </span>
                      <span className="font-display-sm text-lg font-bold text-gray-900 mb-1">
                        {area.totalCases}
                      </span>
                      <span className={`text-xs font-semibold ${
                        (area.growthRate || 0) > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {(area.growthRate || 0) > 0 ? '+' : ''}{(area.growthRate || 0).toFixed(1)}%
                      </span>
                      <span className="text-xs text-gray-600 mt-auto">
                        {area.monitoringLevel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <span className="font-label-md text-secondary">No map data available</span>
          )}
        </div>

        {/* Selected area info popup */}
        {selectedArea && (
          <div className="absolute top-20 right-20 bg-surface border-2 border-primary p-4 rounded-lg shadow-xl z-20 max-w-xs">
            <button
              onClick={() => setSelectedArea(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            <h3 className="font-headline-sm text-lg mb-2 pr-6">{selectedArea.name}</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Total Cases:</span>
                <span className="font-semibold ml-2">{selectedArea.totalCases}</span>
              </div>
              <div>
                <span className="text-gray-600">Growth Rate:</span>
                <span className={`font-semibold ml-2 ${
                  (selectedArea.growthRate || 0) > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {(selectedArea.growthRate || 0) > 0 ? '+' : ''}{(selectedArea.growthRate || 0).toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold ml-2">{selectedArea.monitoringLevel}</span>
              </div>
              <div>
                <span className="text-gray-600">Recent Cases:</span>
                <span className="font-semibold ml-2">{selectedArea.recentCases}</span>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm border border-outline-variant p-3 rounded-sm shadow-sm z-10">
          <p className="font-label-md text-label-md mb-2">Monitoring Levels</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 border border-green-600 rounded"></div>
              <span className="text-xs text-secondary">Stable (≤5%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 border border-yellow-600 rounded"></div>
              <span className="text-xs text-secondary">Moderate (5-20%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-400 border border-orange-600 rounded"></div>
              <span className="text-xs text-secondary">Increasing (20-40%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 border border-red-600 rounded"></div>
              <span className="text-xs text-secondary">High Alert (&gt;40%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
