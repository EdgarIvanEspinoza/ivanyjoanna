"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.1rem;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.7rem;
  }
  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.4rem;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }
`;
const MediaCard = styled.div`
  position: relative;
  border-radius: 12px;
  border: 1.5px solid #e5dcbf33;
  background: linear-gradient(135deg, #2d3321 80%, #3a3f2a 100%);
  aspect-ratio: 1/1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(30, 32, 20, 0.08);
  transition: box-shadow 0.22s, transform 0.22s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 24px 0 rgba(30, 32, 20, 0.18);
    transform: translateY(-2px) scale(1.025);
    z-index: 2;
  }
  &:hover img {
    filter: brightness(1.08) saturate(1.08);
    transform: scale(1.045) rotate(-0.5deg);
  }
  @media (max-width: 820px) {
    padding: 1px;
    border-radius: 7px;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s cubic-bezier(0.4, 1.6, 0.6, 1), filter 0.22s;
  background: #1d2216;
  opacity: 0;
  animation: fadeInImg 0.7s forwards;
  @keyframes fadeInImg {
    to {
      opacity: 1;
    }
  }
`;

const SkeletonBox = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #2d3321 0%, #3a3f2a 50%, #2d3321 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

// Lightbox/Modal styles
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(
      145deg,
      rgba(29, 34, 22, 0.96) 0%,
      rgba(45, 51, 33, 0.94) 50%,
      rgba(29, 34, 22, 0.96) 100%
    ),
    url("/assets/images/lotr-map.jpg");
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  z-index: 9999;
`;
const OverlayInner = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem 1.5rem 4rem;
  position: relative;
  z-index: 10000;
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 32px;
    height: 32px;
    background: url("/assets/images/star-white.svg") center/contain no-repeat;
    opacity: 0.4;
    filter: drop-shadow(0 0 8px rgba(247, 233, 176, 0.5));
  }
  &::before {
    top: 80px;
    left: 30px;
  }
  &::after {
    top: 80px;
    right: 30px;
  }
  @media (max-width: 820px) {
    &::before,
    &::after {
      width: 20px;
      height: 20px;
      top: 60px;
    }
    &::before {
      left: 15px;
    }
    &::after {
      right: 15px;
    }
  }
`;
const CarouselImgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid rgba(247, 233, 176, 0.25);
  box-shadow: 0 0 0 1px rgba(247, 233, 176, 0.15),
    0 8px 32px -6px rgba(0, 0, 0, 0.8),
    inset 0 0 20px -8px rgba(247, 233, 176, 0.12);
  overflow: hidden;
`;

const CarouselImg = styled.img<{ $isLoaded?: boolean }>`
  width: auto;
  height: auto;
  max-width: calc(100vw - 80px);
  max-height: calc(100vh - 160px);
  object-fit: contain;
  image-rendering: auto;
  position: ${(props) => (props.$isLoaded ? "relative" : "absolute")};
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const CarouselThumb = styled.img`
  width: auto;
  height: auto;
  max-width: calc(100vw - 80px);
  max-height: calc(100vh - 160px);
  object-fit: contain;
  filter: blur(8px);
  opacity: 0.7;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 14px;
  background: linear-gradient(
    145deg,
    rgba(45, 51, 33, 0.92),
    rgba(29, 34, 22, 0.95)
  );
  color: #f7e9b0;
  border: 1.5px solid rgba(247, 233, 176, 0.35);
  padding: 10px 18px;
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: 6px;
  font-family: "Montaga", serif;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
  min-width: 64px;
  min-height: 44px;
  user-select: none;
  z-index: 10100;
  pointer-events: auto;
  box-shadow: 0 0 0 1px rgba(247, 233, 176, 0.15),
    0 4px 12px -2px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(247, 233, 176, 0.2);
  transition: all 0.22s ease;
  &:hover {
    background: linear-gradient(
      145deg,
      rgba(69, 79, 48, 0.95),
      rgba(45, 51, 33, 0.97)
    );
    border-color: rgba(247, 233, 176, 0.55);
    color: #fff;
    box-shadow: 0 0 0 1px rgba(247, 233, 176, 0.25),
      0 6px 18px -2px rgba(0, 0, 0, 0.9),
      inset 0 1px 3px rgba(247, 233, 176, 0.3);
  }
  &:active {
    transform: scale(0.97);
  }
`;
const ArrowBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(
    145deg,
    rgba(45, 51, 33, 0.88),
    rgba(29, 34, 22, 0.92)
  );
  color: #f7e9b0;
  border: 1.5px solid rgba(247, 233, 176, 0.3);
  font-size: 2.8rem;
  cursor: pointer;
  padding: 0.6rem 1rem 0.8rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 10020;
  box-shadow: 0 0 0 1px rgba(247, 233, 176, 0.12),
    0 4px 14px -3px rgba(0, 0, 0, 0.8),
    inset 0 1px 2px rgba(247, 233, 176, 0.15);
  transition: all 0.22s ease;
  &:hover {
    background: linear-gradient(
      145deg,
      rgba(69, 79, 48, 0.92),
      rgba(45, 51, 33, 0.96)
    );
    border-color: rgba(247, 233, 176, 0.5);
    color: #fff;
    box-shadow: 0 0 0 1px rgba(247, 233, 176, 0.22),
      0 6px 20px -3px rgba(0, 0, 0, 0.9),
      inset 0 1px 3px rgba(247, 233, 176, 0.25);
    transform: translateY(-50%) scale(1.08);
  }
`;
const ArrowLeft = styled(ArrowBtn)`
  left: 18px;
`;
const ArrowRight = styled(ArrowBtn)`
  right: 18px;
`;
const Counter = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(
    145deg,
    rgba(45, 51, 33, 0.9),
    rgba(29, 34, 22, 0.94)
  );
  color: #f7e9b0;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 1.15rem;
  font-family: "Montaga", serif;
  z-index: 10020;
  border: 1px solid rgba(247, 233, 176, 0.25);
  box-shadow: 0 0 0 1px rgba(247, 233, 176, 0.1),
    0 3px 10px -2px rgba(0, 0, 0, 0.7),
    inset 0 1px 2px rgba(247, 233, 176, 0.15);
`;

const ActionBar = styled.div`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  justify-content: center;
  z-index: 10030;
  @media (max-width: 600px) {
    gap: 0.7rem;
    bottom: 50px;
  }
`;

const BtnIcon = styled.span`
  font-size: 1.3rem;
  line-height: 1;
  margin-right: 0.5rem;
  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-right: 0.4rem;
  }
`;

const BtnLabel = styled.span`
  font-size: 1rem;
  letter-spacing: 0.5px;
  font-weight: 600;
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const ActionBtn = styled.button`
  background: linear-gradient(
    145deg,
    rgba(69, 79, 48, 0.94),
    rgba(53, 61, 39, 0.96)
  );
  color: #e5dcbf;
  border: 1.5px solid rgba(247, 233, 176, 0.25);
  border-radius: 6px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  padding: 0.75rem 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px rgba(247, 233, 176, 0.1),
    0 3px 12px -2px rgba(0, 0, 0, 0.7),
    inset 0 1px 2px rgba(247, 233, 176, 0.15);
  transition: all 0.22s ease;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(
      145deg,
      rgba(81, 93, 56, 0.96),
      rgba(69, 79, 48, 0.98)
    );
    border-color: rgba(247, 233, 176, 0.4);
    color: #f7e9b0;
    box-shadow: 0 0 0 1px rgba(247, 233, 176, 0.2),
      0 5px 18px -2px rgba(0, 0, 0, 0.8),
      inset 0 1px 3px rgba(247, 233, 176, 0.25);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 600px) {
    padding: 0.65rem 1.1rem;
    font-size: 0.9rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0 1rem 0;
`;
const PageIndicator = styled.div`
  color: #e5dcbf;
  font-family: "Montaga", serif;
  font-size: 1.15rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(
    145deg,
    rgba(45, 51, 33, 0.5),
    rgba(29, 34, 22, 0.6)
  );
  border-radius: 6px;
  border: 1px solid rgba(247, 233, 176, 0.15);
  min-width: 100px;
  text-align: center;
`;
const Button = styled.button`
  background: #515d38;
  color: #e5dcbf;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  padding: 0.7rem 1.4rem;
  cursor: pointer;
  border: none;
  font-size: 1.1rem;
  border-radius: 2px;
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    filter: brightness(1.08);
  }
`;

interface S3File {
  key: string;
  url: string;
  lastModified?: string;
  size?: number;
}

export default function S3Gallery() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [files, setFiles] = useState<S3File[]>([]);
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [highResLoaded, setHighResLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const pageSize = 60;

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };
    checkMobile();
  }, []);

  // Obtener el total de imágenes al cargar la página
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const res = await fetch("/api/s3-count");
        if (res.ok) {
          const data = await res.json();
          setTotalCount(data.totalCount);
          setTotalPages(Math.ceil(data.totalCount / pageSize));
        }
      } catch (err) {
        console.error("Error al obtener el conteo total:", err);
      }
    };
    fetchTotalCount();
  }, []);

  // Leer la página de la URL y cargar los datos
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const validPage = !isNaN(page) && page > 0 ? page : 1;
    setCurrentPage(validPage);
    fetchFiles(validPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const fetchFiles = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/s3-list?page=${page}&pageSize=${pageSize}`);
      if (!res.ok) throw new Error("No se pudo cargar la galería S3");
      const data = await res.json();
      const allFiles: S3File[] = data.files || [];

      // Separar thumbnails y originales
      const thumbsMap: Record<string, string> = {};
      allFiles.forEach((f) => {
        if (f.key.endsWith("-thumb.jpg")) {
          const originalKey = f.key.replace(/-thumb\.jpg$/, ".jpg");
          thumbsMap[originalKey] = f.url;
        }
      });
      setThumbs(thumbsMap);

      // Filtrar solo originales para mostrar en el grid
      const originals = allFiles.filter((f) => !f.key.endsWith("-thumb.jpg"));
      setFiles(originals);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      setLoading(false);
    }
  };

  const handleNext = useCallback(() => {
    const newPage = currentPage + 1;
    if (totalPages && newPage > totalPages) return;
    setCurrentPage(newPage);
    router.push(`/media?page=${newPage}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, totalPages, router]);

  const handlePrev = useCallback(() => {
    if (currentPage <= 1) return;
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    router.push(`/media?page=${newPage}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, router]);

  // Lightbox navigation mejorada
  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0) {
        // Si estamos en la primera imagen y hay página anterior, ir a la anterior y abrir la última
        if (currentPage > 1) {
          handlePrev();
          setTimeout(() => setLightboxIndex(pageSize - 1), 200);
          return;
        }
        setLightboxIndex(0);
        return;
      }
      if (idx >= files.length) {
        // Si estamos en la última imagen y hay página siguiente, ir a la siguiente y abrir la primera
        if (totalPages && currentPage < totalPages) {
          handleNext();
          setTimeout(() => setLightboxIndex(0), 200);
          return;
        }
        setLightboxIndex(files.length - 1);
        return;
      }
      setLightboxIndex(idx);
    },
    [files.length, currentPage, totalPages, handleNext, handlePrev]
  );

  // Reset high res loaded cuando cambia la imagen
  useEffect(() => {
    setHighResLoaded(false);
  }, [lightboxIndex]);

  // Permitir navegación con flechas físicas
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lightboxIndex !== null) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowRight") goTo(lightboxIndex + 1);
        if (e.key === "ArrowLeft") goTo(lightboxIndex - 1);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightboxIndex, goTo]);

  // Descargar imagen a través del endpoint proxy
  const downloadImage = (imageUrl: string, fileName: string) => {
    const downloadUrl = `/api/download-image?url=${encodeURIComponent(
      imageUrl
    )}&fileName=${encodeURIComponent(fileName)}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {error ? (
        <p style={{ color: "#ffb4b4", textAlign: "center" }}>{error}</p>
      ) : (
        <>
          <Grid>
            {loading ? (
              // Mostrar 60 skeletons mientras carga
              Array.from({ length: pageSize }).map((_, idx) => (
                <MediaCard
                  key={`skeleton-${idx}`}
                  style={{ cursor: "default" }}
                >
                  <SkeletonBox />
                </MediaCard>
              ))
            ) : files.length === 0 ? (
              <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
                No hay imágenes
              </p>
            ) : (
              files.map((file, idx) => {
                const thumbUrl = thumbs[file.key] || file.url;
                return (
                  <MediaCard
                    key={file.key}
                    onClick={() => setLightboxIndex(idx)}
                    style={{ cursor: "pointer" }}
                  >
                    <Img src={thumbUrl} alt={file.key} loading="lazy" />
                  </MediaCard>
                );
              })
            )}
          </Grid>
          <Pagination>
            <Button onClick={handlePrev} disabled={currentPage <= 1}>
              Anterior
            </Button>
            <PageIndicator>
              Página {currentPage}
              {totalPages && ` de ${totalPages}`}
            </PageIndicator>
            <Button
              onClick={handleNext}
              disabled={totalPages ? currentPage >= totalPages : false}
            >
              Siguiente
            </Button>
          </Pagination>
          {lightboxIndex !== null && files[lightboxIndex] && (
            <Overlay
              ref={overlayRef}
              role="dialog"
              aria-modal="true"
              onClick={() => setLightboxIndex(null)}
              tabIndex={-1}
            >
              <CloseBtn
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(null);
                }}
              >
                ✕
              </CloseBtn>
              <OverlayInner onClick={(e) => e.stopPropagation()}>
                <ArrowLeft
                  aria-label="Anterior"
                  onClick={() => goTo(lightboxIndex - 1)}
                >
                  ‹
                </ArrowLeft>
                <CarouselImgContainer>
                  {!highResLoaded && thumbs[files[lightboxIndex].key] && (
                    <CarouselThumb
                      src={thumbs[files[lightboxIndex].key]}
                      alt={`${files[lightboxIndex].key} thumbnail`}
                    />
                  )}
                  <CarouselImg
                    src={files[lightboxIndex].url}
                    alt={files[lightboxIndex].key}
                    $isLoaded={highResLoaded}
                    onLoad={() => setHighResLoaded(true)}
                  />
                </CarouselImgContainer>
                <ArrowRight
                  aria-label="Siguiente"
                  onClick={() => goTo(lightboxIndex + 1)}
                >
                  ›
                </ArrowRight>
                <Counter>
                  {lightboxIndex + 1} / {files.length}
                </Counter>
              </OverlayInner>
              <ActionBar>
                <ActionBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(
                      files[lightboxIndex].url,
                      files[lightboxIndex].key
                    );
                  }}
                >
                  <BtnIcon>⬇</BtnIcon>
                  <BtnLabel>Descargar</BtnLabel>
                </ActionBtn>
              </ActionBar>
            </Overlay>
          )}
        </>
      )}
    </div>
  );
}
