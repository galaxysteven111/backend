import { useState, useRef } from 'react';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { getErrorMessage, resolveImageUrl } from '../lib/utils';
import LoadingSpinner from './LoadingSpinner';

const MAX_DIMENSION = 1200;
const COMPRESS_QUALITY = 0.8;

/** Compress image on client side before upload */
function compressImage(file: File): Promise<File> {
  // Skip small files or non-image types
  if (file.size < 200 * 1024) return Promise.resolve(file);

  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
        resolve(file);
        return;
      }
      const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(file); return; }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) { resolve(file); return; }
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        COMPRESS_QUALITY
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onChange, maxImages = 3 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remaining = maxImages - images.length;
    if (remaining <= 0) {
      toast.error(`最多只能上傳 ${maxImages} 張圖片`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remaining);
    setUploading(true);

    try {
      const uploaded: string[] = [];
      for (const file of filesToUpload) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} 超過 5MB 限制`);
          continue;
        }
        const compressed = await compressImage(file);
        const formData = new FormData();
        formData.append('image', compressed);
        const response = await api.post('/food-boxes/upload-image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploaded.push(response.data.imageUrl);
      }
      if (uploaded.length > 0) {
        onChange([...images, ...uploaded]);
        toast.success(`已上傳 ${uploaded.length} 張圖片`);
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, '上傳失敗'));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((url, index) => (
          <div key={index} className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-gray-200 group">
            <img
              src={resolveImageUrl(url)}
              alt={`圖片 ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              X
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <label className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all">
            {uploading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <svg className="w-6 h-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs text-gray-500">上傳圖片</span>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        最多 {maxImages} 張，每張不超過 5MB（JPG/PNG/WebP）
      </p>
    </div>
  );
}
