import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { adminApi } from '../api/apiClient';
import { 
  ArrowLeft, Save, Hotel, MapPin, 
  Image as ImageIcon, Plus, Trash2, 
  Bed, CheckCircle2, ChevronRight, AlertCircle, X 
} from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

const ManageProperty = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');

  const [step, setStep] = useState(1);
  const [hotelId, setHotelId] = useState(editId || null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  // Consolidated Property & Rooms Data
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    description: '',
    photos: [],
    lat: 19.0760,
    lng: 72.8777,
    amenities: ['Wifi', 'Parking', 'Pool'],
    rooms: [
      { type: 'Standard Room', basePrice: 150, totalCount: 5, capacity: 2 }
    ]
  });

  useEffect(() => {
    if (editId) {
      const fetchDetails = async () => {
        try {
          const hotel = await adminApi.getHotelById(editId);
          // Map backend fields to frontend formData if they differ
          setFormData({
            ...hotel,
            rooms: hotel.rooms || [{ type: 'Standard Room', basePrice: 150, totalCount: 5, capacity: 2 }]
          });
        } catch (err) {
          console.error("Failed to load hotel details", err);
        }
      };
      fetchDetails();
    }
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateRoom = (index, field, value) => {
    const newRooms = [...formData.rooms];
    newRooms[index][field] = value;
    setFormData({ ...formData, rooms: newRooms });
  };

  const addRoom = () => {
    setFormData({ 
      ...formData, 
      rooms: [...formData.rooms, { type: '', basePrice: 100, totalCount: 1, capacity: 2 }] 
    });
  };

  const removeRoom = (index) => {
    if (formData.rooms.length > 1) {
      setFormData({ 
        ...formData, 
        rooms: formData.rooms.filter((_, i) => i !== index) 
      });
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      if (hotelId) {
        await adminApi.updateHotel(hotelId, formData);
      } else {
        const created = await adminApi.createHotel(formData);
        setHotelId(created.id);
      }
      setStep(3);
      setStatus({ type: 'success', msg: 'Property and rooms saved successfully!' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to save property. Please check all fields.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivate = async () => {
    try {
      setIsLoading(true);
      await adminApi.activateHotel(hotelId);
      setStatus({ type: 'success', msg: 'Property is now LIVE!' });
      setTimeout(() => navigate('/admin'), 2000);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Activation failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-32 pb-20">
      <button 
        onClick={() => navigate('/admin')}
        className="flex items-center gap-2 text-gray-500 hover:text-dark mb-8 transition-colors font-medium"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
         {[
           { n: 1, label: 'Basics' },
           { n: 2, label: 'Rooms & Pricing' },
           { n: 3, label: 'Launch' }
         ].map((s) => (
           <React.Fragment key={s.n}>
              <div className="flex flex-col items-center gap-2 relative">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s.n ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step > s.n ? <CheckCircle2 size={20} /> : s.n}
                 </div>
                 <span className={`text-xs font-bold uppercase tracking-widest ${step >= s.n ? 'text-dark' : 'text-gray-400'}`}>{s.label}</span>
              </div>
              {s.n < 3 && <div className={`flex-1 h-1 mx-4 -mt-6 rounded ${step > s.n ? 'bg-primary' : 'bg-gray-200'}`}></div>}
           </React.Fragment>
         ))}
      </div>

      <div className="bg-white border border-lightGray rounded-3xl shadow-sm overflow-hidden min-h-[500px]">
        {/* Step 1: Basics */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="p-8 border-b border-lightGray bg-grayBg/20 flex justify-between items-center">
                <div>
                   <h1 className="text-2xl font-bold text-dark flex items-center gap-2">
                     <Hotel className="text-primary" />
                     {editId ? 'Edit Property Info' : 'New Property'}
                   </h1>
                   <p className="text-gray-500 text-sm mt-1">Tell us the core details about your stay.</p>
                </div>
                <button onClick={() => setStep(2)} className="text-primary font-bold flex items-center gap-1">Rooms & Pricing <ChevronRight size={18}/></button>
             </div>
             
             <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Property Name</label>
                      <input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 bg-gray-50 border border-lightGray rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="e.g. Royal Heritage Resort"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">City</label>
                      <div className="relative">
                         <MapPin className="absolute left-4 top-4.5 text-gray-400" size={18} />
                         <input 
                           name="city"
                           value={formData.city}
                           onChange={handleChange}
                           className="w-full p-4 pl-12 bg-gray-50 border border-lightGray rounded-2xl outline-none"
                           placeholder="e.g. Goa"
                         />
                      </div>
                   </div>
                   <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Address</label>
                      <input 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-4 bg-gray-50 border border-lightGray rounded-2xl outline-none"
                        placeholder="123 Ocean Drive, Seaside Area..."
                      />
                   </div>
                   <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Description</label>
                      <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-4 bg-gray-50 border border-lightGray rounded-2xl outline-none"
                        placeholder="What makes this place unique?"
                      />
                   </div>
                    <div className="md:col-span-2 space-y-4">
                       <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Property Tags / Categories</label>
                       <div className="flex flex-wrap gap-2">
                          {[
                            { id: 'beachfront', label: 'Beachfront' },
                            { id: 'pool', label: 'Amazing Pools' },
                            { id: 'nature', label: 'Nature' },
                            { id: 'modern', label: 'Modern' },
                            { id: 'wifi', label: 'WiFi Included' },
                            { id: 'gym', label: 'Fitness' },
                            { id: 'spa', label: 'Wellness' },
                            { id: 'breakfast', label: 'Breakfast' }
                          ].map((tag) => (
                            <button
                              key={tag.id}
                              type="button"
                              onClick={() => {
                                const newAmenities = formData.amenities.includes(tag.id)
                                  ? formData.amenities.filter(a => a !== tag.id)
                                  : [...formData.amenities, tag.id];
                                setFormData({ ...formData, amenities: newAmenities });
                              }}
                              className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border-2 ${
                                formData.amenities.includes(tag.id)
                                  ? 'bg-primary border-primary text-white shadow-lg'
                                  : 'bg-white border-lightGray text-gray-400 hover:border-gray-300'
                              }`}
                            >
                              {tag.label}
                            </button>
                          ))}
                       </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                       <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Property Photos</label>
                       <ImageUpload 
                         onUploadSuccess={(urls) => setFormData(prev => ({ ...prev, photos: urls }))}
                         currentPhotos={formData.photos}
                       />
                    </div>
                </div>

                <div className="pt-8 border-t border-lightGray flex justify-end">
                   <button 
                     onClick={() => setStep(2)}
                     className="px-10 py-4 bg-dark text-white font-bold rounded-2xl hover:bg-black transition-all active:scale-95"
                   >
                     Continue to Rooms
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* Step 2: Multi-Room Management */}
        {step === 2 && (
           <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="p-8 border-b border-lightGray bg-grayBg/20 flex justify-between items-center">
                <div>
                   <h1 className="text-2xl font-bold text-dark flex items-center gap-2">
                     <Bed className="text-primary" />
                     Rooms & Inventory
                   </h1>
                   <p className="text-gray-500 text-sm mt-1">Define your room categories and nightly rates.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="text-gray-500 font-bold">Back</button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {formData.rooms.map((room, index) => (
                  <div key={index} className="p-6 bg-grayBg/20 border border-lightGray rounded-3xl relative group animate-in slide-in-from-top-2">
                    {formData.rooms.length > 1 && (
                      <button 
                        onClick={() => removeRoom(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 mb-2 block">Room Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Deluxe Sea View"
                          value={room.type}
                          onChange={(e) => updateRoom(index, 'type', e.target.value)}
                          className="w-full p-4 bg-white border border-lightGray rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 mb-2 block">Price / Night (₹)</label>
                        <input 
                          type="number" 
                          value={room.basePrice}
                          onChange={(e) => updateRoom(index, 'basePrice', parseInt(e.target.value))}
                          className="w-full p-4 bg-white border border-lightGray rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                          placeholder="e.g. 5000"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 mb-2 block">Quantity</label>
                        <input 
                          type="number" 
                          value={room.totalCount}
                          onChange={(e) => updateRoom(index, 'totalCount', parseInt(e.target.value))}
                          className="w-full p-4 bg-white border border-lightGray rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={addRoom}
                  className="w-full py-6 border-2 border-dashed border-lightGray rounded-3xl text-gray-500 font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20} /> Add another room category
                </button>

                <div className="pt-8 border-t border-lightGray flex justify-end">
                   <button 
                     onClick={handleSave}
                     disabled={isLoading || formData.rooms.some(r => !r.type)}
                     className="px-12 py-4 bg-dark text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-40"
                   >
                     {isLoading ? "Saving Everything..." : "Save & Finalize"}
                   </button>
                </div>
              </div>
           </div>
        )}

        {/* Step 3: Launch */}
        {step === 3 && (
           <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-20 px-8">
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 border-4 border-white shadow-xl">
                 <CheckCircle2 size={48} />
              </div>
              <h1 className="text-3xl font-black text-dark mb-4">Property Ready!</h1>
              <p className="text-gray-500 max-w-lg mx-auto mb-12 text-lg leading-relaxed">
                 You've set up **{formData.name}** with **{formData.rooms.length} room types**. Launch now to start receiving bookings.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button 
                   onClick={() => setStep(2)}
                   className="w-full sm:w-auto px-10 py-4 border border-lightGray text-gray-600 font-bold rounded-2xl hover:bg-grayBg transition-all"
                 >
                    Adjust Pricing
                 </button>
                 <button 
                   onClick={handleActivate}
                   disabled={isLoading}
                   className="w-full sm:w-auto px-12 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                 >
                    {isLoading ? "Launching..." : "Launch Listing Now"}
                 </button>
              </div>
           </div>
        )}
      </div>

      {status.msg && (
        <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
           {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
           <span className="font-bold">{status.msg}</span>
           <button onClick={() => setStatus({type:'', msg:''})} className="ml-auto text-xs uppercase font-black opacity-50">Dismiss</button>
        </div>
      )}
    </div>
  );
};

export default ManageProperty;
