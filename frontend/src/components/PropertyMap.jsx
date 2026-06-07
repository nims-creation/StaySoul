import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyUtils';

// Custom styling for the price tag markers
const createPriceIcon = (price) => {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `
      <div class="bg-white px-3 py-1.5 rounded-full shadow-lg border border-gray-200 hover:bg-ink hover:text-white transition-all transform hover:scale-110 flex items-center justify-center">
        <span class="text-xs font-blackTracking leading-none">${formatCurrency(price)}</span>
      </div>
    `,
    iconSize: [60, 30],
    iconAnchor: [30, 15],
  });
};

// Fix for default marker icons (fallback)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

/**
 * MapSizer — fixes grey tiles on zoom/pan by calling invalidateSize()
 * whenever the map container resizes or the map fires any zoom/move event.
 */
const MapSizer = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Invalidate immediately (covers initial render + show-map toggle)
    const invalidate = () => map.invalidateSize({ animate: false });

    // Fire after short delay to let CSS transitions finish
    const timerId = setTimeout(invalidate, 300);

    // Also re-invalidate on every zoom or move start (prevents grey border tiles)
    map.on('zoomstart', invalidate);
    map.on('zoomend', invalidate);
    map.on('movestart', invalidate);
    map.on('moveend', invalidate);

    // ResizeObserver watches the actual DOM container for size changes
    let ro;
    const container = map.getContainer();
    if (container && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        map.invalidateSize({ animate: false });
      });
      ro.observe(container);
    }

    return () => {
      clearTimeout(timerId);
      map.off('zoomstart', invalidate);
      map.off('zoomend', invalidate);
      map.off('movestart', invalidate);
      map.off('moveend', invalidate);
      if (ro) ro.disconnect();
    };
  }, [map]);

  return null;
};

// Custom component to update map view when properties change
const RecenterMap = ({ properties }) => {
  const map = useMap();
  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => [
        p.lat || 19.0760 + (p.id % 20) * 0.01,
        p.lng || 72.8777 + (p.id % 20) * 0.01
      ]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
    }
  }, [properties, map]);
  return null;
};

const PropertyMap = ({ properties }) => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // Helper to generate stable mock coordinates if none exist
  const getCoords = (p) => {
    if (p.lat && p.lng) return [p.lat, p.lng];
    const baseLat = 19.0760;
    const baseLng = 72.8777;
    const offset = (p.id * 137.5) % 360;
    const r = 0.05 * Math.sqrt(p.id % 10);
    return [
      baseLat + r * Math.cos(offset),
      baseLng + r * Math.sin(offset)
    ];
  };

  return (
    /*
     * IMPORTANT: Do NOT put overflow-hidden + border-radius directly on the
     * MapContainer or its immediate wrapper — Leaflet renders tiles via
     * CSS transforms, and overflow clipping causes grey/missing tiles on zoom.
     *
     * Instead we use a two-layer approach:
     *   • outer div — clips visually with border-radius + overflow:hidden
     *   • inner div — full size, no overflow restriction (Leaflet lives here)
     */
    <div
      ref={wrapperRef}
      style={{
        height: '100%',
        width: '100%',
        borderRadius: '32px',
        overflow: 'hidden',       // visual clip only on outer shell
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        border: '1px solid #e5e7eb',
        position: 'relative',
      }}
    >
      {/* Inner container — no overflow clip so Leaflet tiles render freely */}
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <MapContainer
          center={[19.0760, 72.8777]}
          zoom={12}
          minZoom={3}
          maxZoom={18}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          // Prevent Leaflet from adding its own rounded corners
          className="leaflet-map-root"
        >
          {/* Invalidates size on every zoom/resize — THE key grey-tile fix */}
          <MapSizer />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // Keep extra tile buffer around viewport so zoom feels instant
            keepBuffer={4}
            // Only update tiles once zoom/pan has settled (prevents half-loaded grey tiles)
            updateWhenIdle={true}
            updateWhenZooming={false}
          />

          {properties.map((p) => {
            const coords = getCoords(p);
            const icon = createPriceIcon(p.price || 0);
            return (
              <Marker key={p.id} position={coords} icon={icon}>
                <Popup closeButton={false} className="custom-map-popup">
                  <div className="w-48 p-0 flex flex-col gap-2 cursor-pointer" onClick={() => navigate(`/hotel/${p.id}`)}>
                    <div className="relative h-24 w-full">
                      <img
                        src={p.photos?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80"}
                        alt={p.name}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>
                    <div className="px-3 pb-3">
                      <h4 className="font-bold text-ink text-sm truncate">{p.name}</h4>
                      <p className="text-primary font-black text-sm mt-0.5">{formatCurrency(p.price || 0)} <span className="text-gray-400 text-[10px] font-medium">night</span></p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          <RecenterMap properties={properties} />
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertyMap;
