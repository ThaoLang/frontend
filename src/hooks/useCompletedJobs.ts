import { useQuery } from "@tanstack/react-query";
import { getCompletedJobs } from "../api/jobApi";

export const useCompletedJobs = () => {
  return useQuery({
    queryKey: ["completedJobs"],
    queryFn: getCompletedJobs,
  });
};
