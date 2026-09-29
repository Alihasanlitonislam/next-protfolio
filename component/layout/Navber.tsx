/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { handleScroll } from "@/utils/handleScroll";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { generateUid } from "@/utils/applyJobAccess";

const MyResumeModal = dynamic(() => import("../share/MyResumeModal"), {
  ssr: false,
});

const menuVariants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
};

const itemVariants = {
  open: { x: 0, opacity: 1 },
  closed: { x: -20, opacity: 0 },
};

const menuItems = [
  { name: "About", href: "#about", id: "about" },
  { name: "Services", href: "#services", id: "services" },
  { name: "Why Me", href: "#why-me", id: "why-me" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Review", href: "#review", id: "review" },
  { name: "Blog", href: "#blog", id: "blog" },
  { name: "Apply Job", href: "/apply-job", id: "apply-job"},
  { name: "Contact", href: "#contact", id: "contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [canAccessApplyJob, setCanAccessApplyJob] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const allowedIds = ["8eei6l5nd3pr"];

  function getVisitorId(): string {
    let id = localStorage.getItem("visitorID");
    if (!id) {
      id = generateUid();
      localStorage.setItem("visitorID", id);
    }

    return id;
  }

  const visibleMenuItems = menuItems.filter(
    (item) => item.id !== "apply-job" || canAccessApplyJob,
  );

  useEffect(() => {
    setCanAccessApplyJob(allowedIds.includes(getVisitorId()));
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { threshold: 0.6 },
    );

    visibleMenuItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleMenuItems]);

  useEffect(() => {
    const close = () => open && setOpen(false);

    const clickHandler = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) close();
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("keydown", keyHandler);
    document.addEventListener("mousedown", clickHandler);

    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("keydown", keyHandler);
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [open]);

  useEffect(() => {
    let startY = 0;

    const touchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const touchEnd = (e: TouchEvent) => {
      if (e.changedTouches[0].clientY - startY > 80) setOpen(false);
    };

    const menu = menuRef.current;
    if (!menu) return;

    menu.addEventListener("touchstart", touchStart, { passive: true });
    menu.addEventListener("touchend", touchEnd, { passive: true });

    return () => {
      menu.removeEventListener("touchstart", touchStart);
      menu.removeEventListener("touchend", touchEnd);
    };
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-(--bg-primary)/40 border-b border-(--border-secondary)"
      >
        <div className="container py-4 flex justify-between items-center">
          {pathname === "/" ? (
            <a href="#" onClick={(e) => handleScroll(e, "#")}>
              <Image src="/logo.svg" alt="logo" width={48} height={48} />
            </a>
          ) : (
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={48} height={48} />
            </Link>
          )}

          <div className="hidden lg:flex items-center gap-8 text-[12px] sm:text-[16px] md:text-xl">
            {visibleMenuItems.map((item) => (
              <div key={item.href}>
                {item?.id === "apply-job" ? (
                  <Link
                    href={item.href}
                    className={`hover:text-(--text-tertiary) ${
                      active === item.id
                        ? "text-(--text-tertiary) font-semibold"
                        : ""
                    }`}
                    onClick={() => setActive(item.id)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      handleScroll(e, item.href);
                    }}
                    className={`hover:text-(--text-tertiary) ${
                      active === item.id
                        ? "text-(--text-tertiary) font-semibold"
                        : ""
                    }`}
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:block border border-(--border-primary) text-(--text-tertiary) hover:bg-(--bg-tertiary) hover:text-(--text-primary) px-4 py-1 rounded-md cursor-pointer"
          >
            Resume
          </button>
          <button className="lg:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              ref={menuRef}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="overflow-hidden lg:hidden bg-(--bg-primary)/70 border-t border-(--border-secondary)"
            >
              <motion.div className="px-5 py-4 space-y-4 container">
                {visibleMenuItems.map((item) => (
                  <motion.div key={item.href} variants={itemVariants}>
                    {item?.id === "apply-job" ? (
                      <Link
                        href={item.href}
                        className={`hover:text-(--text-tertiary) ${
                          active === item.id
                            ? "text-(--text-tertiary) font-semibold"
                            : ""
                        }`}
                        onClick={() => setActive(item.id)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          handleScroll(e, item.href);
                          setOpen(false);
                        }}
                        className={`block ${
                          active === item.id
                            ? "text-(--text-tertiary) font-semibold"
                            : ""
                        }`}
                      >
                        {item.name}
                      </a>
                    )}
                  </motion.div>
                ))}

                <motion.button
                  variants={itemVariants}
                  onClick={() => setIsOpen(!isOpen)}
                  className="border border-(--border-primary) text-(--text-tertiary) px-4 py-1 rounded-md"
                >
                  Resume
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <MyResumeModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Resume PDF"
        pdfUrl="/Resume-Front-End-by-Ali-Hasan.pdf"
      />
    </>
  );
}
