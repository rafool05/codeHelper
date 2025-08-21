import { z } from "zod";

/**
 * Factory to build a username schema.
 * @param min Minimum length
 * @param max Maximum length
 */
export function usernameSchema(min = 3, max = 30) {
  return z
    .string()
    .min(min, `Username must be at least ${min} characters`)
    .max(max, `Username must be at most ${max} characters`)
    .regex(/^[A-Za-z0-9_]+$/, "Username must only contain letters, numbers, and underscores");
}

/**
 * Factory to build an email schema.
 */
export function emailSchema() {
  return z.string().email("Invalid email address");
}

/**
 * Factory to build a password schema.
 * @param min Minimum length
 * @param max Maximum length
 */
export function passwordSchema(min = 8, max = 64) {
  return z
    .string()
    .min(min, `Password must be at least ${min} characters`)
    .max(max, `Password must be at most ${max} characters`)
    .regex(/[A-Z]/, "Password must contain one uppercase letter")
    .regex(/[a-z]/, "Password must contain one lowercase letter")
    .regex(/\d/, "Password must contain one digit")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain one special character");
}
export const signupSchema = z.object({
  username: usernameSchema(4, 20),      // e.g. require 4–20 chars
  email: emailSchema(),
  password: passwordSchema(8, 30),    // e.g. require 10–128 chars
});
