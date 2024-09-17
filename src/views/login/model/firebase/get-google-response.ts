import { NextFn, signInWithPopup } from "firebase/auth";
import { User } from "next-auth";
import { useEnvContext } from "next-runtime-env";
import { onAuthStateChanged as _onAuthStateChanged } from "firebase/auth";
import { getFireBaseConfig } from "./firebase";

export const GoogleResponse = () => {
  const { 
    NEXT_PUBLIC_APIKEY, 
    NEXT_PUBLIC_AUTHDOMAIN, 
    NEXT_PUBLIC_TENANT_ID, 
    NEXT_PUBLIC_SAML_PROVIDER 
  } = useEnvContext();
  const firebaseConfig: FirebaseConfigType = {
    apiKey: NEXT_PUBLIC_APIKEY!,
    authDomain: NEXT_PUBLIC_AUTHDOMAIN!,
  };
  const tenantId = NEXT_PUBLIC_TENANT_ID as string;
  const samlProvider = NEXT_PUBLIC_SAML_PROVIDER as string;
  const { auth, provider } = getFireBaseConfig(firebaseConfig as FirebaseConfigType, tenantId, samlProvider);

  const onAuthStateChanged = (cb: NextFn<User | null>) => {
    return _onAuthStateChanged(auth, cb);
  };

  const logout = async () => {
    await auth.signOut();
  };

  const getSignInWithPopup = async (): Promise<any> => {
    const res: any = await signInWithPopup(auth, provider);
    const rawUserInfo = JSON.parse(res._tokenResponse.rawUserInfo);
    const userData: any = {
      email: res._tokenResponse?.email,
      name: rawUserInfo.firstname + " " + rawUserInfo.lastname,
      photoURL: res.user?.photoURL,
    };
    return userData;
  };

  return { getSignInWithPopup, logout, onAuthStateChanged };
};
