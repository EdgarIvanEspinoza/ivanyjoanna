"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { DecoratorComponent } from "../Common/Decorator/DecoratorComponent";
import { MenuComponent } from "../Common/Menu/MenuComponent";
import { FellowshipSeparatorComponent } from "../Common/FellowshipSeparator/FellowshipSeparatorComponent";
import { FooterComponent } from "../Common/Footer/FooterComponent";
import styled from "styled-components";
import MediaGallery from "./MediaGallery";
import DriveGalleryIframe from "./DriveGalleryIframe";
import S3Gallery from "./S3Gallery";

// Estilo para el contenedor principal
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #515d38;
  min-height: 100vh;
  color: #e5dcbf;
`;

const Content = styled.div`
  width: 92%;
  max-width: 1400px;
  margin: 3rem auto 6rem auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  flex: 1;
`;

const BottomDecor = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

const Title = styled.h1`
  font-family: "Montaga", serif;
  font-size: 5.2rem;
  font-weight: 400;
  line-height: 5.2rem;
  text-align: center;
  margin: 4rem 0 1rem 0;
  @media (max-width: 980px) {
    font-size: 3.6rem;
    line-height: 3.6rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    gap: 0.5rem;
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  padding: 0.8rem 2rem;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, #515d38 0%, #626f4a 100%)"
      : "linear-gradient(135deg, #3a3f2a 0%, #2d3321 100%)"};
  color: ${({ $active }) => ($active ? "#f7e9b0" : "#b8a876")};
  border: 1px solid ${({ $active }) => ($active ? "#f7e9b0" : "#5a6442")};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ $active }) =>
    $active
      ? "0 4px 12px rgba(247, 233, 176, 0.2), inset 0 0 12px rgba(247, 233, 176, 0.1)"
      : "0 2px 6px rgba(0, 0, 0, 0.2)"};

  &:hover {
    background: linear-gradient(135deg, #515d38 0%, #626f4a 100%);
    border-color: #f7e9b0;
    color: #f7e9b0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(247, 233, 176, 0.3);
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 0.7rem 1.2rem;
  }
`;

// Mensaje de mantenimiento con el estilo LOTR
const MaintenanceMessage = styled.div`
  --gold1: #f7e9b0;
  --gold2: #d9c27b;
  --gold3: #9d8646;
  background: linear-gradient(
      145deg,
      rgba(69, 79, 48, 0.9) 0%,
      rgba(53, 61, 39, 0.92) 65%,
      rgba(38, 44, 28, 0.95) 100%
    ),
    url("/assets/images/lotr-map.jpg");
  background-size: cover;
  background-blend-mode: multiply;
  border: 1px solid rgba(247, 233, 176, 0.28);
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 0 0 1px rgba(247, 233, 176, 0.12),
    0 4px 14px -4px rgba(0, 0, 0, 0.6),
    inset 0 0 24px -6px rgba(247, 233, 176, 0.18);

  h2 {
    font-family: "Montaga", serif;
    font-size: 2.4rem;
    color: var(--gold1);
    margin-top: 0;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    position: relative;

    &:before,
    &:after {
      content: url("/assets/images/star-white.svg");
      width: 18px;
      height: 18px;
      opacity: 0.75;
      display: inline-block;
      margin: 0 10px;
      filter: drop-shadow(0 0 4px rgba(247, 233, 176, 0.6));
    }
  }

  p {
    font-size: 1.25rem;
    line-height: 1.8;
    margin-bottom: 1rem;
  }
`;

export default function MediaGalleryWithFallback() {
  const [activeTab, setActiveTab] = useState<"professional" | "guests">(
    "professional"
  );
  const [driveFolderId, setDriveFolderId] = useState(
    "1hkfLg0vEj8zkOJWogVl0Zh9HL9Pn9hax"
  );

  return (
    <PageWrapper>
      <div style={{ alignSelf: "center" }}>
        <DecoratorComponent />
      </div>
      <MenuComponent />
      <Content>
        <Title>Galería de fotos</Title>

        <TabContainer>
          <Tab
            $active={activeTab === "professional"}
            onClick={() => setActiveTab("professional")}
          >
            Fotos Profesionales
          </Tab>
          <Tab
            $active={activeTab === "guests"}
            onClick={() => setActiveTab("guests")}
          >
            Fotos de Invitados
          </Tab>
        </TabContainer>

        <>
          {activeTab === "professional" ? (
            <S3Gallery />
          ) : (
            <DriveGalleryIframe folderId={driveFolderId} />
          )}
        </>
      </Content>
      <BottomDecor>
        <FellowshipSeparatorComponent />
        <FooterComponent />
      </BottomDecor>
    </PageWrapper>
  );
}
