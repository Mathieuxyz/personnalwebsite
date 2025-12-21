"use client";

import { useActionState } from "react";

import { loginAction } from "./actions";

type LoginFormProps = {
  nextPath: string;
};

const initialState = { error: "" };

export default function LoginForm({ nextPath }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={nextPath} />
      <div className="space-y-2">
        <label htmlFor="login" className="text-xs uppercase tracking-wider text-slate-400">
          Login
        </label>
        <input
          id="login"
          name="login"
          type="text"
          autoComplete="username"
          className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-xs uppercase tracking-wider text-slate-400">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>

      {state?.error && (
        <div className="rounded-2xl border border-red-700/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl border border-blue-700/60 bg-blue-900/20 px-4 py-2 text-sm font-semibold text-blue-200 hover:bg-blue-900/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Unlock admin"}
      </button>
    </form>
  );
}
