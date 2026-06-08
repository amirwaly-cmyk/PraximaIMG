"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConnectForm } from "@/components/supervisors/connect-form";

interface ConnectDialogProps {
  supervisorName: string;
  /** The trigger element (e.g. a Button). Rendered via DialogTrigger asChild. */
  children: React.ReactNode;
}

export function ConnectDialog({ supervisorName, children }: ConnectDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request to connect</DialogTitle>
          <DialogDescription>
            Send an enquiry to {supervisorName}. We&apos;ll use these details to
            facilitate an introduction.
          </DialogDescription>
        </DialogHeader>
        {/* `key` resets the form each time the dialog re-opens. */}
        <ConnectForm
          key={open ? "open" : "closed"}
          supervisorName={supervisorName}
          dialogMode
        />
      </DialogContent>
    </Dialog>
  );
}
