import * as z from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: z.string(),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  studentId: z
    .string()
    .min(5, 'Student ID must be at least 5 characters')
    .max(20, 'Student ID cannot exceed 20 characters'),
  major: z.string().min(2, 'Major must be at least 2 characters'),
  academicYear: z
    .number()
    .min(1, 'Academic year must be at least 1')
    .max(6, 'Academic year cannot exceed 6'),
  contactNumber: z
    .string()
    .regex(/^\+?[\d\s-]+$/, 'Invalid phone number format'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
