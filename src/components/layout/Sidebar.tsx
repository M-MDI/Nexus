import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, User, IdCard, Users, MessageSquare, Calendar,
  Search, CalendarDays, Settings, ChevronDown, ChevronRight, Menu, X,
  BarChart3, Building2, UsersRound, Wallet, FileText, ClipboardList,
  Shield, Bell, UserCog, TrendingUp, FolderOpen
} from 'lucide-react';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.png';

interface NavItem {
  label: string;
  icon: any;
  path: string;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'ESPACE PERSONNEL',
    items: [
      { label: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard' },
      { label: 'Mon profil', icon: User, path: '/profile' },
      { label: 'Ma carte digitale', icon: IdCard, path: '/business-card' },
      { label: 'Mon réseau', icon: Users, path: '/network' },
      { label: 'Messages', icon: MessageSquare, path: '/messages', badge: 3 },
      { label: 'Rendez-vous', icon: Calendar, path: '/meetings' },
    ],
  },
  {
    title: 'ÉVÉNEMENTS',
    items: [
      { label: 'Découvrir les événements', icon: Search, path: '/events/discover' },
      { label: 'Mes événements', icon: CalendarDays, path: '/events/my' },
      { label: 'Mon agenda', icon: Calendar, path: '/events/agenda' },
      { label: 'Matching professionnel', icon: UsersRound, path: '/matching' },
    ],
  },
  {
    title: 'ENTREPRISE',
    items: [
      { label: 'Mon entreprise', icon: Building2, path: '/company' },
      { label: 'Collaborateurs', icon: Users, path: '/company/collaborators' },
      { label: 'Invitations', icon: MessageSquare, path: '/company/invitations' },
      { label: 'Jetons', icon: Wallet, path: '/company/tokens' },
    ],
  },
  {
    title: 'ORGANISATION',
    items: [
      { label: 'Mes événements organisés', icon: CalendarDays, path: '/organizer/events' },
      { label: 'Participants', icon: Users, path: '/organizer/participants' },
      { label: 'Programme', icon: FileText, path: '/organizer/program' },
      { label: 'Présences', icon: ClipboardList, path: '/organizer/attendance' },
      { label: 'Statistiques', icon: BarChart3, path: '/organizer/statistics' },
    ],
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { label: 'Gestion des utilisateurs', icon: UserCog, path: '/admin/users' },
      { label: 'Gestion des événements', icon: CalendarDays, path: '/admin/events' },
      { label: 'Souscriptions et offres', icon: Wallet, path: '/admin/subscriptions' },
      { label: 'Statistiques globales', icon: TrendingUp, path: '/admin/statistics' },
    ],
  },
  {
    title: 'PARAMÈTRES',
    items: [
      { label: 'Paramètres du compte', icon: Settings, path: '/settings/account' },
      { label: 'Confidentialité', icon: Shield, path: '/settings/privacy' },
      { label: 'Notifications', icon: Bell, path: '/settings/notifications' },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['ESPACE PERSONNEL', 'ÉVÉNEMENTS']);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Ouvrir la navigation"
          aria-expanded={false}
          className="lg:hidden fixed top-[calc((var(--shell-header-height)-2.375rem)/2)] left-4 z-50 p-2 bg-surface text-icon border border-control rounded-lg"
        >
          <Menu size={20} />
        </button>
      )}

      <aside className={cn(
        "fixed lg:relative z-40 h-dvh bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-200",
        collapsed ? "w-[64px]" : "w-[240px]",
        mobileOpen ? "translate-x-0" : "invisible -translate-x-full lg:visible lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={cn(
            "flex items-center gap-3 px-4 h-(--shell-header-height) shrink-0 border-b border-border",
            collapsed && "justify-center px-2"
          )}>
            <img src={logo.src} alt="Nexus" className={cn("nexus-logo h-8 w-auto", collapsed && "h-6")} />
            {!collapsed && (
              <button
                onClick={() => mobileOpen ? setMobileOpen(false) : setCollapsed(true)}
                aria-label={mobileOpen ? "Fermer la navigation" : "Réduire la navigation"}
                className="ml-auto p-1 hover:bg-surface-hover rounded"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-3">
            {navSections.map(section => (
              <div key={section.title} className="mb-2">
                {!collapsed && (
                  <button
                    onClick={() => toggleSection(section.title)}
                    aria-expanded={expandedSections.includes(section.title)}
                    className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:bg-surface-hover"
                  >
                    {section.title}
                    {expandedSections.includes(section.title) ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </button>
                )}
                {expandedSections.includes(section.title) && (
                  <div className="space-y-1 px-2">
                    {section.items.map(item => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          aria-current={active ? "page" : undefined}
                          aria-label={collapsed ? item.label : undefined}
                          className={cn(
                            "flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-colors",
                            active
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium inset-shadow-[2px_0_0_var(--selected-indicator)]"
                              : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
                            collapsed && "justify-center px-2"
                          )}
                        >
                          <Icon size={18} className="flex-shrink-0" />
                          {!collapsed && (
                            <>
                              <span className="min-w-0 flex-1 break-words">{item.label}</span>
                              {item.badge && (
                                <span className="px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User menu */}
          <div className="shrink-0 border-t border-border px-4 py-3">
            <div className={cn(
              "flex items-center gap-3",
              collapsed && "justify-center"
            )}>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                SM
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Sophie Martin</p>
                  <p className="text-xs text-muted-foreground truncate">Directrice Innovation</p>
                </div>
              )}
            </div>
            {collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                aria-label="Développer la navigation"
                className="w-full mt-4 flex justify-center p-1 hover:bg-surface-hover rounded"
              >
                <Menu size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-scrim z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
