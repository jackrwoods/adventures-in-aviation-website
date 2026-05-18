interface SectionHeaderProps {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="font-heading text-h2 text-text-primary mb-3">{title}</h2>
      {description && (
        <p className="text-body text-text-secondary max-w-text">{description}</p>
      )}
    </div>
  );
}
