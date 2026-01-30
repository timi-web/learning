type ContractReviewPageProps = {
  params: { contractId: string };
};

export default function ContractReviewPage({
  params
}: ContractReviewPageProps): JSX.Element {
  return (
    <section className="space-y-4 px-6 py-8">
      <h1 className="text-2xl font-semibold text-white">Contract Review</h1>
      <p className="text-sm text-slate-400">
        Review extraction results for contract{" "}
        <span className="text-slate-200">{params.contractId}</span>.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="min-h-[320px] rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
          PDF viewer placeholder for the contract document.
        </div>
        <div className="min-h-[320px] rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
          Extraction editor placeholder with obligations and milestones.
        </div>
      </div>
    </section>
  );
}
