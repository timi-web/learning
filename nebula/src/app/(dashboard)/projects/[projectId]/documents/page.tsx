"use client";

import { useState } from "react";

type ProjectDocumentsPageProps = {
  params: { projectId: string };
};

export default function ProjectDocumentsPage({
  params
}: ProjectDocumentsPageProps): JSX.Element {
  const [status, setStatus] = useState("");

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/upload", { method: "POST", body: formData });
    setStatus(response.ok ? "File uploaded." : "Upload failed.");
    if (response.ok) {
      event.currentTarget.reset();
    }
  };

  return (
    <section className="space-y-4 px-6 py-8">
      <h1 className="text-2xl font-semibold text-white">Documents</h1>
      <p className="text-sm text-slate-400">
        Upload supporting files for project{" "}
        <span className="text-slate-200">{params.projectId}</span>.
      </p>
      <form
        onSubmit={handleUpload}
        className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4"
      >
        <input
          type="file"
          name="file"
          className="block w-full text-sm text-slate-200"
        />
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-400"
        >
          Upload file
        </button>
        {status ? <p className="text-xs text-slate-400">{status}</p> : null}
      </form>
    </section>
  );
}
