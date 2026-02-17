import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import ExportInstructions from '../export/ExportInstructions';

interface OnboardingInstructionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OnboardingInstructionsModal({
  open,
  onOpenChange,
}: OnboardingInstructionsModalProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] sm:max-w-[640px] md:max-w-[768px] lg:max-w-4xl max-h-[calc(100svh-1rem)] sm:max-h-[calc(100svh-2rem)] flex flex-col overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] motion-reduce:animate-none motion-reduce:transition-none data-[state=open]:duration-200 data-[state=closed]:duration-150">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Welcome to Automation Product Pack!</DialogTitle>
          <DialogDescription>
            Learn how to create, export, and sell your digital products
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-y-auto touch-scroll pr-2 sm:pr-4" tabIndex={0}>
          <ExportInstructions />
        </div>
        <DialogFooter className="flex-shrink-0">
          <Button onClick={handleClose}>Got it, let's start!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
