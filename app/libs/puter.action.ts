import type { User } from "../types";

const puter = () => window.puter;

export const signIn = async (): Promise<void> =>
  await puter().auth.signIn();

export const signOut = async (): Promise<void> =>
  await puter().auth.signOut();

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    if (typeof window === "undefined" || !window.puter) return null;
    const isSignedIn = puter().auth.isSignedIn();
    if (!isSignedIn) return null;
    return await puter().auth.getUser();
  } catch {
    return null;
  }
};
