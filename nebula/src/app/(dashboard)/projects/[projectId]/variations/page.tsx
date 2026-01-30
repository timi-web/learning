type ProjectVariationsPageProps = {
  params: { projectId: string };
};

export default function ProjectVariationsPage({
  params
}: ProjectVariationsPageProps): JSX.Element {
  return (
    <section className="space-y-4 px-6 py-8">
      <h1 className="text-2xl font-semibold text-white">Variations</h1>
      <p className="text-sm text-slate-400">
        Review variation requests for{" "}
        <span className="text-slate-200">{params.projectId}</span>.
      </p>
      <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
        Variation approvals, cost impacts, and timelines will be managed here.
      </div>
    </section>
  );
}
