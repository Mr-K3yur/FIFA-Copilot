import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon paths in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export const InteractiveMap: React.FC = () => {
  // Mock coordinates for MetLife Stadium (NY/NJ) - a key FIFA 2026 venue
  const position: [number, number] = [40.8128, -74.0742];

  const pointsOfInterest = [
    { pos: [40.8130, -74.0745] as [number, number], title: 'Gate A (Entry)' },
    { pos: [40.8125, -74.0735] as [number, number], title: 'Concessions - Sector 1' },
    { pos: [40.8132, -74.0738] as [number, number], title: 'Washrooms' },
    { pos: [40.8120, -74.0750] as [number, number], title: 'First Aid' },
  ];

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 relative z-0 shadow-lg">
      <MapContainer 
        center={position} 
        zoom={17} 
        style={{ height: '100%', width: '100%', background: '#0f172a' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png" // Dark theme tiles
        />
        
        {pointsOfInterest.map((poi, idx) => (
          <Marker key={idx} position={poi.pos}>
            <Popup>
              <div className="text-slate-900 font-semibold">{poi.title}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Overlay to simulate AI Route drawing overlay */}
      <div className="absolute top-4 left-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl">
        <h3 className="text-white text-sm font-semibold mb-1">Live AI Routing</h3>
        <p className="text-emerald-400 text-xs flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Optimal path active
        </p>
      </div>
    </div>
  );
};
