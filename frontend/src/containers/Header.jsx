import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { Link } from "react-router-dom";
import profileImage from "../assets/img/profile-image.jpg";
import { useHeaderTitle } from "../context/HeaderTitleContext";

function Header() {
  const { headerTitle } = useHeaderTitle();
  function logoutUser() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <>
      <div className="navbar  flex justify-between bg-layout  z-10 shadow-md">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{headerTitle}</h1>
        </div>

        <div className="order-last">
          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profileImage} alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link to={"/app/profile-settings"}>
                  Profile Settings
                  <span className="badge">New</span>
                </Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
