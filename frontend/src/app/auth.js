import axios from "../utils/axios";

const checkAuth = () => {
  /*  Getting token value stored in localstorage, if token is not present we will open login page 
    for all internal dashboard routes  */
  const TOKEN = localStorage.getItem("token");
  const PUBLIC_ROUTES = [
    "login",
    "forgot-password",
    "register",
    "documentation",
  ];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );
  console.log(isPublicPage);
  if (true) {
    //!TOKEN && !isPublicPage
    console.log("token not found");
    // window.location.href = '/login'
    return;
  } else {
    axios.defaults.headers.common["token"] = TOKEN;

    axios.interceptors.request.use(
      function (config) {
        // UPDATE: Add this code to show global loading indicator
        document.body.classList.add("loading-indicator");
        return config;
      },
      function (error) {
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
        if (error.response.status === 401) {
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
