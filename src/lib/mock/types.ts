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

export type EventStatus = 'draft' | 'published' | 'upcoming' | 'ongoing' | 'past' | 'cancelled';

export interface EventSession {
  id: ID;
  title: string;
  description?: string;
  startTime: string; // ISO date-time
  endTime: string;
  location?: string;
  speakerName?: string;
  track?: string;
}

export interface EventDocument {
  id: ID;
  name: string;
  kind: 'pdf' | 'link' | 'image';
  url?: string;
}

export interface Event {
  id: ID;
  name: string;
  description: string;
  startsAt: string; // ISO date
  endsAt: string;
  location: string;
  city?: string;
  organizerName: string;
  organizerId: ID;
  coverTone?: string;
  status: EventStatus;
  capacity?: number;
  registeredCount?: number;
  priceLabel?: string;
  tags?: string[];
  sessions?: EventSession[];
  documents?: EventDocument[];
  myStatus?: 'registered' | 'waitlist' | 'attended' | 'cancelled';
  myRole?: 'participant' | 'speaker' | 'organizer' | 'staff';
}

export type IntentionType = 'offer' | 'seek';

export interface EventIntention {
  id: ID;
  eventId: ID;
  type: IntentionType;
  category: string;
  description: string;
}

export interface DirectoryProfile extends Person {
  visibleInDirectory: boolean;
  appearInSuggestions: boolean;
  intentions?: EventIntention[];
  connectionStatus?: 'none' | 'requested' | 'pending' | 'accepted';
  isFavorite?: boolean;
}
