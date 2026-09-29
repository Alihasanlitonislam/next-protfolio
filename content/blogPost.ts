
export interface BlogPost {
  id: number;
  image?: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  link: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: "/blogs/typescript-types.png",
    title: "TypeScript Types: A Simple Guide",
    summary:
      "TypeScript is a powerful superset of JavaScript that adds static typing. This helps you catch errors early and makes your code more readable and maintainable, especially in large projects.",
    date: "Feb 20, 2026",
    readTime: "6 min read",
    category: "TypeScript",
    link: 'typescript',
  },
  {
    id: 2,
    image: "/blogs/system-design.jpeg",
    title: "Frontend System Design — From Components to Scalable Architecture",
    summary:
      "As a frontend developer working with React, Next.js, and Vue, I’ve realized that building UI is just the beginning.",
    date: "Jan 28, 2026",
    readTime: "5 min read",
    category: "System Design",
    link: 'system-design',
  },
  {
    id: 3,
    title: "From Figma to React: A Clean Handoff Workflow",
    summary:
      "A repeatable process that keeps design intent intact while accelerating development.",
    date: "Jan 10, 2026",
    readTime: "7 min read",
    category: "Workflow",
    link: 'workflow',
  },
];

// As a frontend developer working with React, Next.js, and Vue, I’ve realized that building UI is just the beginning.

// The real challenge is designing systems that scale.

// Here’s what I focus on when building production-grade frontend apps:

// 🔹 Feature-based architecture (not messy folders)
// 🔹 Clean API layer with proper separation
// 🔹 Lightweight state management (Zustand / Pinia)
// 🔹 SSR + CSR strategy for performance
// 🔹 Reusable UI system (Design System mindset)
// 🔹 Optimized performance (lazy loading, code splitting)

// 💡 A good frontend is not just about design — it's about structure, performance, and maintainability.

// Currently exploring:

// * Micro-frontend architecture
// * Advanced caching strategies
// * System design for large-scale apps

// If you're building modern web apps, think beyond components — think systems.