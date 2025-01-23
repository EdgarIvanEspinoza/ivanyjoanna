'use client';

import { HeroComponent } from '@/components/Hero/HeroComponent';
import { MenuComponent } from '@/components/Menu/MenuComponent';
import { OurHistoryComponent } from '@/components/OurHistory/OurHistoryComponent';
import { PlaceTransportComponent } from '@/components/PlaceTransport/PlaceTransportComponent';
import { FooterComponent } from '@/components/Footer/FooterComponent';
import { FellowshipSeparatorComponent } from '@/components/FellowshipSeparator/FellowshipSeparatorComponent';
import { GuestSignup } from '@/components/GuestSingup/GuestSingup';

export default function Home() {
  return (
    <main>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <HeroComponent />
        <MenuComponent />
        <OurHistoryComponent />
        <GuestSignup />
        <FellowshipSeparatorComponent />
        <PlaceTransportComponent />
        <FooterComponent />
      </div>
    </main>
  );
}
