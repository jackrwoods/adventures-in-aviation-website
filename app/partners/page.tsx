import PartnerCard from "@/components/PartnerCard";
import SectionHeader from "@/components/SectionHeader";
import {
  aviationOrganizations,
  hostCompanies,
} from "@/lib/partners-data";

export default function PartnersPage() {
  return (
    <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-10 lg:py-16">
      {/* Page header */}
      <header className="mb-10 lg:mb-16 scroll-fade-up">
        <h1 className="font-heading text-h1 text-text-primary mb-4">
          Partners & Resources
        </h1>
        <p className="text-body text-text-secondary max-w-text">
          Aviation organizations and host companies that make Adventures in Aviation possible. Each link opens in a new tab so you can explore without losing your place.
        </p>
      </header>

      {/* Aviation Organizations */}
      <section className="py-9 lg:py-10 scroll-slide-right content-visibility-auto">
        <SectionHeader
          title="Aviation Organizations"
          description="Established institutions that support student pathways into aviation through education, certification, and community."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aviationOrganizations.map((partner) => (
            <PartnerCard key={partner.url} partner={partner} />
          ))}
        </div>
      </section>

      {/* Host Company Profiles */}
      <section className="py-9 lg:py-10 bg-bg-secondary -mx-gutter lg:-mx-gutter-lg px-gutter lg:px-gutter-lg scroll-scale-in content-visibility-auto">
        <SectionHeader
          title="Host Company Profiles"
          description="Companies that open their facilities to student fellows for tours, interviews, and hands-on experiences."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostCompanies.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>
      </section>
    </div>
  );
}
