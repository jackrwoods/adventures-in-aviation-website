import Link from "next/link";
import Image from "next/image";
import Tag from "./Tag";
import type { Episode } from "@/lib/data";

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <article className="group">
      <Link href={`/episodes/${episode.slug}`} className="block">
        <div className="relative aspect-video rounded-md overflow-hidden mb-4 bg-navy-100 shadow-none group-hover:shadow-sm transition-shadow duration-fast">
          <Image
            src={episode.thumbnail}
            alt={`Thumbnail for ${episode.title}`}
            fill
            className="object-cover transition-transform duration-fast ease-default group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <h3 className="font-heading text-h3 text-text-primary mb-2 group-hover:text-text-heading transition-colors duration-fast">
          {episode.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag
            label={episode.careerPath}
            href={`/episodes?career=${encodeURIComponent(episode.careerPath)}`}
            variant="career"
          />
          <Tag
            label={episode.stemSubject}
            href={`/episodes?stem=${encodeURIComponent(episode.stemSubject)}`}
            variant="stem"
          />
        </div>
      </Link>
    </article>
  );
}
