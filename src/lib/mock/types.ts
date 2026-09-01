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

export type ConnectionStatus = 'accepted' | 'pending' | 'requested' | 'declined';

export interface Connection {
  id: ID;
  person: Person;
  status: ConnectionStatus;
  connectedAt?: string;
  eventId?: ID;
  eventName?: string;
  upcomingMeeting?: { id: ID; title: string; startsAt: string; location?: string };
}

export interface MatchSuggestion {
  id: ID;
  person: Person;
  score: number; // 0-100
  reasons: string[];
  matchedOffer?: string;
  matchedSeek?: string;
  eventId: ID;
  eventName: string;
  status: 'new' | 'requested' | 'connected';
}

export type MeetingStatus =
  | 'requested'
  | 'proposed'
  | 'confirmed'
  | 'countered'
  | 'declined'
  | 'cancelled'
  | 'completed'
  | 'expired';

export interface Meeting {
  id: ID;
  title: string;
  withPerson: Person;
  startsAt: string;
  endsAt: string;
  location?: string;
  eventId?: ID;
  eventName?: string;
  status: MeetingStatus;
  isOrganizer: boolean;
  agenda?: string;
  notes?: string;
}

export interface Message {
  id: ID;
  conversationId: ID;
  senderId: ID;
  senderName: string;
  text: string;
  sentAt: string;
  mine: boolean;
}

export interface Conversation {
  id: ID;
  person: Person;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: Message[];
  meetingStatus?: MeetingStatus;
}

export interface Participant {
  id: ID;
  person: Person;
  eventId: ID;
  ticketType: 'standard' | 'premium' | 'vip';
  checkedIn: boolean;
  checkedInAt?: string;
  registeredAt: string;
  intentions?: EventIntention[];
}

export interface Company {
  id: ID;
  name: string;
  industry: string;
  size: string;
  website?: string;
  location: string;
  description: string;
  logoInitials: string;
}

export interface CompanyMember {
  id: ID;
  person: Person;
  role: 'admin' | 'manager' | 'member';
  status: 'active' | 'invited' | 'suspended';
  joinedAt?: string;
}

export interface CompanyInvitation {
  id: ID;
  email: string;
  role: 'admin' | 'manager' | 'member';
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  invitedAt: string;
  expiresAt: string;
}
