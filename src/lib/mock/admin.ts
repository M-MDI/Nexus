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

export const subscriptions: Subscription[] = [
  { id: 'sub1', plan: 'Offre Organisateur — Salon Innovation 2026', status: 'active', renewsAt: '2026-03-20', priceLabel: '4 900 MAD', ownerName: 'Nexus Events', ownerEmail: 'contact@nexus-events.example' },
  { id: 'sub2', plan: 'Premium individuel', status: 'active', renewsAt: '2026-12-01', priceLabel: '29 MAD/mois', ownerName: 'Sophie Martin', ownerEmail: 'sophie.martin@example.com' },
  { id: 'sub3', plan: 'Pack Jetons — 100 crédits', status: 'active', renewsAt: undefined, priceLabel: '1 590 MAD', ownerName: 'TechNova Solutions', ownerEmail: 'contact@technova.fr' },
  { id: 'sub4', plan: 'Premium individuel', status: 'trialing', renewsAt: '2026-04-05', priceLabel: '29 MAD/mois', ownerName: 'Thomas Dubois', ownerEmail: 'thomas@euroventures.example' },
  { id: 'sub5', plan: 'Offre Organisateur — GreenTech Forum', status: 'past_due', renewsAt: '2026-06-01', priceLabel: '3 900 MAD', ownerName: 'GreenTech Cluster', ownerEmail: 'hello@greentech-cluster.example' },
];

export const platformStats: PlatformStats = {
  totalUsers: 1284,
  totalEvents: 46,
  totalMatches: 3912,
  totalMeetings: 1876,
  activeSubscriptions: 212,
  monthlyGrowth: [
    { label: 'Sep', users: 820, events: 28 },
    { label: 'Oct', users: 940, events: 31 },
    { label: 'Nov', users: 1050, events: 36 },
    { label: 'Déc', users: 1180, events: 39 },
    { label: 'Jan', users: 1240, events: 42 },
    { label: 'Fév', users: 1284, events: 46 },
  ],
};
