import { z } from "zod";

const usernameFieldValidation = z
  .string({ required_error: "Username is required!" })
  .min(3, "Username must be atleast 3 characters!")
  .max(16, "Username cannot be more than 16 characters!")
  .regex(
    /^[a-zA-Z][a-zA-Z0-9-]{2,15}$/,
    "Username must start with a letter and contain only letters, numbers, or hyphens."
  );

export const userRegisterSchema = z.object({
  email: z
    .string({ required_error: "Email is required!" })
    .email({ message: "Invalid email!" }),
  username: usernameFieldValidation,
  name: z.string({ required_error: "Name is required!" }),
  password: z.string({ required_error: "Password is required!" }),
});

export const validateUserSchema = z.object({
  verificationCode: z.string({
    required_error: "Verification code is required!",
  }),
});
