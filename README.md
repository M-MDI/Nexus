# Nexus MVP — Authentification

```sh
npm ci
npm run dev
```

L’interface est disponible sur `http://localhost:5173`. Next.js utilise Turbopack avec `npm run dev` et `npm run build`. Lancez la version compilée avec `npm start`.

Sans configuration Supabase, le bouton **Se connecter** ouvre le tableau de bord de démonstration sans identifiants. Recharger la page ou se déconnecter ramène à la connexion. Une fois Supabase configuré, la page utilise le formulaire de connexion habituel.

## Activer Supabase Auth

1. Copiez `.env.example` vers `.env.local`. Renseignez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` avec l’URL du projet Supabase et sa clé publique **publishable**. Redémarrez Next.js après modification. Les clés serveur restent dans Supabase.
2. Activez le fournisseur e-mail et la confirmation des inscriptions. Dans la configuration des URL Supabase, ajoutez `http://localhost:5173/auth/callback` et `http://localhost:5173/auth/recovery` aux URL de redirection autorisées. Ajoutez les équivalents HTTPS de production et définissez la Site URL.
3. Activez Google dans Supabase Auth avec un client OAuth **Web application**. Dans Google Cloud, autorisez l’URI de retour indiquée par Supabase (généralement `https://<project-ref>.supabase.co/auth/v1/callback`). Le client et son secret se configurent dans Supabase. Pour un client Google en mode test, ajoutez les comptes de test autorisés.
4. Configurez l’envoi SMTP dans Supabase pour livrer les e-mails aux participants. Les modèles d’e-mail par défaut avec `{{ .ConfirmationURL }}` utilisent PKCE et le lien doit être ouvert dans le navigateur qui a lancé la demande. Pour permettre l’ouverture sur un autre appareil, utilisez les URL suivantes dans les modèles correspondants.

   - Confirmation d’inscription — `{{ .RedirectTo }}?token_hash={{ .TokenHash }}&amp;type=email`
   - Mot de passe oublié — `{{ .RedirectTo }}?token_hash={{ .TokenHash }}&amp;type=recovery`

[Configuration de Google](https://supabase.com/docs/guides/auth/social-sign-in/auth-google) · [Configuration des modèles d’e-mail](https://supabase.com/docs/guides/auth/auth-email-templates)

## Déployer sur Vercel

Importez le dépôt dans Vercel. Le fichier `vercel.json` sélectionne Next.js et définit les commandes d’installation et de compilation. Pour activer Supabase Auth, ajoutez les deux variables `NEXT_PUBLIC_SUPABASE_*` dans Vercel avant la compilation et autorisez les URL HTTPS de retour dans Supabase.
