const jobs = {};

const createJob = (jobId, total) => {
  jobs[jobId] = {
    total,
    processed: 0,
    failed: 0,
    status: "processing",
  };
};

const updateJob = (jobId, success = true) => {
  if (!jobs[jobId]) return;

  jobs[jobId].processed += 1;
  if (!success) jobs[jobId].failed += 1;

  if (jobs[jobId].processed === jobs[jobId].total) {
    jobs[jobId].status = "completed";
  }
};

const getJob = (jobId) => jobs[jobId];

module.exports = { createJob, updateJob, getJob };
