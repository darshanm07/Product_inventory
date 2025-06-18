export const getToken = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data).token : null;
};
