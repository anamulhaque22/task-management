import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { tasks } from "../../assets/data";
import { getInitials } from "../../utils";
import InputText from "../Input/InputText";
import Button from "../common/Button";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

// const TABS = [
//   { title: "Task Detail", icon: <FaTasks /> },
//   { title: "Activities/Timeline", icon: <RxActivityLog /> },
// ];

const act_types = ["To Do", "Completed", "In Progress"];

const TaskDetails = () => {
  //   const { id } = useParams();
  const [selected, setSelected] = useState(act_types[0]);
  const task = tasks[3];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleUpdateStage = (item) => {
    setSelected(item);
  };

  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden bg-primary-color shadow-md p-8 rounded-md">
      <h1 className="text-2xl text-gray-600 font-bold">{task?.title}</h1>
      <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white overflow-y-auto mt-5">
        {/* LEFT */}
        <div className="w-full md:w-1/2 space-y-8">
          <div>
            <div className="flex items-center gap-5 mb-3">
              <div className="flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full bg-blue">
                <span className="text-lg">{ICONS[task?.priority]}</span>
                <span className="uppercase">{task?.priority} Priority</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" />
                <span className="text-black uppercase">
                  Stage: {task?.stage}
                </span>
              </div>
            </div>

            <p className="text-gray-500">
              Created At: {new Date(task?.date).toDateString()}
            </p>
          </div>

          <p className="text-lg font-semibold">ASSETS</p>

          <div className="w-full grid grid-cols-2 gap-4">
            {task?.assets?.map((el, index) => (
              <img
                key={index}
                src={el}
                alt={task?.title}
                className="w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
              />
            ))}
          </div>

          <div className="space-y-4 py-6">
            <p className="text-gray-600 font-semibold test-sm">TASK TEAM</p>
            <div className="space-y-3">
              {task?.team?.map((m, index) => (
                <div
                  key={index}
                  className="flex gap-4 py-2 items-center border-t"
                >
                  <div
                    className={
                      "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue"
                    }
                  >
                    <span className="text-center">{getInitials(m?.name)}</span>
                  </div>

                  <div>
                    <p className="text-lg font-semibold">{m?.name}</p>
                    <span className="text-gray-500">{m?.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/2 space-y-8">
          <div>
            <h4 className="text-gray-600 font-semibold text-lg mb-5">
              Update Stage
            </h4>
            <div className="w-full flex flex-wrap gap-5">
              {act_types.map((item) => (
                <div key={item} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selected === item ? true : false}
                    onChange={() => handleUpdateStage(item)}
                  />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-gray-600 font-semibold text-lg mb-5">
              Add Team Member
            </h4>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="mt-2 flex flex-col gap-6">
                <InputText
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  label="Enter Email Address"
                  customStyle="w-full rounded"
                  register={register("email", {
                    required: "Email is required",
                  })}
                  error={errors.email ? errors.email.message : ""}
                />

                <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
                  <Button
                    label="Submit"
                    type="submit"
                    className="bg-blue px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
