export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-slate-100">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
