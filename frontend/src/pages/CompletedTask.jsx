import { useState } from "react";
import { tasks } from "../assets/data";

import AddTask from "../components/task/AddTask";
import TaskBoard from "../components/task/TaskBoard";

export default function CompletedTasksPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="card w-full">
      <TaskBoard tasks={tasks} />

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
}
