"use server";

// Import from the correct path, the same as in LoginPage
import { signIn, signOut } from '@/app/auth'; // Or '../auth' depending on your structure

export const login = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};