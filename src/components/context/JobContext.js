import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import axios from "axios";

const JobContext = createContext();

//  Backend base URL (MATCHES server.js)
const API_BASE_URL = "https://innometrics-champions.onrender.com/api/job";

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRecent, setIsLoadingRecent] = useState(false);
  const [error, setError] = useState(null);
  const [recentJobsError, setRecentJobsError] = useState(null);

  //  Prevent double API calls in React 18 StrictMode
  const hasFetchedRef = useRef(false);

  /* ===============================
     FETCH ALL JOBS
  =============================== */
  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await axios.get(`${API_BASE_URL}/all-jobs`);

      if (res.data?.success) {
        // ARRAY-SAFE (object or array both handled)
        const jobsData = Array.isArray(res.data.data)
          ? res.data.data
          : res.data.data
          ? [res.data.data]
          : [];

        setJobs(jobsData);
      } else {
        setJobs([]);
        setError("Failed to fetch jobs");
      }
    } catch (err) {
      console.error(" fetchJobs error:", err);
      setJobs([]);
      setError("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* ===============================
     FETCH RECENT JOBS
  =============================== */
  const fetchRecentJobs = useCallback(async () => {
    try {
      setIsLoadingRecent(true);
      setRecentJobsError(null);

      const res = await axios.get(`${API_BASE_URL}/recent-jobs`);

      if (res.data?.success) {
        const recentData = Array.isArray(res.data.data)
          ? res.data.data
          : res.data.data
          ? [res.data.data]
          : [];

        setRecentJobs(recentData);
      } else {
        setRecentJobs([]);
        setRecentJobsError("Failed to fetch recent jobs");
      }
    } catch (err) {
      console.error(" fetchRecentJobs error:", err);
      setRecentJobs([]);
      setRecentJobsError("Failed to load recent jobs");
    } finally {
      setIsLoadingRecent(false);
    }
  }, []);

  /* ===============================
     ADD JOB
  =============================== */
  const addJob = async (jobData) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await axios.post(
        `${API_BASE_URL}/create-job`,
        jobData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.success) {
        await fetchJobs();
        await fetchRecentJobs();
        return res.data.data;
      } else {
        throw new Error("Failed to create job");
      }
    } catch (err) {
      console.error(" addJob error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /* ===============================
     UPDATE JOB
  =============================== */
  const updateJob = async (job) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await axios.put(
        `${API_BASE_URL}/update-job/${job._id}`,
        job,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.success) {
        await fetchJobs();
        await fetchRecentJobs();
        return res.data.data;
      } else {
        throw new Error("Failed to update job");
      }
    } catch (err) {
      console.error(" updateJob error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /* ===============================
     DELETE JOB
  =============================== */
  const deleteJob = async (id) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await axios.delete(
        `${API_BASE_URL}/delete-job/${id}`
      );

      if (res.data?.success) {
        await fetchJobs();
        await fetchRecentJobs();
      } else {
        throw new Error("Failed to delete job");
      }
    } catch (err) {
      console.error(" deleteJob error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /* ===============================
     INITIAL LOAD (STRICTMODE SAFE)
  =============================== */
  useEffect(() => {
    if (hasFetchedRef.current) return;

    hasFetchedRef.current = true;
    fetchJobs();
    fetchRecentJobs();
  }, [fetchJobs, fetchRecentJobs]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        recentJobs,
        isLoading,
        isLoadingRecent,
        error,
        recentJobsError,
        addJob,
        updateJob,
        deleteJob,
        refreshJobs: fetchJobs,
        refreshRecentJobs: fetchRecentJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

/* ===============================
   CUSTOM HOOK
=============================== */
export const useJobContext = () => useContext(JobContext);
