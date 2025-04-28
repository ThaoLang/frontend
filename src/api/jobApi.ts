import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createJob = async (jobConfig: {
  learningRate: number;
  epoch: number;
  batchSize: number;
}) => {
  const response = await axios.post(`${API_URL}/jobs`, jobConfig);
  return response.data;
};

export const getRunningJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs/running`);
  return response.data;
};

export const getCompletedJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs/completed`);
  return response.data;
};

export const resumeJob = async (id: string) => {
  const response = await axios.post(`${API_URL}/jobs/${id}/resume`);
  return response.data;
};

export const deleteJob = async (id: string) => {
  const response = await axios.delete(`${API_URL}/jobs/${id}`);
  return response.data;
};

export const getJobSummary = async () => {
  const response = await axios.get(`${API_URL}/jobs/summary`);
  return response.data;
};
