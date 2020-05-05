import Amplify from "aws-amplify";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_CLIENT_APP_ID,
  },
});

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
