'use client';

// React and Next
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface ISignUp {
  username?: string;
  email?: string;
  password?: string;
}

interface ISignIn {
  username?: string;
}

interface IContextProps {
  signUp: ISignUp;
  setSignUp: Dispatch<SetStateAction<ISignUp>>;
  signIn: ISignIn;
  setSignIn: Dispatch<SetStateAction<ISignIn>>;
}

const AuthContext = createContext<IContextProps>({
  signUp: { username: '', email: '', password: '' },
  setSignUp: () => {},
  signIn: { username: '' },
  setSignIn: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [signUp, setSignUp] = useState<ISignUp>({ username: '', email: '', password: '' });
  const [signIn, setSignIn] = useState<ISignIn>({ username: '' });

  return <AuthContext.Provider value={{ signUp, setSignUp, signIn, setSignIn }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
