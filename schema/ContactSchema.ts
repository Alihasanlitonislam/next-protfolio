import { z as zod } from "zod";

export const ContactSchema = () =>
  zod.object({
    name: zod.string().min(1, "The first name is required"),

    email: zod
      .string()
      .min(1, "The email is required")
      .email("Enter a valid email"),

    phone: zod
      .string()
      .min(1, "The phone number is required")
      .refine((val) => /^\+?[1-9]\d{1,14}$/.test(val), {
        message: "Please enter a valid phone number",
      }),

    message: zod.string().min(1, "The message is required"),
    token: zod.string().min(1, "The token is required"),
    country: zod.string().optional(),
  });
