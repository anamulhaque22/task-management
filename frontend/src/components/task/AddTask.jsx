import { Dialog } from "@headlessui/react";
import { BiImages } from "react-icons/bi";

// import SelectList from "../SelectList";
// import Textbox from "../Textbox";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { errorToaster, successToaster } from "../../utils/toastMessage";
import { default as InputText } from "../Input/InputText";
import SelectBox from "../Input/SelectBox";
import Button from "../common/Button";
import ModalWrapper from "../common/ModalWrapper";
// import UserList from "./UserList";

const LISTS = ["To-Do", "In Progress", "Pending", "Completed", "Canceled"];
const PRIORIRY = ["Low", "Normal", "Medium", "High"];

// const uploadedFileURLs = [];

const AddTask = ({ task, open, setOpen, setData }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [stage, setStage] = useState(task?.stage || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority || PRIORIRY[2]);
  const [assets, setAssets] = useState(null);
  const [uploading, setUploading] = useState(false);

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("dueDate", data.date);
    formData.append("stage", stage);
    formData.append("priority", priority);
    if (assets) formData.append("assets", assets);
    formData.append("createdBy", user?.id);

    try {
      setUploading(true);
      let res;
      if (task) {
        res = await axios.put(`/tasks/${task._id}`, formData);
      } else {
        res = await axios.post("/tasks", formData);
      }

      if (res.status === 201 || res.status === 200) {
        reset();
        setUploading(false);
        setOpen(false);
        setData((prev) => ({ tasks: [...prev.tasks, res.data.task] }));
        successToaster("Task added Successfully");
      }
    } catch (error) {
      console.log(error);
      setUploading(false);
      if (error?.response?.data?.message) {
        errorToaster(error?.response?.data?.message);
      } else {
        errorToaster("Something went wrong");
      }
    }
  };

  // Populate form fields with task data when editing
  useEffect(() => {
    if (task) {
      const initialDate = new Date(task.dueDate);
      const formattedDate = initialDate.toISOString().slice(0, 10);

      setValue("title", task.title);
      setValue("date", formattedDate);
      setStage(task.stage);
      setPriority(task.priority);
    }
  }, [task, setValue]);

  const handleSelect = (e) => {
    setAssets(e.target.files[0]);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {task ? "UPDATE TASK" : "ADD TASK"}
          </Dialog.Title>

          <div className="mt-2 flex flex-col gap-6">
            <InputText
              placeholder="Task Title"
              type="text"
              name="title"
              label="Task Title"
              customStyle="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />
            <div className="flex gap-4">
              <SelectBox
                label="Task Stage"
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <SelectBox
                label="Priority Level"
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />
            </div>
            <div className="flex gap-4">
              <div className="w-full">
                <InputText
                  placeholder="Date"
                  type="date"
                  name="date"
                  label="Task Date"
                  customStyle="w-full rounded"
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>

              <div className="w-full flex items-center justify-center mt-4">
                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                  htmlFor="imgUpload"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="imgUpload"
                    onChange={(e) => handleSelect(e)}
                    accept=".jpg, .png, .jpeg"
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div>
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              {uploading ? (
                <span className="text-sm py-2 text-red-500">
                  Uploading assets
                </span>
              ) : (
                <Button
                  label="Submit"
                  type="submit"
                  className="bg-blue px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                />
              )}

              <Button
                type="button"
                className="bg-blue px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
