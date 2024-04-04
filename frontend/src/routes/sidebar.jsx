import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";
const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },

  {
    path: "/app/tasks",
    icon: <ListBulletIcon className={`${iconClasses} inline`} />,
    name: "Tasks",
  },
  {
    path: "/app/completed-tasks",
    icon: <CheckCircleIcon className={`${iconClasses} inline`} />,
    name: "Completed",
  },
  {
    path: "/app/in-progress-tasks",
    icon: <ClockIcon className={`${iconClasses} inline`} />,
    name: "In Progress",
  },
  {
    path: "/app/to-do-tasks",
    icon: <ClockIcon className={`${iconClasses} inline`} />,
    name: "To Do",
  },

  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Settings", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/profile-settings", //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: "Profile", // name that appear in Sidebar
  //     },
  //   ],
  // },
];

export default routes;
