import React from "react";
import { useGetWars } from "@/api/generated";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldAlert, Crosshair, Users, Calendar, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Wars() {
  const { data: wars, isLoading } = useGetWars();

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto h-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-2">
          <Crosshair className="w-5 h-5 text-destructive" />
          Active Conflicts Tracker
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Monitoring global military engagements and territorial disputes.</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))
        ) : wars?.length === 0 ? (
          <div className="h-40 flex items-center justify-center border border-dashed border-border/50 rounded-lg text-muted-foreground">
            No active conflicts found.
          </div>
        ) : (
          wars?.map(war => (
            <Card key={war.id} className="bg-card/40 backdrop-blur-sm border-border/50 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className={`w-full md:w-2 bg-gradient-to-b md:bg-gradient-to-r ${
                  war.status === 'escalating' ? 'from-destructive to-destructive/50' :
                  war.status === 'active' ? 'from-warning to-warning/50' :
                  war.status === 'de-escalating' ? 'from-primary to-primary/50' :
                  'from-success to-success/50'
                } h-2 md:h-auto`}></div>
                
                <CardContent className="p-6 flex-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant={war.status === 'escalating' ? 'destructive' : 'outline'} className={`uppercase text-[10px] tracking-wider ${war.status !== 'escalating' ? 'border-border/50' : ''}`}>
                          {war.status}
                        </Badge>
                        <Badge variant="secondary" className="uppercase text-[10px] tracking-wider">
                          {war.type}
                        </Badge>
                      </div>
                      <h2 className="text-xl font-bold uppercase tracking-wide">{war.name}</h2>
                    </div>
                    
                    <div className="flex flex-col gap-2 md:items-end text-sm text-muted-foreground font-mono">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {war.region}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Started {war.startDate}
                      </div>
                      {war.casualties && (
                        <div className="flex items-center gap-2 text-destructive font-bold">
                          <Users className="w-4 h-4" /> Est. {war.casualties.toLocaleString()} casualties
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-foreground/90 leading-relaxed mb-6 bg-muted/20 p-4 rounded border border-border/30">
                    {war.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground mr-2">Involved Actors:</span>
                    {war.countries.map(country => (
                      <Link key={country} href={`/countries/${country.toLowerCase()}`}>
                        <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-colors px-3 py-1">
                          {country}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
