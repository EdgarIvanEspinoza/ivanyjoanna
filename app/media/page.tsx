import type { Metadata } from 'next';
import MediaGalleryWithFallback from '@/components/Media/MediaGalleryWithFallback';

export const metadata: Metadata = {
  title: 'Galería de Fotos | Iván y Joanna',
  description: 'Galería de fotos de la boda de Iván y Joanna',
};

export default function Page() {
  return <MediaGalleryWithFallback />;
}
