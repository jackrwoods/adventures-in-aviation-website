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

export const episodes: Episode[] = [
  {
    slug: "aircraft-manufacturer",
    title: "Wings of Precision: Inside an Aircraft Manufacturer",
    description:
      "Students tour a major aircraft production facility, meet aerospace engineers, and see how physics and materials science come together to build commercial jets.",
    thumbnail: "/episodes/aircraft-manufacturer.jpg",
    videoUrl: "/videos/aircraft-manufacturer.mp4",
    careerPath: "Aerospace Engineers",
    stemSubject: "Materials Science",
    duration: "12:34",
    publishedAt: "2026-04-15",
  },
  {
    slug: "flight-school",
    title: "First Solo: A Day at Flight School",
    description:
      "Follow three students through ground school, simulator training, and their first supervised solo flight with certified flight instructors.",
    thumbnail: "/episodes/flight-school.jpg",
    videoUrl: "/videos/flight-school.mp4",
    careerPath: "Pilots",
    stemSubject: "Physics",
    duration: "15:20",
    publishedAt: "2026-04-22",
  },
  {
    slug: "drone-operator",
    title: "Sky Eyes: The World of Commercial Drone Operations",
    description:
      "Explore the fast-growing field of unmanned aerial systems with professional drone pilots working in agriculture, inspection, and search-and-rescue.",
    thumbnail: "/episodes/drone-operator.jpg",
    videoUrl: "/videos/drone-operator.mp4",
    careerPath: "Drone / UAS Operators",
    stemSubject: "Computer Science",
    duration: "10:45",
    publishedAt: "2026-05-01",
  },
];

export const careerPaths = [
  "Pilots",
  "Aerospace Engineers",
  "Air Traffic Controllers",
  "Aircraft Maintenance Technicians",
  "Drone / UAS Operators",
  "Aviation Meteorologists",
  "Aerospace Medicine / Flight Surgeons",
  "Space Systems Engineers",
] as const;

export const stemSubjects = [
  "Physics",
  "Mathematics",
  "Computer Science",
  "Materials Science",
  "Mechanical Engineering",
  "Electrical / Avionics Engineering",
  "Atmospheric Science / Meteorology",
  "Aeronautical / Astronautical Engineering",
] as const;
