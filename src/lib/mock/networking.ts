import type { Connection, EventIntention, MatchSuggestion, Meeting, Participant } from './types';
import { people } from './people';
import { events } from './events';

const byId = (id: string) => people.find(p => p.id === id)!;

/** Intentions declared for the upcoming Salon Innovation 2026. */
export const eventIntentions: EventIntention[] = [
  { id: 'i1', eventId: 'ev-salon', type: 'offer', category: 'Conseil en innovation', description: 'Accompagnement stratégique en transformation digitale pour ETI.' },
  { id: 'i2', eventId: 'ev-salon', type: 'offer', category: 'Partenariats technologiques', description: 'Mise en relation avec des startups IA et data.' },
  { id: 'i3', eventId: 'ev-salon', type: 'seek', category: 'Investisseurs', description: 'Partenaires financiers pour projets d’expansion européenne.' },
  { id: 'i4', eventId: 'ev-salon', type: 'seek', category: 'Clients B2B industriels', description: 'Industriels cherchant des solutions d’innovation ouverte.' },
];

export const connections: Connection[] = [
  {
    id: 'c1',
    person: byId('p-karim'),
    status: 'accepted',
    connectedAt: '2025-08-15T10:00:00Z',
    eventId: 'ev-salon',
    eventName: 'Salon Innovation 2026',
    upcomingMeeting: { id: 'm1', title: 'Point partenariat GreenTech', startsAt: '2026-03-16T14:00:00', location: 'Espace Démos' },
  },
  {
    id: 'c2',
    person: byId('p-sabrina'),
    status: 'accepted',
    connectedAt: '2025-07-20T09:00:00Z',
    eventId: 'ev-summit',
    eventName: 'Tech Summit Europe',
  },
  {
    id: 'c3',
    person: byId('p-thomas'),
    status: 'pending',
    eventId: 'ev-maghreb',
    eventName: 'Forum Business Maghreb–Europe',
  },
  {
    id: 'c4',
    person: byId('p-lea'),
    status: 'requested',
    eventId: 'ev-salon',
    eventName: 'Salon Innovation 2026',
  },
  {
    id: 'c5',
    person: byId('p-omar'),
    status: 'accepted',
    connectedAt: '2026-01-10T11:00:00Z',
    eventId: 'ev-salon',
    eventName: 'Salon Innovation 2026',
  },
  {
    id: 'c6',
    person: byId('p-nicolas'),
    status: 'accepted',
    connectedAt: '2025-11-12T16:00:00Z',
    eventId: 'ev-summit',
    eventName: 'Tech Summit Europe',
  },
];

export const matchSuggestions: MatchSuggestion[] = [
  {
    id: 'ms1',
    person: byId('p-yassine'),
    score: 92,
    reasons: ['Propose une marketplace B2B export', 'Recherche des partenaires logistiques européens', 'Secteur complémentaire : ecommerce'],
    matchedOffer: 'Partenariats technologiques',
    matchedSeek: 'Clients B2B industriels',
    eventId: 'ev-salon',
    eventName: 'Salon Innovation 2026',
    status: 'new',
  },
  {
    id: 'ms2',
    person: byId('p-ines'),
    score: 84,
    reasons: ['Responsable RSE — reporting CSRD', 'Votre offre conseil en innovation correspond à son besoin de transition', 'Même secteur : industrie'],
    matchedOffer: 'Conseil en innovation',
    eventId: 'ev-salon',
    eventName: 'Salon Innovation 2026',
    status: 'new',
  },
  {
    id: 'ms3',
    person: byId('p-omar'),
    score: 78,
    reasons: ['CTO data & IA — correspond à votre recherche startups IA', 'Déjà connecté — suggestion pour un rendez-vous ciblé'],
    matchedSeek: 'Partenariats technologiques',
    eventId: 'ev-salon',
    eventName: 'Salon Innovation 2026',
    status: 'connected',
  },
  {
    id: 'ms4',
    person: byId('p-amina'),
    score: 64,
    reasons: ['Marketing santé — audience complémentaire', 'Recherche des solutions de communication B2B'],
    matchedSeek: 'Clients B2B industriels',
    eventId: 'ev-salon',
    eventName: 'Salon Innovation 2026',
    status: 'requested',
  },
  {
    id: 'ms5',
    person: byId('p-claire'),
    score: 58,
    reasons: ['DRH banque — recrutement tech en cours', 'Secteur finance : synergies possibles avec vos clients'],
    eventId: 'ev-greentech',
    eventName: 'GreenTech Forum',
    status: 'new',
  },
];
