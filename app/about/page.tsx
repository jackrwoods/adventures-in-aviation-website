"use client";

import AboutSection from "@/components/AboutSection";
import SectionHeader from "@/components/SectionHeader";
import StepList from "@/components/StepList";
import TableOfContents from "@/components/TableOfContents";
import {
  aboutPageTitle,
  aboutPageSubtitle,
  aboutSections,
  programOverviewCopy,
  episodeStructureSteps,
  safetyChecklist,
  faqItems,
  hostGuideChecklist,
  hostGuideTimeline,
  applicationCopy,
} from "@/lib/about-data";
import { useUIState } from "@/lib/ui-state";

export default function AboutPage() {
  const { state, setAboutTocOpen } = useUIState();

  const tocItems = aboutSections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-10 lg:py-16">
      {/* Page header */}
      <header className="mb-10 lg:mb-16">
        <h1 className="font-heading text-h1 text-text-primary mb-4">
          {aboutPageTitle}
        </h1>
        <p className="text-body text-text-secondary max-w-text">
          {aboutPageSubtitle}
        </p>
      </header>

      {/* TOC + Sections */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* TOC sidebar */}
        <div className="lg:col-span-3">
          <TableOfContents
            items={tocItems}
            onToggle={() => setAboutTocOpen(!state.aboutTocOpen)}
          />
        </div>

        {/* Content sections */}
        <div className="lg:col-span-9 space-y-0">
          {/* 1. Program Overview */}
          <AboutSection id="overview" background="primary">
            <SectionHeader
              title="Program Overview"
              description="A high-velocity bridge between the classroom and the cockpit."
            />
            <div className="max-w-text space-y-6">
              <p className="text-body text-text-secondary">
                {programOverviewCopy.intro}
              </p>
              <blockquote className="border-l-4 border-accent pl-6 py-2">
                <p className="font-heading text-h3 text-text-primary italic">
                  &ldquo;{programOverviewCopy.mission}&rdquo;
                </p>
              </blockquote>
              <p className="text-body text-text-secondary">
                {programOverviewCopy.crisis}
              </p>
            </div>
          </AboutSection>

          {/* 2. 4-Step Episode Structure */}
          <AboutSection id="episode-structure" background="secondary">
            <SectionHeader
              title="The 4-Step Episode Structure"
              description="Every episode follows the same operational rhythm — from arrival to digital legacy."
            />
            <div className="max-w-text">
              <StepList steps={episodeStructureSteps} variant="numbered" />
            </div>
          </AboutSection>

          {/* 3. Safety Briefing */}
          <AboutSection id="safety" background="primary">
            <SectionHeader
              title="Safety Briefing"
              description="Five non-negotiable rules for every student on the tarmac."
            />
            <div className="max-w-text">
              <StepList
                steps={safetyChecklist.map((item) => ({
                  title: item.label,
                  description: item.detail || "",
                }))}
                variant="checklist"
              />
            </div>
          </AboutSection>

          {/* 4. FAQ */}
          <AboutSection id="faq" background="secondary">
            <SectionHeader
              title="Frequently Asked Questions"
              description="Quick answers for students, parents, educators, and potential hosts."
            />
            <div className="max-w-text space-y-8">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="font-heading text-h4 text-text-primary mb-2">
                    {item.question}
                  </h3>
                  <p className="text-body text-text-secondary">{item.answer}</p>
                </div>
              ))}
            </div>
          </AboutSection>

          {/* 5. Host Guide */}
          <AboutSection id="host-guide" background="primary">
            <SectionHeader
              title="Host Participation Guide"
              description="What host companies provide — and what the experience looks like from your side."
            />
            <div className="max-w-text space-y-8">
              <div>
                <h3 className="font-heading text-h4 text-text-primary mb-4">
                  What We Need From You
                </h3>
                <ul className="space-y-4">
                  {hostGuideChecklist.map((item) => (
                    <li key={item.label} className="flex gap-3 items-start">
                      <span
                        className="flex-shrink-0 w-5 h-5 mt-1.5 rounded-full border-2 border-navy-700 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-navy-700" />
                      </span>
                      <div>
                        <span className="font-heading text-body font-bold text-text-primary">
                          {item.label}
                        </span>
                        {item.detail && (
                          <p className="text-body text-text-secondary">
                            {item.detail}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-h4 text-text-primary mb-4">
                  Timeline
                </h3>
                <StepList steps={hostGuideTimeline} variant="numbered" headingLevel={4} />
              </div>
            </div>
          </AboutSection>

          {/* 6. Application Info */}
          <AboutSection id="apply" background="secondary">
            <SectionHeader
              title="Apply to Be a Student Fellow"
              description="Join a cohort of 10 students for a single-day episode experience."
            />
            <div className="max-w-text space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-heading text-h4 text-text-primary mb-2">Who</h3>
                  <p className="text-body text-text-secondary">{applicationCopy.who}</p>
                </div>
                <div>
                  <h3 className="font-heading text-h4 text-text-primary mb-2">How</h3>
                  <p className="text-body text-text-secondary">{applicationCopy.how}</p>
                </div>
                <div>
                  <h3 className="font-heading text-h4 text-text-primary mb-2">What to Expect</h3>
                  <p className="text-body text-text-secondary">{applicationCopy.what}</p>
                </div>
              </div>

              <div className="border border-border rounded-md p-6 bg-bg-card">
                <p className="text-body text-text-secondary">{applicationCopy.note}</p>
              </div>
            </div>
          </AboutSection>
        </div>
      </div>
    </div>
  );
}
