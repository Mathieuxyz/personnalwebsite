"use client";

import { useState } from "react";

import BlogCard from "@/components/blogCard";

type Article = {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  publishedAt?: string;
  date?: string;
};

type HomeArticlesProps = {
  articles: Article[];
};

export default function HomeArticles({ articles }: HomeArticlesProps) {
  const [visibleRows, setVisibleRows] = useState(1);
  const articlesPerRow = 3;
  const visibleArticles = articles.slice(0, visibleRows * articlesPerRow);
  const hasMore = visibleArticles.length < articles.length;

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-slate-100">Blog articles</h2>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {visibleArticles.map((article) => (
          <BlogCard
            key={article.title}
            image={article.image}
            title={article.title}
            excerpt={article.excerpt}
            slug={article.slug}
            date={article.publishedAt ?? article.date}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleRows((prev) => prev + 1)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-700 transition"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
