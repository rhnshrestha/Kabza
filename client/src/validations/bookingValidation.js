import { z } from "zod";

export const bookingValidation = z.object({
  customer_name: z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters")
  .max(50, "Name is too long")
  .regex(/^[A-Za-z\s]+$/, "Name can only contain letters"),

  contact: z
    .string()
    .trim()
    .regex(/^98\d{8}$/, "Contact must be a valid 10-digit Nepali number"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((val) => val.toLowerCase()),

  booking_date: z
    .string()
    .refine((date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(date) >= today;
    }, "Booking date cannot be in the past"),


  booking_time: z
    .string()
    .refine((time) => {
      const [hour] = time.split(":").map(Number);
      return hour >= 10 && hour <= 22;
    }, "Booking time must be between 10:00 AM and 10:00 PM"),

  people: z
    .coerce
    .number({
      invalid_type_error: "People must be a number"
    })
    .int("People must be a whole number")
    .min(1, "At least 1 person is required")
    .max(15, "Maximum 15 people allowed"),

});
