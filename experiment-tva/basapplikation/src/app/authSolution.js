export const userLogin = (email, password) => {
  console.log(`Hej ${email}, du har lösenord: ${password}`);
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
