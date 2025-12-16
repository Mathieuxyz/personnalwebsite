import Link from "next/link";

export default function BottomNavbar() {
    return (
        <footer className="bg-gradient-to-r from-slate-950/90 via-blue-900/80 to-indigo-900/80 text-slate-100 rounded-t-2xl border-t border-slate-800/60 shadow-2xl">
            <div className="container mx-auto px-4 py-5 flex items-center justify-center">
                <ul className="flex gap-6 items-center text-sm">
                    {[
                        { href: "/", label: "Accueil" },
                        { href: "/cv", label: "CV" },
                        { href: "/contact", label: "Contact" },
                        { href: "/admin", label: "Admin" },
                    ].map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}
