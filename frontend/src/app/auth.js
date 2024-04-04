import axios from "../utils/axios";

const checkAuth = () => {
  const TOKEN = localStorage.getItem("token");
  const PUBLIC_ROUTES = ["login", "register"];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );
  console.log(isPublicPage);
  if (!TOKEN && !isPublicPage) {
    window.location.href = "/login";
    return;
  } else {
    axios.interceptors.request.use(
      (config) => {
        if (TOKEN) {
          config.headers.Authorization = `Bearer ${TOKEN}`;
        }
        document.body.classList.add("loading-indicator");
        return config;
      },
      (error) => {
        console.error("Error while setting headers", error);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        // UPDATE: Add this code to hide global loading indicator
        document.body.classList.remove("loading-indicator");
        return response;
      },
      function (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
      }
    );
    return TOKEN;
  }
};

export default checkAuth;
