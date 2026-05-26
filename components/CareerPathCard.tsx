import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/paths";

interface CareerPathCardProps {
  title: string;
  tagline: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export default function CareerPathCard({
  title,
  tagline,
  imageSrc,
  imageAlt,
  href,
}: CareerPathCardProps) {
  return (
    <article className="group bg-bg-card border border-border rounded-md overflow-hidden hover:shadow-md transition-shadow duration-fast">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
          <Image
            src={assetPath(imageSrc)}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-fast ease-default group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="p-5 space-y-2">
          <h3 className="font-heading text-h3 text-text-primary group-hover:text-text-heading transition-colors duration-fast">
            {title}
          </h3>
          <p className="text-body text-text-secondary">{tagline}</p>
        </div>
      </Link>
    </article>
  );
}
