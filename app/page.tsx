'use client';

import { HeroComponent } from '@/components/Hero/HeroComponent';
import { MenuComponent } from '@/components/Common/Menu/MenuComponent';
import { OurHistoryComponent } from '@/components/OurHistory/OurHistoryComponent';
import { PlaceTransportComponent } from '@/components/PlaceTransport/PlaceTransportComponent';
import { FooterComponent } from '@/components/Common/Footer/FooterComponent';
import { FellowshipSeparatorComponent } from '@/components/Common/FellowshipSeparator/FellowshipSeparatorComponent';
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
        {/* <PlaceTransportComponent /> */}
        <FooterComponent />
      </div>
    </main>
  );
}
