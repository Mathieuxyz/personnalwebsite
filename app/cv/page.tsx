import Image from "next/image";
import GithubButton from "@/components/button";
import LinkedinButton from "@/components/linkedinButton";
import { readSiteData } from "@/lib/data/store";

type SectionItem = {
  headline: string;
  subline?: string | null;
  description?: string | null;
};

type Section = {
  title: string;
  subtitle?: string | null;
  items?: SectionItem[];
  github?: boolean;
};

export default async function CV() {
  const siteData = await readSiteData();
  const cvData = siteData.curriculum_vitae;
  const sections: Section[] = cvData?.sections ?? [];

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
                        <h3 className="text-lg font-semibold text-slate-100">
                          {item.headline}
                        </h3>
                        {item.subline && (
                          <p className="text-sm text-slate-400">{item.subline}</p>
                        )}
                        {item.description && (
                          <p className="mt-2 text-slate-200">{item.description}</p>
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
