import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
  category: z.enum(["RESIDENTIAL", "COMMERCIAL", "HEALTHCARE", "EDUCATION"]),
});

export const otpSchema = z.object({ otp: z.string().length(6, "The code is 6 digits") });

export const forgotSchema = z.object({ email: z.email("Enter a valid email") });

export const resetSchema = z.object({
  otp: z.string().length(6, "The code is 6 digits"),
  newPassword: z.string().min(6, "At least 6 characters"),
});

export const reportSchema = z.object({
  areaId: z.string().min(1, "Pick your area"),
  title: z.string().min(4, "A short summary helps the operator"),
  description: z.string().min(10, "Describe what's happening (10+ chars)"),
});

export const applyTechnicianSchema = z.object({
  specialization: z.enum(["LINE", "TRANSFORMER", "METERING", "GENERATION"]),
  experienceYears: z.number().int().min(0).max(50),
  certification: z.string().max(120).optional(),
});

export const scheduleSchema = z
  .object({
    title: z.string().min(3, "At least 3 characters"),
    reason: z.string().optional(),
    type: z.enum(["PLANNED", "MAINTENANCE", "EMERGENCY"]),
    areaId: z.string().min(1, "Select the area"),
    startTime: z.string().min(1, "Required"),
    endTime: z.string().min(1, "Required"),
  })
  .refine((d) => new Date(d.endTime) > new Date(d.startTime), { message: "End must be after start", path: ["endTime"] });

export const staffSchema = z.object({
  name: z.string().min(2, "Tell us the person's name"),
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
  role: z.string().min(1, "Pick the role"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.email("Enter a valid email"),
  subject: z.string().min(3, "A short subject helps us route it"),
  message: z.string().min(10, "Give us a bit more detail (10+ chars)"),
});

export const profileSchema = z.object({
  serviceAddress: z.string().max(160).optional(),
  thana: z.string().max(60).optional(),
  city: z.string().max(60).optional(),
  preferredLanguage: z.enum(["en", "bn"]),
});


export const nameSchema = z.object({
  name: z.string().min(2, "Tell us your name").max(60),
});

export const roleDetailsSchema = z.object({
  certification: z.string().max(120).optional(),
  phone: z.string().max(20).optional(),
  designation: z.string().max(60).optional(),
});

export const imageSchema = z
  .instanceof(File)
  .refine((f) => f.size <= 2 * 1024 * 1024, "Max size is 2 MB")
  .refine((f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type), "JPG, PNG or WebP only");

export const zoneSchema = z.object({
  name: z.string().min(2, "Pick a district").max(60),
  code: z.string().max(8, "Keep the code short").optional(),
});

export const substationSchema = z.object({
  name: z.string().min(2, "Name the substation").max(60),
  zoneId: z.string().min(1, "Pick a zone"),
});

export const feederSchema = z.object({
  name: z.string().min(2, "Name the feeder").max(60),
  substationId: z.string().min(1, "Pick a substation"),
  capacityMW: z
    .string()
    .optional()
    .refine((v) => !v || (Number(v) > 0 && Number.isInteger(Number(v))), "Capacity must be a positive whole number"),
});

export const areaSchema = z.object({
  name: z.string().min(2, "Name the area").max(60),
  feederId: z.string().min(1, "Pick a feeder"),
});