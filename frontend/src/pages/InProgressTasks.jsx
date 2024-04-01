import { useState } from "react";
import { tasks } from "../assets/data";

import TaskBoard from "../components/task/TaskBoard";

export default function InternalPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="card w-full">
      <TaskBoard tasks={tasks} />
    </div>
  );
}
