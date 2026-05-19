export type Partner = {
  name: string;
  url: string;
  description: string;
};

export const aviationOrganizations: Partner[] = [
  {
    name: "Experimental Aircraft Association (EAA)",
    url: "https://www.eaa.org",
    description:
      "The Experimental Aircraft Association is a community of pilots and builders dedicated to growing participation in aviation through education, safety, and historic preservation.",
  },
  {
    name: "Aircraft Owners and Pilots Association (AOPA)",
    url: "https://www.aopa.org",
    description:
      "AOPA is the largest community of pilots in the world, protecting the freedom to fly while promoting aviation safety and education for pilots of all experience levels.",
  },
  {
    name: "Federal Aviation Administration (FAA)",
    url: "https://www.faa.gov",
    description:
      "The FAA regulates all aspects of civil aviation in the United States, from pilot certification to airspace management, ensuring the safest and most efficient aerospace system in the world.",
  },
];

export const hostCompanies: Partner[] = [
  {
    name: "AeroTech Industries",
    url: "#",
    description:
      "Placeholder profile for a future host company. AeroTech Industries represents the kind of aerospace manufacturer that opens its doors to student fellows.",
  },
  {
    name: "Skyway Flight Services",
    url: "#",
    description:
      "Placeholder profile for a future host company. Skyway Flight Services illustrates how regional operators can become classrooms for the next generation of aviators.",
  },
];
