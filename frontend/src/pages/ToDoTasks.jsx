import { useState } from "react";

import { useGetTasks } from "../api";
import TaskBoard from "../components/task/TaskBoard";
import axios from "../utils/axios";
import { errorToaster, successToaster } from "../utils/toastMessage";

export default function Tasks() {
  const [currentPage, setCurrentPage] = useState(1);
  const taskLimit = 9;
  const {
    data: tasksData,
    error,
    loading,
    setData,
  } = useGetTasks(currentPage, taskLimit, "To-Do");

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/tasks/${id}`);
      if (res.status === 200) {
        setData({ tasks: tasksData.tasks.filter((task) => task._id !== id) });
        successToaster("Task Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      errorToaster(error?.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error?.messge}</p>;

  const tasks = tasksData?.tasks;
  const totalPages = tasksData?.totalPages;
  const paginateButton = Array.from({ length: totalPages }, (_, i) => i + 1);
  console.log(paginateButton);

  return (
    <div className="card w-full">
      {tasks.length > 0 ? (
        <>
          <TaskBoard
            tasks={tasks}
            onDeleteTask={deleteTask}
            setData={setData}
          />

          <div className="join">
            {paginateButton.length > 1 &&
              paginateButton.map((page) => (
                <input
                  key={page}
                  className="join-item btn btn-square"
                  type="radio"
                  name="options"
                  aria-label={page}
                  checked={currentPage === page}
                  onChange={() => setCurrentPage(page)}
                />
              ))}
          </div>
        </>
      ) : (
        <p className="text-center text-2xl">No ToDo Task Found</p>
      )}
    </div>
  );
}
