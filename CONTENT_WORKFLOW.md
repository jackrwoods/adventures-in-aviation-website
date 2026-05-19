# Content Authoring Workflow

## Adding a New Episode

1. **Prepare assets**
   - Export the episode thumbnail as a JPG, 16:9 aspect ratio, max 1920px wide.
   - Export the episode video as an MP4, 16:9 aspect ratio, H.264 codec.
   - Name both files using kebab-case based on the episode title, e.g.:
     - `aircraft-maintenance.jpg`
     - `aircraft-maintenance.mp4`

2. **Drop files into `public/`**
   - Copy the thumbnail to `public/episodes/<slug>.jpg`
   - Copy the video to `public/videos/<slug>.mp4`

3. **Edit `content/episodes.json`**
   - Open `content/episodes.json` in any text editor.
   - Append a new JSON object to the array. Example:

     ```json
     {
       "slug": "aircraft-maintenance",
       "title": "Wrench to Wing: A Day with an AMT",
       "description": "Students shadow aircraft maintenance technicians through a full inspection cycle, learning the math and materials science behind airworthiness.",
       "thumbnail": "/episodes/aircraft-maintenance.jpg",
       "videoUrl": "/videos/aircraft-maintenance.mp4",
       "careerPath": "Aircraft Maintenance Technicians",
       "stemSubject": "Mechanical Engineering",
       "duration": "14:20",
       "publishedAt": "2026-05-15"
     }
     ```

   - **Field reference**:
     - `slug` -- URL-safe identifier, must be unique, kebab-case, no spaces.
     - `title` -- Episode display title.
     - `description` -- 1-2 sentence summary.
     - `thumbnail` -- Must match the path in `public/episodes/` prefixed with `/episodes/`.
     - `videoUrl` -- Must match the path in `public/videos/` prefixed with `/videos/`.
     - `careerPath` -- Must be one of the values in `content/categories.json` -> `careerPaths`.
     - `stemSubject` -- Must be one of the values in `content/categories.json` -> `stemSubjects`.
     - `duration` -- Human-readable length, e.g. `"12:34"`.
     - `publishedAt` -- ISO date string (`YYYY-MM-DD`).

4. **Verify**
   - Run `bash scripts/verify-build.sh` in the project root.
   - If it exits with `Build verification complete`, the episode is ready.

## Do NOT Modify
- Any file in `app/`, `components/`, or `lib/` -- these are code files.
- `next.config.ts` -- build configuration is handled by developers.

## Adding a New Career Path or STEM Subject
1. Open `content/categories.json`.
2. Add the new value to the appropriate array.
3. Run `bash scripts/verify-build.sh` to confirm the build still passes.
