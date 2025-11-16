
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-blue-950 text-white rounded-s-2xl rounded-e-2xl">
            <div className="container mx-auto px-4 py-5 flex items-center justify-between">
                <Link href="/" className="text-lg font-serif">MF</Link>

                <ul className="flex gap-4">
                    <li>
                        <Link href="/" className="px-2 py-1 rounded hover:bg-slate-700">
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link href="/cv" className="px-2 py-1 rounded hover:bg-slate-700">
                            CV
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="px-2 py-1 rounded hover:bg-slate-700">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
// ...existing code...