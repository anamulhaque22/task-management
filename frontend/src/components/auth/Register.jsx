import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import InputText from "../Input/InputText";
import Button from "../common/Button";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-2xl  shadow-xl">
        <div className="grid grid-cols-1  bg-base-100 rounded-xl">
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="mt-2 flex flex-col gap-6">
                <InputText
                  placeholder="Full Name"
                  type="text"
                  name="fullName"
                  label="Full Name"
                  customStyle="w-full rounded"
                  register={register("fullName", {
                    required: "Full Name is required!",
                  })}
                  error={errors.fullName ? errors.fullName.message : ""}
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
