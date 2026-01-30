type ProjectMilestonesPageProps = {
  params: { projectId: string };
};

export default function ProjectMilestonesPage({
  params
}: ProjectMilestonesPageProps): JSX.Element {
  return (
    <section className="space-y-4 px-6 py-8">
      <h1 className="text-2xl font-semibold text-white">Milestones</h1>
      <p className="text-sm text-slate-400">
        Manage milestone approvals for project{" "}
        <span className="text-slate-200">{params.projectId}</span>.
      </p>
      <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
        Milestone schedules and payment-linked checkpoints will be surfaced
        here.
      </div>
    </section>
  );
}
