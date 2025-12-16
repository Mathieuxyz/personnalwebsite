
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-blue-900/90 to-indigo-900/90 text-slate-50 rounded-s-2xl rounded-e-2xl shadow-xl backdrop-blur border border-slate-800/60">
            <div className="container mx-auto px-4 py-5 flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold tracking-wide">MF</Link>

                <ul className="flex gap-4">
                    <li>
                        <Link href="/" className="px-3 py-1 rounded-full hover:bg-white/10 transition-colors">
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link href="/cv" className="px-3 py-1 rounded-full hover:bg-white/10 transition-colors">
                            CV
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="px-3 py-1 rounded-full hover:bg-white/10 transition-colors">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
// ...existing code...
