import React from "react";
import { useParams, Link } from "wouter";
import { useGetCountry } from "@/api/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldAlert, TrendingDown, TrendingUp, AlertTriangle, FileText, ArrowLeft, Briefcase, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function CountryDetail() {
  const params = useParams();
  const name = params.name ? decodeURIComponent(params.name) : "";
  const { data: country, isLoading, error } = useGetCountry(name);

  if (isLoading) {
    return <div className="p-6 space-y-6 max-w-7xl mx-auto"><Skeleton className="h-10 w-48" /><Skeleton className="h-96 w-full" /></div>;
  }

  if (error || !country) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex flex-col items-center justify-center h-[50vh]">
        <ShieldAlert className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold">Dossier Not Found</h2>
        <p className="text-muted-foreground mb-6">Could not retrieve intelligence on {name}.</p>
        <Link href="/countries" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Database
        </Link>
      </div>
    );
  }

  const isWar = country.status === 'war';
  const isTension = country.status === 'tension';

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <Link href="/countries" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
        <ArrowLeft className="w-4 h-4" /> Back to Database
      </Link>

      {/* Header Banner */}
      <div className={`relative overflow-hidden border rounded-lg p-6 ${
        isWar ? 'border-destructive/50 bg-destructive/10' : 
        isTension ? 'border-warning/50 bg-warning/10' : 
        'border-success/50 bg-success/10'
      }`}>
        {isWar && (
          <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/20 blur-[100px] rounded-full pointer-events-none"></div>
        )}
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {country.flagUrl && (
              <img src={country.flagUrl} alt="flag" className="w-24 h-16 object-cover rounded shadow-lg border border-border/50" />
            )}
            <div>
              <h1 className="text-4xl font-black uppercase tracking-wider text-foreground">{country.name}</h1>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-1">
                {country.region} • ISO: {country.code}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge variant={isWar ? 'destructive' : isTension ? 'warning' : 'success'} className="px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
              {isWar && <ShieldAlert className="w-4 h-4 mr-2" />}
              {isTension && <AlertTriangle className="w-4 h-4 mr-2" />}
              {country.status}
            </Badge>
            <div className="text-sm font-mono text-muted-foreground">
              Risk Index: <span className={`font-bold ${country.riskScore > 75 ? 'text-destructive' : 'text-foreground'}`}>{country.riskScore}</span>/100
            </div>
          </div>
        </div>

        {country.conflictReason && (
          <div className="mt-6 pt-6 border-t border-border/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Conflict Briefing
            </h3>
            <p className="text-sm leading-relaxed">{country.conflictReason}</p>
            {country.conflictStart && (
              <p className="text-xs text-muted-foreground mt-2 font-mono">Started: {country.conflictStart}</p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Economy & Leader */}
        <div className="space-y-6 lg:col-span-1">
          {country.leader && (
            <Card className="bg-card/40 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-4 border-b border-border/50">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Head of State
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={country.leader.photoUrl || `https://api.dicebear.com/7.x/personas/svg?seed=${country.leader.name}&backgroundColor=1e293b`} 
                    alt={country.leader.name} 
                    className="w-16 h-16 rounded object-cover border border-border"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{country.leader.name}</h4>
                    <p className="text-sm text-primary font-medium">{country.leader.title}</p>
                    <div className="text-xs text-muted-foreground mt-1">In power since {country.leader.inPowerSince}</div>
                  </div>
                </div>
                {country.leader.latestStatement && (
                  <div className="mt-4 p-3 bg-muted/30 rounded border border-border/50 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l"></div>
                    <p className="text-sm italic text-foreground/90">"{country.leader.latestStatement}"</p>
                    <div className="text-[10px] text-muted-foreground mt-2 font-mono uppercase text-right">Latest Statement</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card className="bg-card/40 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-4 border-b border-border/50">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4" /> Economic Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center border-b border-border/20 pb-3">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">GDP</span>
                <span className="font-mono font-medium">${country.gdp?.toLocaleString()}B</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/20 pb-3">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">GDP Growth</span>
                <span className={`font-mono font-medium flex items-center gap-1 ${(country.gdpGrowth || 0) >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {(country.gdpGrowth || 0) >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {country.gdpGrowth}%
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-border/20 pb-3">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">Inflation</span>
                <span className="font-mono font-medium text-destructive">{country.inflation}%</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/20 pb-3">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">Currency</span>
                <span className="font-mono font-medium">{country.currency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">Oil Prod.</span>
                <span className="font-mono font-medium">{country.oilProduction?.toLocaleString()} bbl/d</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Charts & News */}
        <div className="space-y-6 lg:col-span-2">
          {country.warImpact && (
            <Card className="bg-card/40 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-4 border-b border-border/50">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Economic Impact Timeline</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={country.warImpact.gdpTimeline || []}>
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                        labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                      />
                      <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-card/40 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-4 border-b border-border/50">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Latest Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-0">
              <div className="divide-y divide-border/50">
                {country.news?.map((article) => (
                  <a href={article.link || '#'} key={article.id} className="block p-6 hover:bg-muted/20 transition-colors group">
                    <div className="flex gap-4">
                      {article.thumbnailUrl && (
                        <img src={article.thumbnailUrl} alt="" className="w-24 h-24 object-cover rounded bg-muted flex-shrink-0 border border-border/50" loading="lazy" />
                      )}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-border/50 text-muted-foreground">
                            {article.source}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground font-mono">{article.publishedAt}</span>
                        </div>
                        <h4 className="font-bold text-base group-hover:text-primary transition-colors leading-tight">{article.headline}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{article.snippet}</p>
                      </div>
                    </div>
                  </a>
                ))}
                {!country.news?.length && (
                  <div className="p-6 text-center text-muted-foreground text-sm">No recent intelligence available.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
