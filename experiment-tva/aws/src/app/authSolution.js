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
