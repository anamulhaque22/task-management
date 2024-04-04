import TaskCard from "./TaskCard";
export default function TaskBoard({ tasks, onDeleteTask, setData }) {
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {tasks?.map((task) => (
        <TaskCard
          task={task}
          key={task._id}
          onDeleteTask={onDeleteTask}
          setData={setData}
        />
      ))}
    </div>
  );
}
