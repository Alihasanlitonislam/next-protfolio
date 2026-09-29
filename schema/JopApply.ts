import { INTERVIEW_STATUS, STATUS } from "@/type/shared";
import { z as zod } from "zod";


export type StatusEnum = (typeof STATUS)[keyof typeof STATUS];

export type InterviewStatusEnum =
  (typeof INTERVIEW_STATUS)[keyof typeof INTERVIEW_STATUS];

export const statusEnum = zod.enum(
  Object.values(STATUS) as [StatusEnum, ...StatusEnum[]],
);

export const interviewStatusEnum = zod.enum(
  Object.values(INTERVIEW_STATUS) as [
    InterviewStatusEnum,
    ...InterviewStatusEnum[],
  ],
);

export const JopApplySchema = () =>
  zod.object({
    position: zod.string().trim().min(2, "Job position is required."),
    company_name: zod.string().trim().min(2, "Company name is required."),
    company_link: zod.string().trim().url("Company link must be a valid URL."),
    location: zod.string().trim().min(2, "Location is required."),
    post_source: zod.string().trim().min(2, "Post source is required."),
    source_link: zod.string().trim().url("Source link must be a valid URL."),

    interview_status: interviewStatusEnum.default(INTERVIEW_STATUS.PENDING),

    status: statusEnum.default(STATUS.APPLIED),
  });

export type ApplyJobPayload = zod.infer<ReturnType<typeof JopApplySchema>>;

export const EditApplicationSchema = () =>
  zod.object({
    interview_status: interviewStatusEnum.default(INTERVIEW_STATUS.PENDING),
    status: statusEnum.default(STATUS.APPLIED),
  });

export type EditApplicationType = zod.infer<ReturnType<typeof EditApplicationSchema>>;
