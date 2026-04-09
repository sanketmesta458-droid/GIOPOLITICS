import React, { useState } from "react";
import { useGetCountries, GetCountriesStatus } from "@/api/generated";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, ShieldAlert, Globe, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Countries() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<GetCountriesStatus | undefined>(undefined);
  const { data: countries, isLoading } = useGetCountries({ search: search || undefined, status: statusFilter });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Nations Database
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search nations..." 
              className="pl-9 bg-card border-border/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Button 
              variant={statusFilter === undefined ? "secondary" : "outline"} 
              size="sm" 
              onClick={() => setStatusFilter(undefined)}
              className="border-border/50 whitespace-nowrap"
            >
              All
            </Button>
            <Button 
              variant={statusFilter === 'war' ? "destructive" : "outline"} 
              size="sm" 
              onClick={() => setStatusFilter('war')}
              className="border-border/50 whitespace-nowrap"
            >
              Active Conflict
            </Button>
            <Button 
              variant={statusFilter === 'tension' ? "warning" : "outline"} 
              size="sm" 
              onClick={() => setStatusFilter('tension')}
              className="border-border/50 whitespace-nowrap"
            >
              High Tension
            </Button>
            <Button 
              variant={statusFilter === 'peace' ? "success" : "outline"} 
              size="sm" 
              onClick={() => setStatusFilter('peace')}
              className="border-border/50 whitespace-nowrap"
            >
              Stable
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pb-10">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))
        ) : countries?.length === 0 ? (
          <div className="col-span-full h-40 flex items-center justify-center border border-dashed border-border/50 rounded-lg text-muted-foreground">
            No records found.
          </div>
        ) : (
          countries?.map(country => (
            <Link key={country.id} href={`/countries/${country.name.toLowerCase()}`}>
              <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-colors cursor-pointer group h-full flex flex-col">
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {country.flagUrl && (
                        <img src={country.flagUrl} alt="flag" className="w-10 h-7 object-cover rounded shadow-sm border border-border/50" loading="lazy" />
                      )}
                      <div>
                        <h3 className="font-bold text-lg uppercase tracking-wide group-hover:text-primary transition-colors">{country.name}</h3>
                        <p className="text-xs text-muted-foreground">{country.region}</p>
                      </div>
                    </div>
                    <Badge variant={country.status === 'war' ? 'destructive' : country.status === 'tension' ? 'warning' : 'success'} className="uppercase">
                      {country.status}
                    </Badge>
                  </div>
                  
                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between text-sm border-t border-border/50 pt-4">
                      <span className="text-muted-foreground uppercase text-xs tracking-wider">Risk Index</span>
                      <span className={`font-mono font-bold ${country.riskScore > 75 ? 'text-destructive' : country.riskScore > 50 ? 'text-warning' : 'text-success'}`}>
                        {country.riskScore}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm border-t border-border/50 pt-2">
                      <div>
                        <div className="text-muted-foreground uppercase text-[10px] tracking-wider mb-1">GDP</div>
                        <div className="font-mono">${country.gdp?.toLocaleString()}B</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Population</div>
                        <div className="font-mono">{(country.population || 0) / 1000000}M</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
