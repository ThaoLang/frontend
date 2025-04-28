// hooks/useRunningJobs.ts
import { useQuery } from "@tanstack/react-query";
import { getRunningJobs } from "../api/jobApi";

export const useRunningJobs = () => {
  return useQuery({
    queryKey: ["runningJobs"],
    queryFn: getRunningJobs,
    refetchInterval: 5000,
  });
};
