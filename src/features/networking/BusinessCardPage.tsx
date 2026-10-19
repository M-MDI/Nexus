import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Copy, Download, Globe, Mail, MapPin, Phone, QrCode, Share2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PageHeader, PersonAvatar } from '@/components/shared';
import { getBusinessCard, getProfile, getPrivacySettings } from '@/profile/lib/mockData';
import type { BusinessCard as BusinessCardType, PrivacySettings, Profile } from '@/profile/types/profile';
import { currentUser } from '@/lib/mock/people';

const publicUrl = 'https://nexus.app/c/sophie-martin';

export function BusinessCardPage() {
  const [card, setCard] = useState<BusinessCardType | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [privacy, setPrivacy] = useState<PrivacySettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getBusinessCard(), getProfile(), getPrivacySettings()]).then(([b, p, s]) => {
      setCard(b);
      setProfile(p);
      setPrivacy(s);
      setLoading(false);
    });
  }, []);

  function copyLink() {
    navigator.clipboard?.writeText(publicUrl).catch(() => {});
    toast.success('Lien de la carte copié');
  }

  function shareCard() {
    if (navigator.share) {
      navigator.share({ title: card?.fullName, url: publicUrl }).catch(() => {});
    } else {
      copyLink();
    }
  }

  function downloadVcf() {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${card?.fullName ?? ''}`,
      `TITLE:${card?.title ?? ''}`,
      `ORG:${card?.company ?? ''}`,
      card?.email ? `EMAIL:${card.email}` : '',
      card?.phone ? `TEL:${card.phone}` : '',
      card?.website ? `URL:${card.website}` : '',
      `URL:${publicUrl}`,
      'END:VCARD',
    ].filter(Boolean).join('\r\n');
    const blob = new Blob([lines], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sophie-martin.vcf';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Carte de visite téléchargée (.vcf)');
  }

  if (loading || !card || !profile || !privacy) {
    return <div className="py-24 text-center text-sm text-muted-foreground">Chargement de la carte…</div>;
  }

  const person = {
    ...currentUser,
    ...profile,
    location: `${profile.location.city}, ${profile.location.country}`,
  };

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Ma carte digitale"
        description="Votre carte de visite professionnelle partageable par lien et QR code."
        actions={
          <>
            <Button variant="outline" onClick={copyLink}><Copy className="mr-2 size-4" />Copier le lien</Button>
            <Button variant="outline" onClick={shareCard}><Share2 className="mr-2 size-4" />Partager</Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Card preview */}
        <div className="lg:col-span-3">
          <Card className="gap-0 py-0">
            <div className="bg-linear-to-br from-brand-panel-end to-brand-indigo rounded-t-xl px-5 py-5 text-on-brand">
              <div className="flex items-center gap-4">
                <PersonAvatar person={person} size="lg" />
                <div>
                  <h2 className="text-xl font-semibold">{card.fullName}</h2>
                  <p className="text-sm">{card.title}</p>
                  <p className="text-sm">{card.company}</p>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              {profile.headline && (
                <p className="mb-4 text-sm text-muted-foreground">{profile.headline}</p>
              )}
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                {card.email && (
                  <p className="flex items-center gap-2 text-muted-foreground"><Mail className="size-4 shrink-0" /><span className="[overflow-wrap:anywhere]">{card.email}</span></p>
                )}
                {card.phone && (
                  <p className="flex items-center gap-2 text-muted-foreground"><Phone className="size-4 shrink-0" /><span className="[overflow-wrap:anywhere]">{card.phone}</span></p>
                )}
                {card.website && (
                  <p className="flex items-center gap-2 text-muted-foreground"><Globe className="size-4 shrink-0" /><span className="[overflow-wrap:anywhere]">{card.website}</span></p>
                )}
                {profile.location && (
                  <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="size-4" />{profile.location.city}, {profile.location.country}</p>
                )}
              </div>
              {profile.expertise.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="flex flex-wrap gap-1.5">
                    {profile.expertise.map(e => <Badge key={e} variant="secondary">{e}</Badge>)}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sharing tools */}

      </div>
    </div>
  );
}
