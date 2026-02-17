import React from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import LoginButton from '../auth/LoginButton';
import { Package, BookOpen, Download, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface AppLayoutProps {
  children: React.ReactNode;
  hasGeneratedBundles?: boolean;
  currentView?: 'editor' | 'export' | 'unifiedPreview';
  onOpenInstructions?: () => void;
  onExportClick?: () => void;
  onUnifiedPreviewClick?: () => void;
}

export default function AppLayout({
  children,
  hasGeneratedBundles = false,
  currentView = 'editor',
  onOpenInstructions,
  onExportClick,
  onUnifiedPreviewClick,
}: AppLayoutProps) {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  const showExportButton = currentView === 'editor' && hasGeneratedBundles;
  const showUnifiedPreviewButton = currentView === 'editor' && hasGeneratedBundles;
  const disableExportButton = !hasGeneratedBundles;
  const disableUnifiedPreviewButton = !hasGeneratedBundles;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Automation Product Pack</h1>
          </div>
          <div className="flex items-center gap-4">
            {onOpenInstructions && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenInstructions}
                className="gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Instructions
              </Button>
            )}
            {showUnifiedPreviewButton && onUnifiedPreviewClick && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onUnifiedPreviewClick}
                      disabled={disableUnifiedPreviewButton}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Unified Preview
                    </Button>
                  </TooltipTrigger>
                  {disableUnifiedPreviewButton && (
                    <TooltipContent>
                      <p>Generate products first to enable preview</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            )}
            {showExportButton && onExportClick && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={onExportClick}
                      disabled={disableExportButton}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </TooltipTrigger>
                  {disableExportButton && (
                    <TooltipContent>
                      <p>Generate products first to enable export</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            )}
            {isAuthenticated && userProfile && (
              <span className="text-sm text-muted-foreground">
                Welcome, {userProfile.name}
              </span>
            )}
            <LoginButton />
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} · Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
