import { z } from 'zod';

export const playerDataValidation = z.object({
  name: z
    .string()
    .nonempty("Name can't be empty")
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .nonnegative("Age can't be negative"),
  jersyNo: z
    .number({ invalid_type_error: "Jersey number must be a number" })
    .nonnegative("Jersey number can't be negative"),
  role: z.enum(["Batsman", "Bowler", "AllRounder", "WicketKeeper"], {
    errorMap: () => ({ message: "Invalid role" }),
  }),
  totalRuns: z
    .number({ invalid_type_error: "Total runs must be a number" })
    .nonnegative("Total runs can't be negative"),
  totalWickets: z
    .number({ invalid_type_error: "Total wickets must be a number" })
    .nonnegative("Total wickets can't be negative"),
  noOfMatchPlayed: z
    .number({ invalid_type_error: "Matches played must be a number" })
    .nonnegative("Matches played can't be negative"),
  teamId: z
    .number({ invalid_type_error: "Team ID must be a number" })
    .positive("Team ID must be greater than 0"),
});
