import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Page404 = lazy(() => import("../pages/404"));

const Profile = lazy(() => import("../pages/ProfileSettings"));

const Tasks = lazy(() => import("../pages/Tasks"));
const CompletedTask = lazy(() => import("../pages/CompletedTask"));
const InProgressTasks = lazy(() => import("../pages/InProgressTasks"));
const ToDoTasks = lazy(() => import("../pages/ToDoTasks"));
const TaskDetails = lazy(() => import("../pages/TaskDetails"));
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },

  {
    path: "/tasks",
    component: Tasks,
  },
  {
    path: "/completed-tasks",
    component: CompletedTask,
  },
  {
    path: "/in-progress-tasks",
    component: InProgressTasks,
  },
  {
    path: "/to-do-tasks",
    component: ToDoTasks,
  },
  {
    path: "/task/:taskId",
    component: TaskDetails,
  },
  {
    path: "/404",
    component: Page404,
  },

  {
    path: "/profile-settings",
    component: Profile,
  },
];

export default routes;
