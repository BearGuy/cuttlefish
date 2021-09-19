import React, { useState, createContext, useContext } from "react";
import { apiRequest } from "./util";

const DEFAULT_AUTH_VALUE = {
  user: null,
  token: null,
  signup: (email: string, password: string) => Promise.resolve(),
  signin: (email: string, password: string) => Promise.resolve(),
  signinWithProvider: () => {},
  signout: () => {},
  sendPasswordResetEmail: () => {},
  confirmPasswordReset: () => {},
  updateEmail: () => {},
  updatePassword: () => {},
  updateProfile: () => {},
}

const AuthContext = createContext(DEFAULT_AUTH_VALUE);

export default function AuthProvider({ children }: any) {
	const auth = useAuthProvider();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  return useContext(AuthContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleUser = (data: any) => {
    if (data?.user && data?.token) {
      console.log({ user: data?.user });
      setUser(data.user)
      setToken(data.access_token)
      return data.user
    }
  }

  const signup = (email: string, password: string) => {
    return apiRequest('auth/register', "POST", {email, password}, '')
      .then((data: any) => handleUser(data))
  }

  const signin = (email: string, password: string) => {
    return apiRequest('auth/login', "POST", {email, password}, '')
      .then((data: any) => handleUser(data))
  }

  const signinWithProvider = () => {}
  const signout = () => {}
  const sendPasswordResetEmail= () => {}
  const confirmPasswordReset= () => {}
  const updateEmail= () => {}
  const updatePassword= () => {}
  const updateProfile = () => {}

  return {
    user,
    token,
    signup,
    signin,
    signinWithProvider,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateEmail,
    updatePassword,
    updateProfile,
  }
}
