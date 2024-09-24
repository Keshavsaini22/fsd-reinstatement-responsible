"use server";
import { signOut } from "../../../../shared/auth/auth";

export async function signOutUser() {
  await signOut();
}

