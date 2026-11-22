export function EventsDiscoverPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Découvrir les événements</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover text-sm font-medium">
          Filtres
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-surface border border-border rounded-xl p-6">
            <div className="h-32 bg-surface-hover rounded-lg mb-4"></div>
            <h3 className="font-semibold text-foreground mb-2">Événement {i}</h3>
            <p className="text-sm text-muted-foreground mb-4">Description de l'événement...</p>
            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover text-sm font-medium">
              S'inscrire
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EventsMyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Mes événements</h1>
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-muted-foreground">Vos événements inscrits apparaîtront ici.</p>
      </div>
    </div>
  );
}

export function EventsAgendaPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Mon agenda</h1>
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-muted-foreground">Votre agenda professionnel apparaîtra ici.</p>
      </div>
    </div>
  );
}

export function MatchingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Matching professionnel</h1>
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-muted-foreground">Suggestions de matching professionnel.</p>
      </div>
    </div>
  );
}
