"use client";

import { HeroComponent } from "@/components/Hero/HeroComponent";
import { MenuComponent } from "@/components/Common/Menu/MenuComponent";
import { OurHistoryComponent } from "@/components/OurHistory/OurHistoryComponent";
import { FooterComponent } from "@/components/Common/Footer/FooterComponent";
import { FellowshipSeparatorComponent } from "@/components/Common/FellowshipSeparator/FellowshipSeparatorComponent";
import { GalleryInvite } from "@/components/Common/GalleryInvite/GalleryInvite";
import { useState, useCallback } from "react";
import { MainVideo } from "@/components/Common/VideoSection/MainVideo";

export default function Home() {
  const [rsvpOpen, setRsvpOpen] = useState(true);
  const handleExpire = useCallback(() => setRsvpOpen(false), []);

  return (
    <main>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <HeroComponent />
        <MenuComponent />
        <GalleryInvite />
        <MainVideo />
        <OurHistoryComponent />
        {/* {rsvpOpen && <GuestSignup />} */}
        <FellowshipSeparatorComponent />
        {/* <PlaceTransportComponent /> */}
        <FooterComponent />
      </div>
    </main>
  );
}
