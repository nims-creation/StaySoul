import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom component to update map view when properties change
const RecenterMap = ({ properties }) => {
  const map = useMap();
  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => [
        p.lat || 19.0760 + (p.id % 20) * 0.01, 
        p.lng || 72.8777 + (p.id % 20) * 0.01
      ]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [properties, map]);
  return null;
};

const PropertyMap = ({ properties }) => {
  const navigate = useNavigate();

  // Helper to generate stable mock coordinates if none exist
  const getCoords = (p) => {
    if (p.lat && p.lng) return [p.lat, p.lng];
    // Mock coordinates around a center point (e.g., Mumbai center)
    const baseLat = 19.0760;
    const baseLng = 72.8777;
    const offset = (p.id * 137.5) % 360; // Deterministic scatter
    const r = 0.05 * Math.sqrt(p.id % 10);
    return [
      baseLat + r * Math.cos(offset),
      baseLng + r * Math.sin(offset)
    ];
  };

  return (
    <div className="h-full w-full rounded-[32px] overflow-hidden shadow-2xl border border-lightGray relative">
      <MapContainer 
        center={[19.0760, 72.8777]} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((p) => {
          const coords = getCoords(p);
          return (
            <Marker key={p.id} position={coords}>
              <Popup>
                <div className="w-48 p-1 flex flex-col gap-2 cursor-pointer" onClick={() => navigate(`/hotel/${p.id}`)}>
                  <img 
                    src={p.photos?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80"} 
                    alt={p.name} 
                    className="w-full h-24 object-cover rounded-xl"
                  />
                  <div>
                    <h4 className="font-black text-dark text-sm truncate">{p.name}</h4>
                    <p className="text-primary font-bold text-base mt-1">${p.price?.toFixed(2)} <span className="text-gray-400 text-[10px] font-medium">night</span></p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        <RecenterMap properties={properties} />
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
