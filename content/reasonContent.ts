import {
  CheckCircle2,
  Users,
  Target,
  Lightbulb,
  TrendingUp,
  Award,
  LucideIcon,
} from "lucide-react";

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const reasons: Reason[] = [
  {
    icon: Target,
    title: "Problem Solver",
    description:
      "I focus on understanding your requirements first, then finding the best solution that balances performance, usability, and maintainability.",
  },
  {
    icon: CheckCircle2,
    title: "Quality First",
    description:
      "Every line of code is written to be clean, readable, and built for growth. I follow best practices and modern design patterns.",
  },
  {
    icon: TrendingUp,
    title: "Always Learning",
    description:
      "I stay current with the latest tools and frameworks in the fast-moving tech industry, ensuring you get modern solutions.",
  },
  {
    icon: Users,
    title: "Team Player",
    description:
      "I enjoy collaborating, mentoring junior developers, and helping others grow. Being part of a learning community is important to me.",
  },
  {
    icon: Lightbulb,
    title: "Creative Thinker",
    description:
      "I bring innovative approaches to solve complex problems, combining design thinking with technical expertise.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "50+ projects delivered, trusted by clients worldwide, with consistent positive feedback and repeat business.",
  },
];
