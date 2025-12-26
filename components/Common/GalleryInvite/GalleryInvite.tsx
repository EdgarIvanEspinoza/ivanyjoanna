"use client";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(45, 51, 33, 0.95) 0%,
    rgba(69, 79, 48, 0.92) 50%,
    rgba(45, 51, 33, 0.95) 100%
  );

  @media (max-width: 768px) {
    min-height: 350px;
    padding: 2rem 1rem;
  }
`;

const ImageGrid = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  opacity: 0.3;
  filter: blur(1px);
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
`;

const GridImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  animation: fadeInImage 0.8s ease-in-out forwards;

  @keyframes fadeInImage {
    to {
      opacity: 1;
    }
  }

  /* Escalonar la animación para cada imagen */
  &:nth-child(1) {
    animation-delay: 0.05s;
  }
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.15s;
  }
  &:nth-child(4) {
    animation-delay: 0.2s;
  }
  &:nth-child(5) {
    animation-delay: 0.25s;
  }
  &:nth-child(6) {
    animation-delay: 0.3s;
  }
  &:nth-child(7) {
    animation-delay: 0.35s;
  }
  &:nth-child(8) {
    animation-delay: 0.4s;
  }
  &:nth-child(9) {
    animation-delay: 0.45s;
  }
  &:nth-child(10) {
    animation-delay: 0.5s;
  }
  &:nth-child(11) {
    animation-delay: 0.55s;
  }
  &:nth-child(12) {
    animation-delay: 0.6s;
  }
  &:nth-child(13) {
    animation-delay: 0.65s;
  }
  &:nth-child(14) {
    animation-delay: 0.7s;
  }
  &:nth-child(15) {
    animation-delay: 0.75s;
  }
  &:nth-child(16) {
    animation-delay: 0.8s;
  }
  &:nth-child(17) {
    animation-delay: 0.85s;
  }
  &:nth-child(18) {
    animation-delay: 0.9s;
  }
`;

const ContentBox = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
  background: linear-gradient(
    145deg,
    rgba(69, 79, 48, 0.85) 0%,
    rgba(53, 61, 39, 0.9) 65%,
    rgba(38, 44, 28, 0.92) 100%
  );
  padding: 2.5rem 2rem;
  border-radius: 12px;
  border: 1px solid rgba(247, 233, 176, 0.25);
  box-shadow: 0 0 0 1px rgba(247, 233, 176, 0.12), 0 8px 32px rgba(0, 0, 0, 0.5),
    inset 0 0 24px rgba(247, 233, 176, 0.08);
  opacity: 0;
  animation: fadeInBox 0.8s ease-out 0.5s forwards;

  @keyframes fadeInBox {
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Title = styled.h2`
  font-family: "Montaga", serif;
  font-size: 3rem;
  color: #f7e9b0;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  position: relative;

  &:before,
  &:after {
    content: "✦";
    font-size: 1.5rem;
    opacity: 0.7;
    margin: 0 1rem;
    display: inline-block;
    color: #d9c27b;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;

    &:before,
    &:after {
      font-size: 1.2rem;
      margin: 0 0.5rem;
    }
  }
`;

const Description = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 1.25rem;
  line-height: 1.8;
  color: #e5dcbf;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

const GalleryButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 3rem;
  background: linear-gradient(135deg, #515d38 0%, #626f4a 100%);
  color: #f7e9b0;
  border: 2px solid #f7e9b0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(247, 233, 176, 0.2),
    inset 0 0 16px rgba(247, 233, 176, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: linear-gradient(135deg, #626f4a 0%, #727f5a 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(247, 233, 176, 0.35),
      inset 0 0 20px rgba(247, 233, 176, 0.15);
    border-color: #fff;
    color: #fff;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.85rem 2rem;
  }
`;

// URLs de imágenes de ejemplo - puedes reemplazar con tus imágenes reales de S3
const sampleImages = [
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(052)-thumb.jpg",
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(200)-thumb.jpg",
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(250)-thumb.jpg",
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(300)-thumb.jpg",
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(011)-thumb.jpg",
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(065)-thumb.jpg",
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(830)-thumb.jpg",
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(820)-thumb.jpg",
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(800)-thumb.jpg",
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(600)-thumb.jpg",
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(700)-thumb.jpg",
  "https://ivan-joanna-wedding-photos.s3.amazonaws.com/1%20(081)-thumb.jpg",
];

export function GalleryInvite() {
  const router = useRouter();

  return (
    <Container>
      <ImageGrid>
        {sampleImages.map((url, idx) => (
          <GridImage key={idx} src={url} alt="" />
        ))}
      </ImageGrid>

      <ContentBox>
        <Title>Revive la Magia</Title>
        <Description>
          Explora los momentos más especiales de nuestra boda. Fotos
          profesionales y recuerdos compartidos por nuestros invitados.
        </Description>
        <GalleryButton onClick={() => router.push("/media")}>
          Ver Galería de Fotos
        </GalleryButton>
      </ContentBox>
    </Container>
  );
}
