"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Database,
  Edit3,
  Sparkles,
  Trash2,
} from "lucide-react";
import ApplyJobModal from "./ApplyJobModal";
import { formatDate } from "@/utils/formatDate";
import { JobApplication } from "@/types/job-application";
import DeleteApplication from "./DeleteApplication";
import EditApplication from "./EditApplication";
import { StatusColor } from "@/type/shared";

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ApplyJobHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string>("");
  const [editApplication, setEditApplication] = useState<JobApplication | null>(
    null,
  );
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const header = [
    "Date",
    "Position",
    "Company Name",
    "Location",
    "Source Post",
    "Interview",
    "Status",
    "Action",
  ];

  async function fetchApplications(fetching: boolean) {
    try {
      setIsFetching(fetching);

      const response = await fetch("/api/apply-job", { cache: "no-store" });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load job applications.");
      }

      setApplications(result);
    } catch {
      // Error handling can be added here if needed
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchApplications(true);
  }, []);

  return (
    <>
      <section className="section-bg section-grid relative overflow-hidden">
        <div className="container pt-28 pb-20 md:pt-32 lg:pt-44">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid items-start gap-8 xl:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="space-y-6">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-(--border-primary) bg-(--bg-tertiary)/10 px-5 py-2 text-[12px] text-(--text-tertiary)"
              >
                <Sparkles className="h-4 w-4 text-(--icon-primary)" />
                Job application tracker
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
              >
                Save every
                <span className="text-(--text-tertiary)"> application </span>
                in one focused dashboard.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="max-w-3xl text-sm leading-7 text-(--text-muted) sm:text-base md:text-lg"
              >
                Add the role, company, official company link, and source link
                from where you found the job. Every new entry opens from the
                modal, posts to MongoDB, and refreshes the live table below.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-xl bg-(--bg-tertiary) px-5 py-3 text-sm font-semibold text-(--text-secondary) transition-transform hover:-translate-y-0.5"
                >
                  Apply Job
                </button>
                <a
                  href="#job-application-table"
                  className="rounded-xl border border-(--border-secondary) px-5 py-3 text-sm text-(--text-primary) transition-colors hover:bg-(--bg-secondary)"
                >
                  View Application Table
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-[28px] border border-(--border-secondary) bg-(--bg-secondary)/90 p-6"
            >
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-(--bg-tertiary)/20 blur-3xl" />

              <div className="relative space-y-5">
                <div className="flex items-center justify-between rounded-2xl border border-(--border-secondary) bg-(--bg-primary)/60 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">
                      Total entries
                    </p>
                    <p className="mt-2 text-3xl font-bold text-(--text-primary)">
                      {applications.length}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-(--bg-tertiary)/10 p-3 text-(--text-tertiary)">
                    <Database className="h-7 w-7" />
                  </div>
                </div>

                <div className="space-y-3">
                  {applications.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-(--border-secondary) bg-(--bg-primary)/50 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-(--text-primary)">
                            {item.position}
                          </p>
                          <p className="mt-1 text-sm text-(--text-muted)">
                            {item.company_name}
                          </p>
                        </div>
                        <BriefcaseBusiness className="mt-0.5 h-5 w-5 text-(--text-tertiary)" />
                      </div>
                      <p className="mt-3 text-xs text-(--text-muted)">
                        Added{" "}
                        {formatDate({
                          dateString: item.created_at,
                          time: true,
                          format: "long",
                        })}
                      </p>
                    </div>
                  ))}

                  {!applications.length && !isFetching ? (
                    <div className="rounded-2xl border border-dashed border-(--border-secondary) p-6 text-sm text-(--text-muted)">
                      No applications saved yet. Use the Apply Job button to add
                      the first one.
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            id="job-application-table"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16 rounded-t-xl border border-(--border-secondary) bg-(--bg-secondary)/85 shadow-[0_20px_80px_rgba(0,0,0,0.2)]"
          >
            <motion.div
              variants={fadeUp}
              className="px-5 py-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <p className="text-sm text-(--text-tertiary)">
                  Saved applications
                </p>
                <h2 className="text-2xl font-bold text-(--text-primary)">
                  Application table
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-fit rounded-xl border border-(--border-primary) px-5 py-2.5 text-sm text-(--text-tertiary) transition-colors hover:bg-(--bg-tertiary) hover:text-(--text-secondary)"
              >
                Add New Application
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-(--bg-primary)/60 text-lg">
                  <thead>
                    <tr className="border-y border-(--border-secondary) bg-(--bg-primary)">
                      {header.map((heading, index) => (
                        <th
                          key={heading}
                          className={` py-6 text-left font-semibold text-(--text-primary) whitespace-nowrap ${index === 0 ? "pl-5" : ""} ${index === header.length - 1 ? "pr-5" : "px-2"}`}
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isFetching ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-5 py-10 text-center text-(--text-muted)"
                        >
                          Loading applications...
                        </td>
                      </tr>
                    ) : applications.length ? (
                      applications.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-(--border-secondary)/80 last:border-b-0 text-base"
                        >
                          <td className="px-5 py-6 font-medium text-(--text-primary) whitespace-nowrap">
                            {formatDate({ dateString: item.created_at })}
                          </td>
                          <td className="px-5 py-6 text-(--text-primary) whitespace-nowrap">
                            {item.position}
                          </td>
                          <td className="px-5 py-6 text-(--text-muted) whitespace-nowrap">
                            <a
                              href={item.company_link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-(--text-tertiary) hover:underline"
                            >
                              {item.company_name}
                            </a>
                          </td>
                          <td className="px-5 py-6 text-(--text-primary) max-w-50 flex flex-wrap">
                            {item.location}
                          </td>
                          <td className="px-5 py-6 text-(--text-muted) whitespace-nowrap">
                            <a
                              href={item.source_link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-(--text-tertiary) hover:underline"
                            >
                              {item.post_source}
                            </a>
                          </td>
                          <td className="px-5 py-6 whitespace-nowrap">
                            <span
                              className={`rounded-full px-3 py-1 text-sm whitespace-nowrap border ${
                                StatusColor[
                                  item.interview_status as keyof typeof StatusColor
                                ]
                              }`}
                            >
                              {item.interview_status}
                            </span>
                          </td>
                          <td className="px-5 py-6 whitespace-nowrap">
                            <span
                              className={`rounded-full px-3 py-1 text-sm whitespace-nowrap border ${
                                StatusColor[
                                  item.status as keyof typeof StatusColor
                                ]
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="px-5 py-6 whitespace-nowrap">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setEditApplication(item)}
                                className="inline-flex items-center gap-2 rounded-lg border border-(--border-primary) bg-(--bg-tertiary)/10 p-2 text-sm text-(--text-tertiary) transition-colors hover:bg-(--bg-tertiary)/30 cursor-pointer"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeletingId(item.id)}
                                className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-sm text-red-300 transition-colors hover:bg-red-500/20 cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-5 py-10 text-center text-(--text-muted)"
                        >
                          No data yet. Submit an application from the modal to
                          populate the table.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <ApplyJobModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
            fetchApplications={fetchApplications}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingId && (
          <DeleteApplication
            deletingId={deletingId}
            setDeletingId={setDeletingId}
            fetchApplications={fetchApplications}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editApplication && (
          <EditApplication
            application={editApplication}
            setApplication={setEditApplication}
            fetchApplications={fetchApplications}
          />
        )}
      </AnimatePresence>
    </>
  );
}
