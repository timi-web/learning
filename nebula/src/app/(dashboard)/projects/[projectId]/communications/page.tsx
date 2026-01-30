type ProjectCommunicationsPageProps = {
  params: { projectId: string };
};

export default function ProjectCommunicationsPage({
  params
}: ProjectCommunicationsPageProps): JSX.Element {
  return (
    <section className="space-y-4 px-6 py-8">
      <h1 className="text-2xl font-semibold text-white">Communications</h1>
      <p className="text-sm text-slate-400">
        View C1 and C2 notices for{" "}
        <span className="text-slate-200">{params.projectId}</span>.
      </p>
      <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
        Formal notices, acknowledgements, and message threads will appear here.
      </div>
    </section>
  );
}
