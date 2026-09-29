"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { useErrors } from "@/hooks/useErrors";
import {
  EditApplicationSchema,
  EditApplicationType,
} from "@/schema/JopApply";
import { JobApplication } from "@/types/job-application";
import SelectDropdown from "../share/SelectDropdown";
import { INTERVIEW_STATUS, interviewStatusOptions, STATUS, statusOptions } from "@/type/shared";

interface EditApplicationProps {
  application: JobApplication | null;
  setApplication: (application: JobApplication | null) => void;
  fetchApplications: (fetching: boolean) => void;
}

const modalVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.24, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.98,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

export default function EditApplication({
  application,
  setApplication,
  fetchApplications,
}: EditApplicationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    "interview_status" | "status" | null
  >(null);
  const [formValues, setFormValues] = useState<EditApplicationType>({
    interview_status: INTERVIEW_STATUS.PENDING,
    status: STATUS.APPLIED,
  });
  const errors = useErrors();

  useEffect(() => {
    document.body.style.overflow = application ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [application]);

  useEffect(() => {
    if (!application) return;

    setFormValues({
      interview_status:
        application.interview_status as EditApplicationType["interview_status"],
      status: application.status as EditApplicationType["status"],
    });
    errors.reset();
    setActiveDropdown(null);
  }, [application]);

  function handleClose() {
    errors.reset();
    setActiveDropdown(null);
    setApplication(null);
  }

  function handleOptionSelect(
    field: keyof EditApplicationType,
    value: EditApplicationType[keyof EditApplicationType],
  ) {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    errors.clear(field);
    setActiveDropdown(null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!application?.id) return;

    const validation = EditApplicationSchema().safeParse(formValues);

    if (!validation.success) {
      errors.record(validation.error.issues);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`/api/apply-job?id=${application.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });
      const result = await response.json();

      if (!response.ok) {
        const fieldErrors = result.errors
          ? Object.values(result.errors).flat().join(" ")
          : "";

        throw new Error(
          fieldErrors || result.message || "Failed to update application.",
        );
      }

      toast.success(result.message);
      fetchApplications(false);
      handleClose();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update application.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center px-4 py-8">
      <motion.button
        key="edit-overlay"
        aria-label="Close modal backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={handleClose}
      />

      <motion.div
        key="edit-modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-label="Edit application status"
        className="relative w-full max-w-xl overflow-visible rounded-[28px] border border-(--border-secondary) bg-(--bg-secondary) shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
      >
        <div className="absolute inset-x-0 top-0 h-36 bg-linear-to-r from-(--bg-tertiary)/20 via-transparent to-(--bg-tertiary)/10 blur-3xl" />

        <div className="relative border-b border-(--border-secondary) px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-(--border-primary) bg-(--bg-tertiary)/10 px-4 py-1 text-[12px] text-(--text-tertiary)">
                <Sparkles className="h-3.5 w-3.5" />
                Update status
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-(--text-primary)">
                Edit application status
              </h2>
              <p className="mt-2 text-sm leading-6 text-(--text-muted)">
                Change only the interview stage and final application status for
                this job.
              </p>
            </div>

            <button
              aria-label="Close modal"
              onClick={handleClose}
              disabled={isLoading}
              className="rounded-xl border border-(--border-secondary) bg-(--bg-primary)/70 p-2 text-(--text-primary) transition-colors hover:bg-(--bg-tertiary) hover:text-(--text-secondary) disabled:cursor-not-allowed disabled:opacity-60"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="relative space-y-6 px-6 py-6">
          <div className="grid grid-cols-1 gap-5">
            <SelectDropdown
              label="Interview Status"
              name="interview_status"
              value={formValues.interview_status}
              options={interviewStatusOptions}
              active={activeDropdown === "interview_status"}
              setActive={(val) =>
                setActiveDropdown(val as "interview_status" | "status" | null)
              }
              onChange={(value) =>
                handleOptionSelect("interview_status", value)
              }
              error={errors.get("interview_status")}
              />
              <SelectDropdown
                label="Application Status"
                name="status"
                value={formValues.status}
                options={statusOptions}
                active={activeDropdown === "status"}
                setActive={(val) => setActiveDropdown(val as "status" | null)}
                onChange={(value) => handleOptionSelect("status", value)}
                error={errors.get("status")}
              />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="rounded-xl border border-(--border-secondary) px-5 py-2.5 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--bg-primary) disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex min-w-44 items-center justify-center gap-2 rounded-xl bg-(--bg-tertiary) px-5 py-2.5 text-sm font-semibold text-(--text-secondary) transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="h-5 w-5 animate-spin" />
                  Updating...
                </span>
              ) : (
                <>
                  Update status
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
