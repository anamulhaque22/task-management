import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { errorToast, isEmpty, successToast } from "../../utils/formValidation";
import TitleCard from "../Cards/TitleCard";
import InputFile from "../Input/InputFile";
import InputText from "../Input/InputText";

function UpdateTeacher({ teacher }) {
  const {
    _id,
    name,
    email,
    phoneNo,
    joiningDate,
    designation,
    qualification,
    experience,
    internship,
    speech,
    MPOIndexNo,
    fatherName,
    motherName,
    nationalIDNo,
  } = teacher;
  const INITIAL_TEACHER_ORGA_OBJ = {
    name,
    email,
    phoneNo,
    MPOIndexNo,
    joiningDate: moment(joiningDate).format("YYYY-MM-DD"),
    fatherName,
    motherName,
    nationalIDNo,
    qualification,
    experience,
    internship,
    file: null,
    designation,
    speech,
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teacherObj, setTeacherObj] = useState(INITIAL_TEACHER_ORGA_OBJ);
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");
    function updateData(data) {
      setLoading(true);
      axios
        .post(`update/teacher/${_id}`, data)
        .then((res) => {
          if (res.status === 201) {
            successToast("Teacher Updated Successfully!");
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
    if (
      isEmpty(teacherObj.name) ||
      isEmpty(teacherObj.email) ||
      isEmpty(teacherObj.phoneNo) ||
      isEmpty(teacherObj.designation) ||
      isEmpty(teacherObj.qualification) ||
      isEmpty(teacherObj.experience) ||
      isEmpty(teacherObj.internship) ||
      isEmpty(teacherObj.speech) ||
      isEmpty(teacherObj.MPOIndexNo) ||
      isEmpty(teacherObj.fatherName) ||
      isEmpty(teacherObj.motherName) ||
      isEmpty(teacherObj.nationalIDNo) ||
      isEmpty(teacherObj.joiningDate)
    )
      return errorToast("All fields are required! (use any value)");
    else {
      if (teacherObj.file === null) {
        const { file, ...rest } = teacherObj;
        updateData(rest);
      } else {
        console.log(teacherObj);
        const formData = new FormData();
        for (const key in teacherObj) {
          formData.append(key, teacherObj[key]);
        }
        updateData(formData);
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setTeacherObj({ ...teacherObj, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Update Teacher" topMargin="mt-2">
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
              labelTitle="Update Profile Picture (If needed!)"
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
              Update Teacher
            </button>
          </div>
        </form>
      </TitleCard>
    </> // end of return
  );
}

export default UpdateTeacher;
