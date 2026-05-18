import Link from "next/link";
import { episodes } from "@/lib/data";
import Tag from "@/components/Tag";

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
        <h1 className="font-heading text-h1 text-text-primary">Episode not found</h1>
      </div>
    );
  }

  return (
    <article className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-spacing-7">
      <header className="mb-8">
        <h1 className="font-heading text-h1 text-text-primary mb-4">
          {episode.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <Tag label={episode.careerPath} variant="career" />
          <Tag label={episode.stemSubject} variant="stem" />
        </div>
        <div className="flex items-center gap-4 text-caption text-muted">
          <span>Duration: {episode.duration}</span>
          <span>•</span>
          <span>Published: {episode.publishedAt}</span>
        </div>
      </header>

      <section className="mb-8">
        <p className="text-body text-text-secondary max-w-text">
          {episode.description}
        </p>
      </section>

      {/* Video player placeholder */}
      <section className="mb-10">
        <div className="aspect-video bg-navy-100 rounded-md flex items-center justify-center border border-border">
          <div className="text-center">
            <p className="text-caption text-muted mb-2">Video player</p>
            <p className="text-body-sm text-text-secondary">Coming in TICKET-004</p>
          </div>
        </div>
      </section>

      {/* Related episodes */}
      <section>
        <h2 className="font-heading text-h3 text-text-primary mb-4">
          Related Episodes
        </h2>
        <ul className="space-y-2">
          {episodes
            .filter((e) => e.slug !== episode.slug)
            .map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/episodes/${e.slug}`}
                  className="text-text-link hover:text-text-link-hover transition-colors duration-fast"
                >
                  {e.title}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </article>
  );
}
