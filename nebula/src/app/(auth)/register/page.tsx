"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  form?: string[];
};

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<FieldErrors | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword
      })
    });

    const data = (await response.json()) as { error?: FieldErrors };

    setIsLoading(false);

    if (!response.ok) {
      setError(data.error ?? { form: ["Registration failed."] });
      return;
    }

    router.push("/login");
  };

  const errorMessage = error?.form?.[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your Nebula account</CardTitle>
        <p className="text-sm text-slate-400">
          Start tracking obligations and contract milestones instantly.
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            {error?.name ? (
              <p className="text-xs text-rose-300">{error.name[0]}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            {error?.email ? (
              <p className="text-xs text-rose-300">{error.email[0]}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password (min 6 characters)</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {error?.password ? (
              <p className="text-xs text-rose-300">{error.password[0]}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            {error?.confirmPassword ? (
              <p className="text-xs text-rose-300">
                {error.confirmPassword[0]}
              </p>
            ) : null}
          </div>
          {errorMessage ? (
            <p className="rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {errorMessage}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-indigo-300 hover:text-indigo-200"
            >
              Sign in
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
