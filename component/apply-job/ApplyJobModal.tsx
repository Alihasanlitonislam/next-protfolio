"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  Link2,
  Loader,
  MapPinPlusInside,
  Search,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useErrors } from "@/hooks/useErrors";
import { JopApplySchema } from "@/schema/JopApply";
import { ApplyJobPayload } from "@/schema/JopApply";
import SelectDropdown from "../share/SelectDropdown";
import { INTERVIEW_STATUS, interviewStatusOptions, STATUS, statusOptions } from "@/type/shared";

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const fields = [
  {
    key: "position" as const,
    label: "Job Position",
    placeholder: "Enter job position",
    icon: BriefcaseBusiness,
    type: "text",
    required: true,
  },
  {
    key: "company_name" as const,
    label: "Company Name",
    placeholder: "Enter company name",
    icon: Building2,
    type: "text",
    required: true,
  },
  {
    key: "company_link" as const,
    label: "Company Link",
    placeholder: "Enter company link",
    icon: Link2,
    type: "url",
    required: true,
  },
  {
    key: "location" as const,
    label: "Location",
    placeholder: "Enter company location",
    icon: MapPinPlusInside,
    type: "text",
    required: true,
  },
  {
    key: "post_source" as const,
    label: "Post Source",
    placeholder: "Enter post source",
    icon: Search,
    type: "text",
    required: true,
  },
  {
    key: "source_link" as const,
    label: "Source Link",
    placeholder: "Enter source link",
    icon: Link2,
    type: "url",
    required: true,
  },
];

const initialValues: ApplyJobPayload = {
  position: "",
  company_name: "",
  company_link: "",
  location: "",
  post_source: "",
  source_link: "",
  interview_status: INTERVIEW_STATUS.PENDING,
  status: STATUS.APPLIED,
};

export default function ApplyJobModal({
  isOpen,
  onClose,
  fetchApplications,
}: ApplyJobModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<ApplyJobPayload>(initialValues);
  const [activeDropdown, setActiveDropdown] = useState<
    "interview_status" | "status" | null
  >(null);

  const errors = useErrors();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = JopApplySchema().safeParse(formValues);

    if (!validation.success) {
      errors.record(validation.error.issues);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/apply-job", {
        method: "POST",
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
          fieldErrors || result.message || "Failed to submit application.",
        );
      }

      setFormValues(initialValues);
      errors.reset();
      toast.success(result.message);

      fetchApplications(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit application.",
      );
    } finally {
      setIsLoading(false);
      onClose();
    }
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center px-4 py-8">
      <motion.button
        aria-label="Close modal backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => {
          onClose();
          errors.reset();
          setFormValues(initialValues);
        }}
      />

      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-label="Apply job form"
        className="relative w-full max-w-3xl overflow-visible rounded-3xl border border-(--border-secondary) bg-(--bg-secondary) shadow-2xl"
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-r from-(--bg-tertiary)/20 via-transparent to-(--bg-tertiary)/10 blur-2xl" />

        <div className="relative border-b border-(--border-secondary) px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 w-fit rounded-full border border-(--border-primary) bg-(--bg-tertiary)/10 px-4 py-1 text-[12px] text-(--text-tertiary)">
                Track applications
              </p>
              <h2 className="text-2xl font-bold text-(--text-primary)">
                Add a new job application
              </h2>
              <p className="mt-2 text-sm text-(--text-muted)">
                Save the role, company, and source link to your application
                tracker.
              </p>
            </div>

            <button
              aria-label="Close modal"
              onClick={onClose}
              className="rounded-xl border border-(--border-secondary) bg-(--bg-primary)/70 p-2 text-(--text-primary) transition-colors hover:bg-(--bg-tertiary) hover:text-(--text-secondary)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          onInput={(event) =>
            errors.clear((event.target as HTMLInputElement).name)
          }
          className="relative space-y-5 px-6 py-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {fields.map(
              ({ key, label, placeholder, icon: Icon, type, required }) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-(--text-primary) pb-1"
                  >
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                  </label>

                  <div className="flex items-center gap-3 rounded-lg border border-(--border-secondary) bg-(--bg-primary)/70 px-4 py-3">
                    <Icon className="h-4 w-4 shrink-0 text-(--text-tertiary)" />
                    <input
                      id={key}
                      name={key}
                      type={type}
                      value={formValues[key]}
                      placeholder={placeholder}
                      onChange={(event) =>
                        setFormValues((prev) => ({
                          ...prev,
                          [key]: event.target.value,
                        }))
                      }
                      className="w-full bg-transparent text-sm text-(--text-primary) outline-none placeholder:text-(--text-muted)/80"
                    />
                  </div>
                  {errors.get(key) ? (
                    <p className="text-sm text-red-400 pt-1">
                      {errors.get(key)}
                    </p>
                  ) : null}
                </div>
              ),
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                setFormValues((prev) => ({
                  ...prev,
                  interview_status:
                    value as ApplyJobPayload["interview_status"],
                }))
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
              onChange={(value) =>
                setFormValues((prev) => ({
                  ...prev,
                  status: value as ApplyJobPayload["status"],
                }))
              }
              error={errors.get("status")}
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                errors.reset();
                setFormValues(initialValues);
              }}
              className="rounded-xl border border-(--border-secondary) px-5 py-2.5 text-sm text-(--text-primary) transition-colors hover:bg-(--bg-primary)"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-(--bg-tertiary) px-5 py-2.5 text-sm font-semibold text-(--text-secondary) transition-opacity disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  Loading...
                </span>
              ) : (
                "Save application"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
