import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-react';

const ImageUpload = ({ onUploadSuccess, cloudName = "dv4a3qyrt", uploadPreset = "staysoul_uploads", currentPhotos = [] }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState(currentPhotos || []);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const uploadFiles = useCallback(async (files) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;

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

      setPreviews(prev => {
        const updated = [...prev, ...uploadedUrls];
        onUploadSuccess(updated);
        return updated;
      });
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    } finally {
      setIsUploading(false);
    }
  }, [cloudName, uploadPreset, onUploadSuccess]);

  const handleFileChange = (e) => {
    uploadFiles(Array.from(e.target.files));
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  // --- Drag & Drop Handlers ---
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set to false if leaving the container (not a child element)
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    uploadFiles(files);
  };

  const removeImage = (index) => {
    setPreviews(prev => {
      const updated = prev.filter((_, i) => i !== index);
      onUploadSuccess(updated);
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        className={`flex flex-col items-center justify-center border-4 border-dashed rounded-[40px] p-12 transition-all group relative overflow-hidden text-center cursor-pointer
          ${isDragging
            ? 'border-primary bg-primary/5 scale-[1.01]'
            : 'border-lightGray bg-grayBg/20 hover:border-primary/50'
          }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="text-dark font-black text-xl italic">Uploading photos...</p>
          </div>
        ) : isDragging ? (
          <div className="flex flex-col items-center gap-4 pointer-events-none">
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-xl animate-bounce">
              <Upload className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-black text-primary">Drop photos here!</h3>
            <p className="text-primary/70 font-medium">Release to upload</p>
          </div>
        ) : (
          <>
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
              <Upload className="text-primary" size={32} />
            </div>
            <h3 className="text-2xl font-black text-dark mb-2">Drag & drop your property photos</h3>
            <p className="text-gray-500 font-medium max-w-xs leading-relaxed">
              Or <span className="text-primary font-bold underline">click to browse</span>. High-resolution JPG, PNG or WebP works best. (Up to 10 photos)
            </p>
          </>
        )}
      </div>

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {previews.map((url, index) => (
            <div
              key={index}
              className="aspect-square relative group rounded-2xl overflow-hidden border-2 border-white shadow-lg animate-in zoom-in-75 duration-300"
            >
              <img src={url} alt={`Property photo ${index + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-md"
                title="Remove photo"
              >
                <X size={14} />
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] font-black text-white uppercase">
                Photo {index + 1}
              </div>
            </div>
          ))}

          {/* Add more photos tile */}
          <div
            className="aspect-square flex flex-col items-center justify-center gap-2 border-2 border-dashed border-lightGray rounded-2xl text-gray-400 hover:text-dark hover:border-dark transition-all cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Add more</span>
          </div>
        </div>
      )}

      {previews.length > 0 && (
        <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3 text-green-700 font-bold text-sm">
          <CheckCircle2 size={20} />
          <span>{previews.length} photo{previews.length > 1 ? 's' : ''} uploaded — looking great!</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
