export type RunningJobType = {
  jobId: string;
  currentEpoch: string;
  currentAccuracy: number;
  currentLoss: number;
  learningRate: number;
  progress: number;
};

export type CompletedJobType = {
  key: string;
  status: "SUCCEEDED" | "FAILED";
  jobID: string;
  lr: number;
  epoch: number;
  batch: number;
  startAt: string;
  duration: number;
  finalAccuracy: number;
  finalLoss: number;
};
