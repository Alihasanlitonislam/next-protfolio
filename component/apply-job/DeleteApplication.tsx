"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader, X } from "lucide-react";
import { toast } from "sonner";

interface DeleteApplicationProps {
  deletingId: string;
  setDeletingId: (id: string) => void;
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

export default function DeleteApplication({
  deletingId,
  setDeletingId,
  fetchApplications,
}: DeleteApplicationProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/apply-job?id=${deletingId}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete application.");
      }

      toast.success(result.message);
      fetchApplications(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete application.",
      );
    } finally {
      setIsLoading(false);
      setDeletingId("");
    }
  }

  useEffect(() => {
    document.body.style.overflow = deletingId ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [deletingId]);

  if (!deletingId) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center px-4 py-8">
      <motion.button
        aria-label="Close modal backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={() => setDeletingId("")}
      />

      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-label="Delete application"
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-(--border-secondary) bg-(--bg-secondary) shadow-2xl"
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-r from-(--bg-tertiary)/20 via-transparent to-(--bg-tertiary)/10 blur-2xl" />

        <div className="relative px-6 py-6 sm:px-7">
          <div className="flex items-start justify-between gap-5">
            <h2 className="text-2xl font-bold tracking-tight text-(--text-primary)">
              Delete application
            </h2>

            <button
              aria-label="Close modal"
              onClick={() => setDeletingId("")}
              disabled={isLoading}
              className="rounded-xl border border-(--border-secondary) bg-(--bg-primary)/70 p-2 text-(--text-primary) transition-colors hover:bg-red-500/15 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative border-y border-(--border-secondary) bg-(--bg-primary)/45 px-6 py-5 sm:px-7">
          <p className="mt-1 text-lg leading-6 text-(--text-muted)">
            Are you sure you want to delete this application? This action cannot be undone.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 py-6 px-7">
          <button
            type="button"
            onClick={() => setDeletingId("")}
            disabled={isLoading}
            className="rounded-xl border border-(--border-secondary) px-5 py-2.5 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--bg-primary) disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
