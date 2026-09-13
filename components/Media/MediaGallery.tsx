'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { supabase } from '@/lib/supabaseClient';
import { DecoratorComponent } from '../Common/Decorator/DecoratorComponent';
import { MenuComponent } from '../Common/Menu/MenuComponent';
import { FellowshipSeparatorComponent } from '../Common/FellowshipSeparator/FellowshipSeparatorComponent';
import { FooterComponent } from '../Common/Footer/FooterComponent';
import { useSearchParams } from 'next/navigation';

// === Optimización Fase 1 (egress & storage) ===
const MAX_MAIN_SIDE = 1700; // antes 2000
const MAIN_QUALITY = 0.78;  // antes 0.82
const THUMB_QUALITY = 0.68; // antes 0.72
const MAX_FILE_BYTES = 12 * 1024 * 1024; // 12MB límite duro

// Helper: convert image file to WebP with optional resize of maxSidePx
async function convertImageToWebP(file: File, quality = MAIN_QUALITY, maxSidePx = MAX_MAIN_SIDE): Promise<Blob | null> {
  if (!file.type.startsWith('image/')) return null;
  let bitmap: ImageBitmap | null = null;
  try { bitmap = await createImageBitmap(file); } catch { return null; }
  if (!bitmap) return null;
  let { width, height } = bitmap;
  if (maxSidePx && (width > maxSidePx || height > maxSidePx)) {
    const scale = Math.min(maxSidePx / width, maxSidePx / height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) { try { bitmap.close(); } catch {} return null; }
  ctx.drawImage(bitmap, 0, 0, width, height);
  const blob: Blob | null = await new Promise(res => canvas.toBlob(res, 'image/webp', quality));
  try { bitmap.close(); } catch {}
  return blob;
}

interface MediaItem {
  id: string;
  path: string;
  thumb_path?: string | null;
  type: 'image';
  size_bytes: number;
  created_at: string;
  author?: string;
  width?: number;
  height?: number;
  publicUrl: string;
  thumbUrl?: string;
}

interface PendingFile {
  id: string;
  file: File;
  preview: string; // object URL
  status: 'pending' | 'converting' | 'uploading' | 'done' | 'error';
  originalSize: number;
  processedSize?: number;
  error?: string;
}

// Overlay (lightbox) styles
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.88);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  z-index: 9999;
`;

const OverlayInner = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem 1.5rem 4rem; /* extra top space so inner content doesn't sit under buttons */
  position: relative;
  z-index: 10000; /* below buttons (10100) but above backdrop */
`;

const CarouselMediaWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: clamp(8px, 2.2vw, 40px);
  box-sizing: border-box;
`;

const CarouselImg = styled.img`
  width: auto;
  height: auto;
  max-width: calc(100vw - 80px);
  max-height: calc(100vh - 160px);
  object-fit: contain;
  image-rendering: auto;
`;

// Removed video support; all items are images now.

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 14px;
  background: rgba(0,0,0,0.55);
  color: #e5dcbf;
  border: 1px solid #e5dcbf55;
  padding: 10px 18px;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
  min-width: 64px;
  min-height: 44px; /* comfortable touch target */
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  z-index: 10100; /* ensure above media/content */
  pointer-events: auto; /* force its own hit area even if overlapped */
  box-shadow: 0 2px 6px -1px rgba(0,0,0,0.7);
  &:hover { background: rgba(0,0,0,0.75); }
  &:active { transform: scale(.96); }
`;

const DownloadBtn = styled(CloseBtn)`
  right: auto;
  left: 14px;
  z-index: 10100;
`;

const ArrowBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: #e5dcbf;
  border: none;
  font-size: 2.8rem;
  cursor: pointer;
  padding: .6rem 1rem .8rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  z-index: 10020;
  &:hover { background: rgba(0,0,0,0.7); }
`;

const ArrowLeft = styled(ArrowBtn)`left: 18px;`;
const ArrowRight = styled(ArrowBtn)`right: 18px;`;

const Counter = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.5);
  color: #e5dcbf;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-family: 'Montserrat', sans-serif;
  z-index: 10020;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #515d38; /* Adjusted lighter tone as referenced */
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
  flex: 1; /* allow to stretch so bottom decor sticks to bottom on short pages */
`;

const BottomDecor = styled.div`
  margin-top: auto; /* push to bottom when content is short */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

const Title = styled.h1`
  font-family: 'Montaga', serif;
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

const UploadBox = styled.div`
  border: 1px solid #e5dcbf;
  background: rgba(69,79,48,0.4);
  backdrop-filter: blur(4px);
  padding: 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  background: #515d38;
  color: #e5dcbf;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  padding: 1.1rem 1.8rem;
  cursor: pointer;
  border: none;
  font-size: 1.4rem;
  border-radius: 2px;
  position: relative;
  transition: filter .25s, transform .18s;
  &:disabled { opacity: .4; cursor: not-allowed; }
  &:hover:not(:disabled) { filter: brightness(1.08); }
`;

// Secondary subtle gold-outline buttons (for Agregar más / Limpiar)
const SubtleButton = styled(Button)`
  background: linear-gradient(145deg, rgba(81,93,56,0.9) 0%, rgba(65,74,46,0.92) 70%, rgba(53,60,38,0.95) 100%);
  border: 1px solid rgba(247,233,176,0.28);
  color: #f2e7c4;
  font-weight: 600;
  letter-spacing: .5px;
  padding: 0.95rem 1.6rem 0.95rem 1.9rem;
  border-radius: 30px;
  box-shadow: 0 0 0 1px rgba(247,233,176,0.08), 0 2px 6px -2px rgba(0,0,0,0.55), inset 0 0 14px -8px rgba(247,233,176,0.25);
  font-size: 1.25rem;
  text-shadow: 0 0 4px rgba(247,233,176,0.35);
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 60% 45%, rgba(255,255,255,0.22), rgba(255,255,255,0) 65%);
    mix-blend-mode: overlay;
    opacity: .45;
    pointer-events: none;
  }
  &:hover:not(:disabled) { filter: brightness(1.1) saturate(1.05); }
  &:active:not(:disabled) { transform: scale(.95); }
  &:disabled { opacity: .45; filter: grayscale(.4); box-shadow: none; }
`;

// Themed ring button variant for primary selection (LOTR flair)
const RingButton = styled(Button)<{ $dimmed?: boolean }>`
  --gold1: #f7e9b0;
  --gold2: #d9c27b;
  --gold3: #9d8646;
  background: radial-gradient(circle at 30% 30%, var(--gold1) 0%, var(--gold2) 38%, var(--gold3) 100%);
  color: #2d2a19;
  box-shadow: 0 0 0 1px rgba(247,233,176,0.5), 0 0 14px -2px rgba(247,233,176,0.85), 0 4px 14px -4px rgba(0,0,0,0.6), inset 0 0 18px -6px rgba(255,250,220,0.9);
  border-radius: 40px;
  padding: 1.05rem 2.2rem 1.05rem 2.8rem;
  font-weight: 700;
  letter-spacing: .8px;
  font-size: 1.35rem;
  text-shadow: 0 0 4px rgba(255,255,255,0.45);
  overflow: hidden;
  &:before, &:after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  &:before {
    background: radial-gradient(circle at 65% 55%, rgba(255,255,255,0.35), rgba(255,255,255,0) 65%);
    mix-blend-mode: overlay;
    opacity: .55;
  }
  &:after {
    background: linear-gradient(120deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 55%);
    opacity: .45;
    transform: translateX(-60%);
    animation: ring-shine 4.2s linear infinite;
  }
  &:hover:not(:disabled) { filter: brightness(1.08) saturate(1.1); }
  &:active:not(:disabled) { transform: scale(.95); }
  @keyframes ring-shine {
    0% { transform: translateX(-70%) skewX(-18deg); opacity: 0; }
    10% { opacity: .7; }
    45% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
    100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
  }
  ${({ $dimmed }) => $dimmed && css`
    opacity: .58;
    filter: grayscale(.25) brightness(.85) saturate(.9);
    &:after { animation-play-state: paused; opacity: .18; }
    &:before { opacity: .28; }
  `}
`;

const BigUploadButton = styled(Button)`
  --gold1: #f7e9b0;
  --gold2: #d9c27b;
  --gold3: #9d8646;
  background: radial-gradient(circle at 30% 30%, var(--gold1) 0%, var(--gold2) 42%, var(--gold3) 100%);
  color: #2d2a19;
  font-size: 1.6rem;
  padding: 1.6rem 2.8rem 1.6rem 3.2rem;
  margin-top: 1.2rem;
  font-weight: 700;
  letter-spacing: .6px;
  width: 100%;
  max-width: 460px;
  align-self: flex-start;
  border-radius: 44px;
  box-shadow: 0 0 0 1px rgba(247,233,176,0.5), 0 0 18px -3px rgba(247,233,176,0.85), 0 6px 16px -6px rgba(0,0,0,0.55), inset 0 0 22px -8px rgba(255,250,220,0.9);
  position: relative;
  overflow: hidden;
  transition: transform .18s ease, box-shadow .25s ease, filter .25s;
  text-shadow: 0 0 4px rgba(255,255,255,0.4);
  &:before, &:after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  &:before {
    background: radial-gradient(circle at 65% 55%, rgba(255,255,255,0.34), rgba(255,255,255,0) 65%);
    mix-blend-mode: overlay;
    opacity: .55;
  }
  &:after {
    background: linear-gradient(120deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 55%);
    opacity: .45;
    transform: translateX(-65%);
    animation: ring-shine-big 4.5s linear infinite;
  }
  &:hover:not(:disabled) { filter: brightness(1.06) saturate(1.05); transform: translateY(-3px); }
  &:active:not(:disabled) { transform: scale(.96); }
  &:disabled { opacity: .5; filter: grayscale(.3) brightness(.85); box-shadow: none; }
  @keyframes ring-shine-big {
    0% { transform: translateX(-70%) skewX(-18deg); opacity: 0; }
    12% { opacity: .75; }
    48% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
    100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
  }
  @media (max-width: 620px) {
    max-width: 100%;
    font-size: 1.5rem;
  }
`;

const UploadActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const PendingGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .8rem;
  margin-top: .6rem;
`;

const PendingItem = styled.div`
  position: relative;
  background: #2d3321;
  border: 1px solid #555;
  border-radius: 6px;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: .9rem;
`;

const PendingThumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PendingBadge = styled.span<{state:string}>`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({state}) => state==='done' ? 'rgba(60,140,60,0.85)' : state==='error' ? 'rgba(170,50,50,0.85)' : 'rgba(0,0,0,0.55)'};
  padding: 2px 6px;
  border-radius: 12px;
  color: #e5dcbf;
  font-size: .7rem;
  letter-spacing: .5px;
`;

const RemovePendingBtn = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(0,0,0,0.55);
  color: #ffb4b4;
  border: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { background: rgba(0,0,0,0.8); }
`;

const FloatingAdd = styled.button`
  position: fixed;
  bottom: 90px;
  right: 18px;
  background: #e5dcbf;
  color: #2d3321;
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 2.2rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 16px -4px rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 600;
  transition: transform .15s, filter .2s;
  &:hover { filter: brightness(.95); transform: translateY(-3px); }
  &:active { transform: scale(.92); }
`;

const Toast = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.78);
  padding: 12px 20px;
  border-radius: 28px;
  color: #e5dcbf;
  font-size: 1.2rem;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #e5dcbf33;
  letter-spacing: .4px;
  max-width: 90%;
  text-align: center;
  z-index: 650;
  opacity: 0;
  pointer-events: none;
  transition: opacity .4s;
  &.show { opacity: 1; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
  @media (max-width: 820px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
  }
`;

const MediaCard = styled.div`
  position: relative;
  border: 1px solid #e5dcbf44;
  background: #2d3321;
  aspect-ratio: 1/1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  box-sizing: border-box;
  &:hover img, &:hover video { transform: scale(1.02); }
  @media (max-width: 820px) {
    padding: 2px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform .25s ease;
  background: #1d2216;
`;

const Vid = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #1d2216;
  transition: transform .25s ease;
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0,0,0,0.55);
  color: #e5dcbf;
  border: 1px solid #e5dcbf55;
  padding: 4px 10px 6px;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transition: background .2s, transform .15s;
  &:hover { background: rgba(0,0,0,0.85); transform: scale(1.05); }
  &:active { transform: scale(0.92); }
`;

const Note = styled.p`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.9rem;
`;

// Enhanced intro styling for upload area (LOTR theme)
const UploadIntro = styled.div`
  --gold: #f7e9b0;
  --gold-soft: #e5dcbf;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  background:
    linear-gradient(145deg, rgba(69,79,48,0.9) 0%, rgba(53,61,39,0.92) 65%, rgba(38,44,28,0.95) 100%),
    url('/assets/images/lotr-map.jpg');
  background-size: cover;
  background-blend-mode: multiply;
  border: 1px solid rgba(247,233,176,0.28);
  padding: 1.6rem 1.9rem 2rem;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(247,233,176,0.12), 0 4px 14px -4px rgba(0,0,0,0.6), inset 0 0 24px -6px rgba(247,233,176,0.18);
  font-family: 'Montserrat', sans-serif;
  isolation: isolate;
  &:before, &:after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 18% 22%, rgba(247,233,176,0.20), transparent 60%),
      radial-gradient(circle at 82% 70%, rgba(247,233,176,0.14), transparent 65%);
    mix-blend-mode: overlay;
    opacity: .55;
  }
  &:after { filter: blur(14px); opacity: .35; }
`;

const UploadIntroHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Montaga', serif;
  font-size: 2.3rem;
  line-height: 2.3rem;
  font-weight: 400;
  letter-spacing: .6px;
  position: relative;
  z-index: 1;
  text-shadow: 0 0 6px rgba(247,233,176,0.35), 0 0 1px #000;
  &:before, &:after {
    content: url('/assets/images/star-white.svg');
    width: 18px;
    height: 18px;
    opacity: .75;
    filter: drop-shadow(0 0 4px rgba(247,233,176,0.6));
  }
  &:before { margin-right: .2rem; }
  &:after { margin-left: .4rem; transform: scale(.85); }
`;

const UploadIntroIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #f7e9b0 0%, #c9b57a 55%, #6d5c32 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px rgba(247,233,176,0.5), 0 0 12px -2px rgba(247,233,176,0.9), inset 0 0 14px -4px #fff8d5;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/assets/animations/ring.gif') center/70% no-repeat;
    filter: drop-shadow(0 0 4px rgba(247,233,176,0.7));
  }
`;

const UploadIntroList = styled.ul`
  list-style: none;
  padding: 0;
  margin: .2rem 0 .4rem 0;
  display: flex;
  flex-direction: column;
  gap: .42rem;
  font-size: 1.18rem;
  line-height: 1.58rem;
  position: relative;
  z-index: 1;
  font-family: 'Montserrat', sans-serif;
  li { display: flex; align-items: flex-start; gap: .55rem; }
  li:before { content: '➹'; font-size: .95rem; line-height: 1.1rem; color: #f7e9b0; opacity: .78; margin-top: 1px; text-shadow: 0 0 4px rgba(247,233,176,0.5); }
`;

const UploadHint = styled.div`
  font-size: 1.08rem;
  letter-spacing: .35px;
  opacity: .82;
  font-family: 'Montserrat', sans-serif;
  position: relative;
  z-index: 1;
  padding-top: .4rem;
  border-top: 1px solid rgba(247,233,176,0.18);
`;

export default function MediaGallery() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(0);
  const pageSize = 12; // images per page (ajustado a 12 según solicitud)
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const params = useSearchParams();
  const isAdmin = params.get('admin') === '1';
  const [secretAdmin, setSecretAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem('wg_secret_admin') === '1';
  });
  const tapCountRef = useRef<{count:number; last:number|null}>({count:0,last:null});
  const unlockToastRef = useRef<HTMLDivElement|null>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  async function handleDownload(e: React.MouseEvent) {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const item = media[lightboxIndex];
    try {
      const res = await fetch(item.publicUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const extension = item.path.split('.').pop() || (item.type === 'image' ? 'jpg' : 'mp4');
      a.href = url;
      a.download = `media-${item.id}.${extension}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Fallo descarga', err);
    }
  }

  const bucket = 'wedding-media';

  const fetchMedia = useCallback(async (opts?: { pageOverride?: number }) => {
    const targetPage = opts?.pageOverride ?? page;
    setLoading(true);
    setError(null);
    const from = targetPage * pageSize;
    const to = from + pageSize - 1;
    const { data, error, count } = await supabase
      .from('wedding_media')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);
    if (error) {
      setError('No se pudieron cargar los archivos');
      setLoading(false);
      return;
    }
    const items: MediaItem[] = (data || []).map((row: any) => ({
      id: row.id,
      path: row.path,
      thumb_path: row.thumb_path || null,
      type: row.type,
      size_bytes: row.size_bytes,
      created_at: row.created_at,
      publicUrl: supabase.storage.from(bucket).getPublicUrl(row.path).data.publicUrl,
      thumbUrl: row.thumb_path ? supabase.storage.from(bucket).getPublicUrl(row.thumb_path).data.publicUrl : undefined,
      author: row.author || undefined,
      width: row.width || undefined,
      height: row.height || undefined,
    }));
    setMedia(items);
    if (count !== null) setTotalCount(count);
    setLoading(false);
  }, [bucket, page, pageSize]);

  useEffect(() => {
    // initial load
    fetchMedia({ pageOverride: 0 });
  }, [fetchMedia]);

  function openPicker() {
    fileInputRef.current?.click();
  }

  function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    const problems: string[] = [];
    const newPending: PendingFile[] = [];
    incoming.forEach(f => {
      const isImage = f.type.startsWith('image/');
      if (!isImage) { problems.push(`${f.name}: solo imágenes (JPEG, PNG, WebP, GIF)`); return; }
      if (f.size > MAX_FILE_BYTES) { problems.push(`${f.name}: excede ${(MAX_FILE_BYTES/1024/1024).toFixed(0)}MB`); return; }
      const duplicate = pending.some(p => p.file.name === f.name && p.originalSize === f.size && p.file.type === f.type);
      if (duplicate) return;
      const preview = URL.createObjectURL(f);
      newPending.push({ id: crypto.randomUUID(), file: f, preview, status: 'pending', originalSize: f.size });
    });
    setPending(prev => [...prev, ...newPending]);
    setError(problems.length ? problems.join('\n') : null);
    e.target.value = '';
  }

  function removePending(id: string) {
    setPending(prev => {
      prev.filter(p => p.id === id).forEach(p => URL.revokeObjectURL(p.preview));
      return prev.filter(p => p.id !== id);
    });
  }

  function clearPending() {
    setPending(prev => { prev.forEach(p => URL.revokeObjectURL(p.preview)); return []; });
  }

  const toastRef = useRef<HTMLDivElement|null>(null);
  const showToast = (msg: string) => {
    if (!toastRef.current) return;
    toastRef.current.textContent = msg;
    toastRef.current.classList.add('show');
    setTimeout(()=> toastRef.current && toastRef.current.classList.remove('show'), 4000);
  };

  async function processPending() {
    const targets = pending.filter(p => p.status === 'pending' || p.status === 'error');
    if (!targets.length) return;
    setUploading(true);
    setError(null);
    const concurrency = 3;
    let index = 0;
    let totalOriginal = 0;
    let totalProcessed = 0;

    const runNext = async () => {
      const current = targets[index++];
      if (!current) return;
      // mark converting
      setPending(prev => prev.map(p => p.id === current.id ? { ...p, status: 'converting', error: undefined } : p));
      let uploadFile = current.file;
      let thumbBlob: Blob | null = null;
      let finalExt = current.file.name.split('.').pop() || 'jpg';
      try {
        if (!/\.gif$/i.test(current.file.name)) {
          const webpBlob = await convertImageToWebP(current.file, MAIN_QUALITY, MAX_MAIN_SIDE);
            if (webpBlob) {
              uploadFile = new File([webpBlob], current.file.name.replace(/\.[^.]+$/, '') + '.webp', { type: 'image/webp' });
              finalExt = 'webp';
            }
          // generate thumbnail (smaller resize) for grid, independent conversion to keep quality control
          thumbBlob = await convertImageToWebP(current.file, THUMB_QUALITY, 400).catch(()=>null) as Blob | null;
        }
      } catch (errConv) {
        // eslint-disable-next-line no-console
        console.warn('Conv falló', errConv);
      }
      totalOriginal += current.originalSize;
      totalProcessed += uploadFile.size;
      setPending(prev => prev.map(p => p.id === current.id ? { ...p, processedSize: uploadFile.size, status: 'uploading' } : p));
      const baseName = `${Date.now()}-${crypto.randomUUID()}`;
      const objectPath = `${baseName}.${finalExt}`;
      let thumbPath: string | null = null;
      // upload main
      const { error: upErr } = await supabase.storage.from(bucket).upload(objectPath, uploadFile, { cacheControl: '604800', upsert: false });
      if (upErr) {
        setPending(prev => prev.map(p => p.id === current.id ? { ...p, status: 'error', error: 'Falló subida' } : p));
      } else {
        // upload thumbnail if available
        if (thumbBlob) {
          const thumbExt = 'webp';
          thumbPath = `${baseName}-thumb.${thumbExt}`;
          const { error: upThumbErr } = await supabase.storage.from(bucket).upload(thumbPath, thumbBlob, { cacheControl: '604800', upsert: false });
          if (upThumbErr) {
            // eslint-disable-next-line no-console
            console.warn('Thumb subida falló', upThumbErr);
            thumbPath = null;
          }
        } else {
          // fallback: if GIF or conversion failed, reuse original path as thumbnail to avoid null
          thumbPath = objectPath;
        }
        await supabase.from('wedding_media').insert({ path: objectPath, thumb_path: thumbPath, type: 'image', size_bytes: uploadFile.size });
        setPending(prev => prev.map(p => p.id === current.id ? { ...p, status: 'done' } : p));
      }
      await runNext();
    };
    const workers = Array.from({ length: Math.min(concurrency, targets.length) }, () => runNext());
    await Promise.all(workers);
  setPage(0);
  await fetchMedia({ pageOverride: 0 });
    setUploading(false);
    if (totalOriginal && totalProcessed) {
      const saved = totalOriginal - totalProcessed;
      const pct = saved > 0 ? ((saved / totalOriginal) * 100).toFixed(1) : '0';
      showToast(`Subida completa. Ahorro: ${(saved/1024).toFixed(0)} KB (${pct}%).`);
    } else {
      showToast('Subida completa.');
    }
  }

  async function deleteItem(item: MediaItem) {
    if (!isAdmin) return;
    await supabase.storage.from(bucket).remove([item.path]);
    await supabase.from('wedding_media').delete().eq('id', item.id);
    setMedia(prev => prev.filter(m => m.id !== item.id));
  }

  function registerSecretTap() {
    const now = Date.now();
    const windowMs = 3500; // ventana de taps
    if (tapCountRef.current.last && (now - tapCountRef.current.last) > windowMs) {
      tapCountRef.current.count = 0;
    }
    tapCountRef.current.count += 1;
    tapCountRef.current.last = now;
    if (tapCountRef.current.count >= 5) {
      setSecretAdmin(true);
      window.sessionStorage.setItem('wg_secret_admin', '1');
      tapCountRef.current.count = 0;
      // leve feedback vibración si soporta
      if (navigator.vibrate) { navigator.vibrate(40); }
      if (unlockToastRef.current) {
        unlockToastRef.current.style.opacity = '1';
        setTimeout(()=> unlockToastRef.current && (unlockToastRef.current.style.opacity = '0'), 2500);
      }
    }
  }

  return (
    <PageWrapper>
      <div style={{ alignSelf: 'center' }}>
        <DecoratorComponent />
      </div>
      <MenuComponent />
      <Content>
        <Title>Galería de fotos</Title>
  <UploadBox
          onDragOver={(e)=> { e.preventDefault(); e.dataTransfer.dropEffect='copy'; }}
          onDrop={(e)=> {
            e.preventDefault();
            const dtFiles = Array.from(e.dataTransfer.files || []);
            if (!dtFiles.length) return;
            const syntheticEvent = { target: { files: dtFiles } } as unknown as React.ChangeEvent<HTMLInputElement>;
            onSelect(syntheticEvent);
          }}
        >
          <UploadIntro>
            <UploadIntroHeader>
              <UploadIntroIcon />
              Sube tus fotos
            </UploadIntroHeader>
            <UploadIntroList>
              <li>Convertimos y comprimimos (WebP) automáticamente.</li>
              <li>Rescalado máx. {MAX_MAIN_SIDE}px para ahorrar espacio.</li>
              <li>Archivos {'>'} {(MAX_FILE_BYTES/1024/1024).toFixed(0)}MB se rechazan.</li>
              <li>GIF se mantiene sin cambios.</li>
            </UploadIntroList>
            <UploadHint>Consejo: puedes seleccionar muchas a la vez y seguir añadiendo antes de subir.</UploadHint>
          </UploadIntro>
          <UploadActions>
            <RingButton onClick={openPicker} disabled={uploading} aria-label="Seleccionar archivos" $dimmed={pending.length > 0}>Seleccionar archivos</RingButton>
            {pending.length > 0 && (
              <span style={{ fontSize: '1.3rem' }}>{pending.length} archivo(s)</span>
            )}
            {error && (
              <span style={{ color: '#ffb4b4', fontSize: '1.2rem', whiteSpace: 'pre-line' }}>{error}</span>
            )}
          </UploadActions>
          <FileInput
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={onSelect}
          />
          {pending.length > 0 && (
            <div style={{display:'flex',flexDirection:'column',gap:'0.6rem', marginTop:'0.8rem'}}>
              <PendingGrid>
                {pending.map(p => (
                  <PendingItem key={p.id}>
                    {p.status === 'converting' || p.status === 'uploading' ? (
                      <PendingThumb src={p.preview} alt={p.file.name} style={{ filter:'grayscale(.4) brightness(.9)' }} />
                    ) : (
                      <PendingThumb src={p.preview} alt={p.file.name} />
                    )}
                    {p.status !== 'pending' && <PendingBadge state={p.status}>{p.status === 'done' ? 'OK' : p.status === 'error' ? 'ERR' : p.status === 'converting' ? 'conv' : 'up'}</PendingBadge>}
                    {p.status !== 'uploading' && p.status !== 'converting' && p.status !== 'done' && (
                      <RemovePendingBtn onClick={() => removePending(p.id)}>×</RemovePendingBtn>
                    )}
                  </PendingItem>
                ))}
              </PendingGrid>
              <div style={{display:'flex',gap:'0.9rem',flexWrap:'wrap'}}>
                <SubtleButton type="button" onClick={openPicker} disabled={uploading}>Agregar más</SubtleButton>
                <SubtleButton type="button" onClick={clearPending} disabled={uploading}>Limpiar</SubtleButton>
              </div>
              <div style={{display:'flex', justifyContent:'center', width:'100%', marginTop:'.4rem'}}>
                <BigUploadButton onClick={processPending} disabled={pending.every(p => p.status==='done') || uploading}>
                  {uploading ? 'Subiendo...' : pending.some(p => p.status==='done') ? 'Subir restantes' : 'Subir archivos'}
                </BigUploadButton>
              </div>
            </div>
          )}
        </UploadBox>

        <div onClick={registerSecretTap} style={{width:'100%'}}>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Cargando...</p>
        ) : media.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Aún no hay archivos.</p>
        ) : (
          <Grid>
            {media.map(item => {
              const gridSrc = item.thumbUrl || item.publicUrl;
              return (
              <MediaCard key={item.id} onClick={() => setLightboxIndex(media.findIndex(m => m.id === item.id))} style={{ cursor: 'pointer' }}>
                <div style={{position:'relative', width:'100%', aspectRatio:'1/1'}}>
                  <Image
                    src={gridSrc}
                    alt={item.path}
                    fill
                    sizes="(max-width: 600px) 46vw, 250px"
                    style={{objectFit:'cover'}}
                    loading="lazy"
                  />
                </div>
                {(isAdmin || secretAdmin) && (
                  <RemoveBtn aria-label="Eliminar" title="Eliminar" onClick={(e) => { e.stopPropagation(); deleteItem(item); }}>×</RemoveBtn>
                )}
              </MediaCard>
            );})}
          </Grid>
        )}
        </div>
        {totalCount !== null && (
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'0.6rem', marginTop:'2rem'}}>
            <div style={{fontSize:'1.25rem'}}>
              Página {page + 1} de {Math.max(1, Math.ceil(totalCount / pageSize))} · {totalCount} fotos
            </div>
            <div style={{display:'flex', gap:'1rem'}}>
              <Button disabled={loading || page === 0} onClick={() => { const prev = Math.max(0, page - 1); setPage(prev); fetchMedia({ pageOverride: prev }); }}>Anterior</Button>
              <Button disabled={loading || ((page + 1) * pageSize) >= totalCount} onClick={() => { const next = page + 1; setPage(next); fetchMedia({ pageOverride: next }); }}>Siguiente</Button>
            </div>
          </div>
        )}
        <div ref={unlockToastRef} style={{
          position:'fixed',
          bottom:'24px',
          left:'50%',
          transform:'translateX(-50%)',
          background:'rgba(0,0,0,0.7)',
          color:'#e5dcbf',
          padding:'10px 18px',
          border:'1px solid #e5dcbf55',
          borderRadius: '24px',
          fontSize:'1.25rem',
          fontFamily:'Montserrat, sans-serif',
          letterSpacing:'.5px',
          opacity: secretAdmin ? 0 : 0,
          transition:'opacity .5s'
        }}>Modo borrado activado</div>
      </Content>
      <BottomDecor>
        <FellowshipSeparatorComponent />
        <FooterComponent />
      </BottomDecor>
      <FloatingAdd onClick={openPicker} aria-label="Añadir fotos">+</FloatingAdd>
      <Toast ref={toastRef} />

      {lightboxIndex !== null && media[lightboxIndex] && (
        <Overlay
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowRight') setLightboxIndex(i => (i === null ? null : (i + 1) % media.length));
            if (e.key === 'ArrowLeft') setLightboxIndex(i => (i === null ? null : (i - 1 + media.length) % media.length));
          }}
          tabIndex={-1}
        >
          <DownloadBtn onClick={handleDownload}>Descargar ⬇</DownloadBtn>
          <CloseBtn onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}>Cerrar ✕</CloseBtn>
          <OverlayInner
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
            onTouchEnd={() => {
              if (touchStartX.current !== null && touchEndX.current !== null) {
                const delta = touchEndX.current - touchStartX.current;
                if (Math.abs(delta) > 50) {
                  if (delta < 0) {
                    setLightboxIndex(i => (i === null ? null : (i + 1) % media.length));
                  } else {
                    setLightboxIndex(i => (i === null ? null : (i - 1 + media.length) % media.length));
                  }
                }
              }
              touchStartX.current = null;
              touchEndX.current = null;
            }}
          >
            <CarouselMediaWrapper>
              <ArrowLeft
                aria-label="Anterior"
                onClick={() => setLightboxIndex(i => (i === null ? null : (i - 1 + media.length) % media.length))}
              >‹</ArrowLeft>
              <CarouselImg src={media[lightboxIndex].publicUrl} alt={media[lightboxIndex].path} />
              <ArrowRight
                aria-label="Siguiente"
                onClick={() => setLightboxIndex(i => (i === null ? null : (i + 1) % media.length))}
              >›</ArrowRight>
              <Counter>{lightboxIndex + 1} / {media.length}</Counter>
            </CarouselMediaWrapper>
          </OverlayInner>
        </Overlay>
      )}
    </PageWrapper>
  );
}
