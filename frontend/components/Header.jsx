'use client';

import React from 'react';

const Header = () => (
  <header className="bg-gradient-to-r from-green-900 to-green-700 text-white p-8 flex justify-between items-center">
    <div className="logo text-4xl font-bold">Mystical Wedding</div>
    <nav>
      <ul className="nav-links flex space-x-4">
        <li>
          <a
            href="#our-story"
            className="text-yellow-300 no-underline hover:underline"
          >
            Our Story
          </a>
        </li>
        <li>
          <a
            href="#wedding-details"
            className="text-yellow-300 no-underline hover:underline"
          >
            Wedding Details
          </a>
        </li>
        <li>
          <a
            href="#rsvp"
            className="text-yellow-300 no-underline hover:underline"
          >
            RSVP
          </a>
        </li>
        <li>
          <a
            href="#gallery"
            className="text-yellow-300 no-underline hover:underline"
          >
            Gallery
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
