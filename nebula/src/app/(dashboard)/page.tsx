export default function DashboardHomePage(): JSX.Element {
  return (
    <section className="space-y-4 px-6 py-8">
      <h2 className="text-2xl font-semibold text-white">Welcome to Nebula Lite</h2>
      <p className="text-sm text-slate-400">
        This lightweight build lets you manage organisations, projects, and
        obligations without external dependencies.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-sm text-slate-300">Create organisations and teams.</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-sm text-slate-300">Track projects and obligations.</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-sm text-slate-300">Upload files locally for review.</p>
        </div>
      </div>
    </section>
  );
}
