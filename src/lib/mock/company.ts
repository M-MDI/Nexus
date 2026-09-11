import type { Company, CompanyInvitation, CompanyMember, TokenPack, TokenTransaction } from './types';
import { people } from './people';

export const company: Company = {
  id: 'company-1',
  name: 'TechNova Solutions',
  industry: 'Conseil & Innovation',
  size: '51–200 collaborateurs',
  website: 'https://technova.fr',
  location: 'Paris, France',
  description:
    'TechNova accompagne les ETI et grands groupes dans leur transformation digitale, de la stratégie à l’exécution. Pôle innovation, data et partnerships B2B.',
  logoInitials: 'TN',
};

export const companyMembers: CompanyMember[] = [
  { id: 'cm1', person: people[1], role: 'admin', status: 'active', joinedAt: '2023-03-01' },
  { id: 'cm2', person: people[8], role: 'manager', status: 'active', joinedAt: '2024-01-15' },
  { id: 'cm3', person: people[4], role: 'member', status: 'active', joinedAt: '2024-06-20' },
  { id: 'cm4', person: people[5], role: 'member', status: 'invited', joinedAt: undefined },
  { id: 'cm5', person: people[9], role: 'member', status: 'active', joinedAt: '2025-02-10' },
];

export const companyInvitations: CompanyInvitation[] = [
  { id: 'ci1', email: 'marc.levy@technova.fr', role: 'member', status: 'pending', invitedAt: '2026-03-01', expiresAt: '2026-03-15' },
  { id: 'ci2', email: 'julia.ferrand@technova.fr', role: 'manager', status: 'pending', invitedAt: '2026-02-20', expiresAt: '2026-03-06' },
  { id: 'ci3', email: 'karim.benali@technova.fr', role: 'member', status: 'accepted', invitedAt: '2026-01-10', expiresAt: '2026-01-24' },
  { id: 'ci4', email: 'paul.girard@technova.fr', role: 'member', status: 'expired', invitedAt: '2025-12-01', expiresAt: '2025-12-15' },
];
