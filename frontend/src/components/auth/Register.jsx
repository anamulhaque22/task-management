import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { errorToaster } from "../../utils/toastMessage";
import InputText from "../Input/InputText";
import Button from "../common/Button";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/auth/register", data);
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        errorToaster(error?.response?.data?.message);
      } else {
        errorToaster(error?.message);
      }
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-2xl  shadow-xl">
        <div className="grid grid-cols-1  bg-base-100 rounded-xl">
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Create Account
            </h2>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="mt-2 flex flex-col gap-6">
                <InputText
                  placeholder="Full Name"
                  type="text"
                  name="name"
                  label="Full Name"
                  customStyle="w-full rounded"
                  register={register("name", {
                    required: "Full Name is required!",
                  })}
                  error={errors.name ? errors.name.message : ""}
                />

                <InputText
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  label="Email"
                  customStyle="w-full rounded"
                  register={register("email", {
                    required: "Email is required!",
                  })}
                  error={errors.email ? errors.email.message : ""}
                />

                <InputText
                  placeholder="Password"
                  type="password"
                  name="password"
                  label="Password"
                  customStyle="w-full rounded"
                  register={register("password", {
                    required: "password is required!",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={errors.password ? errors.password.message : ""}
                />

                <div className=" py-6 sm:flex sm:flex-row-reverse items-center gap-4">
                  <Button
                    label="Submit"
                    type="submit"
                    className="bg-blue px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                  />
                  <p>
                    Already have an account?{" "}
                    <Link to={"/login"} className="underline">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
