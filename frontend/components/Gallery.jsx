'use client';

import React from 'react';

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  // Add more image paths
];

const Gallery = () => (
  <section id="gallery" className="p-8">
    <h2 className="text-center text-4xl text-green-800 mb-4">Gallery</h2>
    <div className="gallery-container flex flex-wrap justify-center gap-4 mt-4">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Gallery ${index + 1}`}
          className="gallery-item w-full max-w-xs border-2 border-green-700 rounded-lg"
        />
      ))}
    </div>
  </section>
);

export default Gallery;
