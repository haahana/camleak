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
  'https://i.postimg.cc/Hk8DG5mn/video1.png',
  'https://i.postimg.cc/Zq3SNNs7/video2.jpg',
  'https://i.postimg.cc/Z5vtk3mR/video3.png',
  'https://i.postimg.cc/FKtthRFg/video4.png',
  'https://i.postimg.cc/zBr1Ff4M/video5.jpg',
  'https://i.postimg.cc/VNyyz6sN/video6.png',
  'https://i.postimg.cc/htQWFxBH/video7.png',
  'https://i.postimg.cc/nL88nzVc/video8.png',
  'https://i.postimg.cc/YCLKcg7H/video9.png',
  'https://i.postimg.cc/gjcF1Tzf/video10.png',
  'https://i.postimg.cc/zGHZmWNY/video11.png',
  'https://i.postimg.cc/x8sDQ3q8/video12.png',
  'https://i.postimg.cc/2jTfnrGX/video13.png',
  'https://i.postimg.cc/FR4QVKwM/video14.jpg',
  'https://i.postimg.cc/rmkLNpvL/video15.jpg',
  'https://i.postimg.cc/vBsdtmCP/video16.jpg',
  'https://i.postimg.cc/Bbh93BtQ/video18.png',
  'https://i.postimg.cc/RFBzL02s/video19.jpg',
  'https://i.postimg.cc/d1YKj0gS/video20.jpg',
  'https://i.postimg.cc/0Qsq0NhX/video21.jpg',
  'https://i.postimg.cc/8C88T5kr/video22.jpg',
  'https://i.postimg.cc/sXrR42bb/video23.jpg',
  'https://i.postimg.cc/L5yKS3hS/video24.jpg',
  'https://i.postimg.cc/76kynLpY/video25.jpg',
  'https://i.postimg.cc/mDsGyr0x/video26.jpg',
  'https://i.postimg.cc/25ppC6jz/video27.jpg',
  'https://i.postimg.cc/cJqqdH1r/video28.jpg',
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
