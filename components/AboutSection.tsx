interface AboutSectionProps {
  id: string;
  background?: "primary" | "secondary" | "dark";
  animation?: "fade-up" | "slide-right" | "scale-in";
  contentVisibility?: boolean;
  children: React.ReactNode;
}

export default function AboutSection({
  id,
  background = "primary",
  animation = "fade-up",
  contentVisibility = false,
  children,
}: AboutSectionProps) {
  const bgClass = {
    primary: "bg-bg-primary",
    secondary: "bg-bg-secondary",
    dark: "bg-bg-dark",
  }[background];

  const animClass = {
    "fade-up": "scroll-fade-up",
    "slide-right": "scroll-slide-right",
    "scale-in": "scroll-scale-in",
  }[animation];

  return (
    <section
      id={id}
      className={`${bgClass} py-spacing-9 lg:py-spacing-10 ${animClass} ${contentVisibility ? "content-visibility-auto" : ""}`}
    >
      {children}
    </section>
  );
}
