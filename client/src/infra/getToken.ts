export const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Precondition violation! Token not found!");
  }

  return token;
};
