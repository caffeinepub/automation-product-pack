import React from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import LoginButton from '../auth/LoginButton';
import { Package, BookOpen, Download, Eye, Store } from 'lucide-react';
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
  currentView?: 'editor' | 'export' | 'unifiedPreview' | 'storefront';
  onOpenInstructions?: () => void;
  onExportClick?: () => void;
  onUnifiedPreviewClick?: () => void;
  onStorefrontClick?: () => void;
}

export default function AppLayout({
  children,
  hasGeneratedBundles = false,
  currentView = 'editor',
  onOpenInstructions,
  onExportClick,
  onUnifiedPreviewClick,
  onStorefrontClick,
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
      <header className="sticky top-0 z-40 border-b border-border/60 bg-gradient-to-r from-card/95 via-accent/20 to-card/95 backdrop-blur supports-[backdrop-filter]:from-card/80 supports-[backdrop-filter]:via-accent/15 supports-[backdrop-filter]:to-card/80 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4 lg:py-5">
            {/* Logo and title */}
            <div className="flex items-center gap-3 min-w-0">
              <Package className="h-6 w-6 text-primary flex-shrink-0" />
              <h1 className="text-lg sm:text-xl font-bold truncate">Digital Bundle Studio</h1>
            </div>

            {/* Navigation and actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
              {onStorefrontClick && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onStorefrontClick}
                  className="gap-2"
                  aria-label="View Storefront"
                >
                  <Store className="h-4 w-4" />
                  <span className="hidden sm:inline">Storefront</span>
                </Button>
              )}
              {onOpenInstructions && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onOpenInstructions}
                  className="gap-2"
                  aria-label="Open Instructions"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Instructions</span>
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
                        aria-label="Preview Products"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="hidden md:inline">Preview</span>
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
                        aria-label="Export Products"
                      >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Export</span>
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
                <span className="hidden lg:inline text-sm text-muted-foreground">
                  Welcome, {userProfile.name}
                </span>
              )}
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          {children}
        </div>
      </main>

      <footer className="border-t border-border/60 bg-gradient-to-r from-card via-muted/30 to-card mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Digital Bundle Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
