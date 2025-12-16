"use client";
import { addRequest } from "../app/contact/requestLog";

export default function ContactForm() {
  return (
    <section className="relative isolate py-16 px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 opacity-90" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" />
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 md:col-span-2 bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white">
          <h2 className="text-3xl font-semibold">Let&apos;s talk</h2>
          <p className="mt-4 text-sm text-blue-100 leading-relaxed">
            Have a new idea, collaboration or speaking opportunity? Drop me a line and I&apos;ll get back to you as soon as possible.
          </p>

          <div className="mt-10 space-y-5 text-sm">
            <div>
              <p className="text-blue-200 uppercase tracking-wide">Email</p>
              <a href="mailto:franchimont.mathieu@gmail.com" className="text-white hover:underline">
                franchimont.mathieu@gmail.com
              </a>
            </div>
            <div>
              <p className="text-blue-200 uppercase tracking-wide">Timezone</p>
              <p>Europe/Brussels (GMT+1)</p>
            </div>
          </div>
        </div>

        <div className="p-8 md:col-span-3">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Contact Me</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-gray-400">
            Share a few details about what you&apos;d like to build.
          </p>
          <form action={addRequest} className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="mail" className="block text-sm font-medium text-slate-900 dark:text-gray-300">
                  Your email
                </label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  className="mt-2 w-full rounded-2xl border border-gray-200/60 bg-white/80 p-3 text-slate-900 shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-900 dark:text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-2 w-full rounded-2xl border border-gray-200/60 bg-white/80 p-3 text-slate-900 shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Let me know how I can help"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-900 dark:text-gray-300">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="mt-2 w-full rounded-2xl border border-gray-200/60 bg-white/80 p-3 text-slate-900 shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Share context, timelines, expectations..."
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                className="inline-flex items-center rounded-2xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
