'use client';

// React and Next
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface ISignUp {
  username?: string;
  email?: string;
  password?: string;
  isSigningUp?: boolean;
}

interface ISignIn {
  username?: string;
  isForgettingPassword?: boolean;
}

interface IContextProps {
  signUp: ISignUp;
  setSignUp: Dispatch<SetStateAction<ISignUp>>;
  signIn: ISignIn;
  setSignIn: Dispatch<SetStateAction<ISignIn>>;
}

const AuthContext = createContext<IContextProps>({
  signUp: { username: '', email: '', password: '', isSigningUp: false },
  setSignUp: () => {},
  signIn: { username: '', isForgettingPassword: false },
  setSignIn: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [signUp, setSignUp] = useState<ISignUp>({ username: '', email: '', password: '', isSigningUp: false });
  const [signIn, setSignIn] = useState<ISignIn>({ username: '', isForgettingPassword: false });

  return <AuthContext.Provider value={{ signUp, setSignUp, signIn, setSignIn }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
