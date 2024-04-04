import { useEffect } from "react";
import TaskDetails from "../components/TaskDetails/TaskDetails";
import { useHeaderTitle } from "../context/HeaderTitleContext";

export default function InternalPage() {
  const { updateHeaderTitle } = useHeaderTitle();
  useEffect(() => {
    updateHeaderTitle("Task Details");
  }, []);

  return <TaskDetails />;
}
