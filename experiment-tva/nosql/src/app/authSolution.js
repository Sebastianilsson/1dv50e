import axios from "axios";

export const userLogin = async (email, password) => {
  try {
    let data = JSON.stringify({ email, password });
    window.callToLogin = performance.now();
    let res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.loginDone = performance.now();
    return { email: res.data.email, id: res.data.id, isAuthenticated: true };
  } catch (e) {
    console.log(e);
  }
};

export const userLogout = async () => {
  await axios.get(`${process.env.REACT_APP_SERVER_URL}/logout`);
  return null;
};
