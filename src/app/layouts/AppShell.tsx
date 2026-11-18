import { ReactNode } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

interface AppShellProps {
  children: ReactNode;
  onPreviewSignOut?: () => void;
}

export function AppShell({ children, onPreviewSignOut }: AppShellProps) {
  return (
    <TooltipProvider>
      <div className="flex min-h-dvh bg-background [--shell-header-height:clamp(3.5rem,7.5dvh,4rem)] lg:h-dvh">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header onPreviewSignOut={onPreviewSignOut} />
          <main className="min-w-0 flex-1 px-4 py-4 sm:px-5 xl:px-6 lg:min-h-0 lg:overflow-auto lg:[@media(max-height:800px)]:py-3">
            {children}
          </main>
        </div>
      </div>
      <Toaster position="bottom-right" richColors />
    </TooltipProvider>
  );
}
