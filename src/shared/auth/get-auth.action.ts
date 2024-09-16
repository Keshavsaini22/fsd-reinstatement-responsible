"use server";
import { auth } from "./auth";

export async function getSession() {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    throw error;
  }
}
