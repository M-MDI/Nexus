/**
 * Shared mock types for the Nexus frontend.
 *
 * These contracts mirror the API shapes documented in BACKEND_INTEGRATION.md
 * and PROJECT_VISION.md. All data lives in src/lib/mock/* fixtures and will be
 * replaced by real backend calls by the backend integration workstream.
 */

export type ID = string;

export interface Person {
  id: ID;
  fullName: string;
  title: string;
  company: string;
  avatarUrl?: string;
  location?: string;
  email?: string;
  phone?: string;
  website?: string;
  headline?: string;
  industry?: string;
  expertise?: string[];
}
