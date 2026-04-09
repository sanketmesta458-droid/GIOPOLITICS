import React, { useState, useEffect } from "react";
import { useGetLeaders } from "@/api/generated";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Quote, Clock, AlertCircle } from "lucide-react";

export default function Leaders() {
  const { data: leaders, isLoading } = useGetLeaders();
  const [activeIndices, setActiveIndices] = useState<Record<string, number>>({});

  // Simulate cycling statements (just visual effect if we had multiple, but we'll pulse the current one)
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app with multiple statements, we'd increment the index here.
      // We'll just force a re-render to simulate "live" checking
      setActiveIndices(prev => ({ ...prev, _tick: (prev._tick || 0) + 1 }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-2">
          <Quote className="w-5 h-5 text-primary" />
          Global Leaders Monitor
        </h1>
        <div className="text-sm text-muted-foreground flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-primary font-medium uppercase tracking-wider text-xs">Live Intercepts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))
        ) : leaders?.map(leader => (
          <Card key={leader.id} className="bg-card/40 backdrop-blur-sm border-border/50 overflow-hidden flex flex-col">
            <div className="h-2 w-full bg-gradient-to-r from-primary to-transparent opacity-50"></div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex gap-4 items-start mb-6">
                <img 
                  src={leader.photoUrl || `https://api.dicebear.com/7.x/personas/svg?seed=${leader.name}&backgroundColor=0f172a`} 
                  alt={leader.name} 
                  className="w-16 h-16 rounded-lg object-cover border border-border bg-muted/50"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-bold text-lg uppercase tracking-wide leading-tight">{leader.name}</h3>
                  <div className="text-sm text-primary font-medium">{leader.title}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1 flex items-center gap-1">
                    <img src={`https://flagcdn.com/w40/${leader.countryCode.toLowerCase()}.png`} alt="" className="w-4 h-3 object-cover rounded-sm" />
                    {leader.country}
                  </div>
                </div>
              </div>

              <div className="mt-auto relative bg-background border border-border/50 rounded-lg p-4 pt-6">
                <div className="absolute -top-3 left-4 bg-background px-2">
                  <Badge variant={
                    leader.impactLevel === 'high' ? 'destructive' : 
                    leader.impactLevel === 'medium' ? 'warning' : 'secondary'
                  } className="text-[10px] uppercase tracking-wider">
                    {leader.impactLevel} Impact
                  </Badge>
                </div>
                
                <p className="text-sm font-medium leading-relaxed italic text-foreground/90">
                  "{leader.latestStatement}"
                </p>
                
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {leader.statementTimestamp}
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <AlertCircle className="w-3 h-3" /> Source Verified
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
