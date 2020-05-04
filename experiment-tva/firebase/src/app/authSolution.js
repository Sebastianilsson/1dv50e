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

export const userLogin = (email, password) => {
  window.callToLogin = performance.now();
  console.log(`Hej ${email}, du har lösenord: ${password}`);
  window.loginDone = performance.now();
  return {
    id: "hejhej",
    isAuthenticated: true,
    email: "test@test.se",
  };
};

export const userLogout = () => {
  console.log("Loggar ut");
  return null;
};
