'use client';

import React from 'react';

const WeddingDetails = () => (
  <section id="wedding-details" className="p-8">
    <h2 className="text-center text-4xl text-green-800 mb-4">
      Wedding Details
    </h2>
    <div className="map">
      <img
        src="/images/map-image.png"
        alt="Wedding Venue Map"
        className="w-full max-w-lg mx-auto border-2 border-green-700 rounded-lg"
      />
    </div>
    <div className="details text-center mt-4">
      <p className="text-xl">Date: 12th December 2024</p>
      <p className="text-xl">Location: Enchanted Forest</p>
      {/* Add more details as needed */}
    </div>
  </section>
);

export default WeddingDetails;
