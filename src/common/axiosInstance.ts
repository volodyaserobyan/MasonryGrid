import axios from "axios";

export const axiosClient = () => {
  const apiInstance = axios.create({
    baseURL: "https://api.pexels.com/v1/",
    headers: {
      Authorization: "EIZXCxXBJsfDzNbVZ77YcNohbFFKCJCTVAeTdCYKp7y3gvqvOsTELMpp",
    },
  });

  apiInstance.interceptors.request.use(
    (request) => {
      return request;
    },
    (error) => Promise.reject(error)
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      return Promise.reject(error);
    }
  );
  return apiInstance;
};
