import { z } from "zod";

export const UserDataValidation = z.object({
    name: z.string().nonempty("Name can't be empty ").min(
        3,
        "Name must be at least 3 characters",
    ).max(20, "Name must be at most 20 characters"),
    email: z.string().email("Email is required"),
    password: z.string()
    .min(8, "Password must be exactly 8 characters long")
    .regex(/(?=.*[a-z])(?=[A-Z])(?=.*[^a-zA-Z0-9])/, "Password must contain a combination of lowercase,uppercase and at least one special character")
});  

