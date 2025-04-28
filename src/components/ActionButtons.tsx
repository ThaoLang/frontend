"use client";
import { deleteJob, resumeJob } from "@/api/jobApi";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Modal, Space, message } from "antd";
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
          props.refetch();
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
