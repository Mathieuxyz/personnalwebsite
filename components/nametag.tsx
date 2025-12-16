import Link from "next/link";
import Image from 'next/image'
import Text from "../components/textEntry";

export default function Nametag() {
    return (
        <div className="w-full rounded-4xl max-w-5xl overflow-hidden bg-gradient-to-r from-slate-900/80 to-indigo-900/60 border border-slate-800 shadow-2xl backdrop-blur-lg">
            <div className="relative p-10">
                <div className="absolute inset-0 opacity-10 dark:opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900"></div>

                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)",
                            backgroundSize: "20px 20px",
                        }}
                    ></div>
                </div>

                <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0">
                        <div className="relative group">
                            <div className="absolute w-28 h-28 -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
                            <Image
                                src="/profile.jpg"
                                width={96}
                                height={96}
                                className="relative w-24 h-24 rounded-full object-cover border-2 border-white dark:border-gray-700"
                                alt="Profile portrait"
                            />
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-50">
                                Mathieu F.
                            </h2>
                            <p className="mt-1 text-slate-300">
                                Welcome on my blog ! You'll find here my CV and some interesting articles I've wrote about. Don't hesitate to reach me via the contact form if you'd like to share any idea or make a request.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            {/* YOUTUBE BUTTON */}
                            <a
                                href="https://www.youtube.com/@electroboom"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-100 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200"
                            >
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M20.5949 4.45999C21.5421 4.71353 22.2865 5.45785 22.54 6.40501C22.9982 8.12001 23 11.7004 23 11.7004C23 11.7004 23 15.2807 22.54 16.9957C22.2865 17.9429 21.5421 18.6872 20.5949 18.9407C18.88 19.4007 12 19.4007 12 19.4007C12 19.4007 5.12001 19.4007 3.405 18.9407C2.45785 18.6872 1.71353 17.9429 1.45999 16.9957C1 15.2807 1 11.7004 1 11.7004C1 11.7004 1 8.12001 1.45999 6.40501C1.71353 5.45785 2.45785 4.71353 3.405 4.45999C5.12001 4 12 4 12 4C12 4 18.88 4 20.5949 4.45999ZM15.5134 11.7007L9.79788 15.0003V8.40101L15.5134 11.7007Z"
                                        stroke="currentColor"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                                <span>YouTube</span>
                            </a>

                            {/* WEBSITE BUTTON */}
                            <a
                                href="https://trumpcard.gov/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-100 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200"
                            >
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                                    ></path>
                                </svg>
                                <span>Website</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
