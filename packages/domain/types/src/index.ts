import { z } from 'zod';

// Domain types using Zod for validation

// User related schemas
export const userSchema = z.object({
  id: z.string(),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = userSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const updateUserSchema = userSchema.partial().omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// Team related schemas
export const teamSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  members: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createTeamSchema = teamSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const updateTeamSchema = teamSchema.partial().omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// Settings related schemas
export const settingsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  theme: z.enum(['light', 'dark', 'system']),
  notifications: z.boolean(),
  language: z.string(),
  updatedAt: z.date(),
});

export const createSettingsSchema = settingsSchema.omit({ 
  id: true, 
  updatedAt: true 
});

export const updateSettingsSchema = settingsSchema.partial().omit({ 
  id: true, 
  userId: true, 
  updatedAt: true 
});

// Audit log related schemas
export const auditLogSchema = z.object({
  id: z.string(),
  action: z.string(),
  resourceType: z.string(),
  resourceId: z.string(),
  userId: z.string(),
  metadata: z.record(z.any()),
  timestamp: z.date(),
});

export const createAuditLogSchema = auditLogSchema.omit({ 
  id: true 
});

// API request/response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
});

// Export types based on schemas
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

export type Team = z.infer<typeof teamSchema>;
export type CreateTeam = z.infer<typeof createTeamSchema>;
export type UpdateTeam = z.infer<typeof updateTeamSchema>;

export type Settings = z.infer<typeof settingsSchema>;
export type CreateSettings = z.infer<typeof createSettingsSchema>;
export type UpdateSettings = z.infer<typeof updateSettingsSchema>;

export type AuditLog = z.infer<typeof auditLogSchema>;
export type CreateAuditLog = z.infer<typeof createAuditLogSchema>;

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Result type for operations that can fail
export type Result<T, E = Error> = 
  | { success: true; value: T }
  | { success: false; error: E };

// Pagination types
export type PaginationParams = {
  page: number;
  limit: number;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};