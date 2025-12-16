import Link from "next/link";

type BlogCardProps = {
    image: string;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
};

export default function BlogCard({ image, title, excerpt, slug, date }: BlogCardProps) {
    return (
        <article className="bg-slate-900/70 border border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col">
            <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className="p-6 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-wide text-slate-400">{new Date(date).toLocaleDateString()}</p>
                <h3 className="text-xl font-semibold text-slate-100 mt-2">{title}</h3>
                <p className="mt-3 text-slate-400 flex-1">{excerpt}</p>
                <Link
                    href={`/blog/${slug}`}
                    className="mt-4 text-sm text-blue-300 hover:text-blue-100 transition"
                >
                    Continue reading →
                </Link>
            </div>
        </article>
    );
}
