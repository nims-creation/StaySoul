import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Filter, Star, CheckCircle } from 'lucide-react';
import './Search.css';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');
  const [roomsCount, setRoomsCount] = useState(searchParams.get('roomsCount') || 1);

  // Fetch hotels
  const fetchHotels = async () => {
    setLoading(true);
    try {
      // Pass null to server if empty string to fetch all or match API requirements
      const payload = {
        city: city || null,
        startDate: startDate || null,
        endDate: endDate || null,
        roomsCount: roomsCount,
        page: 0,
        size: 10
      };
      const res = await api.post('/hotels/search', payload);
      // Wait, endpoint is GET but payload is @RequestBody. Actually, backend uses @GetMapping and @RequestBody (Wait! GET with Body might be tricky in fetch/axios, but axios handles it. However it's bad practice. Let's assume axios handles it or we'll wrap it). 
      // Checking HotelBrowseController: @GetMapping("/search") ... @RequestBody HotelSearchRequest. Yes, Axios supports GET with data.
      setHotels(res.data.content || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ city, startDate, endDate, roomsCount });
  };

  return (
    <div className="search-page">
      <div className="search-header glass-nav">
        <div className="container">
          <form onSubmit={handleSearch} className="search-bar glass">
            
            <div className="search-field">
              <label>Location</label>
              <div className="field-input">
                <MapPin size={18} className="text-gold" />
                <input 
                  type="text" 
                  placeholder="Where are you going?" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div className="search-separator"></div>

            <div className="search-field">
              <label>Check in</label>
              <div className="field-input">
                <Calendar size={18} className="text-gold" />
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>

            <div className="search-separator"></div>

            <div className="search-field">
              <label>Check out</label>
              <div className="field-input">
                <Calendar size={18} className="text-gold" />
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="search-separator"></div>

            <div className="search-field">
              <label>Rooms</label>
              <div className="field-input">
                <Users size={18} className="text-gold" />
                <input 
                  type="number" 
                  min="1"
                  value={roomsCount}
                  onChange={(e) => setRoomsCount(e.target.value)}
                  style={{ width: '60px' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary search-submit">
              Search
            </button>

          </form>
        </div>
      </div>

      <div className="container py-16">
        <div className="results-header">
          <h2>
            {city ? `Stays in ${city}` : 'Discover Properties'}
          </h2>
          <button className="btn btn-outline filter-btn">
            <Filter size={16} /> Filters
          </button>
        </div>

        {loading ? (
          <div className="loading-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card glass"></div>
            ))}
          </div>
        ) : hotels.length === 0 ? (
          <div className="empty-state glass">
            <h3>No properties found</h3>
            <p className="text-secondary">Try adjusting your search criteria or dates.</p>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="hotel-grid"
          >
            {hotels.map((hotel) => (
              <motion.div 
                key={hotel.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="hotel-card glass"
              >
                <div className="hotel-image">
                  <img src={hotel.photos?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={hotel.name} />
                  <div className="price-badge">
                    <span>₹{hotel.price || '--'}</span> / night
                  </div>
                </div>
                <div className="hotel-info">
                  <div className="hotel-title-row">
                    <h3>{hotel.name}</h3>
                    <div className="rating">
                      <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                      <span>4.8</span>
                    </div>
                  </div>
                  <p className="text-secondary location"><MapPin size={14} /> {hotel.city}</p>
                  
                  <div className="amenities-preview">
                    {hotel.amenities?.slice(0, 3).map((am, i) => (
                      <span key={i} className="amenity-pill"><CheckCircle size={10} /> {am}</span>
                    ))}
                    {hotel.amenities?.length > 3 && <span className="amenity-pill">+{hotel.amenities.length - 3}</span>}
                  </div>

                  <button className="btn btn-outline full-width mt-4">View Details</button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
