"use client";

import { useEffect, useState } from "react";

type Organisation = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  name: string;
  description?: string;
};

export default function ProjectsPage(): JSX.Element {
  const [organisationName, setOrganisationName] = useState("");
  const [organisationId, setOrganisationId] = useState("");
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  const loadOrganisations = async () => {
    const response = await fetch("/api/auth/me");
    const data = (await response.json()) as { user: { id: string } | null };
    if (!data.user) {
      return;
    }
    const orgResponse = await fetch(`/api/organisation?ownerId=${data.user.id}`);
    const orgData = (await orgResponse.json()) as { organisations: Organisation[] };
    setOrganisations(orgData.organisations);
    if (orgData.organisations[0]) {
      setOrganisationId(orgData.organisations[0].id);
    }
  };

  const loadProjects = async (orgId: string) => {
    const response = await fetch(`/api/projects?organisationId=${orgId}`);
    const data = (await response.json()) as { projects: Project[] };
    setProjects(data.projects);
  };

  useEffect(() => {
    void loadOrganisations();
  }, []);

  useEffect(() => {
    if (organisationId) {
      void loadProjects(organisationId);
    }
  }, [organisationId]);

  const handleCreateOrg = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const session = await fetch("/api/auth/me");
    const data = (await session.json()) as { user: { id: string } | null };
    if (!data.user) {
      return;
    }
    await fetch("/api/organisation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: organisationName, ownerId: data.user.id })
    });
    setOrganisationName("");
    await loadOrganisations();
  };

  const handleCreateProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        organisationId,
        name: projectName,
        description: projectDescription
      })
    });
    setProjectName("");
    setProjectDescription("");
    await loadProjects(organisationId);
  };

  return (
    <section className="space-y-6 px-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Organisations</h1>
        <p className="text-sm text-slate-400">
          Create an organisation to start managing projects.
        </p>
      </div>
      <form
        onSubmit={handleCreateOrg}
        className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4"
      >
        <input
          className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100"
          placeholder="Organisation name"
          value={organisationName}
          onChange={(event) => setOrganisationName(event.target.value)}
          required
        />
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-400"
        >
          Create organisation
        </button>
      </form>

      <div className="space-y-2">
        <p className="text-xs uppercase text-slate-400">Existing organisations</p>
        <div className="flex flex-wrap gap-2">
          {organisations.map((org) => (
            <button
              key={org.id}
              type="button"
              onClick={() => setOrganisationId(org.id)}
              className={`rounded-full border px-3 py-1 text-xs ${
                organisationId === org.id
                  ? "border-indigo-400 text-indigo-200"
                  : "border-slate-700 text-slate-400"
              }`}
            >
              {org.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-white">Projects</h2>
        <form
          onSubmit={handleCreateProject}
          className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4"
        >
          <input
            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            placeholder="Project name"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            required
          />
          <textarea
            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            placeholder="Project description"
            value={projectDescription}
            onChange={(event) => setProjectDescription(event.target.value)}
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-400"
          >
            Create project
          </button>
        </form>
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border border-slate-800 bg-slate-900/40 p-4"
            >
              <p className="font-medium text-white">{project.name}</p>
              <p className="text-sm text-slate-400">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
