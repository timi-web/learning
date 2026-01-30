export default function HomePage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Nebula Platform
        </p>
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">
          Self-enforcing construction contracts, built on real-time intelligence.
        </h1>
        <p className="text-base text-slate-300">
          Upload contracts, extract obligations, and anchor critical events on-chain—all
          with a living audit trail for every project milestone.
        </p>
      </div>
      <div className="rounded-full border border-slate-800 bg-slate-900/70 px-6 py-2 text-sm text-slate-300">
        Phase 1 • Foundation setup
      </div>
      <a
        className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
        href="/login"
      >
        Launch Nebula Lite
      </a>
    </main>
  );
}
