import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import OurStory from '../components/OurStory';
import WeddingDetails from '../components/WeddingDetails';
import RSVP from '../components/RSVP';
import Gallery from '../components/Gallery';
import '../styles/globals.css';

const Home = () => (
  <div>
    <Head>
      <title>Mystical Wedding</title>
      <meta
        name="description"
        content="A mystical and enchanting wedding experience"
      />
    </Head>
    <Header />
    <main>
      <OurStory />
      <WeddingDetails />
      <RSVP />
      <Gallery />
    </main>
  </div>
);

export default Home;
