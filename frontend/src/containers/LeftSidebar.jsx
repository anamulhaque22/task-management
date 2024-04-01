import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useHeaderTitle } from "../context/HeaderTitleContext";
import routes from "../routes/sidebar";
import "./LeftSidebar.css";
import SidebarSubmenu from "./SidebarSubmenu";
function LeftSidebar() {
  const { updateHeaderTitle } = useHeaderTitle();

  const location = useLocation();

  const close = () => {
    document.getElementById("left-sidebar-drawer").click();
  };

  return (
    <div className="drawer-side z-20">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu px-0 bg-layout text-base min-h-full pt-2 w-80 text-base-content bg-primary-color">
        <button
          className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        <li className="mb-2 font-semibold text-xl">
          <Link to={"/app/welcome"}>
            <img
              className="mask mask-squircle w-10"
              src="/logo192.png"
              alt="DashWind Logo"
            />
            DashWind
          </Link>{" "}
        </li>
        {routes.map((route, k) => {
          return (
            <li className="md:my-2" key={k}>
              {route.submenu ? (
                <SidebarSubmenu
                  {...route}
                  updateHeaderTitle={updateHeaderTitle}
                />
              ) : (
                <NavLink
                  end
                  to={route.path}
                  className={({ isActive }) =>
                    `${
                      isActive ? "font-semibold  bg-[#242933] " : "font-normal"
                    }`
                  }
                  onClick={() => updateHeaderTitle(route.name)}
                >
                  {route.icon} {route.name}
                  {location.pathname === route.path ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
