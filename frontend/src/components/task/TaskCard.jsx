import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BGS, formatDate } from "../../utils";
import TaskDialog from "./TaskDialog";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  //   const { user } = useSelector((state) => state.auth);
  const user = { isAdmin: true };
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="w-full h-fit bg-primary-color shadow-xl p-4 rounded-md cursor-pointer"
        onClick={() => navigate(`/app/task/1`)}
      >
        <div className="w-full flex justify-between">
          <div className="flex flex-1 gap-1 items-center text-sm font-medium">
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority} Priority</span>
          </div>

          {user?.isAdmin && <TaskDialog task={task} />}
        </div>

        <>
          <div className="flex items-center gap-2">
            <h4 className="line-clamp-1 text-black">{task?.title}</h4>
          </div>
          <span className="text-sm text-gray-600">
            {formatDate(new Date(task?.date))}
          </span>
        </>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
          </div>

          <div className="flex flex-row-reverse">
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                {/* <UserInfo user={m} /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
