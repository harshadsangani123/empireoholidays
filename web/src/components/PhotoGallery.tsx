"use client";

import { useEffect, useState } from "react";

export default function PhotoGallery({ photos, name }: { photos: string[]; name: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="photo-gallery">
        <h2>Photo Gallery</h2>
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={photo}
              alt={`${name} - Photo ${index + 1}`}
              className="gallery-image"
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[currentPhotoIndex]} alt={`${name} - Photo ${currentPhotoIndex + 1}`} className="lightbox-image" />
          {currentPhotoIndex > 0 && (
            <button
              className="lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPhotoIndex((i) => i - 1);
              }}
            >
              ‹
            </button>
          )}
          {currentPhotoIndex < photos.length - 1 && (
            <button
              className="lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPhotoIndex((i) => i + 1);
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
