/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * SyllabusAI API
 * AI powered learning
 * OpenAPI spec version: 1.0.0
 */
import type { UserResponsePicture } from './userResponsePicture';

export interface UserResponse {
  email: string;
  is_active: boolean;
  name: string;
  picture?: UserResponsePicture;
  token: string;
}
