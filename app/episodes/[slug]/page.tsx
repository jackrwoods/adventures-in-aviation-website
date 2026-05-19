import { episodes, getRelatedEpisodes } from "@/lib/data";
import Tag from "@/components/Tag";
import SectionHeader from "@/components/SectionHeader";
import EpisodeGrid from "@/components/EpisodeGrid";
import VideoPlayer from "@/components/VideoPlayerLoader";

export function generateStaticParams() {
  return episodes.map((episode) => ({ slug: episode.slug }));
}

export default function EpisodeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const episode = episodes.find((e) => e.slug === params.slug);

  if (!episode) {
    return (
      <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-spacing-7">
        <h1 className="font-heading text-h1 text-text-primary">
          Episode not found
        </h1>
      </div>
    );
  }

  const relatedEpisodes = getRelatedEpisodes(params.slug);

  return (
    <article className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-spacing-7 lg:py-spacing-8">
      {/* Metadata header */}
      <header className="mb-spacing-6">
        <h1 className="font-heading text-h1 text-text-primary mb-4">
          {episode.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <Tag label={episode.careerPath} variant="career" />
          <Tag label={episode.stemSubject} variant="stem" />
        </div>
        <div className="flex items-center gap-4 text-caption text-muted font-mono">
          <span>{episode.duration}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={episode.publishedAt}>
            {new Date(episode.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>

      {/* Video player */}
      <section className="mb-spacing-8">
        <VideoPlayer src={episode.videoUrl} poster={episode.thumbnail} />
      </section>

      {/* Description */}
      <section className="mb-spacing-10">
        <p className="text-body text-text-secondary max-w-text">
          {episode.description}
        </p>
      </section>

      {/* Related episodes */}
      {relatedEpisodes.length > 0 && (
        <section className="mb-spacing-8">
          <div className="mb-6">
            <SectionHeader
              title="Related Episodes"
              description="More episodes you might enjoy based on this career path and STEM subject."
            />
          </div>
          <EpisodeGrid episodes={relatedEpisodes} />
        </section>
      )}
    </article>
  );
}
