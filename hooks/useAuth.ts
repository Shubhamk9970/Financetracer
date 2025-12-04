import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/config/firebase";
import { RootState, AppDispatch } from "@/store";
import { setUser, setDemoUser, setLoading, setError, logout } from "@/store/authSlice";
import { clearExpenses } from "@/store/expensesSlice";
import { clearInsights } from "@/store/insightsSlice";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, error, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      dispatch(setUser(null));
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const signIn = async (email: string, password: string) => {
    if (!isFirebaseConfigured || !auth) {
      dispatch(setError("Firebase is not configured"));
      throw new Error("Firebase is not configured");
    }

    dispatch(setLoading(true));
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      let message = "Failed to sign in";
      if (err.code === "auth/invalid-email") {
        message = "Invalid email address";
      } else if (err.code === "auth/user-not-found") {
        message = "No account found with this email";
      } else if (err.code === "auth/wrong-password") {
        message = "Incorrect password";
      } else if (err.code === "auth/invalid-credential") {
        message = "Invalid email or password";
      }
      dispatch(setError(message));
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!isFirebaseConfigured || !auth) {
      dispatch(setError("Firebase is not configured"));
      throw new Error("Firebase is not configured");
    }

    dispatch(setLoading(true));
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      let message = "Failed to create account";
      if (err.code === "auth/email-already-in-use") {
        message = "An account with this email already exists";
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email address";
      } else if (err.code === "auth/weak-password") {
        message = "Password should be at least 6 characters";
      }
      dispatch(setError(message));
      throw err;
    }
  };

  const logOut = async () => {
    if (!auth) {
      dispatch(logout());
      dispatch(clearExpenses());
      dispatch(clearInsights());
      return;
    }

    try {
      await signOut(auth);
      dispatch(logout());
      dispatch(clearExpenses());
      dispatch(clearInsights());
    } catch (err: any) {
      dispatch(setError("Failed to sign out"));
    }
  };

  const continueAsGuest = () => {
    dispatch(setDemoUser());
  };

  return {
    user,
    isLoading,
    error,
    isInitialized,
    isFirebaseConfigured,
    signIn,
    signUp,
    logOut,
    continueAsGuest,
  };
}
