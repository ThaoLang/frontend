"use client";
import CompletedJobsTable from "@/components/CompletedJobsTable";
import CreateJobModal from "@/components/CreateJobModal";
import RunningJobCard from "@/components/RunningJobCard";
import { useCompletedJobs } from "@/hooks/useCompletedJobs";
import { useJobSummary } from "@/hooks/useJobSummary";
import { useRunningJobs } from "@/hooks/useRunningJobs";
import { RunningJobType } from "@/types/job";
import "@ant-design/v5-patch-for-react-19";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowRepeat } from "react-icons/bs";
import { GoInbox } from "react-icons/go";
import { MdDone, MdEmojiEvents, MdError } from "react-icons/md";
export default function Home() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { data: summary } = useJobSummary();
  const { data: completedJobs = [] } = useCompletedJobs();
  const { data: runningJobs = [], refetch: refetchRunningJobs } =
    useRunningJobs();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!runningJobs) return;

    let prevCount = runningJobs.length;

    const interval = setInterval(async () => {
      const { data } = await refetchRunningJobs();

      if (!data) return;
      const currentCount = data.length;

      if (currentCount < prevCount) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["completedJobs"] }),
          queryClient.invalidateQueries({ queryKey: ["jobSummary"] }),
        ]);
      }

      if (currentCount === 0) {
        clearInterval(interval);
      }

      prevCount = currentCount;
    }, 3000);

    return () => clearInterval(interval);
  }, [runningJobs, refetchRunningJobs, queryClient]);

  return (
    <div className="m-4 flex flex-col h-screen">
      <div className="grid grid-cols-4 gap-10 text-white my-4 ">
        <div className="flex items-center  bg-cyan-400 rounded-md shadow-xl">
          <div className="bg-cyan-500 px-4 py-6 rounded-md">
            <BsArrowRepeat size={30} />
          </div>
          <div className="pl-2 font-semibold">
            <div className="text-lg">Running</div>
            <div>{summary?.runningCount ?? 0}</div>
          </div>
        </div>
        <div className="flex items-center  bg-lime-500 rounded-md shadow-xl">
          <div className="bg-lime-600 px-4 py-6 rounded-md">
            <MdDone size={30} />
          </div>
          <div className="pl-2 font-semibold">
            <div className="text-lg">Succeeded</div>
            <div>{summary?.successCount ?? 0}</div>
          </div>
        </div>
        <div className="flex items-center  bg-red-500 rounded-md shadow-xl">
          <div className="bg-red-600 px-4 py-6 rounded-md">
            <MdError size={30} />
          </div>
          <div className="pl-2 font-semibold">
            <div className="text-lg">Failed</div>
            <div>{summary?.failedCount ?? 0}</div>
          </div>
        </div>
        <div className="flex items-center  bg-yellow-400 rounded-md shadow-xl">
          <div className="bg-yellow-500 px-4 py-6 rounded-md">
            <MdEmojiEvents size={30} />
          </div>
          <div className="pl-2 font-semibold">
            <div className="text-lg">Best Accuracy</div>
            <div>{summary?.bestAccuracy ?? 0}%</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse ">
        <Button
          onClick={() => setOpenCreateModal(true)}
          type="primary"
          className="bg-sky-500 rounded-lg py-2"
          icon={<AiOutlinePlus />}
        >
          Create Experiment
        </Button>
        <CreateJobModal isOpen={openCreateModal} onClose={setOpenCreateModal} />
      </div>
      <div className="flex flex-1 gap-4 my-10 overflow-hidden ">
        <div className=" flex flex-col w-4/5 space-y-2">
          <div className="text-2xl font-semibold text-center uppercase">
            Completed Jobs
          </div>
          <div className="flex-1 overflow-y-auto  rounded-xl bg-white pb-20 ">
            <CompletedJobsTable data={completedJobs} />
          </div>
        </div>
        <div className="w-1/5 flex flex-col space-y-2">
          <div className="text-2xl font-semibold text-center uppercase ">
            Running Jobs
          </div>
          <div className="flex-1 overflow-y-auto  rounded-xl bg-white pb-20 p-2">
            {runningJobs.length > 0 ? (
              <div className="space-y-10">
                {runningJobs.map((job: RunningJobType) => (
                  <div className="mb-4" key={job.jobId}>
                    <RunningJobCard runningJob={job} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-6 text-sm">
                <GoInbox size={40} className="mb-2" />
                No data
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
