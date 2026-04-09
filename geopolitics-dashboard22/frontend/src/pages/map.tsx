import React, { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useGetCountries } from "@/api/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [, setLocation] = useLocation();
  const { data: countries, isLoading } = useGetCountries();

  const getCountryColor = (name: string) => {
    const country = countries?.find(c => c.name === name || c.code === name);
    if (!country) return "hsl(var(--sidebar-accent))";
    
    switch (country.status) {
      case "war": return "hsl(var(--destructive))";
      case "tension": return "hsl(var(--warning))";
      case "stable": return "hsl(var(--success))";
      default: return "hsl(var(--sidebar-accent))";
    }
  };

  const selectedCountryData = useMemo(() => {
    return countries?.find(c => c.name === selectedCountry);
  }, [countries, selectedCountry]);

  return (
    <div className="flex h-full w-full relative overflow-hidden bg-[#050811]">
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at center, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="absolute top-4 left-4 z-10 w-80 space-y-4">
        <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-lg p-2 shadow-2xl">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search nations..." 
              className="pl-9 bg-background/50 border-border/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-lg p-4 shadow-2xl flex flex-col gap-2">
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Legend</h3>
          <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-destructive"></div> Active Conflict</div>
          <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-warning"></div> High Tension</div>
          <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-success"></div> Stable</div>
        </div>
      </div>

      <div className="flex-1 w-full h-full relative cursor-move">
        {!isLoading && (
          <ComposableMap 
            projectionConfig={{ scale: 140 }} 
            className="w-full h-full outline-none"
          >
            <ZoomableGroup center={[0, 20]}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => setSelectedCountry(countryName)}
                        style={{
                          default: {
                            fill: getCountryColor(countryName),
                            stroke: "rgba(255,255,255,0.1)",
                            strokeWidth: 0.5,
                            outline: "none",
                            transition: "all 250ms"
                          },
                          hover: {
                            fill: "hsl(var(--primary))",
                            stroke: "rgba(255,255,255,0.5)",
                            strokeWidth: 1,
                            outline: "none",
                            cursor: "pointer"
                          },
                          pressed: {
                            fill: "hsl(var(--primary))",
                            outline: "none"
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </div>

      {selectedCountryData && (
        <div className="absolute right-0 top-0 bottom-0 w-[400px] bg-card/95 backdrop-blur-xl border-l border-border/50 shadow-2xl transition-transform duration-300 transform translate-x-0 flex flex-col">
          <div className="p-4 border-b border-border/50 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {selectedCountryData.flagUrl && (
                <img src={selectedCountryData.flagUrl} alt={`${selectedCountryData.name} flag`} className="w-8 h-6 object-cover rounded shadow-sm border border-border/50" loading="lazy" />
              )}
              <div>
                <h2 className="text-lg font-bold uppercase tracking-wide">{selectedCountryData.name}</h2>
                <div className="text-xs text-muted-foreground">{selectedCountryData.region}</div>
              </div>
            </div>
            <button onClick={() => setSelectedCountry(null)} className="p-1 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Status</div>
              <Badge variant={selectedCountryData.status === 'war' ? 'destructive' : selectedCountryData.status === 'tension' ? 'warning' : 'success'} className="uppercase">
                {selectedCountryData.status}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Risk Score</div>
              <div className="text-3xl font-bold font-mono">{selectedCountryData.riskScore}<span className="text-lg text-muted-foreground">/100</span></div>
            </div>
            
            {selectedCountryData.conflictSummary && (
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Intel Brief</div>
                <p className="text-sm text-foreground/90 leading-relaxed bg-muted/30 p-3 rounded border border-border/50">
                  {selectedCountryData.conflictSummary}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">GDP (B)</div>
                <div className="font-mono text-sm">${selectedCountryData.gdp?.toLocaleString()}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Inflation</div>
                <div className="font-mono text-sm">{selectedCountryData.inflation}%</div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider font-semibold"
              onClick={() => setLocation(`/countries/${selectedCountryData.name.toLowerCase()}`)}
            >
              Full Dossier
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
