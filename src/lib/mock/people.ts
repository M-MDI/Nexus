import type { DirectoryProfile, Person } from './types';

/**
 * Directory of professional contacts used across networking, matching,
 * messages and meetings screens. Mock data only.
 */

export const people: Person[] = [
  {
    id: 'p-karim',
    fullName: 'Karim Merabet',
    title: 'CEO & Co-fondateur',
    company: 'GreenTech Solutions',
    location: 'Paris, France',
    email: 'karim@greentech.example',
    phone: '+33 6 11 22 33 44',
    website: 'https://greentech.example',
    headline: 'Réduire l’empreinte carbone des entreprises industrielles.',
    industry: 'Énergie',
    expertise: ['Énergies renouvelables', 'B2B industriel', 'Levées de fonds'],
  },
  {
    id: 'p-sabrina',
    fullName: 'Sabrina Benali',
    title: 'Directrice Innovation',
    company: 'TechNova',
    location: 'Lyon, France',
    email: 'sabrina@technova.example',
    headline: 'Accompagne la transformation digitale des ETI.',
    industry: 'Conseil',
    expertise: ['Transformation digitale', 'Conduite du changement'],
  },
  {
    id: 'p-thomas',
    fullName: 'Thomas Dubois',
    title: 'Associé investisseur',
    company: 'EuroVentures',
    location: 'Genève, Suisse',
    email: 'thomas@euroventures.example',
    headline: 'Investit dans les startups B2B late-stage en Europe.',
    industry: 'Finance',
    expertise: ['Capital-investissement', 'Scaling B2B'],
  },
  {
    id: 'p-lea',
    fullName: 'Léa Fontaine',
    title: 'Responsable Achats',
    company: 'Groupe Altarea Industries',
    location: 'Marseille, France',
    email: 'lea.fontaine@altarea.example',
    headline: 'Pilote les achats IT et innovation du groupe.',
    industry: 'Industrie',
    expertise: ['Achats stratégiques', 'Innovation ouverte'],
  },
  {
    id: 'p-omar',
    fullName: 'Omar Haddad',
    title: 'CTO',
    company: 'DataPulse',
    location: 'Tunis, Tunisie',
    email: 'omar@datapulse.example',
    headline: 'Infrastructure data et IA pour la logistique.',
    industry: 'Technologie',
    expertise: ['Data engineering', 'IA appliquée', 'Cloud'],
  },
  {
    id: 'p-claire',
    fullName: 'Claire Rousseau',
    title: 'Directrice RH',
    company: 'Banque Meridian',
    location: 'Bruxelles, Belgique',
    email: 'claire.rousseau@meridian.example',
    headline: 'Recrutement et marque employeur dans la finance.',
    industry: 'Finance',
    expertise: ['Recrutement', 'QVT', 'Marque employeur'],
  },
  {
    id: 'p-yassine',
    fullName: 'Yassine Alaoui',
    title: 'Fondateur',
    company: 'SoukConnect',
    location: 'Casablanca, Maroc',
    email: 'yassine@soukconnect.example',
    headline: 'Marketplace B2B pour les artisans du Maghreb.',
    industry: 'E-commerce',
    expertise: ['Marketplace', 'Export', 'Artisanat'],
  },
  {
    id: 'p-ines',
    fullName: 'Inès Cherif',
    title: 'Responsable RSE',
    company: 'Société Minera',
    location: 'Alger, Algérie',
    email: 'ines.cherif@minera.example',
    headline: 'Stratégie RSE et reporting extra-financier.',
    industry: 'Mines & Ressources',
    expertise: ['RSE', 'Reporting CSRD', 'Relations institutionnelles'],
  },
  {
    id: 'p-nicolas',
    fullName: 'Nicolas Petit',
    title: 'VP Partenariats',
    company: 'CloudAtlas',
    location: 'Paris, France',
    email: 'nicolas@cloudatlas.example',
    headline: 'Développe l’écosystème de partenaires CloudAtlas.',
    industry: 'SaaS',
    expertise: ['Partenariats', 'Channel', 'SaaS B2B'],
  },
];

export function getPerson(id: string): Person | undefined {
  return people.find(p => p.id === id);
}

/** The signed-in demo user (Sophie Martin). */
export const currentUser: Person = {
  id: 'me',
  fullName: 'Sophie Martin',
  title: 'Directrice Innovation',
  company: 'TechNova Solutions',
  location: 'Paris, France',
  email: 'sophie.martin@example.com',
  phone: '+33 6 12 34 56 78',
  website: 'https://technova.fr',
  headline: 'Transformer les entreprises par l’innovation technologique.',
  industry: 'Technologie',
  expertise: ['Transformation digitale', 'Innovation ouverte'],
};

/** Event directory — public listing with per-user registration status. */
export const directoryProfiles: DirectoryProfile[] = people.slice(0, 8).map((person, i) => ({
  ...person,
  visibleInDirectory: true,
  appearInSuggestions: i % 3 !== 2,
  connectionStatus: (['accepted', 'pending', 'requested', 'none', 'accepted', 'none', 'pending', 'none'] as const)[i],
  isFavorite: i === 0 || i === 4,
}));
