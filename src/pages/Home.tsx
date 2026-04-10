import { videos } from '../data/videos';
import VideoCard from '../components/VideoCard';

export default function Home() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
