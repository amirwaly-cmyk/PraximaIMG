"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Role = "img" | "employer";

interface ConnectFormProps {
  supervisorName: string;
  /** When true, renders dialog-aware actions (Cancel/Done close the dialog). */
  dialogMode?: boolean;
}

export function ConnectForm({
  supervisorName,
  dialogMode = false,
}: ConnectFormProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<Role | "">("");
  const [message, setMessage] = React.useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit =
    name.trim().length > 0 && emailValid && role !== "" && !submitted;

  function reset() {
    setSubmitted(false);
    setName("");
    setEmail("");
    setRole("");
    setMessage("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    // MVP: no backend yet — just acknowledge locally.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-2 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="text-lg font-semibold">Request sent</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Thanks {name.trim().split(/\s+/)[0]}. Your request to connect with{" "}
          {supervisorName} has been noted. This is an early preview, so no
          message has actually been delivered yet — we&apos;ll be in touch as
          connections go live.
        </p>
        {dialogMode ? (
          <DialogClose asChild>
            <Button className="mt-6">Done</Button>
          </DialogClose>
        ) : (
          <Button variant="outline" className="mt-6" onClick={reset}>
            Send another request
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="connect-name">Your name</Label>
        <Input
          id="connect-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          autoComplete="name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="connect-email">Email</Label>
        <Input
          id="connect-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="connect-role">I am a…</Label>
        <Select value={role} onValueChange={(v) => setRole(v as Role)}>
          <SelectTrigger id="connect-role">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="img">International Medical Graduate</SelectItem>
            <SelectItem value="employer">Practice / employer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="connect-message">Message (optional)</Label>
        <Textarea
          id="connect-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A short note about your situation, timing, and what you're looking for."
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {dialogMode && (
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
        )}
        <Button type="submit" disabled={!canSubmit}>
          Send request
        </Button>
      </div>
    </form>
  );
}
