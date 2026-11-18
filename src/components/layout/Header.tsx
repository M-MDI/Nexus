import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Search, Bell, ChevronDown, User, Settings, LogOut
} from 'lucide-react';
import { auth } from '../../auth';

const breadcrumbs: Record<string, { label: string; path?: string }[]> = {
  '/dashboard': [{ label: 'Tableau de bord' }],
  '/profile': [{ label: 'ESPACE PERSONNEL' }, { label: 'Mon profil' }],
  '/business-card': [{ label: 'ESPACE PERSONNEL' }, { label: 'Ma carte digitale' }],
  '/network': [{ label: 'ESPACE PERSONNEL' }, { label: 'Mon réseau' }],
  '/messages': [{ label: 'ESPACE PERSONNEL' }, { label: 'Messages' }],
  '/meetings': [{ label: 'ESPACE PERSONNEL' }, { label: 'Rendez-vous' }],
  '/events/discover': [{ label: 'ÉVÉNEMENTS' }, { label: 'Découvrir les événements' }],
  '/events/my': [{ label: 'ÉVÉNEMENTS' }, { label: 'Mes événements' }],
  '/events/agenda': [{ label: 'ÉVÉNEMENTS' }, { label: 'Mon agenda' }],
  '/matching': [{ label: 'ÉVÉNEMENTS' }, { label: 'Matching professionnel' }],
  '/company': [{ label: 'ENTREPRISE' }, { label: 'Mon entreprise' }],
  '/company/collaborators': [{ label: 'ENTREPRISE' }, { label: 'Collaborateurs' }],
  '/company/invitations': [{ label: 'ENTREPRISE' }, { label: 'Invitations' }],
  '/company/tokens': [{ label: 'ENTREPRISE' }, { label: 'Jetons' }],
  '/organizer/events': [{ label: 'ORGANISATION' }, { label: 'Mes événements organisés' }],
  '/organizer/participants': [{ label: 'ORGANISATION' }, { label: 'Participants' }],
  '/organizer/program': [{ label: 'ORGANISATION' }, { label: 'Programme' }],
  '/organizer/attendance': [{ label: 'ORGANISATION' }, { label: 'Présences' }],
  '/organizer/statistics': [{ label: 'ORGANISATION' }, { label: 'Statistiques' }],
  '/admin/users': [{ label: 'ADMINISTRATION' }, { label: 'Gestion des utilisateurs' }],
  '/admin/events': [{ label: 'ADMINISTRATION' }, { label: 'Gestion des événements' }],
  '/admin/subscriptions': [{ label: 'ADMINISTRATION' }, { label: 'Souscriptions et offres' }],
  '/admin/statistics': [{ label: 'ADMINISTRATION' }, { label: 'Statistiques globales' }],
  '/settings/account': [{ label: 'PARAMÈTRES' }, { label: 'Paramètres du compte' }],
  '/settings/privacy': [{ label: 'PARAMÈTRES' }, { label: 'Confidentialité' }],
  '/settings/notifications': [{ label: 'PARAMÈTRES' }, { label: 'Notifications' }],
};

export function Header({ onPreviewSignOut }: { onPreviewSignOut?: () => void }) {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState(false);

  async function signOut() {
    if (onPreviewSignOut) {
      onPreviewSignOut();
      return;
    }

    setSigningOut(true);
    setSignOutError(false);
    try {
      const { error } = await auth.signOut({ scope: 'local' });
      if (error) throw error;
    } catch {
      setSignOutError(true);
    } finally {
      setSigningOut(false);
    }
  }

  const crumbs = breadcrumbs[location.pathname] || [{ label: 'Tableau de bord' }];

  return (
    <header className="sticky top-0 z-20 h-(--shell-header-height) shrink-0 lg:static bg-surface border-b border-border flex items-center justify-between gap-2 pl-16 pr-3 lg:px-6">
      {/* Breadcrumbs */}
      <div className="flex min-w-0 items-center gap-2 text-sm">
        {crumbs.map((crumb, index) => (
          <div key={index} className={index < crumbs.length - 1 ? "hidden lg:flex items-center gap-2" : "flex items-center gap-2"}>
            {index > 0 && <span aria-hidden="true" className="hidden text-muted-foreground lg:inline">/</span>}
            {crumb.path ? (
              <Link to={crumb.path} className="text-muted-foreground hover:text-foreground">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{crumb.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 md:gap-4">
        {/* Search */}
        <button aria-label="Rechercher" className="flex items-center gap-2 px-3 py-1.5 bg-surface-hover rounded-lg text-sm text-muted-foreground hover:text-foreground">
          <Search size={16} />
          <span className="hidden lg:inline">Rechercher...</span>
          <kbd className="hidden lg:inline px-1.5 py-0.5 text-xs bg-surface border border-border rounded">⌘K</kbd>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            aria-expanded={showNotifications}
            className="relative p-2 hover:bg-surface-hover rounded-lg"
          >
            <Bell size={20} className="text-icon" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          {showNotifications && (
            <div className="absolute right-[-3.5rem] mt-2 w-80 max-w-[calc(100vw-1.5rem)] bg-surface lg:right-0 border border-border rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              <div className="p-2">
                <div className="p-3 hover:bg-surface-hover rounded-lg cursor-pointer">
                  <p className="text-sm font-medium">Nouvelle demande de connexion</p>
                  <p className="text-xs text-muted-foreground">Karim Merabet veut se connecter</p>
                </div>
                <div className="p-3 hover:bg-surface-hover rounded-lg cursor-pointer">
                  <p className="text-sm font-medium">Rendez-vous confirmé</p>
                  <p className="text-xs text-muted-foreground">Réunion avec Sabrina Benali</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="Menu du compte"
            aria-expanded={showUserMenu}
            className="flex items-center gap-2 p-1.5 hover:bg-surface-hover rounded-lg"
          >
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              SM
            </div>
            <ChevronDown size={16} className="text-icon" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <p className="font-semibold text-sm">Sophie Martin</p>
                <p className="text-xs text-muted-foreground">sophie.martin@example.com</p>
              </div>
              <div className="p-2">
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-surface-hover rounded-lg">
                  <User size={16} /> Mon profil
                </Link>
                <Link to="/settings/account" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-surface-hover rounded-lg">
                  <Settings size={16} /> Paramètres
                </Link>
                <button type="button" onClick={signOut} disabled={signingOut}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-surface-hover rounded-lg disabled:cursor-wait disabled:text-disabled-foreground">
                  <LogOut size={16} /> Déconnexion
                </button>
                {signOutError && (
                  <p className="px-3 py-2 text-sm text-error" role="alert">La déconnexion a échoué. Réessayez.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
