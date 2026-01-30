"use client";

import { useEffect, useState } from "react";

type ProjectOverviewPageProps = {
  params: { projectId: string };
};

type Obligation = {
  id: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
};

export default function ProjectOverviewPage({
  params
}: ProjectOverviewPageProps): JSX.Element {
  const [counts, setCounts] = useState({
    total: 0,
    inProgress: 0,
    completed: 0
  });

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/obligations?projectId=${params.projectId}`);
      const data = (await response.json()) as { obligations: Obligation[] };
      const total = data.obligations.length;
      const inProgress = data.obligations.filter(
        (item) => item.status === "IN_PROGRESS"
      ).length;
      const completed = data.obligations.filter(
        (item) => item.status === "COMPLETED"
      ).length;
      setCounts({ total, inProgress, completed });
    };
    void load();
  }, [params.projectId]);

  return (
    <section className="space-y-6 px-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Project Overview</h1>
        <p className="text-sm text-slate-400">
          Project ID: <span className="text-slate-200">{params.projectId}</span>
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs uppercase text-slate-400">Total Obligations</p>
          <p className="text-2xl font-semibold text-white">{counts.total}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs uppercase text-slate-400">In Progress</p>
          <p className="text-2xl font-semibold text-white">{counts.inProgress}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs uppercase text-slate-400">Completed</p>
          <p className="text-2xl font-semibold text-white">{counts.completed}</p>
        </div>
      </div>
    </section>
  );
}
