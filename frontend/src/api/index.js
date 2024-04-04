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
        setData(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [endPoint]);

  return { data, setData, loading, error };
};

export const useGetSummery = () => useFetch("/tasks/summery"); //get summery of tasks

export const useGetTasks = (page, limit, stage = undefined) => {
  let endPoint = `/tasks?page=${page}&limit=${limit}`;
  if (stage) endPoint += `&stage=${stage}`;
  return useFetch(endPoint); //get all tasks
};

export const useGetTaskDetails = (taskId) =>
  useFetch(`/tasks/details/${taskId}`); //get task details
