export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface JWTCustomPayload {
  id: string;
  email: string;
  name: string;
 
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}


import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type SignupInput = z.infer<typeof SignupSchema>;

export interface SignupResponse {
  success: boolean;
  data?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
}

export type ValidationError = {
  field: string;
  message: string;
}

export type SignupError = {
  type: 'validation' | 'database' | 'server';
  message: string;
  errors?: ValidationError[];
}