# Event Matcher — Vision et périmètre MVP

## Vision

Event Matcher est une plateforme SaaS de networking B2B pour les événements professionnels. Elle aide les participants à identifier des contacts pertinents, à échanger avec leur accord et à organiser des rendez-vous. Elle donne aux organisateurs un espace pour préparer leur événement, accueillir les participants et suivre les résultats essentiels.

Le profil utilisateur constitue le centre du produit. Il relie l’identité professionnelle, la carte de visite digitale, l’entreprise, les événements auxquels la personne participe et les rencontres qu’elle réalise.

L’objectif du MVP est de permettre de commercialiser et d’exploiter un premier événement de bout en bout, avec un parcours simple sur ordinateur et mobile.

## Problème à résoudre

Lors d’un événement professionnel, les participants disposent de peu de temps pour découvrir les bonnes personnes, comprendre ce qu’elles recherchent et convenir d’un échange. Les informations se dispersent entre cartes de visite, listes d’inscrits et conversations.

Event Matcher rassemble ces informations dans un même espace et accompagne le parcours depuis l’inscription jusqu’à la rencontre et au suivi du contact.

## Valeur pour les utilisateurs

- Le participant présente son activité, précise ce qu’il propose et recherche, découvre les autres inscrits et organise ses rencontres.
- L’organisateur prépare son événement, gère les inscriptions et consulte les indicateurs nécessaires à son déroulement.
- L’entreprise rattache ses collaborateurs à son identité professionnelle au moyen de jetons et d’invitations.
- L’administrateur de la plateforme assure la gestion opérationnelle minimale des comptes et des événements.

Les rôles s’appliquent dans leur contexte. Une même personne peut organiser un événement et participer à un autre. Le profil reste commun, tandis que les accès et la visibilité dépendent de l’événement concerné.

## Périmètre fonctionnel MVP

Le découpage MVP communiqué par Fouad constitue la référence de livraison. Les éléments ci-dessous traduisent les huit blocs de base en un périmètre de travail. Les détails signalés à la fin du document demandent encore une validation métier.

### Compte et authentification

- Création de compte par e-mail et mot de passe.
- Confirmation de l’adresse e-mail.
- Connexion par e-mail ou Google.
- Récupération et réinitialisation du mot de passe.
- Gestion de session et déconnexion.

### Profil professionnel

- Identité, photo, fonction, entreprise et coordonnées.
- Informations utiles à la présentation et à la recherche de contacts.
- Préférences de visibilité et consentement au partage.
- Association du profil aux participations et aux rôles dans les événements.

### Carte de visite digitale de base

- Carte créée à partir du profil professionnel.
- Page de consultation par lien public, selon les informations que l’utilisateur accepte de publier.
- Partage par lien et QR code.
- Export du contact au format VCF.
- Répertoire personnel pour retrouver les contacts enregistrés.

### Jeton et compte entreprise de base

- Compte entreprise avec son identité et ses informations essentielles.
- Attribution de jetons permettant le rattachement de collaborateurs.
- Invitation par e-mail et acceptation par le collaborateur.
- Identification du rattachement entreprise sur le profil.
- Gestion minimale des invitations, des membres et des jetons disponibles.

La signification commerciale du jeton, sa durée de validité et les règles de restitution doivent être définies avant l’implémentation de ce module.

### Événement de base

- Création et modification des informations principales, dont le nom, les dates, le lieu, la description et l’organisateur.
- Page de présentation et parcours d’inscription.
- Liste des participants et gestion de leur accès à l’événement.
- Programme simple présentant les sessions et leurs horaires.
- Documents d’accueil utiles aux participants.
- Contrôle de présence de base et consultation des présences.

### Networking, matching et rendez-vous de base

- Annuaire des participants ayant accepté d’y apparaître.
- Intentions professionnelles « Je propose » et « Je recherche » définies dans le contexte de l’événement.
- Suggestions de contacts fondées sur la correspondance entre les intentions, avec une explication compréhensible.
- Demande de mise en relation et acceptation par le destinataire.
- Messagerie interne après acceptation de la mise en relation.
- Demande de rendez-vous avec choix d’un créneau disponible.
- Acceptation, refus, contre-proposition, annulation et expiration des demandes de rendez-vous.
- Agenda personnel et notifications essentielles.
- Favoris privés pour retrouver les contacts.

Le cahier des charges décrit un enchaînement où l’acceptation du match précède la demande de rendez-vous. Ce parcours sert de base métier au MVP.

### Pilotage et monétisation de base

- Vue organisateur des inscriptions et des présences.
- Comptage des mises en relation et des rendez-vous pour comprendre l’utilisation de l’événement.
- Visibilité pour le participant sur ses propres demandes et rendez-vous.
- Gestion des droits d’accès liés aux offres commercialisées.
- Suivi minimal des souscriptions et des packs de jetons.

Le modèle commercial envisagé comprend une offre organisateur par événement, une offre individuelle Premium et des packs de jetons entreprise. Les tarifs, quotas, moyens de paiement et modalités de facturation restent à préciser pour la première vente.

### Confidentialité et sécurité de base

- Consentement explicite à la visibilité du profil dans l’annuaire et au partage des informations.
- Application des droits d’accès côté serveur, selon le compte, l’entreprise et l’événement.
- Protection des données personnelles et des échanges.
- Possibilité de demander l’accès à ses données et leur suppression.
- Favoris accessibles uniquement à leur propriétaire.
- Statistiques agrégées pour les bilans organisateurs lorsque l’identification individuelle est inutile.
- Respect de l’interdiction de revente des contacts exprimée dans les documents de référence.

Le cahier des charges demande de prendre en compte la loi marocaine 09-08 et la CNDP. Les obligations applicables, les formalités, les durées de conservation et les choix d’hébergement devront être validés avant la mise en production. Ce document exprime une exigence produit et ne constitue pas une validation juridique.

## Parcours principal du participant

1. Créer son compte ou se connecter avec Google.
2. Compléter son profil professionnel et sa carte digitale.
3. Rejoindre un événement et choisir ses préférences de visibilité.
4. Renseigner ce qu’il propose et ce qu’il recherche pour cet événement.
5. Consulter l’annuaire et les suggestions de contacts.
6. Envoyer ou accepter une demande de mise en relation.
7. Échanger et proposer un rendez-vous sur un créneau disponible.
8. Participer au rendez-vous et retrouver le contact dans son espace personnel.

## Parcours principal de l’organisateur

1. Accéder à l’offre organisateur.
2. Créer l’événement et renseigner ses informations principales.
3. Publier la page de présentation et ouvrir les inscriptions.
4. Préparer le programme et les documents d’accueil.
5. Suivre les inscriptions et gérer les accès.
6. Contrôler les présences pendant l’événement.
7. Consulter un bilan des inscriptions, présences, mises en relation et rendez-vous.

## Principes de conception

- Un profil cohérent accompagne la personne dans tous ses événements.
- Chaque écran facilite une action identifiable et fournit un retour clair.
- Les formulaires restent courts et indiquent les erreurs près de l’action concernée.
- Les parcours fonctionnent sur mobile et ordinateur, avec navigation au clavier et libellés accessibles.
- Les permissions sont contrôlées sur le serveur et les choix de confidentialité sont respectés dans chaque vue.
- Le matching de base repose sur des règles explicables à partir des intentions des participants.
- L’interface actuelle utilise le français. Les langues à livrer au lancement doivent être confirmées à partir du besoin multilingue du cahier des charges.

## Conditions de réussite du premier événement

Le MVP est prêt à être exploité lorsque les parcours suivants sont vérifiés avec des services réels et des comptes de test représentatifs.

- Un participant peut créer son compte, le confirmer, se connecter et récupérer son accès.
- Il peut compléter son profil et partager sa carte digitale.
- Un organisateur peut publier un événement et recevoir des inscriptions.
- Les participants autorisés peuvent consulter le programme et accéder à l’annuaire selon leur consentement.
- Une mise en relation peut être acceptée, suivie d’un échange et d’un rendez-vous sans conflit de créneau.
- L’organisateur peut enregistrer les présences et obtenir un bilan exploitable.
- Les accès entreprise et les jetons suivent les règles commerciales retenues.
- Les données privées restent accessibles aux seules personnes autorisées.
- Les modalités de vente et de paiement choisies permettent de commercialiser le premier événement.

Les objectifs chiffrés de participation, d’acceptation des matchs et de rendez-vous réalisés seront fixés avec l’organisateur du premier événement.

## État actuel du projet

À la date du 22 novembre 2026, le projet contient les écrans de connexion, inscription, récupération et réinitialisation du mot de passe, ainsi que l’intégration Google via Supabase Auth et une page de confirmation de connexion.

Le socle utilise React, Next.js avec Turbopack et Supabase Auth. L’interface est en français et s’adapte aux écrans mobiles et desktop. La compilation et les parcours d’authentification ont été vérifiés avec des réponses Supabase simulées.

La connexion Google et la livraison des e-mails en conditions réelles dépendent encore de la configuration du projet Supabase, du client OAuth Google et de l’envoi SMTP. Le fichier README.md décrit cette configuration.

Les autres modules décrits dans ce document constituent le périmètre produit à réaliser.

## Décisions métier à préciser

- Nombre d’intentions autorisées par participant et par événement. Le cahier des charges indique jusqu’à trois choix, tandis qu’un schéma en indique cinq.
- Champs obligatoires du profil et informations publiques de la carte.
- Rôles nécessaires au premier événement et actions autorisées pour chacun.
- Règles de consommation, expiration et restitution des jetons entreprise.
- Tarifs, quotas et droits des offres commerciales du MVP.
- Modalités de paiement et de facturation du premier événement.
- Modalités du contrôle de présence de base.
- Langues à prendre en charge dès le lancement.
- Politique de conservation, hébergement et modalités de traitement des demandes relatives aux données personnelles.

## Références du projet

- E-mail de Fouad Sayagh communiqué dans la conversation, avec le découpage MVP/V1.
- Cahier des Charges (2).pdf fourni par l’utilisateur.
- Schémas fonctionnels fournis, présentant le profil comme point central de la plateforme.
- Décision de l’utilisateur de concentrer le travail sur le MVP.
- DESIGN.md pour le brief de référence visuelle.

Le nom du dossier de travail est V2-Event-Matcher. Le périmètre de livraison décrit ici est le MVP/V1.
