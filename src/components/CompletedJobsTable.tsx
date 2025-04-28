"use client";
import { CompletedJobType } from "@/types/job";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { ActionButtons } from "./ActionButtons";

interface CompletedJobsTableProps {
  data: CompletedJobType[];
  refetch: () => void;
}

export default function CompletedJobsTable(props: CompletedJobsTableProps) {
  const columns: ColumnsType<CompletedJobType> = [
    {
      title: "No.",
      dataIndex: "key",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "SUCCEEDED", value: "SUCCEEDED" },
        { text: "FAILED", value: "FAILED" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === "SUCCEEDED" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Job ID",
      dataIndex: "jobID",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div className="flex p-2 ">
          <Input
            placeholder="Search Job ID"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys([e.target.value])}
            onPressEnter={() => confirm()}
          />
          <Button
            className="ml-2"
            shape="circle"
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          ></Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.jobID.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: "Hyperparameters",
      key: "hyperparams",
      render: (_, record) => (
        <div>
          lr={record.lr}, epoch={record.epoch}, batch={record.batch}
        </div>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        const values = (selectedKeys[0] as any) || {};
        return (
          <div className=" p-3 w-56 h-56 space-y-2">
            <Typography.Text className="text-xs text-gray-500">
              Learning Rate
            </Typography.Text>
            <Input
              placeholder="e.g. 0.1"
              value={values.lr || ""}
              onChange={(e) =>
                setSelectedKeys([{ ...values, lr: e.target.value }])
              }
            />
            <Typography.Text className="text-xs text-gray-500 mt-4">
              Epoch
            </Typography.Text>
            <Input
              placeholder="e.g. 10"
              value={values.epoch || ""}
              onChange={(e) =>
                setSelectedKeys([{ ...values, epoch: e.target.value }])
              }
            />
            <Typography.Text className="text-xs text-gray-500 mt-4">
              Batch Size
            </Typography.Text>
            <Input
              placeholder="e.g. 10"
              value={values.batch || ""}
              onChange={(e) =>
                setSelectedKeys([{ ...values, batch: e.target.value }])
              }
            />
            <div className="flex flex-row-reverse">
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={() => confirm()}
                className="flex items-center mt-2 "
              >
                Search
              </Button>
            </div>
          </div>
        );
      },
      onFilter: (value, record) => {
        const { lr = "", epoch = "", batch = "" } = value as any;
        const matchLR = lr ? `${record.lr}`.includes(lr) : true;
        const matchEpoch = epoch ? `${record.epoch}`.includes(epoch) : true;
        const matchBatch = batch ? `${record.batch}`.includes(batch) : true;
        return matchLR && matchEpoch && matchBatch;
      },
    },

    {
      title: "Start At",
      dataIndex: "startAt",
      key: "startAt",
      sorter: (a, b) =>
        new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleString(); // Formats it to the local date and time
      },
    },
    {
      title: "Duration (s)",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "Final Accuracy (%)",
      dataIndex: "finalAccuracy",
      key: "accuracy",
      sorter: (a, b) => a.finalAccuracy - b.finalAccuracy,
    },
    {
      title: "Final Loss",
      dataIndex: "finalLoss",
      key: "loss",
      sorter: (a, b) => a.finalLoss - b.finalLoss,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <ActionButtons jobID={record.jobID} refetch={props.refetch} />
      ),
    },
  ];

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={props.data}
        bordered
        pagination={{ pageSize: 5 }}
        className="[&_.ant-table-thead>tr>th]:bg-gray-100"
      />
    </div>
  );
}
