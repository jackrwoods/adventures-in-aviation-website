import fs from "fs";
import path from "path";

const slugs = [
  "aircraft-manufacturer",
  "flight-school",
  "drone-operator",
];

const outDir = path.resolve(process.cwd(), "public", "videos");

// Minimal valid MP4 skeleton (ftyp + moov, no mdat).
// This is a tiny binary blob that makes the file recognizable as MP4.
const ftyp = Buffer.from([
  0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70,
  0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x00, 0x00,
  0x69, 0x73, 0x6f, 0x6d, 0x6d, 0x70, 0x34, 0x31,
]);

const moov = Buffer.from([
  0x00, 0x00, 0x00, 0x08, 0x6d, 0x6f, 0x6f, 0x76,
]);

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const slug of slugs) {
  const filePath = path.join(outDir, `${slug}.mp4`);
  fs.writeFileSync(filePath, Buffer.concat([ftyp, moov]));
  console.log(`Created placeholder: ${filePath}`);
}
