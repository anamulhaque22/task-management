import { Menu } from "@headlessui/react";
import { useState } from "react";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";

const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const deleteHandler = (e) => {
    e.stopPropagation();
  };

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: (e) => {
        e.stopPropagation();
        navigate(`/app/task/${task._id}`);
      },
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: (e) => {
        console.log("Edit");
        e.stopPropagation();
        setOpenEdit(true);
      },
    },
  ];

  return (
    <>
      <div className="z-10">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button
            onClick={(e) => e.stopPropagation()}
            className="inline-flex w-full justify-center rounded-md px-4 py-1 text-sm font-medium bg-blue"
          >
            {/* <BsThreeDots /> */}
            Actions
          </Menu.Button>

          <Menu.Items className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray shadow-lg ring-1 ring-secondary-color focus:outline-none">
            <div className="px-1 py-1 space-y-2">
              {items.map((el) => (
                <Menu.Item key={el.label}>
                  {({ active }) => (
                    <button
                      onClick={el?.onClick}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {el.icon}
                      {el.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => deleteHandler()}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-red-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <RiDeleteBin6Line
                      className="mr-2 h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
        key={new Date().getTime()}
      />
    </>
  );
};

export default TaskDialog;
