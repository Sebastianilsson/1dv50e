import Amplify, { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_CLIENT_APP_ID,
  },
});

export const userLogin = async (email, password) => {
  try {
    window.callToLogin = performance.now();
    let user = await Auth.signIn(email, password);
    window.loginDone = performance.now();
    return {
      id: user.userDataKey,
      isAuthenticated: true,
      email: user.challengeParam.userAttributes.email,
    };
  } catch (e) {
    console.log(e);
  }
};

export const userLogout = async () => {
  await Auth.signOut();
  return null;
};
