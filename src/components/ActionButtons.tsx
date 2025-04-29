"use client";
import { deleteJob, resumeJob } from "@/api/jobApi";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Space, message } from "antd";
import { useState } from "react";

interface ActionButtonsProps {
  jobID: string;
}

export function ActionButtons(props: ActionButtonsProps) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleResume = async () => {
    setLoading(true);
    try {
      await resumeJob(props.jobID);
      queryClient.refetchQueries({ queryKey: ["completedJobs"] });
      queryClient.refetchQueries({ queryKey: ["jobSummary"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["runningJobs"] });
      }, 1000);

      message.success("Job resumed successfully!");
    } catch (error) {
      message.error("Failed to resume job");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Confirm Popup",
      content: "Are you sure to delete this job?",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: async () => {
        setLoading(true);
        try {
          await deleteJob(props.jobID);
          queryClient.refetchQueries({ queryKey: ["completedJobs"] });
          queryClient.refetchQueries({ queryKey: ["jobSummary"] });

          message.success("Job deleted successfully!");
        } catch (error) {
          message.error("Failed to delete job");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Space size="middle">
      <Button
        type="primary"
        icon={<ReloadOutlined />}
        loading={loading}
        onClick={handleResume}
      />
      <Button
        type="primary"
        icon={<DeleteOutlined />}
        danger
        loading={loading}
        onClick={handleDelete}
      />
    </Space>
  );
}
