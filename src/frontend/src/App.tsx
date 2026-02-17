import React, { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { useOnboardingInstructions } from './hooks/useOnboardingInstructions';
import AppLayout from './components/layout/AppLayout';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import OnboardingInstructionsModal from './components/onboarding/OnboardingInstructionsModal';
import ProductsWorkspace from './components/products/ProductsWorkspace';
import ExportScreen from './components/export/ExportScreen';
import { Alert, AlertDescription } from './components/ui/alert';
import { Info } from 'lucide-react';
import type { GeneratedBundle } from './types/productEntry';

type View = 'editor' | 'export';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [currentView, setCurrentView] = useState<View>('editor');
  const [generatedBundles, setGeneratedBundles] = useState<GeneratedBundle[]>([]);
  
  const {
    isOpen: onboardingOpen,
    handleClose: handleOnboardingClose,
    openManually: openOnboardingManually,
    tryAutoOpen,
  } = useOnboardingInstructions();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  // Auto-open onboarding after profile setup completes (or immediately if no profile setup needed)
  useEffect(() => {
    // Only try to auto-open when profile setup is not showing
    const canAutoOpen = !showProfileSetup && !isInitializing && (!isAuthenticated || (isFetched && !profileLoading));
    tryAutoOpen(canAutoOpen);
  }, [showProfileSetup, isInitializing, isAuthenticated, isFetched, profileLoading, tryAutoOpen]);

  const handleBundlesGenerated = (bundles: GeneratedBundle[]) => {
    setGeneratedBundles(bundles);
    setCurrentView('export');
  };

  if (isInitializing || (isAuthenticated && profileLoading)) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout onOpenInstructions={openOnboardingManually}>
      {showProfileSetup && (
        <ProfileSetupDialog
          open={showProfileSetup}
          onComplete={() => {
            // Profile will be refetched automatically
          }}
        />
      )}

      <OnboardingInstructionsModal
        open={onboardingOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleOnboardingClose();
          }
        }}
      />

      {!isAuthenticated && (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            You're working in local-only mode. Sign in to sync your products across devices.
          </AlertDescription>
        </Alert>
      )}

      {currentView === 'editor' && (
        <ProductsWorkspace onBundlesGenerated={handleBundlesGenerated} />
      )}

      {currentView === 'export' && generatedBundles.length > 0 && (
        <ExportScreen
          bundles={generatedBundles}
          onBack={() => setCurrentView('editor')}
        />
      )}
    </AppLayout>
  );
}
