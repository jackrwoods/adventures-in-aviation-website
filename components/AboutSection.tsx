interface AboutSectionProps {
  id: string;
  background?: "primary" | "secondary" | "dark";
  children: React.ReactNode;
}

export default function AboutSection({
  id,
  background = "primary",
  children,
}: AboutSectionProps) {
  const bgClass = {
    primary: "bg-bg-primary",
    secondary: "bg-bg-secondary",
    dark: "bg-bg-dark",
  }[background];

  return (
    <section
      id={id}
      className={`${bgClass} py-spacing-9 lg:py-spacing-10 scroll-fade-up`}
    >
      {children}
    </section>
  );
}
