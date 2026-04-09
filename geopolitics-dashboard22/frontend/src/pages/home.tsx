import React from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { AlertCircle, ShieldAlert, ShieldCheck, ShieldHalf, TrendingUp, TrendingDown, Activity, DollarSign, Droplet } from "lucide-react";
import { 
  useGetDashboardSummary, 
  useGetEconomy, 
  useGetWarsSummary,
  useGetRiskIndex,
  useGetNews
} from "@/api/generated";

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary();
  const { data: economy, isLoading: loadingEconomy } = useGetEconomy();
  const { data: warsSummary, isLoading: loadingWarsSummary } = useGetWarsSummary();
  const { data: riskIndex, isLoading: loadingRiskIndex } = useGetRiskIndex();
  const { data: alerts, isLoading: loadingNews } = useGetNews({ category: 'war' });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground uppercase flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Global Command Center
        </h1>
        <div className="text-sm text-muted-foreground flex items-center gap-2 bg-destructive/10 px-3 py-1 rounded-full border border-destructive/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
          </span>
          <span className="text-destructive font-medium uppercase tracking-wider text-xs">Live Feed Active</span>
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-card/50 border border-border/50 rounded-lg p-3 flex items-center gap-4 overflow-hidden relative">
        <div className="flex-shrink-0 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-bold rounded flex items-center gap-1 uppercase tracking-widest z-10 relative">
          <AlertCircle className="w-3 h-3" />
          Intel Alerts
        </div>
        <div className="flex-1 overflow-hidden relative h-6">
          <div className="absolute whitespace-nowrap animate-[marquee_30s_linear_infinite] flex items-center h-full">
            {loadingSummary ? (
              <span className="text-sm text-muted-foreground">Loading latest intel...</span>
            ) : summary?.recentAlerts?.map((alert, i) => (
              <React.Fragment key={i}>
                <span className="text-sm font-medium text-foreground/90">{alert}</span>
                <span className="mx-4 text-muted-foreground/30">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Risk Index Gauge */}
        <Card className="col-span-1 md:col-span-1 bg-card/40 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Geopolitical Risk</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-4 pb-6">
            {loadingRiskIndex ? (
              <Skeleton className="h-32 w-32 rounded-full" />
            ) : riskIndex ? (
              <div className="relative flex flex-col items-center justify-center w-full">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/30" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" 
                      className={`
                        ${riskIndex.level === 'critical' ? 'text-destructive' : 
                          riskIndex.level === 'high' ? 'text-warning' : 
                          riskIndex.level === 'moderate' ? 'text-primary' : 'text-success'}
                      `}
                      strokeDasharray={`${(riskIndex.score / 100) * 283} 283`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold">{riskIndex.score}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant={
                    riskIndex.level === 'critical' ? 'destructive' : 
                    riskIndex.level === 'high' ? 'warning' : 
                    'default'
                  } className="uppercase text-xs tracking-wider">
                    {riskIndex.level}
                  </Badge>
                  {riskIndex.trend === 'worsening' && <TrendingUp className="w-4 h-4 text-destructive" />}
                  {riskIndex.trend === 'improving' && <TrendingDown className="w-4 h-4 text-success" />}
                  {riskIndex.trend === 'stable' && <Activity className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* War Counter */}
        <Card className="col-span-1 md:col-span-3 bg-card/40 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Global Stability Index</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingWarsSummary ? (
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : warsSummary ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => setLocation('/countries?status=war')}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-destructive/10 border border-destructive/20 hover:bg-destructive/20 transition-colors group cursor-pointer text-left"
                >
                  <ShieldAlert className="w-6 h-6 text-destructive mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-3xl font-bold text-destructive">{warsSummary.totalCountriesAtWar}</span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium mt-1">Nations at War</span>
                </button>
                <button 
                  onClick={() => setLocation('/countries?status=tension')}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-warning/10 border border-warning/20 hover:bg-warning/20 transition-colors group cursor-pointer text-left"
                >
                  <ShieldHalf className="w-6 h-6 text-warning mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-3xl font-bold text-warning">{warsSummary.totalCountriesInTension}</span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium mt-1">High Tension</span>
                </button>
                <button 
                  onClick={() => setLocation('/countries?status=peace')}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-success/10 border border-success/20 hover:bg-success/20 transition-colors group cursor-pointer text-left"
                >
                  <ShieldCheck className="w-6 h-6 text-success mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-3xl font-bold text-success">{warsSummary.totalCountriesAtPeace}</span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium mt-1">Stable Nations</span>
                </button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Economic Indicators */}
        <Card className="bg-card/40 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50 mb-4">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Global Economy
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {loadingEconomy ? (
              <div className="space-y-4">
                <Skeleton className="h-[200px] w-full" />
              </div>
            ) : economy ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">Global GDP Growth</p>
                    <p className={`text-2xl font-bold ${economy.globalGdpGrowth >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {economy.globalGdpGrowth >= 0 ? '+' : ''}{economy.globalGdpGrowth.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">Global Inflation</p>
                    <p className="text-2xl font-bold text-foreground">{economy.globalInflation.toFixed(1)}%</p>
                  </div>
                </div>
                
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={economy.gdpTrend || []}>
                      <defs>
                        <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" hide />
                      <YAxis hide domain={['auto', 'auto']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                        labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorGdp)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Commodities */}
        <Card className="bg-card/40 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50 mb-4">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Droplet className="w-4 h-4" /> Commodities
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {loadingEconomy ? (
              <div className="space-y-4">
                <Skeleton className="h-[200px] w-full" />
              </div>
            ) : economy ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">Brent Crude (BBL)</p>
                    <p className="text-2xl font-bold text-foreground">${economy.oilPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">Gold (OZ)</p>
                    <p className="text-2xl font-bold text-foreground">${economy.goldPrice.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={economy.oilPriceTrend || []}>
                      <XAxis dataKey="date" hide />
                      <YAxis hide domain={['auto', 'auto']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                        labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                      />
                      <Line type="monotone" dataKey="value" stroke="hsl(var(--warning))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

// Add marquee animation in index.css later if needed
