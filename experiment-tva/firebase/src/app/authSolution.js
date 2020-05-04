import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

// Initialize Auth Service
const auth = fb.auth();

export const userLogin = async (email, password) => {
  try {
    window.callToLogin = performance.now();
    let res = await auth.signInWithEmailAndPassword(email, password);
    window.loginDone = performance.now();
    const { user } = res;
    return {
      id: user.uid,
      isAuthenticated: true,
      email: user.email,
    };
  } catch (e) {
    if (e.code === "auth/wrong-password" || e.code === "auth/user-not-found")
      throw new Error("Felaktig email eller lösenord");

    throw new Error("Oväntat fel på servern, var god försök igen");
  }
};

export const userLogout = async () => {
  try {
    return await auth.signOut();
  } catch (e) {
    throw new Error("Oväntat fel på servern, var god försök igen");
  }
};
