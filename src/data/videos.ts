export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  views: string;
  uploadedAt: string;
  duration: string;
  isLive?: boolean;
  isPremium?: boolean;
  status?: 'online' | 'offline';
}

const baseImages = [
  'https://i.postimg.cc/v8LXgxTz/video1.png',
  'https://i.postimg.cc/HsdZB4RM/video2.jpg',
  'https://i.postimg.cc/jqQvwn2h/video3.png',
  'https://i.postimg.cc/vZDvNPz5/video4.png',
  'https://i.postimg.cc/c1QkR59B/video5.jpg',
  'https://i.postimg.cc/9FLp13Gm/video6.png',
  'https://i.postimg.cc/k56fBjRJ/video7.png',
  'https://i.postimg.cc/hPDs947W/video8.png',
  'https://i.postimg.cc/1znJfWVX/video9.png',
  'https://i.postimg.cc/Qxm6PKrT/video10.png',
  'https://i.postimg.cc/1znJfWV6/video11.png',
  'https://i.postimg.cc/nhLdtVHr/video12.png',
  'https://i.postimg.cc/CxKvVMF7/video13-(1).png',
  'https://i.postimg.cc/dQ8N2SH6/video14.jpg',
  'https://i.postimg.cc/8PNKtB94/video15.jpg',
  'https://i.postimg.cc/SNkTD73C/video16.jpg',
  'https://i.postimg.cc/FHnTFtzN/video17-(1).png',
  'https://i.postimg.cc/wjBWdx6v/video18.png',
  'https://i.postimg.cc/Ghd7qJVx/video19.jpg',
  'https://i.postimg.cc/rFMnQC3G/video20.jpg',
  'https://i.postimg.cc/WpMYGfWn/video21.jpg',
  'https://i.postimg.cc/fRkvrHKt/video22.jpg',
  'https://i.postimg.cc/J4M6PcvJ/video23.jpg',
  'https://i.postimg.cc/7YwsmMjv/video24.jpg',
  'https://i.postimg.cc/wTgf0cZG/video25.jpg',
  'https://i.postimg.cc/m2BX8NJw/video26.jpg',
  'https://i.postimg.cc/X7s8xMwK/video27.jpg',
  'https://i.postimg.cc/3JtB9MgK/video28.jpg',
];

// Generate 60 videos deterministically
export const videos: Video[] = Array.from({ length: 60 }).map((_, i) => {
  const id = String(i + 1);
  const imgIndex = i % baseImages.length;
  
  // 0-19: Free (20 videos)
  // 20-49: Premium (30 videos)
  // 50-59: Offline (10 videos)
  const isOffline = i >= 50;
  const isPremium = i >= 20 && i < 50;
  
  // Deterministic pseudo-random values based on index
  const viewsNum = 10 + ((i * 37) % 900);
  const daysAgo = 1 + ((i * 13) % 14);
  const min = 1 + ((i * 7) % 20);
  const sec = String((i * 19) % 60).padStart(2, '0');
  const camNum = 1000 + ((i * 101) % 9000);

  return {
    id,
    title: `Video N${camNum}`,
    thumbnailUrl: baseImages[imgIndex],
    views: `${viewsNum}K views`,
    uploadedAt: `${daysAgo} days ago`,
    duration: `${min}:${sec}`,
    status: isOffline ? 'offline' : 'online',
    isPremium: isPremium
  };
});
