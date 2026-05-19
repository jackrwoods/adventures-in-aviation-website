import { Step } from "@/lib/about-data";

interface StepListProps {
  steps: Step[];
  variant?: "numbered" | "checklist";
  headingLevel?: 3 | 4;
}

export default function StepList({
  steps,
  variant = "numbered",
  headingLevel = 3,
}: StepListProps) {
  const HeadingTag = headingLevel === 4 ? "h4" : "h3";

  if (variant === "numbered") {
    return (
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-navy-800 text-inverse font-heading font-bold text-body"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div>
              <HeadingTag className="font-heading text-h4 text-text-primary mb-1">
                {step.title}
              </HeadingTag>
              <p className="text-body text-text-secondary">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ul className="space-y-4">
      {steps.map((step) => (
        <li key={step.title} className="flex gap-3 items-start">
          <span
            className="flex-shrink-0 w-5 h-5 mt-1.5 rounded-full border-2 border-navy-700 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-navy-700" />
          </span>
          <div>
            <HeadingTag className="font-heading text-h4 text-text-primary mb-1">
              {step.title}
            </HeadingTag>
            <p className="text-body text-text-secondary">{step.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
