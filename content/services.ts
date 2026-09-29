import { Code, LucideIcon, Palette, RefreshCw, Rocket, Shield, Zap } from "lucide-react";

interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
    features: string[];
}

export const services : Service[] = [
  {
    icon: Code,
    title: "React & Next.js Development",
    description:
      "Build modern, scalable web applications with React and Next.js. Server components, API routes, and optimal performance.",
    features: [
      "Server Components",
      "API Integration",
      "Performance Optimization",
    ],
  },
  {
    icon: Palette,
    title: "Responsive UI Design",
    description:
      "Pixel-perfect, responsive interfaces that work seamlessly across all devices using Tailwind CSS and modern design principles.",
    features: ["Mobile-First", "Tailwind CSS", "Accessibility Focus"],
  },
  {
    icon: Rocket,
    title: "Web Application Architecture",
    description:
      "Plan and implement scalable, maintainable application architecture with clean code practices and modern design patterns.",
    features: ["System Design", "Code Quality", "Scalability"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Optimize your applications for speed and efficiency. Image optimization, lazy loading, and bundle size reduction.",
    features: ["Load Time", "SEO", "Analytics"],
  },
  {
    icon: RefreshCw,
    title: "Vue.js & Component Libraries",
    description:
      "Develop with Vue.js and build reusable component libraries. Pinia state management and composable patterns.",
    features: ["Vue 3", "PrimeVue", "Pinia Store", "Composables"],
  },
  {
    icon: Shield,
    title: "Code Review & Mentoring",
    description:
      "Provide professional code reviews and mentoring to help your team maintain best practices and code quality.",
    features: ["Code Standards", "Best Practices", "Team Growth"],
  },
];