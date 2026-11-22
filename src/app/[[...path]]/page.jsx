'use client';

import dynamic from 'next/dynamic';

// React Router and Supabase Auth both use browser state.
const NexusApp = dynamic(() => import('../../main'), { ssr: false });

export default function Page() {
  return <NexusApp />;
}
