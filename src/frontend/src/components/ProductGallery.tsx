import { useState } from 'react';
import type { ExternalBlob } from '../backend';

interface ProductGalleryProps {
  images: ExternalBlob[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/5] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <img
          src={images[selectedIndex].getDirectURL()}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                index === selectedIndex
                  ? 'border-[#a932bd] ring-2 ring-[#a932bd]/20'
                  : 'border-transparent hover:border-muted-foreground/30'
              }`}
            >
              <img
                src={image.getDirectURL()}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
