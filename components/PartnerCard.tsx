import ExternalLink from "./ExternalLink";
import type { Partner } from "@/lib/partners-data";

interface PartnerCardProps {
  partner: Partner;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <article className="bg-bg-card border border-border rounded-md p-6 space-y-4 hover:shadow-sm transition-shadow duration-fast">
      <h3 className="font-heading text-h3 text-text-primary">
        {partner.name}
      </h3>
      <p className="text-body text-text-secondary">
        {partner.description}
      </p>
      <ExternalLink
        href={partner.url}
        className="text-body text-text-link underline underline-offset-4 hover:text-text-link-hover transition-colors duration-fast"
      >
        Visit {partner.name}
      </ExternalLink>
    </article>
  );
}
