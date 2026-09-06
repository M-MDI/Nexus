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
