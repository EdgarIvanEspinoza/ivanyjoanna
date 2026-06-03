"use client";
import { useEffect, useState, useRef, useCallback } from "react";
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
  min-width: min(92vw, 1100px);
  min-height: min(70vh, 760px);
  border-radius: 8px;
  border: 2px solid rgba(247, 233, 176, 0.25);
  box-shadow: 0 0 0 1px rgba(247, 233, 176, 0.15),
    0 8px 32px -6px rgba(0, 0, 0, 0.8),
    inset 0 0 20px -8px rgba(247, 233, 176, 0.12);
  overflow: hidden;
  background: radial-gradient(
      circle at center,
      rgba(92, 103, 61, 0.18) 0%,
      rgba(45, 51, 33, 0.12) 38%,
      rgba(21, 25, 16, 0.88) 100%
    ),
    rgba(21, 25, 16, 0.96);

  @media (max-width: 820px) {
    min-width: calc(100vw - 32px);
    min-height: min(58vh, 540px);
  }
`;

const CarouselImg = styled.img<{ $isLoaded?: boolean }>`
  width: auto;
  height: auto;
  max-width: calc(100vw - 80px);
  max-height: calc(100vh - 160px);
  object-fit: contain;
  image-rendering: auto;
  position: relative;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  transition: opacity 0.35s ease;
`;

const CarouselThumb = styled.img<{ $hidden?: boolean }>`
  width: auto;
  height: auto;
  max-width: calc(100vw - 80px);
  max-height: calc(100vh - 160px);
  object-fit: contain;
  image-rendering: auto;
  position: absolute;
  inset: 0;
  margin: auto;
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
  filter: saturate(0.96) brightness(0.94);
  transition: opacity 0.25s ease;
`;

const LoadingVeil = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(
    145deg,
    rgba(21, 25, 16, 0.34),
    rgba(29, 34, 22, 0.22)
  );
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.25s ease;
`;

const LoadingRing = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 2px solid rgba(247, 233, 176, 0.18);
  border-top-color: rgba(247, 233, 176, 0.82);
  animation: spinRing 0.9s linear infinite;

  @keyframes spinRing {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingLabel = styled.div`
  font-family: "Montaga", serif;
  font-size: 1.05rem;
  letter-spacing: 0.03em;
  color: rgba(247, 233, 176, 0.92);
  text-align: center;
  padding: 0 1.5rem;
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
  position: relative;
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
  min-width: 64px;
  min-height: 64px;
  border-radius: 50%;
  z-index: 10110;
  pointer-events: auto;
  touch-action: manipulation;
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
    transform: scale(1.08);
  }
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
  bottom: 58px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  justify-content: center;
  z-index: 10030;
  @media (max-width: 600px) {
    display: none;
  }
`;

const MobileTopBar = styled.div`
  display: none;

  @media (max-width: 600px) {
    position: absolute;
    top: 12px;
    left: 14px;
    right: 92px;
    display: flex;
    justify-content: flex-start;
    z-index: 10100;
  }
`;

const MobileNavBar = styled.div`
  display: none;

  @media (max-width: 600px) {
    position: absolute;
    left: 50%;
    bottom: 44px;
    transform: translateX(-50%);
    width: min(calc(100vw - 28px), 420px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    z-index: 10035;
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

const MobileActionBtn = styled(ActionBtn)`
  width: 100%;
  min-height: 48px;
  padding: 0.8rem 1rem;
`;

const MobileDownloadBtn = styled(ActionBtn)`
  min-height: 44px;
  padding: 0.68rem 1rem;
  font-size: 0.88rem;

  ${BtnLabel} {
    font-size: 0.82rem;
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

interface S3GalleryResponse {
  files?: S3File[];
  totalCount?: number;
  nextCursor?: string | null;
  hasMore?: boolean;
  unavailable?: boolean;
  error?: string;
}

export default function S3Gallery() {
  const [files, setFiles] = useState<S3File[]>([]);
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [highResLoaded, setHighResLoaded] = useState(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const pageSize = 60;
  const loadedLightboxImages = useRef<Set<string>>(new Set());
  const loadingLightboxImages = useRef<Map<string, Promise<void>>>(new Map());
  const activeLightboxUrl = useRef<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const preloadLightboxImage = useCallback((url?: string | null) => {
    if (!url) {
      return Promise.resolve();
    }

    if (loadedLightboxImages.current.has(url)) {
      return Promise.resolve();
    }

    const activeRequest = loadingLightboxImages.current.get(url);
    if (activeRequest) {
      return activeRequest;
    }

    const request = new Promise<void>((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        loadedLightboxImages.current.add(url);
        loadingLightboxImages.current.delete(url);
        resolve();
      };
      img.onerror = () => {
        loadingLightboxImages.current.delete(url);
        reject(new Error(`Failed to preload image: ${url}`));
      };
      img.src = url;
    });

    loadingLightboxImages.current.set(url, request);
    return request;
  }, []);

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

  const fetchFiles = useCallback(async (after?: string | null, append = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const query = new URLSearchParams({ pageSize: String(pageSize) });
      if (after) {
        query.set("after", after);
      }

      const res = await fetch(`/api/s3-list?${query.toString()}`);
      const data: S3GalleryResponse = await res.json();

      if (data.unavailable) {
        if (!append) {
          setFiles([]);
          setThumbs({});
        }
        setHasMore(false);
        setNextCursor(null);
        setError(data.error || "La galeria profesional esta temporalmente no disponible.");
        return 0;
      }

      if (!res.ok) throw new Error("No se pudo cargar la galería S3");
      const allFiles: S3File[] = data.files || [];

      // Separar thumbnails y originales
      const thumbsMap: Record<string, string> = {};
      allFiles.forEach((f) => {
        if (f.key.endsWith("-thumb.jpg")) {
          const originalKey = f.key.replace(/-thumb\.jpg$/, ".jpg");
          thumbsMap[originalKey] = f.url;
        }
      });
      setThumbs((currentThumbs) =>
        append ? { ...currentThumbs, ...thumbsMap } : thumbsMap
      );

      // Filtrar solo originales para mostrar en el grid
      const originals = allFiles.filter((f) => !f.key.endsWith("-thumb.jpg"));
      setFiles((currentFiles) => (append ? [...currentFiles, ...originals] : originals));
      setHasMore(Boolean(data.hasMore));
      setNextCursor(data.nextCursor ?? null);
      setError(null);
      return originals.length;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      setHasMore(false);
      return 0;
    } finally {
      if (append) {
        setIsLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  }, [pageSize]);

  useEffect(() => {
    void fetchFiles();
  }, [fetchFiles]);

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const res = await fetch("/api/s3-count");
        const data: S3GalleryResponse = await res.json();

        if (data.unavailable) {
          return;
        }

        if (!res.ok) {
          throw new Error("No se pudo cargar el conteo total");
        }

        setTotalCount(data.totalCount ?? null);
      } catch (err) {
        console.error("Error al obtener el conteo total:", err);
      }
    };

    void fetchTotalCount();
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (!nextCursor || isLoadingMore) {
      return;
    }

    await fetchFiles(nextCursor, true);
  }, [fetchFiles, isLoadingMore, nextCursor]);

  // Lightbox navigation mejorada
  const goTo = useCallback(
    async (idx: number) => {
      if (idx < 0) {
        setLightboxIndex(0);
        return;
      }

      if (idx >= files.length) {
        if (hasMore && nextCursor && !isLoadingMore) {
          const addedItems = await fetchFiles(nextCursor, true);
          if (addedItems > 0) {
            setLightboxIndex(idx);
            return;
          }
        }

        if (files.length > 0) {
          setLightboxIndex(files.length - 1);
          return;
        }
        return;
      }

      setLightboxIndex(idx);
    },
    [fetchFiles, files.length, hasMore, isLoadingMore, nextCursor]
  );

  // Reset high res loaded cuando cambia la imagen
  useEffect(() => {
    if (lightboxIndex === null || !files[lightboxIndex]) {
      activeLightboxUrl.current = null;
      setHighResLoaded(false);
      return;
    }

    const currentUrl = files[lightboxIndex].url;
    activeLightboxUrl.current = currentUrl;
    setHighResLoaded(loadedLightboxImages.current.has(currentUrl));

    void preloadLightboxImage(files[lightboxIndex + 1]?.url);
    void preloadLightboxImage(files[lightboxIndex - 1]?.url);
  }, [files, lightboxIndex, preloadLightboxImage]);

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

  const handleLightboxTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (lightboxIndex === null) {
        return;
      }

      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
    },
    [lightboxIndex]
  );

  const handleLightboxTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (lightboxIndex === null) {
        return;
      }

      const startX = touchStartX.current;
      const startY = touchStartY.current;
      touchStartX.current = null;
      touchStartY.current = null;

      if (startX === null || startY === null) {
        return;
      }

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
        return;
      }

      if (deltaX < 0) {
        void goTo(lightboxIndex + 1);
        return;
      }

      void goTo(lightboxIndex - 1);
    },
    [goTo, lightboxIndex]
  );

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
          <Pagination>
            <PageIndicator>
              {loading
                ? "Cargando galería..."
                : totalCount !== null
                  ? `${files.length} de ${totalCount} fotos cargadas`
                  : `${files.length} fotos cargadas`}
            </PageIndicator>
            <Button onClick={() => void handleLoadMore()} disabled={!hasMore || loading || isLoadingMore}>
              {isLoadingMore ? "Cargando..." : hasMore ? "Cargar más" : "Todo cargado"}
            </Button>
          </Pagination>
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
              <>
                {files.map((file, idx) => {
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
                })}
                {isLoadingMore &&
                  Array.from({ length: 8 }).map((_, idx) => (
                    <MediaCard key={`loading-more-${idx}`} style={{ cursor: "default" }}>
                      <SkeletonBox />
                    </MediaCard>
                  ))}
              </>
            )}
          </Grid>
          <Pagination>
            <PageIndicator>
              {totalCount !== null
                ? hasMore
                  ? `Vas en ${files.length} de ${totalCount} fotos`
                  : `Ya viste las ${totalCount} fotos`
                : hasMore
                  ? "Sigue explorando la galería"
                  : "Ya viste todas las fotos cargadas"}
            </PageIndicator>
            <Button onClick={() => void handleLoadMore()} disabled={!hasMore || loading || isLoadingMore}>
              {isLoadingMore ? "Cargando..." : hasMore ? "Cargar más" : "Todo cargado"}
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
              <MobileTopBar>
                <MobileDownloadBtn
                  type="button"
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
                </MobileDownloadBtn>
              </MobileTopBar>
              <OverlayInner onClick={(e) => e.stopPropagation()}>
                <CarouselImgContainer
                  onTouchStart={handleLightboxTouchStart}
                  onTouchEnd={handleLightboxTouchEnd}
                >
                  {thumbs[files[lightboxIndex].key] && (
                    <CarouselThumb
                      src={thumbs[files[lightboxIndex].key]}
                      alt={`${files[lightboxIndex].key} vista previa`}
                      $hidden={highResLoaded}
                    />
                  )}
                  <LoadingVeil $visible={!highResLoaded}>
                    <LoadingRing />
                    <LoadingLabel>Cargando foto en alta resolución...</LoadingLabel>
                  </LoadingVeil>
                  <CarouselImg
                    key={files[lightboxIndex].url}
                    src={files[lightboxIndex].url}
                    alt={files[lightboxIndex].key}
                    $isLoaded={highResLoaded}
                    onLoad={() => {
                      const currentUrl = files[lightboxIndex].url;
                      loadedLightboxImages.current.add(currentUrl);

                      if (activeLightboxUrl.current === currentUrl) {
                        setHighResLoaded(true);
                      }
                    }}
                  />
                </CarouselImgContainer>
                <Counter>
                  {lightboxIndex + 1} / {totalCount ?? files.length}
                </Counter>
              </OverlayInner>
              <MobileNavBar>
                <MobileActionBtn
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    void goTo(lightboxIndex - 1);
                  }}
                >
                  <BtnIcon>←</BtnIcon>
                  <BtnLabel>Anterior</BtnLabel>
                </MobileActionBtn>
                <MobileActionBtn
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    void goTo(lightboxIndex + 1);
                  }}
                >
                  <BtnLabel>Siguiente</BtnLabel>
                  <BtnIcon style={{ marginRight: 0, marginLeft: "0.5rem" }}>→</BtnIcon>
                </MobileActionBtn>
              </MobileNavBar>
              <ActionBar>
                <ActionBtn
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    void goTo(lightboxIndex - 1);
                  }}
                >
                  <BtnIcon>←</BtnIcon>
                  <BtnLabel>Anterior</BtnLabel>
                </ActionBtn>
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
                  <BtnLabel>Descargar Full Resolución</BtnLabel>
                </ActionBtn>
                <ActionBtn
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    void goTo(lightboxIndex + 1);
                  }}
                >
                  <BtnLabel>Siguiente</BtnLabel>
                  <BtnIcon style={{ marginRight: 0, marginLeft: "0.5rem" }}>→</BtnIcon>
                </ActionBtn>
              </ActionBar>
            </Overlay>
          )}
        </>
      )}
    </div>
  );
}
