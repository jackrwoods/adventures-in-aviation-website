import episodesJson from "@/content/episodes.json";
import categoriesJson from "@/content/categories.json";

export type Episode = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  careerPath: string;
  stemSubject: string;
  duration: string;
  publishedAt: string;
};

export const episodes: Episode[] = episodesJson;

export const careerPaths: readonly string[] = categoriesJson.careerPaths;
export const stemSubjects: readonly string[] = categoriesJson.stemSubjects;

export function getRelatedEpisodes(currentSlug: string): Episode[] {
  const current = episodes.find((e) => e.slug === currentSlug);
  if (!current) return [];

  const score = (ep: Episode): number => {
    let s = 0;
    if (ep.careerPath === current.careerPath) s += 2;
    if (ep.stemSubject === current.stemSubject) s += 1;
    return s;
  };

  return episodes
    .filter((e) => e.slug !== currentSlug)
    .sort((a, b) => score(b) - score(a));
}
