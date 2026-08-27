import '../styles.css';
import '../auth.css';
import '../profile/profile.css';

export const metadata = {
  title: 'Nexus',
  description: 'Connectez-vous à votre espace Nexus.',
  referrer: 'no-referrer',
};

export const viewport = {
  themeColor: '#eeeeee',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body><div id="root">{children}</div></body>
    </html>
  );
}
