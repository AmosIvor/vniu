'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, X, Loader } from 'lucide-react';
import Cropper, { type ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useDebounce } from '@/hooks/useDebounce';
import { postRequest } from '@/lib/fetch';
import ProductCard from '@/components/ProductCard';

const ImageSearchWithCrop = () => {
  const [imgSrc, setImgSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [cropData, setCropData] = useState<string | null>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const debouncedCropData = useDebounce(cropData, 500);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const generateCroppedImage = async () => {
    if (!cropperRef.current) return null;

    const cropper = cropperRef.current.cropper;
    const canvas = cropper.getCroppedCanvas();

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('Canvas is empty');
            return;
          }
          console.log('🚀 ~ generateCroppedImage ~ blob:', blob);
          resolve(blob);
        },
        'image/jpeg',
        1
      );
    });
  };

  const uploadImage = async (blob) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', blob, 'cropped.jpg');
    console.log('🚀 ~ uploadImage ~ formData:', formData);

    try {
      const response = await fetch('http://localhost:8000/retrieve-image/', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await response.json();
      console.log('🚀 ~ uploadImage ~ data:', data);
      await fetchProducts(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (productItemIds) => {
    try {
      const response = await postRequest({
        endPoint:
          '/api/v1/products/product-item-ids/filter-and-sort?PageIndex=1&PageSize=11',
        formData: productItemIds,
        isFormData: false,
      });
      console.log('🚀 ~ fetchProducts ~ response:', response);

      setResults(response.value.items);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleSearchClick = async () => {
    if (!imgSrc) return;

    try {
      const croppedBlob = await generateCroppedImage();
      if (croppedBlob) {
        await uploadImage(croppedBlob);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const clearImage = () => {
    setImgSrc('');
    setCropData(null);
    setResults(null);
  };

  const handleCrop = () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current.cropper;
    const canvas = cropper.getCroppedCanvas();
    setCropData(canvas.toDataURL('image/jpeg'));
  };

  useEffect(() => {
    if (debouncedCropData) {
      handleSearchClick();
    }
  }, [debouncedCropData]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 border rounded-lg p-2">
        <input
          type="text"
          placeholder="Search for products..."
          className="flex-1 px-4 py-2 outline-none"
        />

        <div className="relative">
          <input
            type="file"
            onChange={onSelectFile}
            accept="image/*"
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2"
          >
            <Camera className="w-5 h-5" />
            <span className="text-sm">Search with image</span>
          </label>
        </div>
      </div>

      {imgSrc && (
        <div className="mt-4 flex gap-4">
          <div className="relative inline-block max-w-xl overflow-hidden">
            <Cropper
              ref={cropperRef}
              src={imgSrc}
              style={{ height: 400, width: '100%' }}
              // Cropper.js options
              initialAspectRatio={1}
              aspectRatio={1}
              guides={false}
              viewMode={1}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              crop={handleCrop}
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {cropData && (
            <div className="relative inline-block max-w-xs border rounded-lg overflow-hidden">
              <div className="text-center font-semibold mb-2">Preview</div>
              <img
                src={cropData}
                alt="Cropped Preview"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      )}

      {results && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSearchWithCrop;
