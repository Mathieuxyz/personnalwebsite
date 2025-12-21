import Link from "next/link";

import LoginForm from "./loginForm";

type LoginPageProps = {
  searchParams?: {
    next?: string;
  };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const nextPath =
    searchParams?.next && searchParams.next.startsWith("/") ? searchParams.next : "/admin";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-4 py-12 text-slate-100">
      <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-blue-300/80">Admin access</p>
          <h1 className="text-3xl font-semibold text-slate-50">Sign in</h1>
          <p className="text-sm text-slate-300">
            Enter your credentials to continue to the control room.
          </p>
        </header>

        <LoginForm nextPath={nextPath} />
      </div>

      <Link href="/" className="mt-6 text-center text-sm text-slate-300 hover:text-slate-100">
        Back to home
      </Link>
    </div>
  );
}
