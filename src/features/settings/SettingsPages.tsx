export function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Paramètres du compte</h1>
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-muted-foreground">Paramètres du compte apparaîtront ici.</p>
      </div>
    </div>
  );
}

export function SettingsPrivacyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Confidentialité</h1>
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-muted-foreground">Paramètres de confidentialité apparaîtront ici.</p>
      </div>
    </div>
  );
}

export function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Notifications</h1>
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-muted-foreground">Préférences de notification apparaîtront ici.</p>
      </div>
    </div>
  );
}
