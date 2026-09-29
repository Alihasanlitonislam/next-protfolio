import {
  MessageSquare,
  Zap,
  CheckCircle,
  Rocket,
  LucideIcon,
} from "lucide-react";

interface WorkStyles {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
export const workStyles: WorkStyles[] = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Clear Communication",
    description:
      "Clear and consistent communication is maintained throughout the project. Regular updates, transparent progress tracking, and timely responses ensure full visibility and alignment at every stage of the workflow.",
  },
  {
    number: "02",
    icon: Rocket,
    title: "Agile & Flexible",
    description:
      "An agile and flexible development process allows requirements to evolve smoothly. Changes are handled efficiently while maintaining focus on deadlines, project goals, and overall delivery timelines.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Quality Assurance",
    description:
      "Comprehensive testing, structured code reviews, and performance evaluations are completed before delivery. This ensures stable functionality, reliable performance, and a polished, high-quality final result.",
  },
  {
    number: "04",
    icon: Zap,
    title: "Efficient Delivery",
    description:
      "Optimized workflows and efficient execution help deliver high-quality outcomes. Projects are completed within reasonable timeframes without compromising performance, accuracy, or overall quality standards.",
  },
];
