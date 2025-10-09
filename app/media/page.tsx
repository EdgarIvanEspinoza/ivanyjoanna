import dynamic from 'next/dynamic';

const MediaGallery = dynamic(() => import('@/components/Media/MediaGallery'), { ssr: false });

export default function Page() {
  return <MediaGallery />;
}
