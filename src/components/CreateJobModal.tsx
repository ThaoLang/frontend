"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Button, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { createJob } from "../api/jobApi";

interface CreateJobModalType {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

export default function CreateJobModal(props: CreateJobModalType) {
  const [learningRate, setLearningRate] = useState<number | null>(null);
  const [epoch, setEpoch] = useState<number | null>(null);
  const [batch, setBatch] = useState<number | null>(null);
  const [errors, setErrors] = useState({
    learningRate: false,
    epoch: false,
    batch: false,
    duplicate: false,
  });
  const queryClient = useQueryClient();

  const handleCreate = async () => {
    const newErrors = {
      learningRate: learningRate === null,
      epoch: epoch === null,
      batch: batch === null,
      duplicate: false,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (!hasError) {
      try {
        const response = await createJob({
          learningRate: learningRate!,
          epoch: epoch!,
          batchSize: batch!,
        });
        queryClient.refetchQueries({ queryKey: ["jobSummary"] });
        setTimeout(() => {
          queryClient.refetchQueries({ queryKey: ["runningJobs"] });
        }, 1000);

        if (response.error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            duplicate: true,
          }));
        } else {
          props.onClose(false);
        }
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          duplicate: true,
        }));
      }
    }
  };

  useEffect(() => {
    if (props.isOpen) {
      setLearningRate(null);
      setBatch(null);
      setEpoch(null);
      setErrors({
        learningRate: false,
        epoch: false,
        batch: false,
        duplicate: false,
      });
    }
  }, [props.isOpen]);

  return (
    <Modal
      width="fit-content"
      open={props.isOpen}
      footer={null}
      closable={false}
      onCancel={() => props.onClose(false)}
      centered
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Create new experiment</h2>
        <button
          onClick={() => props.onClose(false)}
          className="text-gray-500 hover:text-black"
        >
          <IoMdClose size={20} />
        </button>
      </div>

      <div className="space-y-2 w-72">
        <div className="space-y-1">
          <label className="font-medium">Learning Rate</label>
          <InputNumber
            min={0}
            step={0.001}
            value={learningRate ?? undefined}
            onChange={(value) => setLearningRate(value)}
            style={{ width: "100%" }}
            placeholder="e.g. 0.001"
          />

          {errors.learningRate && (
            <div className="text-red-500 text-sm">
              Learning rate is required.
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="font-medium">Epoch</label>
          <InputNumber
            min={1}
            value={epoch ?? undefined}
            onChange={(value) => setEpoch(value)}
            placeholder="e.g. 10"
            style={{ width: "100%" }}
          />
          {errors.epoch && (
            <div className="text-red-500 text-sm">Epoch is required.</div>
          )}
        </div>

        <div className="space-y-1">
          <label className="font-medium">Batch</label>
          <InputNumber
            min={1}
            value={batch ?? undefined}
            onChange={(value) => setBatch(value)}
            placeholder="e.g. 10"
            style={{ width: "100%" }}
          />
          {errors.batch && (
            <div className="text-red-500 text-sm">Batch is required.</div>
          )}
        </div>

        {errors.duplicate && (
          <div className="text-red-500 text-sm mt-2">
            This hyperparameters already exist!
          </div>
        )}

        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={() => props.onClose(false)} type="text">
            Cancel
          </Button>
          <Button onClick={handleCreate} type="primary">
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
}
