import z from "zod";

export const signupSchema = z.object({
  username: z.string().min(3, "Username should be at least 3 characters."),
  email: z.string().email("Invalid email format."),
  password: z.string().min(6, "Password should be at least 6 characters."),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z.string().min(6, "Password should be at least 6 characters."),
});
