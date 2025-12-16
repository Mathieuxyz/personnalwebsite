import Image from "next/image";
import GithubButton from "@/components/button";
import LinkedinButton from "@/components/linkedinButton";
import siteData from "@/data.json";

type SectionItem =
  | {
      institution: string;
      dates: string;
      description: string;
    }
  | {
      language: string;
      level: string;
      note?: string;
    };

type Section = {
  title: string;
  subtitle?: string;
  items?: SectionItem[];
  github?: boolean;
};

const cvData = siteData.curriculum_vitae;
const sections: Section[] = cvData?.sections ?? [];

function isEducationItem(item: SectionItem): item is Extract<SectionItem, { institution: string }> {
  return "institution" in item;
}

function isLanguageItem(item: SectionItem): item is Extract<SectionItem, { language: string }> {
  return "language" in item;
}

export default function CV() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-slate-100">
      <section className="space-y-6 bg-slate-900/60 border border-slate-800 rounded-[32px] p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold text-slate-50">{cvData?.title ?? "Curriculum Vitae"}</h1>
        <p className="text-lg text-slate-300">{cvData?.subtitle}</p>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="space-y-6">
            <Image
              src="/profile.jpg"
              width={480}
              height={360}
              alt="Portrait"
              className="w-full rounded-3xl object-cover border border-slate-800/70"
            />
            <p className="text-sm text-slate-400">
              Highlights from studies, aviation projects and day-to-day curiosity.
            </p>
          </div>
          <article className="space-y-8 leading-relaxed">
            {sections.map((section) => (
              <div key={section.title} className="space-y-3">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-50">{section.title}</h2>
                  {section.subtitle && (
                    <p className="text-sm text-slate-400 mt-1">{section.subtitle}</p>
                  )}
                </div>
                {section.items && (
                  <div className="space-y-4">
                    {section.items.map((item, index) => (
                      <div key={`${section.title}-${index}`}>
                        {isEducationItem(item) && (
                          <>
                            <h3 className="text-lg font-semibold text-slate-100">
                              {item.institution}
                            </h3>
                            <p className="text-sm text-slate-400">{item.dates}</p>
                            <p className="mt-2 text-slate-200">{item.description}</p>
                          </>
                        )}
                        {isLanguageItem(item) && (
                          <div className="flex flex-col md:flex-row md:justify-between border-b border-slate-800/70 py-2">
                            <span className="font-medium text-slate-100">{item.language}</span>
                            <span className="text-sm text-slate-300">{item.level}</span>
                            {item.note && (
                              <span className="text-xs text-slate-400 md:text-right">{item.note}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {section.github && (
                  <div className="pt-4 space-y-3">
                    <GithubButton />
                    <LinkedinButton />
                  </div>
                )}
              </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}
