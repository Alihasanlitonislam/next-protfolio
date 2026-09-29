"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

function ClientHappy() {
  const happyClients = useCountUp(120);
  const projectsCompleted = useCountUp(180);
  const experienceYears = useCountUp(2);
  const countriesServed = useCountUp(8);

  const stats = [
    {
      counter: happyClients,
      label: "Happy Clients",
    },
    {
      counter: projectsCompleted,
      label: "Projects Completed",
    },
    {
      counter: experienceYears,
      label: "Years of Experience",
    },
    {
      counter: countriesServed,
      label: "Countries Served",
    },
  ];

  return (
    <section
      className="text-(--text-primary) w-full py-12 md:py-20 px-4"
      style={{
        backgroundImage: "url('/countup.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "container",
      }}
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xl sm:text-2xl md:text-4xl font-bold mb-4"
          >
            Trusted by clients around the world
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-(--text-muted) text-[13px] sm:text-lg"
          >
            We build dependable and scalable digital products designed to
            support long-term business growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {stats.map((item) => (
            <motion.div
              key={item.label}
              ref={item.counter.ref}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center bg-(--bg-primary) rounded-xl md:rounded-2xl p-8 border border-(--border-primary) transition hover:shadow-lg"
            >
              <div className="text-xl sm:text-2xl md:text-4xl font-bold text-(--text-tertiary)">
                {item.counter.value} +
              </div>
              <div className="mt-2 text-[13px] sm:text-lg text-center text-(--text-muted)">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientHappy;
