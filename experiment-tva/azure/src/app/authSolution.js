import { UserAgentApplication } from "msal";

const msalApp = new UserAgentApplication({
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: process.REACT_APP_AUTHORITY,
    validateAuthority: false,
    postLogoutRedirectUri:
      process.env.REACT_APP_VALIDATE_POST_LOGOUT_REDIRECT_URI,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
});

export const userLogin = async (email, password) => {
  window.callToLogin = performance.now();
  console.log(`Hej ${email}, du har lösenord: ${password}`);
  await msalApp.loginRedirect({});
  let test = await msalApp.getAccount();
  window.loginDone = performance.now();
  return { email: test.userName, isAuthenticated: true, id: test.idToken };
};

export const userLogout = () => {
  msalApp.logout();
  return null;
};
