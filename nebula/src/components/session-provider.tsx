"use client";

import { createContext, useContext, useEffect, useState } from "react";

type SessionUser = {
  id: string;
  name: string;
  email: string;
};

type SessionState = {
  user: SessionUser | null;
  isLoading: boolean;
};

const SessionContext = createContext<SessionState>({
  user: null,
  isLoading: true
});

export function SessionProvider({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [state, setState] = useState<SessionState>({
    user: null,
    isLoading: true
  });

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          setState({ user: null, isLoading: false });
          return;
        }
        const data = (await response.json()) as { user: SessionUser | null };
        setState({ user: data.user, isLoading: false });
      } catch {
        setState({ user: null, isLoading: false });
      }
    };

    void loadSession();
  }, []);

  return (
    <SessionContext.Provider value={state}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionState {
  return useContext(SessionContext);
}
