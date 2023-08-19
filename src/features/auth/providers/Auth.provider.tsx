import { Spin } from "antd";
import React, { useState, useEffect } from "react";

import { auth } from "~firebase";
import { IUser } from "~types/models";

interface IAuthProviderProps {
  children: JSX.Element;
}

export const AuthContext = React.createContext(
  {} as {
    user: IUser | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  }
);

export function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user)
        setUser({
          id: user.uid,
          name: user.displayName!,
          email: user.email!,
        });
      else setUser(null);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Move this to a service
    auth.signInWithEmailAndPassword(email, password);
  };

  const signUp = async (email: string, password: string) => {
    auth.createUserWithEmailAndPassword(email, password);
  };

  const logout = () => auth.signOut();

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, logout, isLoggedIn: !!user }}
    >
      {!loading ? children : <Spin size='large' />}
    </AuthContext.Provider>
  );
}
