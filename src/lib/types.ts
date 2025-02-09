type Job = {
  subject: string;
  from: string;
  keyEntities: {
    [key: string]: string;
  };
  userId: string;
  timestamp: string;
  emailId: string;
  s3Path: string;
};

type JobDataResponse = {
  emails: Job[];
  todaysEmailCount: number;
};

export type { Job, JobDataResponse };
