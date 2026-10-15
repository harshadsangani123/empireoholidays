"use client";

import { useEffect, useState } from "react";

export default function HeroSlider({ images }: { images: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slider-image${currentSlide === index ? " active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
    </div>
  );
}
