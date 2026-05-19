import type { Episode } from "@/lib/data";
import EpisodeCard from "./EpisodeCard";

interface EpisodeGridProps {
  episodes: Episode[];
}

export default function EpisodeGrid({ episodes }: EpisodeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.slug} episode={episode} />
      ))}
    </div>
  );
}
