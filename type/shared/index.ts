const COLOR = {
  gray: "border-gray-500/30 bg-gray-500/10 text-gray-300",
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  red: "border-red-500/30 bg-red-500/10 text-red-300",
  yellow: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
  indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
  green: "border-green-500/30 bg-green-500/10 text-green-300",
};

export const StatusColor = {
  Pending: COLOR.gray,
  Scheduled: COLOR.blue,
  Cancelled: COLOR.red,
  Rejected: COLOR.red,
  Applied: COLOR.blue,
  "Interview Scheduled": COLOR.yellow,
  "Offer Received": COLOR.indigo,
  Hired: COLOR.green,
  Unapplied: COLOR.yellow
} as const;


export const STATUS = {
  APPLIED: "Applied",
  UNAPPLIED: "Unapplied",
  REJECTED: "Rejected",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  OFFER_RECEIVED: "Offer Received",
  HIRED: "Hired",
} as const;

export const INTERVIEW_STATUS = {
  PENDING: "Pending",
  SCHEDULED: "Scheduled",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
} as const;

export const statusOptions = Object.values(STATUS);
export const interviewStatusOptions = Object.values(INTERVIEW_STATUS);