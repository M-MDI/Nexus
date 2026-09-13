import type { PlatformStats, Subscription } from './types';
import { events } from './events';
import { people } from './people';

export const adminUsers = [
  { id: 'u1', person: { fullName: 'Sophie Martin', email: 'sophie.martin@example.com' }, plan: 'Premium', status: 'active' as const, joinedAt: '2025-06-12', eventsCount: 3 },
  { id: 'u2', person: { fullName: 'Karim Merabet', email: 'karim@greentech.example' }, plan: 'Gratuit', status: 'active' as const, joinedAt: '2025-08-01', eventsCount: 2 },
  { id: 'u3', person: { fullName: 'Sabrina Benali', email: 'sabrina@technova.example' }, plan: 'Entreprise', status: 'active' as const, joinedAt: '2025-07-20', eventsCount: 4 },
  { id: 'u4', person: { fullName: 'Thomas Dubois', email: 'thomas@euroventures.example' }, plan: 'Premium', status: 'trialing' as const, joinedAt: '2026-01-05', eventsCount: 1 },
  { id: 'u5', person: { fullName: 'Léa Fontaine', email: 'lea.fontaine@altarea.example' }, plan: 'Gratuit', status: 'active' as const, joinedAt: '2025-11-30', eventsCount: 1 },
  { id: 'u6', person: { fullName: 'Inès Cherif', email: 'ines.cherif@minera.example' }, plan: 'Gratuit', status: 'suspended' as const, joinedAt: '2025-09-14', eventsCount: 2 },
];

export const adminEvents = events.map(e => ({
  id: e.id,
  name: e.name,
  organizerName: e.organizerName,
  startsAt: e.startsAt,
  location: e.location,
  status: e.status,
  registeredCount: e.registeredCount ?? 0,
  capacity: e.capacity ?? null,
}));
