import Image from "next/image";
import { notFound } from "next/navigation";
import siteData from "@/data.json";

type Article = {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  date: string;
  content: string;
};

const articles: Article[] = siteData.blog?.articles ?? [];

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-slate-100 space-y-8">
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <p className="text-xs uppercase tracking-wider text-blue-200">
          {new Date(article.date).toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-50">{article.title}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Image
          src={article.image}
          width={600}
          height={400}
          alt={article.title}
          className="rounded-3xl border border-slate-800 object-cover w-full"
        />
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <p className="text-slate-300 whitespace-pre-line">{article.content}</p>
        </div>
      </div>
    </div>
  );
}
