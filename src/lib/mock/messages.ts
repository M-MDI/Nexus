import type { Conversation } from './types';
import { getPerson } from './people';

/**
 * Mock conversations. `getPerson` resolves people fixtures; messages are
 * grouped per connection so the messaging UI can render a realistic thread.
 */
export const conversations: Conversation[] = [
  {
    id: 'conv-karim',
    person: getPerson('p-karim'),
    lastMessage: 'Parfait, à demain à l’Espace Démos alors.',
    lastMessageAt: '2026-03-14T18:42:00',
    unreadCount: 0,
    meetingStatus: 'confirmed',
    messages: [
      { id: 'msg1', conversationId: 'conv-karim', senderId: 'me', senderName: 'Sophie Martin', text: 'Bonjour Karim, je vous ai repéré via le matching du Salon. Votre offre sur la réduction carbone m’intéresse.', sentAt: '2026-03-12T09:10:00', mine: true },
      { id: 'msg2', conversationId: 'conv-karim', senderId: 'p-karim', senderName: 'Karim Merabet', text: 'Bonjour Sophie, ravi de l’échange. Nous avons justement un pilote industriel à lancer au salon.', sentAt: '2026-03-12T09:24:00', mine: false },
      { id: 'msg3', conversationId: 'conv-karim', senderId: 'p-karim', senderName: 'Karim Merabet', text: 'Seriez-vous disponible pour un point de 30 min le 16 ? Je vous propose 14h à l’Espace Démos.', sentAt: '2026-03-12T09:25:00', mine: false },
      { id: 'msg4', conversationId: 'conv-karim', senderId: 'me', senderName: 'Sophie Martin', text: 'Oui, 14h me convient. J’ajoute le créneau à mon agenda.', sentAt: '2026-03-12T10:02:00', mine: true },
      { id: 'msg5', conversationId: 'conv-karim', senderId: 'p-karim', senderName: 'Karim Merabet', text: 'Parfait, à demain à l’Espace Démos alors.', sentAt: '2026-03-14T18:42:00', mine: false },
    ],
  },
  {
    id: 'conv-thomas',
    person: getPerson('p-thomas'),
    lastMessage: 'Je vous envoie le deck actualisé ce soir.',
    lastMessageAt: '2026-03-13T17:05:00',
    unreadCount: 2,
    meetingStatus: 'proposed',
    messages: [
      { id: 'msg6', conversationId: 'conv-thomas', senderId: 'me', senderName: 'Sophie Martin', text: 'Bonjour Thomas, suite à notre échange au Forum, je vous partage notre deck d’expansion.', sentAt: '2026-03-11T11:30:00', mine: true },
      { id: 'msg7', conversationId: 'conv-thomas', senderId: 'p-thomas', senderName: 'Thomas Dubois', text: 'Merci Sophie, je regarde ça avec attention. Vos métriques de rétention sont solides.', sentAt: '2026-03-13T16:40:00', mine: false },
      { id: 'msg8', conversationId: 'conv-thomas', senderId: 'p-thomas', senderName: 'Thomas Dubois', text: 'Je vous envoie le deck actualisé ce soir.', sentAt: '2026-03-13T17:05:00', mine: false },
    ],
  },
  {
    id: 'conv-omar',
    person: getPerson('p-omar'),
    lastMessage: 'La démo de la plateforme logistique sera au Hall 4.',
    lastMessageAt: '2026-03-13T12:15:00',
    unreadCount: 1,
    meetingStatus: 'confirmed',
    messages: [
      { id: 'msg9', conversationId: 'conv-omar', senderId: 'p-omar', senderName: 'Omar Haddad', text: 'Bonjour Sophie, confirmé pour la démo demain à 11h.', sentAt: '2026-03-13T11:00:00', mine: false },
      { id: 'msg10', conversationId: 'conv-omar', senderId: 'p-omar', senderName: 'Omar Haddad', text: 'La démo de la plateforme logistique sera au Hall 4.', sentAt: '2026-03-13T12:15:00', mine: false },
    ],
  },
];
