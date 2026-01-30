"use client";

import { useEffect, useState } from "react";

type ProjectObligationsPageProps = {
  params: { projectId: string };
};

type Obligation = {
  id: string;
  title: string;
  description: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
};

export default function ProjectObligationsPage({
  params
}: ProjectObligationsPageProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<Obligation[]>([]);

  const loadObligations = async () => {
    const response = await fetch(`/api/obligations?projectId=${params.projectId}`);
    const data = (await response.json()) as { obligations: Obligation[] };
    setItems(data.obligations);
  };

  useEffect(() => {
    void loadObligations();
  }, [params.projectId]);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch("/api/obligations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: params.projectId,
        title,
        description
      })
    });
    setTitle("");
    setDescription("");
    await loadObligations();
  };

  const handleStatus = async (obligationId: string, status: Obligation["status"]) => {
    await fetch("/api/obligations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ obligationId, status })
    });
    await loadObligations();
  };

  return (
    <section className="space-y-6 px-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Obligations</h1>
        <p className="text-sm text-slate-400">
          Track obligations for project{" "}
          <span className="text-slate-200">{params.projectId}</span>.
        </p>
      </div>

      <form onSubmit={handleCreate} className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4">
        <div>
          <label className="text-xs uppercase text-slate-400">Title</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-xs uppercase text-slate-400">Description</label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-400"
        >
          Add obligation
        </button>
      </form>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-slate-400">No obligations yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-900/40 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
                  {item.status.replace("_", " ")}
                </span>
                <select
                  className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-slate-200"
                  value={item.status}
                  onChange={(event) =>
                    void handleStatus(item.id, event.target.value as Obligation["status"])
                  }
                >
                  <option value="NOT_STARTED">Not started</option>
                  <option value="IN_PROGRESS">In progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
