import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const episodesPath = path.resolve(process.cwd(), "content", "episodes.json");
  const categoriesPath = path.resolve(process.cwd(), "content", "categories.json");

  const episodes: unknown[] = JSON.parse(fs.readFileSync(episodesPath, "utf-8"));
  const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf-8")) as {
    careerPaths: string[];
    stemSubjects: string[];
  };

  console.log("Add a new episode\n");

  const slug = await ask("Slug (kebab-case, unique): ");
  if (episodes.some((e: any) => e.slug === slug)) {
    console.error(`Error: slug "${slug}" already exists.`);
    process.exit(1);
  }

  const title = await ask("Title: ");
  const description = await ask("Description: ");

  console.log("\nAvailable career paths:");
  categories.careerPaths.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
  const careerIdx = parseInt(await ask("Select career path (number): "), 10) - 1;
  const careerPath = categories.careerPaths[careerIdx];

  console.log("\nAvailable STEM subjects:");
  categories.stemSubjects.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  const stemIdx = parseInt(await ask("Select STEM subject (number): "), 10) - 1;
  const stemSubject = categories.stemSubjects[stemIdx];

  const duration = await ask("Duration (e.g. 12:34): ");
  const publishedAt = await ask("Published date (YYYY-MM-DD): ");

  const newEpisode = {
    slug,
    title,
    description,
    thumbnail: `/episodes/${slug}.jpg`,
    videoUrl: `/videos/${slug}.mp4`,
    careerPath,
    stemSubject,
    duration,
    publishedAt,
  };

  episodes.push(newEpisode);
  fs.writeFileSync(episodesPath, JSON.stringify(episodes, null, 2) + "\n");

  console.log("\nEpisode added to content/episodes.json.");
  console.log("Next steps:");
  console.log(`  1. Copy thumbnail to public/episodes/${slug}.jpg`);
  console.log(`  2. Copy video to public/videos/${slug}.mp4`);
  console.log("  3. Run: bash scripts/verify-build.sh");

  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
