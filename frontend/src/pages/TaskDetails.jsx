import TaskDetails from "../components/TaskDetails/TaskDetails";
import { useHeaderTitle } from "../context/HeaderTitleContext";

export default function InternalPage() {
  const { updateHeaderTitle } = useHeaderTitle();
  updateHeaderTitle("Task Details");
  return <TaskDetails />;
}
