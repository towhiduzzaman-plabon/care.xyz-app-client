import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { API_BASE } from "../utils/axiosSecure";

export const AuthContext = createContext(null);

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, provider);

    const res = await axios.post(`${API_BASE}/api/auth/login`, {
      email: result.user.email,
    });

    localStorage.setItem("access-token", res.data.token);
    setUser(result.user);

    return result;
  };

  const loginUser = async (email, password) => {
    // sign in with Firebase using email/password
    const result = await signInWithEmailAndPassword(auth, email, password);

    // request JWT from backend
    const res = await axios.post(`${API_BASE}/api/auth/login`, {
      email: result.user.email,
    });

    localStorage.setItem("access-token", res.data.token);
    setUser(result.user);

    return result;
  };

  const registerUser = async (name, email, password, nid, contact) => {
    // create firebase user
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // send registration to backend (stores plain password as per server comment)
    const res = await axios.post(`${API_BASE}/api/auth/register`, {
      name,
      email,
      password,
      nid,
      contact,
    });

    localStorage.setItem("access-token", res.data.token);
    setUser(result.user);

    return result;
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("access-token");
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        googleLogin,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
