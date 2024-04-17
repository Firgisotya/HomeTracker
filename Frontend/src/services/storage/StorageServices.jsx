const getToken = async () => {
  try {
    const token = await localStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error while getting token:", error);
    return null;
  }
};

const removeLogged = () => {
  localStorage.removeItem("token");
};

const userLogged = async () => {
  const token = await getToken();
  const user = JSON.parse(localStorage.getItem("user"));
  return { token, user };
};

export { getToken, removeLogged, userLogged };
