import { ReactNode } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';

interface AppShellProps {
  children: ReactNode;
  onPreviewSignOut?: () => void;
}

export function AppShell({ children, onPreviewSignOut }: AppShellProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header onPreviewSignOut={onPreviewSignOut} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
