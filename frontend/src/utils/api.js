export const postReq = async (endpoint, data) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(endpoint, config);
  return response;
};
