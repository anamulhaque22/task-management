
import { useEffect, useState } from "react";
import axios from "../utils/axios";


const useFetch = (endPoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(endPoint);
        setData(data["data"]);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [endPoint]);

  return { data, setData, loading, error };
};

// REST api call

// GET Requests...

export const useGetTeachar = () => useFetch("get/teacher"); //get teacher list
export const useGetTeacherById = (id) => useFetch(`get/teacher/${id}`); //get teacher by id

export const useGetStaff = () => useFetch("get/stuff"); //get staff list
export const useGetStaffById = (id) => useFetch(`get/stuff/${id}`); //get staff by id

export const useGetGovBody = () => useFetch("get/gov"); //get gov body list
export const useGetGovBodyById = (id) => useFetch(`get/gov/${id}`); //get gov body by id

export const useGetAtAGlance = () => useFetch(`get/aboutUs`); //get at a glance info

export const useGetCategory = () => useFetch(`get/category`); //get category list







export const useGetNotice = (page, limit) => useFetch(`get/all/category/file/Notice/${page}/${limit}`); //get notice list
export const useGetNoticeById = (id) => useFetch(`get/file/${id}`); //get notice by id

export const useGetSchool = () => useFetch("get/school"); //get school info

export const useGetRulesRegulationPDF = () =>
  useFetch("get/all/category/file/Rules & Regulations"); //get school info
export const useGetAcademicCalander = () =>
  useFetch("get/all/category/file/Academic Calender"); //get school info
export const useGetRoutine = () => useFetch("get/all/category/file/Routine"); //get school info
export const useGetUniform = () => useFetch("get/all/category/file/Uniform"); //get school info

export const useGetClassWiseStudentsNum = () => useFetch("get/class/students"); //get class wise students number

export const useGetInternalResult = () =>
  useFetch("get/all/category/file/Internal Result"); //get internal result
export const useGetBoardResult = () =>
  useFetch("get/all/category/file/Board Result"); //get board result

export const useGetGallery = (c) => useFetch(`get/all/category/file/${c}`); //get gallery
export const useGetContact = () => useFetch(`get/contact/`); //get contact info


// POST Requests...

// PATCH Requests...

// DELETE Request..
