import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar, Users, MessageSquare, TrendingUp, ArrowRight,
  Clock, UserPlus, CheckCircle, AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      {state?.passwordUpdated && (
        <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800" role="status">
          Votre mot de passe a été mis à jour.
        </p>
      )}
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Bonjour, Sophie
          </h1>
          <p className="text-muted-foreground">
            Bienvenue sur Nexus. Voici votre tableau de bord professionnel.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            icon={Calendar}
            label="Événements à venir"
            value="3"
            trend="+1 ce mois"
            trendUp={true}
          />
          <KpiCard
            icon={Users}
            label="Connexions acceptées"
            value="24"
            trend="+3 cette semaine"
            trendUp={true}
          />
          <KpiCard
            icon={MessageSquare}
            label="Messages non lus"
            value="5"
            trend="-2 hier"
            trendUp={false}
          />
          <KpiCard
            icon={TrendingUp}
            label="Matching score"
            value="87%"
            trend="+5% cette semaine"
            trendUp={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Événements à venir</h2>
              <Link to="/events/my" className="text-sm text-primary hover:underline flex items-center gap-1">
                Voir tout <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              <EventCard
                title="Salon Innovation 2026"
                date="15 mars 2026"
                location="Paris Expo"
                status="upcoming"
              />
              <EventCard
                title="Tech Summit Europe"
                date="10 novembre 2025"
                location="Berlin"
                status="upcoming"
              />
            </div>

            {/* Pending Connections */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Demandes en attente</h2>
                <Link to="/network" className="text-sm text-primary hover:underline flex items-center gap-1">
                  Voir tout <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                <ConnectionRequest
                  name="Karim Merabet"
                  title="CEO"
                  company="GreenTech Solutions"
                />
                <ConnectionRequest
                  name="Thomas Dubois"
                  title="Investisseur"
                  company="EuroVentures"
                />
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Profile Completion */}
            <div className="bg-surface border border-border rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-3">Profil complété</h3>
              <div className="w-full bg-surface-hover rounded-full h-2 mb-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-muted-foreground">75% complété</p>
              <Link to="/profile" className="mt-3 block text-sm text-primary hover:underline">
                Compléter mon profil
              </Link>
            </div>

            {/* Upcoming Meetings */}
            <div className="bg-surface border border-border rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-3">Prochains rendez-vous</h3>
              <div className="space-y-3">
                <MeetingCard
                  title="Réunion avec Karim"
                  time="14:30"
                  date="5 décembre"
                />
                <MeetingCard
                  title="Appel avec Sabrina"
                  time="10:00"
                  date="8 décembre"
                />
              </div>
              <Link to="/meetings" className="mt-3 block text-sm text-primary hover:underline">
                Voir mon agenda
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface border border-border rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-3">Actions rapides</h3>
              <div className="space-y-2">
                <QuickAction to="/events/discover" label="Découvrir des événements" />
                <QuickAction to="/network" label="Trouver des contacts" />
                <QuickAction to="/business-card" label="Partager ma carte" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function KpiCard({ icon: Icon, label, value, trend, trendUp }: {
  icon: any;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon size={20} className="text-primary" />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-semibold text-foreground">{value}</p>
      <p className={cn(
        "text-xs mt-1",
        trendUp ? "text-green-600" : "text-red-600"
      )}>
        {trend}
      </p>
    </div>
  );
}

function EventCard({ title, date, location, status }: {
  title: string;
  date: string;
  location: string;
  status: 'upcoming' | 'past';
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {location}
            </span>
          </div>
        </div>
        <span className={cn(
          "px-2 py-1 text-xs rounded-full font-medium",
          status === 'upcoming' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
        )}>
          {status === 'upcoming' ? 'À venir' : 'Passé'}
        </span>
      </div>
    </div>
  );
}

function ConnectionRequest({ name, title, company }: {
  name: string;
  title: string;
  company: string;
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{title} • {company}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-hover">
          Accepter
        </button>
        <button className="px-3 py-1.5 text-sm bg-surface-hover text-foreground rounded-lg hover:bg-border">
          Refuser
        </button>
      </div>
    </div>
  );
}

function MeetingCard({ title, time, date }: {
  title: string;
  time: string;
  date: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-surface-hover rounded-lg">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Calendar size={16} className="text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{date} à {time}</p>
      </div>
    </div>
  );
}

function QuickAction({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-surface-hover rounded-lg transition-colors"
    >
      <ArrowRight size={16} className="text-muted-foreground" />
      {label}
    </Link>
  );
}
