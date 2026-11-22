import { useState } from 'react';
import { X, Camera, Plus, Trash } from '@phosphor-icons/react';
import type { EditableProfileFields } from '../types/profile';

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditableProfileFields) => void;
  initialData: EditableProfileFields;
}

export function EditProfileDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditProfileDialogProps) {
  const [formData, setFormData] = useState<EditableProfileFields>(initialData);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  if (!isOpen) return null;

  const handleChange = <Field extends keyof EditableProfileFields>(
    field: Field,
    value: EditableProfileFields[Field]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleTagAdd = (field: 'expertise' | 'interests', value: string) => {
    if (!value.trim()) return;
    const current = formData[field] as string[];
    if (!current.includes(value.trim())) {
      handleChange(field, [...current, value.trim()]);
    }
  };

  const handleTagRemove = (field: 'expertise' | 'interests', index: number) => {
    const current = formData[field] as string[];
    handleChange(field, current.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setUnsavedChanges(false);
    onClose();
  };

  const handleClose = () => {
    if (unsavedChanges) {
      if (confirm('Vous avez des modifications non enregistrées. Voulez-vous vraiment fermer ?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content modal-large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Modifier mon profil</h2>
          <button className="btn-icon" onClick={handleClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-section">
            <h3 className="form-section-title">Informations personnelles</h3>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="fullName">Nom complet</label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="title">Titre professionnel</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={e => handleChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="company">Entreprise</label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={e => handleChange('company', e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Téléphone</label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone || ''}
                  onChange={e => handleChange('phone', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="website">Site web</label>
                <input
                  id="website"
                  type="url"
                  value={formData.website || ''}
                  onChange={e => handleChange('website', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="city">Ville</label>
                <input
                  id="city"
                  type="text"
                  value={formData.location.city}
                  onChange={e =>
                    handleChange('location', { ...formData.location, city: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="country">Pays</label>
                <input
                  id="country"
                  type="text"
                  value={formData.location.country}
                  onChange={e =>
                    handleChange('location', { ...formData.location, country: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Présentation professionnelle</h3>

            <div className="form-field">
              <label htmlFor="headline">Titre professionnel</label>
              <input
                id="headline"
                type="text"
                value={formData.headline}
                onChange={e => handleChange('headline', e.target.value)}
                placeholder="Une phrase qui vous décrit"
              />
            </div>

            <div className="form-field">
              <label htmlFor="bio">À propos</label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={e => handleChange('bio', e.target.value)}
                rows={4}
                placeholder="Décrivez votre parcours et vos objectifs"
              />
            </div>

            <div className="form-field">
              <label htmlFor="industry">Secteur d'activité</label>
              <input
                id="industry"
                type="text"
                value={formData.industry}
                onChange={e => handleChange('industry', e.target.value)}
              />
            </div>

            <TagInput
              label="Expertise"
              tags={formData.expertise}
              onAdd={value => handleTagAdd('expertise', value)}
              onRemove={index => handleTagRemove('expertise', index)}
            />

            <TagInput
              label="Centres d'intérêt"
              tags={formData.interests}
              onAdd={value => handleTagAdd('interests', value)}
              onRemove={index => handleTagRemove('interests', index)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={handleClose}>
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface TagInputProps {
  label: string;
  tags: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
}

function TagInput({ label, tags, onAdd, onRemove }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="form-field">
      <label>{label}</label>
      <div className="tags-input-container">
        <div className="tags-list">
          {tags.map((tag, index) => (
            <span key={index} className="tag-input-tag">
              {tag}
              <button
                type="button"
                className="tag-remove"
                onClick={() => onRemove(index)}
                aria-label="Supprimer"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="tag-input-row">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ajouter..."
          />
          <button type="button" className="btn-icon-small" onClick={handleAdd}>
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
