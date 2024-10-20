'use client';

import { HeroComponent } from '@/components/Hero/HeroComponent';
import { MenuComponent } from '@/components/Menu/MenuComponent';
import { OurHistoryComponent } from '@/components/OurHistory/OurHistoryComponent';

export default function Home() {
  return (
    <main>
      <HeroComponent />
      <MenuComponent />
      <OurHistoryComponent />
    </main>
  );
}
