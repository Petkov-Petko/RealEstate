import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { logIn, signUp, logOut, googleSignIn } from "../service/auth";
import { auth } from "../config/firebase-config";

interface IUserAuthProviderProps {
  children: React.ReactNode;
}

type AuthContextData = {
  user: User | null;
  logIn: typeof logIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
};

export const userAuthContext = createContext<AuthContextData>({
  user: null,
  logIn,
  signUp,
  logOut,
  googleSignIn,
});

export const UserAuthProvider: React.FC<IUserAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("The logged in user is: ", user);
        setUser(user);
      }

      return () => {
        unsubscribe();
      };
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextData = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
  };

  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};


export const useUserAuth = () => {
    return useContext(userAuthContext);
}