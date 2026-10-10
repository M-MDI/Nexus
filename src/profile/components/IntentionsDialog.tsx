import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { NetworkingIntention } from '../types/profile';

interface IntentionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  intentions: NetworkingIntention[];
  onSave: (intentions: NetworkingIntention[]) => void;
}

export function IntentionsDialog({ isOpen, onClose, intentions, onSave }: IntentionsDialogProps) {
  const [items, setItems] = useState<NetworkingIntention[]>(intentions);

  useEffect(() => {
    if (isOpen) setItems(intentions);
  }, [isOpen, intentions]);

  function update(index: number, patch: Partial<NetworkingIntention>) {
    setItems(prev => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function add() {
    setItems(prev => [
      ...prev,
      { id: `intent-${Date.now()}`, type: 'offer', category: '', description: '' },
    ]);
  }

  function remove(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index));
  }

  const valid = items.every(i => i.category.trim().length > 0);

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Mes intentions professionnelles</DialogTitle>
          <DialogDescription>
            Décrivez ce que vous proposez et ce que vous recherchez pour vos événements.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="rounded-lg border border-border p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <Select
                  value={item.type}
                  onValueChange={v => update(index, { type: v as NetworkingIntention['type'] })}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="offer">Je propose</SelectItem>
                    <SelectItem value="seek">Je recherche</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => remove(index)} aria-label="Supprimer">
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor={`cat-${item.id}`}>Catégorie</Label>
                  <Input
                    id={`cat-${item.id}`}
                    value={item.category}
                    onChange={e => update(index, { category: e.target.value })}
                    placeholder="Ex. Conseil en innovation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`desc-${item.id}`}>Description</Label>
                  <Textarea
                    id={`desc-${item.id}`}
                    value={item.description}
                    onChange={e => update(index, { description: e.target.value })}
                    placeholder="Décrivez votre intention en quelques mots."
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={add} className="w-full">
            <Plus className="mr-2 size-4" /> Ajouter une intention
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={() => { onSave(items); onClose(); }} disabled={!valid}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
