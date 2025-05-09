import { useQuery } from "@tanstack/react-query";
import { getJobSummary } from "../api/jobApi";

export const useJobSummary = () => {
  return useQuery({
    queryKey: ["jobSummary"],
    queryFn: getJobSummary,
  });
};
