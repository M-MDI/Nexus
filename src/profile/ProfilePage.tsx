import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignOut } from '@phosphor-icons/react';
import { auth, finishRecovery } from '../auth';
import {
  ProfileHeader,
  ProfessionalDetails,
  NetworkingIntentions,
  DigitalBusinessCard,
  ProfileEvents,
  ProfessionalNetwork,
  CompanyMembership,
  PrivacySettings,
  EditProfileDialog,
} from './components';
import { EditableProfileFields } from './types/profile';
import * as mockData from './lib/mockData';
import type { Profile } from './types/profile';

export function ProfilePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', padding: '40px' }}>
      <h1 style={{ color: '#192336', fontSize: '32px', fontWeight: 'bold' }}>
        Profile Page - TEST
      </h1>
      <p style={{ color: '#566276', fontSize: '18px' }}>
        If you can see this, the route is working.
      </p>
    </div>
  );
}
