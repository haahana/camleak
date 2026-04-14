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
  'https://i.postimg.cc/v894yPrn/IMG-20250429-115048.jpg',
  'https://i.postimg.cc/nV7Xxd43/IMG-20250429-120559.jpg',
  'https://i.postimg.cc/SQ8n4Z68/IMG-20250429-120645.jpg',
  'https://i.postimg.cc/y69DKfmZ/IMG-20250429-120717.jpg',
  'https://i.postimg.cc/Y2gv7X64/IMG-20250429-120808.jpg',
  'https://i.postimg.cc/mZMP4dYq/IMG-20250509-155342-793.jpg',
  'https://i.postimg.cc/jqNDT8HG/IMG-20250509-155402-693.jpg',
  'https://i.postimg.cc/2jv1YHQM/IMG-20250509-155627-009.jpg',
  'https://i.postimg.cc/bYbZP6x2/IMG-20250509-161828-770.jpg',
  'https://i.postimg.cc/8kW7GydQ/IMG-20250509-163026-904.jpg',
  'https://i.postimg.cc/QN5FD6QY/IMG-20250509-163546.jpg',
  'https://i.postimg.cc/zDWyNdCc/IMG-20250509-163602.jpg',
  'https://i.postimg.cc/nV7Xxd4R/IMG-20250509-163625.jpg',
  'https://i.postimg.cc/ZY3Wmf8L/IMG-20250509-163642.jpg',
  'https://i.postimg.cc/NGTKtN64/IMG-20250509-164609.jpg',
  'https://i.postimg.cc/v894yPrS/IMG-20250509-170539.jpg',
  'https://i.postimg.cc/FFcYvPyD/IMG-20250509-170603.jpg',
  'https://i.postimg.cc/WprdV9Gm/IMG-20250509-170620.jpg',
  'https://i.postimg.cc/FFcYvPyV/IMG-20250509-170638.jpg',
];

// Generate 120 videos deterministically
export const videos: Video[] = Array.from({ length: 120 }).map((_, i) => {
  const id = String(i + 1);
  const imgIndex = i % baseImages.length;
  
  // 0-39: Free (40 videos)
  // 40-99: Premium (60 videos)
  // 100-119: Offline (20 videos)
  const isOffline = i >= 100;
  const isPremium = i >= 40 && i < 100;
  
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
