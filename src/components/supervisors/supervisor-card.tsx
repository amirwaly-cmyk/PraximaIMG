import Link from "next/link";
import { Globe, MapPin, Stethoscope } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ConnectDialog } from "@/components/supervisors/connect-dialog";
import {
  AVAILABILITY_INFO,
  LEVEL_INFO,
  describeModes,
  getInitials,
  type Supervisor,
} from "@/lib/supervisors-data";

export function SupervisorCard({ supervisor }: { supervisor: Supervisor }) {
  const availability = AVAILABILITY_INFO[supervisor.availability];
  const level = LEVEL_INFO[supervisor.level];

  return (
    <Card className="flex h-full flex-col transition-colors hover:border-primary/50">
      <Link
        href={`/supervisors/${supervisor.id}`}
        className="flex flex-1 flex-col rounded-t-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <CardContent className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 bg-primary/10 text-primary">
                <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                  {getInitials(supervisor.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold leading-tight">
                  {supervisor.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {supervisor.postNominals}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="shrink-0" title={level.label}>
              {level.short}
            </Badge>
          </div>

          <dl className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>
                {supervisor.practiceName}, {supervisor.suburb}{" "}
                {supervisor.state}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4 shrink-0" />
              <span>{supervisor.specialty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 shrink-0" />
              <span>{describeModes(supervisor.modes)}</span>
            </div>
          </dl>

          <div className="mt-3">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                availability.badgeClass
              )}
            >
              <span
                className={cn("h-1.5 w-1.5 rounded-full", availability.dotClass)}
              />
              {availability.label}
            </span>
          </div>

          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {supervisor.bio}
          </p>
        </CardContent>
      </Link>

      <CardFooter className="gap-2 px-6 pb-6">
        <ConnectDialog supervisorName={supervisor.name}>
          <Button
            className="flex-1"
            variant={
              supervisor.availability === "not-accepting" ? "outline" : "default"
            }
          >
            Request to connect
          </Button>
        </ConnectDialog>
      </CardFooter>
    </Card>
  );
}
