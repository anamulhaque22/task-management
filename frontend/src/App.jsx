import { lazy } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import checkAuth from "./app/auth";
import { HeaderTitleProvider } from "./context/HeaderTitleContext";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Check for login and initialize axios
const token = checkAuth();

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Place new routes over this */}
          <Route
            path="/app/*"
            element={
              <HeaderTitleProvider>
                <Layout />
              </HeaderTitleProvider>
            }
          />

          <Route
            path="*"
            element={
              <Navigate to={token ? "/app/dashboard" : "/login"} replace />
            }
          />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
