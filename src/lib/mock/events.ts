import type { Event } from './types';

/**
 * Mock event catalogue. `myStatus`/`myRole` simulate the current user's
 * relationship to each event.
 */

export const events: Event[] = [
  {
    id: 'ev-salon',
    name: 'Salon Innovation 2026',
    description:
      'Le salon de référence pour les décideurs qui veulent anticiper les ruptures technologiques. Trois jours de conférences, d’ateliers pratiques et de matchmaking ciblé entre porteurs de projets et partenaires industriels.',
    startsAt: '2026-03-15',
    endsAt: '2026-03-17',
    location: 'Paris Expo, Porte de Versailles',
    city: 'Paris',
    organizerName: 'Nexus Events',
    organizerId: 'org-nexus',
    status: 'published',
    capacity: 1200,
    registeredCount: 864,
    priceLabel: 'Pass visiteur gratuit',
    tags: ['Innovation', 'B2B', 'Matchmaking'],
    myStatus: 'registered',
    myRole: 'participant',
    sessions: [
      {
        id: 's1',
        title: 'Ouverture — L’innovation ouverte en Europe',
        description: 'Table ronde d’ouverture avec les directions innovation de grands groupes.',
        startTime: '2026-03-15T09:00:00',
        endTime: '2026-03-15T10:30:00',
        location: 'Auditorium A',
        speakerName: 'Claire Rousseau',
        track: 'Plénière',
      },
      {
        id: 's2',
        title: 'Atelier — Matching professionnel assisté',
        description: 'Première utilisation de Nexus : intentions, suggestions et prise de rendez-vous.',
        startTime: '2026-03-15T11:00:00',
        endTime: '2026-03-15T12:30:00',
        location: 'Espace Démos',
        speakerName: 'Équipe Nexus',
        track: 'Atelier',
      },
      {
        id: 's3',
        title: 'Conférence — IA responsable en entreprise',
        description: 'Cadre juridique, éthique et déploiement concret de l’IA en contexte B2B.',
        startTime: '2026-03-16T14:00:00',
        endTime: '2026-03-16T15:30:00',
        location: 'Auditorium B',
        speakerName: 'Omar Haddad',
        track: 'Conférence',
      },
      {
        id: 's4',
        title: 'Speed networking — Énergie & industrie',
        description: 'Sessions courtes de mise en relation organisées par affinités sectorielles.',
        startTime: '2026-03-17T10:00:00',
        endTime: '2026-03-17T11:30:00',
        location: 'Hall 4',
        track: 'Networking',
      },
    ],
    documents: [
      { id: 'd1', name: 'Guide du participant', kind: 'pdf', url: '#' },
      { id: 'd2', name: 'Plan du salon', kind: 'link', url: '#' },
      { id: 'd3', name: 'Règlement intérieur', kind: 'pdf', url: '#' },
    ],
  },
];

export function getEvent(id: string): Event | undefined {
  return events.find(e => e.id === id);
}
