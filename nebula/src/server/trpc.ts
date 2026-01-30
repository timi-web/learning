export type LiteContext = {
  note: "Nebula Lite does not use tRPC.";
};

export const createContext = async (): Promise<LiteContext> => {
  return { note: "Nebula Lite does not use tRPC." };
};
