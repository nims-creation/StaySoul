import React, { useState, useEffect } from 'react';
import { adminApi } from '../api/apiClient';
import { seedPremiumProperties } from '../utils/seedData';
import { Plus, Hotel, Bed, Trash2, Edit3, Settings, TrendingUp, Users, Calendar, MapPin, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyUtils';
import { useToast } from '../context/ToastContext';

const AdminDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    activeListings: 0,
    occupancyPct: 0,
    statsLoading: true,
  });
  const navigate = useNavigate();
  const toast = useToast();

  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      const data = await adminApi.getOwnedHotels();
      const hotelList = data || [];
      setHotels(hotelList);

      // Fetch real stats for all hotels in parallel (last 30 days)
      const today = new Date().toISOString().split('T')[0];
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const reportResults = await Promise.allSettled(
        hotelList.map(h => adminApi.getReport(h.id, thirtyDaysAgo, today))
      );

      let totalRevenue = 0;
      let totalBookings = 0;
      reportResults.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
          totalRevenue += result.value.totalRevenue || result.value.totalRevenueOfConfirmedBookings || 0;
          totalBookings += result.value.totalConfirmedBookings || 0;
        }
      });

      // Occupancy = bookings in 30 days / (active hotels × 30 days) as a %
      const activeCount = hotelList.filter(h => h.active).length;
      const maxPossibleBookings = activeCount * 30;
      const occupancyPct = maxPossibleBookings > 0
        ? Math.min(Math.round((totalBookings / maxPossibleBookings) * 100), 100)
        : 0;

      setStats({
        totalRevenue,
        totalBookings,
        activeListings: hotelList.filter(h => h.active).length,
        occupancyPct,
        statsLoading: false,
      });
    } catch (err) {
      console.error("Failed to fetch owned hotels", err);
      setStats(s => ({ ...s, statsLoading: false }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleSeed = async () => {
    try {
      setIsSeeding(true);
      await seedPremiumProperties();
      await fetchHotels();
      toast.success('Demo properties seeded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to seed properties. Make sure you are logged in.');
    } finally {
      setIsSeeding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-dark mb-2">Host Dashboard</h1>
           <p className="text-gray-500">Manage your properties, bookings and revenue from one place.</p>
        </div>
        <div className="flex gap-4">
          <button 
             onClick={handleSeed}
             disabled={isSeeding}
             className="flex items-center gap-2 px-6 py-3 border border-lightGray text-gray-600 font-bold rounded-xl hover:bg-grayBg transition-all disabled:opacity-50"
          >
            {isSeeding ? <div className="h-5 w-5 border-2 border-gray-400 border-t-transparent animate-spin rounded-full"></div> : <Database size={20} />}
            <span>Seed Demo Data</span>
          </button>
          <button 
             onClick={() => navigate('/admin/manage')}
             className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg transition-all"
          >
            <Plus size={20} />
            <span>Add New Property</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         {[
           {
             label: 'Total Revenue (30d)',
             value: stats.statsLoading ? '...' : formatCurrency(stats.totalRevenue),
             icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50'
           },
           {
             label: 'Active Listings',
             value: stats.statsLoading ? '...' : stats.activeListings.toString(),
             icon: Hotel, color: 'text-blue-600', bg: 'bg-blue-50'
           },
           {
             label: 'Bookings (30d)',
             value: stats.statsLoading ? '...' : stats.totalBookings.toString(),
             icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50'
           },
           {
             label: 'Avg Occupancy',
             value: stats.statsLoading ? '...' : `${stats.occupancyPct}%`,
             icon: Users, color: 'text-amber-600', bg: 'bg-amber-50'
           }
         ].map((stat, idx) => {
           const Icon = stat.icon;
           return (
             <div key={idx} className="bg-white p-6 rounded-2xl border border-lightGray shadow-sm flex items-center gap-4">
                <div className={`${stat.bg} p-3 rounded-xl`}>
                   <Icon size={24} className={stat.color} />
                </div>
                <div>
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                   <div className={`text-2xl font-bold text-dark ${stats.statsLoading ? 'animate-pulse' : ''}`}>{stat.value}</div>
                </div>
             </div>
           );
         })}
      </div>

       <h2 className="text-xl font-bold text-dark mb-6">Your Listings</h2>
      
      {hotels.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-lightGray rounded-3xl py-20 text-center">
            <Hotel className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-medium">You haven't listed any properties yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {hotels.map((hotel) => (
             <div key={hotel.id} className="bg-white border border-lightGray rounded-2xl overflow-hidden group hover:shadow-md transition-all">
                <div className="h-48 bg-grayBg relative">
                  <img 
                    src={(hotel.photos && hotel.photos.length > 0) ? hotel.photos[0] : "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={hotel.name}
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
                  />
                  <div className="absolute top-4 right-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${hotel.active ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                        {hotel.active ? 'Active' : 'Draft'}
                     </span>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                     <button 
                       onClick={() => navigate(`/admin/manage?id=${hotel.id}`)}
                       className="p-3 bg-white rounded-full text-dark hover:text-primary transition-colors hover:scale-110"
                     >
                       <Edit3 size={20} />
                     </button>
                     <button 
                       onClick={async () => {
                         if(window.confirm('Delete this property?')) {
                            await adminApi.deleteHotel(hotel.id);
                            setHotels(h => h.filter(x => x.id !== hotel.id));
                            toast.success(`"${hotel.name}" deleted successfully.`);
                         }
                       }}
                       className="p-3 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors hover:scale-110"
                     >
                        <Trash2 size={20} />
                     </button>
                  </div>
                </div>
                <div className="p-5">
                   <h3 className="font-bold text-dark text-lg mb-1">{hotel.name}</h3>
                   <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                      <MapPin size={14} /> {hotel.city}
                   </p>
                   <div className="flex justify-between items-center pt-4 border-t border-lightGray">
                      <div className="flex items-center gap-2 text-dark font-medium">
                         <Bed size={16} />
                         <span>{(hotel.rooms || []).length} Rooms</span>
                      </div>
                      {!hotel.active ? (
                        <button 
                          onClick={async () => {
                             try {
                               await adminApi.activateHotel(hotel.id);
                               setHotels(h => h.map(x => x.id === hotel.id ? {...x, active: true} : x));
                               toast.success(`"${hotel.name}" is now live!`);
                             } catch (err) {
                               toast.error('Failed to activate. Make sure you have added rooms.');
                             }
                          }}
                          className="text-sm font-bold text-primary px-3 py-1 border border-primary rounded-lg hover:bg-primary hover:text-white transition-all"
                        >
                          Activate
                        </button>
                      ) : (
                        <button 
                          onClick={() => navigate(`/admin/manage?id=${hotel.id}`)}
                          className="text-sm font-bold text-gray-500 hover:text-dark flex items-center gap-1"
                        >
                           <Settings size={14} /> Manage
                        </button>
                      )}
                   </div>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
