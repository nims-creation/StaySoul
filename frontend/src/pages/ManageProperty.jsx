import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { adminApi } from '../api/apiClient';
import { 
  ArrowLeft, Save, Hotel, MapPin, 
  Image as ImageIcon, Plus, Trash2, 
  Bed, CheckCircle2, ChevronRight, AlertCircle 
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

  // Hotel Data
  const [hotelData, setHotelData] = useState({
    name: '',
    city: '',
    address: '',
    description: '',
    photos: [],
    lat: 19.0760,
    lng: 72.8777,
    active: false
  });

  // Room Data
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    type: 'Double Room',
    basePrice: 150,
    totalCount: 5,
    capacity: 2
  });

  useEffect(() => {
    if (editId) {
      const fetchDetails = async () => {
        try {
          const hotel = await adminApi.getHotelById(editId);
          setHotelData(hotel);
          const roomList = await adminApi.getRooms(editId);
          setRooms(roomList);
        } catch (err) {
          console.error("Failed to load hotel details", err);
        }
      };
      fetchDetails();
    }
  }, [editId]);

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveHotel = async () => {
    try {
      setIsLoading(true);
      if (hotelId) {
        await adminApi.updateHotel(hotelId, hotelData);
      } else {
        const created = await adminApi.createHotel(hotelData);
        setHotelId(created.id);
      }
      setStep(2);
      setStatus({ type: 'success', msg: 'Property info saved!' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to save property. Check your inputs.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRoom = async () => {
    try {
      setIsLoading(true);
      const room = await adminApi.addRoom(hotelId, newRoom);
      setRooms([...rooms, room]);
      setNewRoom({ type: 'Double Room', basePrice: 150, totalCount: 5, capacity: 2 });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to add room.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await adminApi.deleteRoom(hotelId, roomId);
      setRooms(rooms.filter(r => r.id !== roomId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleActivate = async () => {
    try {
      setIsLoading(true);
      await adminApi.activateHotel(hotelId);
      setStatus({ type: 'success', msg: 'Property is now LIVE!' });
      setTimeout(() => navigate('/admin'), 2000);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Cannot activate. Make sure rooms are added.' });
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
           { n: 1, label: 'Properties' },
           { n: 2, label: 'Rooms & Pricing' },
           { n: 3, label: 'Publish' }
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
                     {editId ? 'Edit Property Info' : 'Property Details'}
                   </h1>
                   <p className="text-gray-500 text-sm mt-1">Start by telling us about your property.</p>
                </div>
                {hotelId && <button onClick={() => setStep(2)} className="text-primary font-bold flex items-center gap-1">Next Step <ChevronRight size={18}/></button>}
             </div>
             
             <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Property Name</label>
                      <input 
                        name="name"
                        value={hotelData.name}
                        onChange={handleHotelChange}
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
                           value={hotelData.city}
                           onChange={handleHotelChange}
                           className="w-full p-4 pl-12 bg-gray-50 border border-lightGray rounded-2xl outline-none"
                           placeholder="e.g. Goa"
                         />
                      </div>
                   </div>
                   <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Address</label>
                      <input 
                        name="address"
                        value={hotelData.address}
                        onChange={handleHotelChange}
                        className="w-full p-4 bg-gray-50 border border-lightGray rounded-2xl outline-none"
                        placeholder="123 Ocean Drive, Seaside Area..."
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Latitude</label>
                      <input 
                        type="number"
                        step="0.0001"
                        name="lat"
                        value={hotelData.lat}
                        onChange={handleHotelChange}
                        className="w-full p-4 bg-gray-50 border border-lightGray rounded-2xl outline-none"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Longitude</label>
                      <input 
                        type="number"
                        step="0.0001"
                        name="lng"
                        value={hotelData.lng}
                        onChange={handleHotelChange}
                        className="w-full p-4 bg-gray-50 border border-lightGray rounded-2xl outline-none"
                      />
                   </div>
                   <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Description</label>
                      <textarea 
                        name="description"
                        value={hotelData.description}
                        onChange={handleHotelChange}
                        rows="4"
                        className="w-full p-4 bg-gray-50 border border-lightGray rounded-2xl outline-none"
                        placeholder="What makes this place unique?"
                      />
                   </div>
                   <div className="md:col-span-2 space-y-4">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Property Photos</label>
                      <ImageUpload 
                        onUploadSuccess={(urls) => setHotelData(prev => ({ ...prev, photos: urls }))}
                        currentPhotos={hotelData.photos}
                      />
                   </div>
                </div>

                <div className="pt-8 border-t border-lightGray flex justify-end">
                   <button 
                     onClick={handleSaveHotel}
                     disabled={isLoading || !hotelData.name}
                     className="px-10 py-4 bg-dark text-white font-bold rounded-2xl hover:bg-black transition-all active:scale-95 disabled:opacity-40"
                   >
                     {isLoading ? "Saving..." : "Save & Continue"}
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* Step 2: Rooms */}
        {step === 2 && (
           <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="p-8 border-b border-lightGray bg-grayBg/20 flex justify-between items-center">
                <div>
                   <h1 className="text-2xl font-bold text-dark flex items-center gap-2">
                     <Bed className="text-primary" />
                     Room Types & Pricing
                   </h1>
                   <p className="text-gray-500 text-sm mt-1">Add available rooms to your property.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="text-gray-500 font-bold">Back</button>
                  <button onClick={() => setStep(3)} className="text-primary font-bold flex items-center gap-1">Next Step <ChevronRight size={18}/></button>
                </div>
              </div>

              <div className="p-8">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Add Room Form */}
                    <div className="lg:col-span-1 space-y-6 bg-grayBg/30 p-6 rounded-3xl border border-lightGray/50 h-fit">
                       <h3 className="font-bold text-dark mb-2">Add a Room Type</h3>
                       <div className="space-y-4">
                          <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Room Name</label>
                            <input 
                              value={newRoom.type}
                              onChange={e => setNewRoom({...newRoom, type: e.target.value})}
                              className="w-full p-3 bg-white border border-lightGray rounded-xl outline-none"
                              placeholder="e.g. Deluxe Sea View"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Price / Night</label>
                               <input 
                                 type="number"
                                 value={newRoom.basePrice}
                                 onChange={e => setNewRoom({...newRoom, basePrice: parseInt(e.target.value)})}
                                 className="w-full p-3 bg-white border border-lightGray rounded-xl outline-none"
                               />
                             </div>
                             <div>
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Quantity</label>
                               <input 
                                 type="number"
                                 value={newRoom.totalCount}
                                 onChange={e => setNewRoom({...newRoom, totalCount: parseInt(e.target.value)})}
                                 className="w-full p-3 bg-white border border-lightGray rounded-xl outline-none"
                               />
                             </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Guest Capacity</label>
                            <input 
                              type="number"
                              value={newRoom.capacity}
                              onChange={e => setNewRoom({...newRoom, capacity: parseInt(e.target.value)})}
                              className="w-full p-3 bg-white border border-lightGray rounded-xl outline-none"
                            />
                          </div>
                          <button 
                             onClick={handleAddRoom}
                             disabled={isLoading || !newRoom.type}
                             className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                          >
                             <Plus size={18} /> Add Room
                          </button>
                       </div>
                    </div>

                    {/* Room List */}
                    <div className="lg:col-span-2">
                       <h3 className="font-bold text-dark mb-4 flex items-center justify-between">
                          Current Room Types
                          <span className="bg-grayBg px-2 py-0.5 rounded text-sm text-gray-500 font-medium">{rooms.length} Types</span>
                       </h3>
                       
                       {rooms.length === 0 ? (
                         <div className="py-20 text-center border-2 border-dashed border-lightGray rounded-3xl">
                             <Bed className="mx-auto text-gray-300 mb-4" size={40} />
                             <p className="text-gray-400">No rooms added yet. Add your first room type to proceed.</p>
                         </div>
                       ) : (
                         <div className="space-y-4">
                            {rooms.map(room => (
                               <div key={room.id} className="p-5 border border-lightGray rounded-2xl flex items-center justify-between hover:border-primary/30 transition-all bg-white shadow-sm">
                                  <div className="flex items-center gap-4">
                                     <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                        <Bed size={24} />
                                     </div>
                                     <div>
                                        <h4 className="font-bold text-dark">{room.type}</h4>
                                        <p className="text-gray-500 text-sm">{room.capacity} Guests • {room.totalCount} Rooms Available</p>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-6">
                                     <div className="text-right">
                                        <div className="text-lg font-black text-dark">${room.basePrice}</div>
                                        <div className="text-[10px] uppercase font-bold text-gray-400">per night</div>
                                     </div>
                                     <button 
                                       onClick={() => handleDeleteRoom(room.id)}
                                       className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                     >
                                        <Trash2 size={18} />
                                     </button>
                                  </div>
                               </div>
                            ))}
                         </div>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* Step 3: Finish */}
        {step === 3 && (
           <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-20 px-8">
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 border-4 border-white shadow-xl">
                 <CheckCircle2 size={48} />
              </div>
              <h1 className="text-3xl font-black text-dark mb-4">Almost There!</h1>
              <p className="text-gray-500 max-w-lg mx-auto mb-12 text-lg leading-relaxed">
                 You've set up **{hotelData.name}** with **{rooms.length} room types**. Once you publish, guests will be able to find and book your property immediately.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button 
                   onClick={() => setStep(2)}
                   className="w-full sm:w-auto px-10 py-4 border border-lightGray text-gray-600 font-bold rounded-2xl hover:bg-grayBg transition-all"
                 >
                    Back to Design
                 </button>
                 <button 
                   onClick={handleActivate}
                   disabled={isLoading || rooms.length === 0}
                   className="w-full sm:w-auto px-12 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                 >
                    {isLoading ? "Publishing..." : "Launch Listing Now"}
                 </button>
              </div>

              {rooms.length === 0 && (
                <div className="mt-6 flex items-center justify-center gap-2 text-red-500 text-sm font-bold">
                   <AlertCircle size={16} /> Add at least one room type before publishing.
                </div>
              )}
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
