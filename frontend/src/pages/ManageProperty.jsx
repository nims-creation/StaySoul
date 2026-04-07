import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../api/apiClient';
import { ArrowLeft, Save, Hotel, MapPin, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

const ManageProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    description: '',
    imageUrl: '',
    roomsCount: 1,
    basePrice: 100
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setMessage('');
      await adminApi.createHotel({
        ...formData,
        active: true
      });
      setMessage('Property created successfully!');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err) {
      console.error(err);
      setMessage('Failed to create property. Please check your inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-20">
      <button 
        onClick={() => navigate('/admin')}
        className="flex items-center gap-2 text-gray-500 hover:text-dark mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div className="bg-white border border-lightGray rounded-3xl shadow-sm overflow-hidden">
        <div className="p-8 border-b border-lightGray bg-grayBg/30">
           <h1 className="text-2xl font-bold text-dark flex items-center gap-2">
             <Hotel className="text-primary" />
             List Your Property
           </h1>
           <p className="text-gray-500 mt-1">Fill in the details to start hosting on StaySoul.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
           {/* Basic Info */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-sm font-bold text-dark uppercase tracking-wider">Property Name</label>
                 <input 
                   required
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   placeholder="e.g. Seaside Villa"
                   className="w-full p-3 bg-gray-50 border border-lightGray rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-bold text-dark uppercase tracking-wider">City</label>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai"
                      className="w-full p-3 pl-10 bg-gray-50 border border-lightGray rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    />
                 </div>
              </div>
           </div>

           {/* Description */}
           <div className="space-y-2">
              <label className="text-sm font-bold text-dark uppercase tracking-wider">Description</label>
              <textarea 
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Tell guests what makes your place special..."
                className="w-full p-3 bg-gray-50 border border-lightGray rounded-xl focus:ring-2 focus:ring-primary outline-none"
              ></textarea>
           </div>

           {/* Pricing & Rooms */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-sm font-bold text-dark uppercase tracking-wider">Base Price (per night)</label>
                 <div className="relative">
                    <span className="absolute left-3 top-3.5 font-bold text-gray-400">$</span>
                    <input 
                      required
                      type="number"
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleChange}
                      className="w-full p-3 pl-8 bg-gray-50 border border-lightGray rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-bold text-dark uppercase tracking-wider">Default Room Count</label>
                 <input 
                   required
                   type="number"
                   name="roomsCount"
                   value={formData.roomsCount}
                   onChange={handleChange}
                   className="w-full p-3 bg-gray-50 border border-lightGray rounded-xl focus:ring-2 focus:ring-primary outline-none"
                 />
              </div>
           </div>

           {/* Image */}
           <div className="space-y-2">
              <label className="text-sm font-bold text-dark uppercase tracking-wider">Cover Image URL</label>
              <div className="relative">
                 <ImageIcon className="absolute left-3 top-3.5 text-gray-400" size={18} />
                 <input 
                   required
                   name="imageUrl"
                   value={formData.imageUrl}
                   onChange={handleChange}
                   placeholder="https://images.unsplash.com/..."
                   className="w-full p-3 pl-10 bg-gray-50 border border-lightGray rounded-xl focus:ring-2 focus:ring-primary outline-none"
                 />
              </div>
           </div>

           {message && (
             <div className={`p-4 rounded-xl font-medium ${message.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {message}
             </div>
           )}

           <div className="pt-6 border-t border-lightGray flex justify-end">
              <button 
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-10 py-4 bg-dark text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {isLoading ? <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div> : <Save size={20} />}
                <span>Save Property</span>
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default ManageProperty;
