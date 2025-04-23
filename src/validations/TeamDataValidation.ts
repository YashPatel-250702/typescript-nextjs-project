import { z } from "zod";

export const teamDataValidation = z.object({
    name: z.string().nonempty("Name can't be empty ").min(
        3,
        "Name must be at least 3 characters",
    ).max(20, "Name must be at most 20 characters"),
    country: z.string().nonempty("Country can't be empty ").min(
        3,
        "Country must be at least 3 characters",
    ).max(20, "Country must be at most 20 characters"),
    coach: z.string().nonempty("Coach can't be empty ").min(
        3,
        "Coach must be at least 3 characters",
    ).max(20, "Coach must be at most 20 characters"),
    captain: z.string().nonempty("Captain can't be empty ").min(
        3,
        "Captain must be at least 3 characters",
    ).max(20, "Captain must be at most 20 characters"),
});
