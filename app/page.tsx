import Link from "next/link";
import {
  episodes,
  careerPaths,
  stemSubjects,
  featuredCareerPaths,
} from "@/lib/data";
import EpisodeCard from "@/components/EpisodeCard";
import CareerPathCard from "@/components/CareerPathCard";
import SectionHeader from "@/components/SectionHeader";
import Tag from "@/components/Tag";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-dark">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/adventures-in-aviation-website/videos/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          {/* Video source to be added when assets are available */}
          <source src="/adventures-in-aviation-website/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-navy-900/60" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 max-w-content mx-auto px-gutter lg:px-gutter-lg text-center">
          <h1 className="font-heading text-hero text-inverse mb-6 animate-fade-up">
            A flight plan for aviation&apos;s talent crisis.
          </h1>
          <p className="text-body text-muted-inverse max-w-text mx-auto mb-8 animation-delay-200 animate-fade-up">
            Cinematic educational aviation content for students aged 10&#x2013;18.
            Real jets. Real students. Real careers.
          </p>
          <Link
            href="/episodes"
            className="inline-flex items-center justify-center font-heading text-body font-bold bg-accent text-navy-800 px-6 py-3 min-h-[44px] rounded-sm shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-fast animation-delay-400 animate-fade-up"
          >
            Explore Episodes
          </Link>
        </div>

      </section>

      {/* Find Your Career Path */}
      <section className="py-9 lg:py-10 bg-bg-secondary scroll-fade-up content-visibility-auto">
        <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
          <SectionHeader title="Find Your Career Path" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCareerPaths.map((path) => (
              <CareerPathCard
                key={path.slug}
                title={path.title}
                tagline={path.tagline}
                imageSrc={path.image}
                imageAlt={`Explore career path: ${path.title}`}
                href={`/episodes?career=${encodeURIComponent(path.careerFilter)}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Episodes */}
      <section className="py-9 lg:py-10 bg-bg-primary scroll-fade-up content-visibility-auto">
        <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
          <SectionHeader
            title="Featured Episodes"
            description="Explore real aviation careers through the eyes of students and professionals."
          />

          {/* Career path tags */}
          <div className="mb-8">
            <h2 className="font-heading text-h4 text-text-primary mb-3">
              Explore by Career Path
            </h2>
            <div className="flex flex-wrap gap-2">
              {careerPaths.map((path) => (
                <Tag
                  key={path}
                  label={path}
                  href={`/episodes?career=${encodeURIComponent(path)}`}
                  variant="career"
                />
              ))}
            </div>
          </div>

          {/* STEM subject tags */}
          <div className="mb-10">
            <h2 className="font-heading text-h4 text-text-primary mb-3">
              Explore by STEM Subject
            </h2>
            <div className="flex flex-wrap gap-2">
              {stemSubjects.map((subject) => (
                <Tag
                  key={subject}
                  label={subject}
                  href={`/episodes?stem=${encodeURIComponent(subject)}`}
                  variant="stem"
                />
              ))}
            </div>
          </div>

          {/* Episode grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((episode, index) => (
              <EpisodeCard key={episode.slug} episode={episode} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
