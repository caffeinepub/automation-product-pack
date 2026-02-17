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
import { ScrollArea } from '../ui/scroll-area';
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
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Welcome to Automation Product Pack!</DialogTitle>
          <DialogDescription>
            Learn how to create, export, and sell your digital products
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4">
          <ExportInstructions />
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleClose}>Got it, let's start!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
