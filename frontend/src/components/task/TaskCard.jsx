import clsx from "clsx";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdAttachFile, MdKeyboardDoubleArrowUp } from "react-icons/md";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BGS, formatDate } from "../../utils";
import TaskDialog from "./TaskDialog";

const TaskCard = ({ task, onDeleteTask, setData }) => {
  const navigate = useNavigate();
  //   const { user } = useSelector((state) => state.auth);
  const user = { isAdmin: true };
  const [open, setOpen] = useState(false);

  const { priority, title, createdAt, assets, assignedUsers } = task;

  return (
    <>
      <div
        className="w-full h-fit bg-primary-color shadow-xl p-4 rounded-md cursor-pointer"
        onClick={() => navigate(`/app/task/${task._id}`)}
      >
        <div className="w-full flex justify-between">
          <div className="flex flex-1 gap-1 items-center text-sm font-medium">
            <span className="text-lg">
              <MdKeyboardDoubleArrowUp />
            </span>
            <span className="uppercase">{priority} Priority</span>
          </div>

          {user?.isAdmin && (
            <TaskDialog
              task={task}
              onDeleteTask={onDeleteTask}
              setData={setData}
            />
          )}
        </div>

        <>
          <div className="flex items-center gap-2">
            <h4 className="line-clamp-1 text-black">{title}</h4>
          </div>
          <span className="text-sm text-gray-600">
            {formatDate(new Date(createdAt))}
          </span>
        </>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <div className=" lg:tooltip" data-tip="Assets">
                <MdAttachFile />
              </div>
              <span>{assets && assets?.length ? assets.length : 0}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <div className="lg:tooltip" data-tip="Team Member">
                <HiOutlineUserGroup />
              </div>
              <span>{assignedUsers?.length}</span>
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
