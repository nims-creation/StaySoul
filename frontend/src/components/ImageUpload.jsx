import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-react';

const ImageUpload = ({ onUploadSuccess, cloudName = "dv4a3qyrt", uploadPreset = "ml_default" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls = [];
    
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.secure_url);
        }
      }
      
      const updatedList = [...previews, ...uploadedUrls];
      setPreviews(updatedList);
      onUploadSuccess(updatedList); 
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onUploadSuccess(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center border-4 border-dashed border-lightGray rounded-[40px] p-12 hover:border-primary/50 transition-all bg-grayBg/20 group relative overflow-hidden text-center">
        <input 
          type="file" 
          multiple 
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          disabled={isUploading}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="text-dark font-black text-xl italic">Optimizing for high-res...</p>
          </div>
        ) : (
          <>
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
               <Upload className="text-primary" size={32} />
            </div>
            <h3 className="text-2xl font-black text-dark mb-2">Drag in your property photos</h3>
            <p className="text-gray-500 font-medium max-w-xs leading-relaxed">
              High-resolution JPG, PNG or WebP works best. (Up to 10 photos)
            </p>
          </>
        )}
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {previews.map((url, index) => (
            <div key={index} className="aspect-square relative group rounded-2xl overflow-hidden border-2 border-white shadow-lg animate-in zoom-in-75 duration-300">
              <img src={url} alt="preview" className="w-full h-full object-cover" />
              <button 
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
              >
                <X size={14} />
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] font-black text-white uppercase">
                 Photo {index + 1}
              </div>
            </div>
          ))}
          
          <div className="aspect-square flex items-center justify-center border-2 border-dashed border-lightGray rounded-2xl text-gray-400 hover:text-dark hover:border-dark transition-all cursor-pointer relative">
             <ImageIcon size={24} />
             <input 
                type="file" 
                multiple 
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
             />
          </div>
        </div>
      )}
      
      {previews.length > 0 && (
        <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3 text-green-700 font-bold text-sm">
           <CheckCircle2 size={20} />
           <span>Everything looks great! These will be your property's gallery.</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
