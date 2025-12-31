import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Momos Magic - Best Momos in Sherghati',
    short_name: 'Momos Magic',
    description: 'Award-winning momos, FSSAI certified, 100% vegetarian. First to introduce Kurkure Momos in Bihar.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ffc241',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
