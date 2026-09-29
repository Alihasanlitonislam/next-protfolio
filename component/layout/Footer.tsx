"use client";
import { handleScroll } from "@/utils/handleScroll";
import {
  Facebook,
  Github,
  Linkedin,
  Mail,
  Palette,
  Zap,
  Loader,
  MailIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FooterComponent = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const skills = [
    { name: "React", color: "from-cyan-500 to-blue-500" },
    { name: "Next.js", color: "from-slate-700 to-slate-900" },
    { name: "Vue", color: "from-emerald-500 to-green-600" },
    { name: "Nest", color: "from-red-500 to-pink-600" },
    { name: "Redux", color: "from-purple-500 to-violet-600" },
    { name: "Pinia", color: "from-amber-400 to-yellow-500" },
    { name: "Pinia Colada", color: "from-[#3F746D] to-[#6EA07E]" },
    { name: "Tailwind", color: "from-sky-400 to-cyan-500" },
  ];
  return (
    <footer className="bg-linear-to-br from-(--bg-tertiary)/40 via-slate-800 to-(--bg-tertiary)/40 text-(--text-primary) relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container pt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-5">
              <a href="#" onClick={(e) => handleScroll(e, "#")}>
                <Image src="/logo.svg" alt="logo" width={48} height={48} />
              </a>

              <div>
                <h2 className="text-3xl font-bold bg-linear-to-r from-(--text-tertiary)  to-[#9ED83F] bg-clip-text text-transparent">
                  Ali Hasan
                </h2>
                <p className="text-(--text-primary)  text-[12px] md:text-[16px]">
                  Frontend Developer
                </p>
              </div>
            </div>

            <p className="text-(--text-muted) leading-relaxed max-w-md  text-[12px] md:text-[16px]">
              Passionate frontend developer specializing in building modern,
              responsive web applications with cutting-edge technologies.
              Turning ideas into beautiful, functional digital experiences.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-2 text-(--text-muted)  text-[12px] md:text-[16px]">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Tech Stack</span>
              </div>
              <div className="flex gap-2 w-full md:w-[350px] flex-wrap">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-4 py-2 bg-linear-to-r ${skill.color} rounded-full text-[12px] md:text-[16px] font-medium text-white shadow-lg hover:scale-105 transition-transform cursor-pointer`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              
              <Link
                href="https://facebook.com/alihasan404439"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-linear-to-r hover:from-blue-600 hover:to-blue-500 flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-blue-500/50"
              >
                <Facebook className="w-5 h-5 text-(--text-muted) group-hover:text-white transition-colors" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/ali-hasan-409845256"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-linear-to-r hover:from-blue-700 hover:to-blue-600 flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-blue-600/50"
              >
                <Linkedin className="w-5 h-5 text-(--text-muted) group-hover:text-white transition-colors" />
              </Link>
              <a
                href="mailto:developeralihasan777@gmail.com"
                className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-linear-to-r hover:from-pink-600 hover:to-purple-600 flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-pink-500/50"
              >
                <MailIcon className="w-5 h-5 text-(--text-muted) group-hover:text-white transition-colors" />
              </a>
              <Link
                href="https://github.com/dev-ali-hasan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-linear-to-r hover:from-slate-700 hover:to-slate-900 flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-slate-700/50"
              >
                <Github className="w-5 h-5 text-(--text-muted) group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-(--text-tertiary)" />
              Portfolio
            </h3>
            <ul className="space-y-3 text-[12px] md:text-[16px]">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScroll(e, "#about")}
                  className="text-(--text-muted) hover:text-(--text-tertiary) transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-(--text-muted) hover:text-(--text-tertiary) transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#why-me"
                  onClick={(e) => handleScroll(e, "#why-me")}
                  className="text-(--text-muted) hover:text-(--text-tertiary) transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  Why Me
                </a>
              </li>
              <li>
                <a
                  href="#project"
                  onClick={(e) => handleScroll(e, "#project")}
                  className="text-(--text-muted) hover:text-(--text-tertiary) transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#review"
                  onClick={(e) => handleScroll(e, "#review")}
                  className="text-(--text-muted) hover:text-(--text-tertiary) transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  Review
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleScroll(e, "#contact")}
                  className="text-(--text-muted) hover:text-(--text-tertiary) transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-(--text-tertiary)" />
              Stay Updated
            </h3>
            <p className="text-(--text-muted) text-[12px] md:text-[16px] mb-4 leading-relaxed">
              Get the latest updates on new projects, blog posts, and web
              development tips.
            </p>
            <div className="space-y-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-(--bg-muted) border border-(--border-secondary) rounded-xl text-[12px] md:text-[16px] text-(--text-primary) placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--text-tertiary) focus:border-transparent transition-all relative z-10"
                required
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-linear-to-r from-(--bg-tertiary)  to-[#9ED83F]/80 text-(--text-primary) py-3 rounded-xl font-medium hover:shadow-xl hover:shadow-[#9ED83F]/10 transition-all duration-300 text-[12px] md:text-[16px]"
              >
                {subscribed ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader className="w-5 h-5 animate-spin" /> Loading...
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <a href="#" onClick={(e) => handleScroll(e, "#")}>
            <Image
              src="/footerImage.png"
              alt="logo"
              width={1040}
              height={200}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
