import { RunningJobType } from "@/types/job";
import { Card, Progress } from "antd";
import { FaChartLine } from "react-icons/fa";
import { MdTrendingDown } from "react-icons/md";

interface RunningJobCardProps {
  runningJob: RunningJobType;
}

export default function RunningJobCard(props: RunningJobCardProps) {
  return (
    <Card
      title={`Job ID: ${props.runningJob.jobId}`}
      className="shadow-md border-solid border-gray-300"
      styles={{
        body: {
          paddingTop: 0, // hoặc 4, tuỳ bạn
          paddingBottom: 12,
          paddingLeft: 16,
          paddingRight: 16,
        },
      }}
    >
      <Progress
        percent={props.runningJob.progress}
        strokeColor="#1677ff"
        showInfo
        size="small"
        className="mb-4"
      />

      {/* Epoch + LR */}
      <div className="flex justify-between text-sm -600 mb-2">
        <div className="flex space-x-1">
          <span className="font-medium">Epoch:</span>
          <span className="text-blue-500">{props.runningJob.currentEpoch}</span>
        </div>
        <div className="flex space-x-1">
          <span className="font-medium">LR:</span>
          <span className="text-blue-500">{props.runningJob.learningRate}</span>
        </div>
      </div>

      {/* Accuracy + Loss */}
      <div className="flex justify-between mt-2 text-sm">
        <div className="flex items-center space-x-2">
          <FaChartLine color="green" size={16} />
          <span className="font-medium">Accuracy:</span>
          <span className="text-green-600 font-semibold">
            {props.runningJob.currentAccuracy}%
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <MdTrendingDown color="red" size={16} />
          <span className="font-medium">Loss:</span>
          <span className="text-orange-600 font-semibold">
            {props.runningJob.currentLoss.toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
}
