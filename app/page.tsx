"use client";

import { HeroComponent } from "@/components/Hero/HeroComponent";
import { MenuComponent } from "@/components/Common/Menu/MenuComponent";
import { OurHistoryComponent } from "@/components/OurHistory/OurHistoryComponent";
import { PlaceTransportComponent } from "@/components/PlaceTransport/PlaceTransportComponent";
import { FooterComponent } from "@/components/Common/Footer/FooterComponent";
import { FellowshipSeparatorComponent } from "@/components/Common/FellowshipSeparator/FellowshipSeparatorComponent";
import { GuestSignup } from "@/components/GuestSingup/GuestSingup";
import { GalleryInvite } from "@/components/Common/GalleryInvite/GalleryInvite";
import { useState, useCallback } from "react";

export default function Home() {
  const [rsvpOpen, setRsvpOpen] = useState(true);
  const handleExpire = useCallback(() => setRsvpOpen(false), []);

  return (
    <main>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <HeroComponent />
        <MenuComponent />
        <GalleryInvite />
        <OurHistoryComponent />
        {rsvpOpen && <GuestSignup />}
        <FellowshipSeparatorComponent />
        {/* <PlaceTransportComponent /> */}
        <FooterComponent />
      </div>
    </main>
  );
}
