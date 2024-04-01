import { useState } from "react";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
import { tasks } from "../assets/data";

import { MdGridView } from "react-icons/md";
import Button from "../components/common/Button";
import AddTask from "../components/task/AddTask";
import TaskBoard from "../components/task/TaskBoard";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return (
    <div className="card w-full p-6 ">
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
