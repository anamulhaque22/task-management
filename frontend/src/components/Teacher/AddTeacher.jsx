import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../../components/Input/InputText";
import axios from "../../utils/axios";
import {
  errorToast,
  isEmpty,
  isValidDate,
  isValidEmail,
  isValidPhone,
  successToast,
} from "../../utils/formValidation";
import TitleCard from "../Cards/TitleCard";
import InputFile from "../Input/InputFile";

function AddTeacher() {
  const INITIAL_TEACHER_ORGA_OBJ = {
    name: "",
    email: "",
    phoneNo: "",
    MPOIndexNo: "",
    joiningDate: "",
    fatherName: "",
    motherName: "",
    nationalIDNo: "",
    qualification: "",
    experience: "",
    internship: "",
    file: null,
    designation: "",
    speech: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teacherObj, setTeacherObj] = useState(INITIAL_TEACHER_ORGA_OBJ);
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (isEmpty(teacherObj.name))
      return errorToast("Name is required! (use any value)");
    if (!isValidEmail(teacherObj.email))
      return errorToast("Email is required! (use valid email)");

    if (!isValidPhone(teacherObj.phoneNo))
      return errorToast("Phone Number is required! (use valid phone number)");
    if (isEmpty(teacherObj.MPOIndexNo))
      return errorToast("MPOIndexNo is required! (use any value)");
    if (!isValidDate(teacherObj.joiningDate))
      return errorToast("Valid Joining Date is required!");
    if (isEmpty(teacherObj.fatherName))
      return errorToast("Father's Name is required! (use any value)");
    if (isEmpty(teacherObj.motherName))
      return errorToast("Mother's Name is required! (use any value)");
    if (isEmpty(teacherObj.nationalIDNo))
      return errorToast("National ID No is required! (use any value)");
    if (isEmpty(teacherObj.qualification))
      return errorToast("Qualification is required! (use any value)");
    if (isEmpty(teacherObj.experience))
      return errorToast("Experience is required! (use any value)");
    if (isEmpty(teacherObj.internship))
      return errorToast("Internship is required! (use any value)");
    if (isEmpty(teacherObj.designation))
      return errorToast("Designation is required! (use any value)");
    if (teacherObj.file === null) return errorToast("Photo is required!");
    if (isEmpty(teacherObj.speech))
      return errorToast("Speech is required! (use any value)");
    else {
      setLoading(true);
      const formData = new FormData();
      for (const key in teacherObj) {
        formData.append(key, teacherObj[key]);
      }
      axios
        .post("create/teacher", formData)
        .then((res) => {
          if (res.status === 201) {
            successToast("Teacher Added Successfully!");
            navigate("/app/teacher-list");
          } else {
            errorToast("Something went wrong! Try Again.");
          }
        })
        .catch((err) => {
          console.log(err);
          errorToast("Something went wrong! Try Again.");
        });
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setTeacherObj({ ...teacherObj, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Add Teacher" topMargin="mt-2">
        <form onSubmit={(e) => submitForm(e)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              labelTitle="Name"
              defaultValue={teacherObj.name}
              updateType="name"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Email"
              defaultValue={teacherObj.email}
              updateType="email"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Phone"
              defaultValue={teacherObj.phoneNo}
              updateType="phoneNo"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="MPOIndexNo"
              defaultValue={teacherObj.MPOIndexNo}
              updateType="MPOIndexNo"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Joining Date"
              defaultValue={teacherObj.joiningDate}
              updateType="joiningDate"
              placeholder="YYYY-MM-DD"
              type="date"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Father's Name"
              defaultValue={teacherObj.fatherName}
              updateType="fatherName"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Mother's Name"
              defaultValue={teacherObj.motherName}
              updateType="motherName"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="National ID No"
              defaultValue={teacherObj.nationalIDNo}
              updateType="nationalIDNo"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Qualification"
              defaultValue={teacherObj.qualification}
              updateType="qualification"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Experience"
              defaultValue={teacherObj.experience}
              updateType="experience"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Internship"
              defaultValue={teacherObj.internship}
              updateType="internship"
              updateFormValue={updateFormValue}
            />

            <InputFile
              labelTitle="Profile Picture"
              updateFormValue={updateFormValue}
              defaultValue={teacherObj.file}
              updateType="file"
            />
            <InputText
              labelTitle="Designation"
              defaultValue={teacherObj.designation}
              updateType="designation"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Speech"
              defaultValue={teacherObj.speech}
              updateType="speech"
              updateFormValue={updateFormValue}
            />
          </div>

          <div className="mt-16">
            <button type="submit" className="btn btn-primary float-right">
              Add Attendee
            </button>
          </div>
        </form>
      </TitleCard>
    </> // end of return
  );
}

export default AddTeacher;
