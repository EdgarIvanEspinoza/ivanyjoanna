'use client';

import React from 'react';

const OurStory = () => (
  <section id="our-story" className="p-8">
    <h2 className="text-center text-4xl text-green-800 mb-4">Our Story</h2>
    <div className="timeline">
      <div className="event bg-white border-2 border-green-700 rounded-lg p-4 mb-4">
        <h3 className="text-2xl">First Meeting</h3>
        <p>We met at a beautiful place...</p>
      </div>
      <div className="event bg-white border-2 border-green-700 rounded-lg p-4 mb-4">
        <h3 className="text-2xl">Engagement</h3>
        <p>The proposal was magical...</p>
      </div>
      {/* Add more events as needed */}
    </div>
  </section>
);

export default OurStory;
