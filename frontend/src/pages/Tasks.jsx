import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
import { tasks } from "../assets/data";

import Button from "../components/common/Button";
import AddTask from "../components/task/AddTask";
import TaskBoard from "../components/task/TaskBoard";

const Tasks = () => {
  const params = useParams();

  const [open, setOpen] = useState(false);

  const status = params?.status || "";

  return (
    <div className="card w-full">
      <div className="flex justify-end mb-4">
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-[#5D17EB] text-gray-600 rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <TaskBoard tasks={tasks} />

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
