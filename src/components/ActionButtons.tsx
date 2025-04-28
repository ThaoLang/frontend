"use client";
import { deleteJob, resumeJob } from "@/api/jobApi";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useState } from "react";

interface ActionButtonsProps {
  jobID: string;
  refetch: () => void;
}

export function ActionButtons(props: ActionButtonsProps) {
  const [loading, setLoading] = useState(false);

  const handleResume = async () => {
    setLoading(true);
    try {
      await resumeJob(props.jobID);
      props.refetch();
      // TODO: refetch table or show notification
    } catch (error) {
      console.error("Error resuming job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteJob(props.jobID);
      props.refetch();
      // TODO: refetch table or show notification
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space size="middle">
      <Button
        type="primary"
        icon={<ReloadOutlined />}
        loading={loading}
        onClick={handleResume}
      ></Button>
      <Button
        type="primary"
        icon={<DeleteOutlined />}
        danger
        loading={loading}
        onClick={handleDelete}
      ></Button>
    </Space>
  );
}
