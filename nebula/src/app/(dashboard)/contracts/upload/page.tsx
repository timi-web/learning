"use client";

import { useState } from "react";

export default function ContractUploadPage(): JSX.Element {
  const [status, setStatus] = useState("");

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    if (response.ok) {
      setStatus("Upload complete.");
      event.currentTarget.reset();
    } else {
      setStatus("Upload failed. Please try again.");
    }
  };

  return (
    <section className="space-y-4 px-6 py-8">
      <h1 className="text-2xl font-semibold text-white">Upload Contract</h1>
      <p className="text-sm text-slate-400">
        Upload a contract PDF to begin manual review in Nebula Lite.
      </p>
      <form
        onSubmit={handleUpload}
        className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300"
      >
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx"
          className="block w-full text-sm text-slate-200"
          required
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
