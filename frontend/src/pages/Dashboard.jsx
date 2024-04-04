import clsx from "clsx";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";
import { MdAdminPanelSettings } from "react-icons/md";
import { useGetSummery } from "../api";
const Card = ({ label, count, bg, icon }) => {
  return (
    <div className="w-full h-32 bg-primary-color p-5 shadow-md rounded-md flex items-center justify-between">
      <div className="h-full flex flex-1 flex-col justify-between">
        <p className="text-base text-gray-600">{label}</p>
        <span className="text-2xl font-semibold">{count}</span>
      </div>

      <div
        className={clsx(
          "w-10 h-10 rounded-full flex items-center justify-center text-white",
          bg
        )}
      >
        {icon}
      </div>
    </div>
  );
};
function InternalPage() {
  const { data: summary, error, loading } = useGetSummery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(summary);
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.["totalTasks"] || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: summary?.["Completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: summary?.["In Progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: summary?.["To-Do"],
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];
  return (
    <div className="py-4  rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>
    </div>
  );
}

export default InternalPage;
