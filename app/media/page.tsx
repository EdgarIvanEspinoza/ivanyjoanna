import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galería de Fotos | Iván y Joanna',
  description: 'Galería de fotos de la boda de Iván y Joanna',
};

// Cargamos el componente dinámicamente para evitar problemas con renderizado en servidor
const MediaGalleryWithFallback = dynamic(() => import('@/components/Media/MediaGalleryWithFallback'), { ssr: false });

export default function Page() {
  return <MediaGalleryWithFallback />;
}
