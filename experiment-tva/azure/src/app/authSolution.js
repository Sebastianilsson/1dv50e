import { UserAgentApplication } from "msal";

const msalApp = new UserAgentApplication({
  auth: {
    clientId: "245e9392-c666-4d51-8f8a-bfd9e55b2456",
    authority: "https://login.microsoftonline.com/common",
    validateAuthority: true,
    postLogoutRedirectUri: "http://localhost:3000",
    navigateToLoginRequestUrl: false,
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
