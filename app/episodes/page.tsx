import { episodes, careerPaths, stemSubjects } from "@/lib/data";
import { EpisodeFilterProvider } from "@/lib/filter-state";
import EpisodesBrowse from "@/components/EpisodesBrowse";

export default function EpisodesPage() {
  return (
    <EpisodeFilterProvider>
      <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-spacing-9 lg:py-spacing-10">
        <header className="mb-spacing-8">
          <h1 className="font-heading text-h1 text-text-primary mb-4">
            All Episodes
          </h1>
          <p className="text-body text-text-secondary max-w-text">
            Browse all Adventures in Aviation episodes. Filter by career path
            and STEM subject to find content relevant to your interests.
          </p>
        </header>

        <EpisodesBrowse
          careerPaths={careerPaths}
          stemSubjects={stemSubjects}
          totalEpisodes={episodes.length}
        />
      </div>
    </EpisodeFilterProvider>
  );
}
