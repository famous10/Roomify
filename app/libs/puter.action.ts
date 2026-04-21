import type { User } from "../types";
import { STORAGE_PATHS } from "./contants";

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

export const saveFloorPlan = async (base64: string, id: string): Promise<string> => {
  // Convert base64 data URL → Blob
  const res = await fetch(base64);
  const blob = await res.blob();

  const filePath = `${STORAGE_PATHS.SOURCES}/${id}.png`;

  // Ensure parent directories exist
  try {
    await puter().fs.mkdir(STORAGE_PATHS.ROOT, { parents: true });
    await puter().fs.mkdir(STORAGE_PATHS.SOURCES, { parents: true });
  } catch {
    // Directories may already exist — safe to ignore
  }

  console.log("Saving floor plan to Puter:", filePath);
  await puter().fs.write(filePath, blob, { overwrite: true });
  console.log("Saved successfully, id:", id);

  return id;
};
