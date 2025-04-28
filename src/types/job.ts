export type RunningJobType = {
  jobId: string;
  currentEpoch: string;
  currentAccuracy: number;
  currentLoss: number;
  learningRate: number;
  progress: number;
};

export type CompletedJobType = {
  key: string; // unique identifier, thường là index hoặc jobID
  status: "SUCCEEDED" | "FAILED"; // trạng thái
  jobID: string; // mã job
  lr: number; // learning rate
  epoch: number; // số epoch
  batch: number; // batch size
  startAt: string; // thời gian bắt đầu, dạng ISO string hoặc format như "2025-04-24 14:00"
  duration: number; // thời gian chạy tính bằng giây
  finalAccuracy: number; // độ chính xác cuối
  finalLoss: number; // độ mất mát cuối
};
