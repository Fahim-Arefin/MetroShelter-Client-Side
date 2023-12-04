/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import app from "../firebase/firebase.config";

const provider = new GoogleAuthProvider();
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  // const baseURL = "http://localhost:5000";
  const baseURL = "https://metroshelter-server-side.vercel.app";

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("from onAuthStateChanged", currentUser);

      const id = currentUser?.uid || user?.uid;
      const email = currentUser?.email || user?.email;
      const loggedInUser = { id, email };

      setUser(currentUser);
      setLoading(false);

      // JWT Token
      // If current user exist we issue a token
      if (currentUser) {
        axios
          .post(`${baseURL}/jwt`, loggedInUser, { withCredentials: true })
          .then((res) => {
            console.log("Token Response: ", res.data);
          });
      } else {
        axios
          .post(`${baseURL}/logout`, loggedInUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
      }
    });

    return () => {
      unSubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const updateUserInfo = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const successToast = (msg, time = false) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const errorToast = (msg, time = false) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const valueToShare = {
    user,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserInfo,
    loading,
    logOut,
    successToast,
    errorToast,
    baseURL,
    setLoading,
  };

  return (
    <AuthContext.Provider value={valueToShare}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
