"use client";

import { initializeApp } from "firebase/app";
import { getAuth, SAMLAuthProvider } from "firebase/auth";

export const getFireBaseConfig = (
  firebaseConfig: FirebaseConfigType,
  tenantId: string,
  samlProvider: string
) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  //Tenant ID
  auth.tenantId = tenantId;

  //SAML Provider
  const provider = new SAMLAuthProvider(samlProvider);

  return { auth, provider };
};
