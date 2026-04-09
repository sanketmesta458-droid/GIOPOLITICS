import React, { useState } from "react";
import { useGetNews, GetNewsCategory, GetNewsSort } from "@/api/generated";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper, ExternalLink, Clock } from "lucide-react";

export default function News() {
  const [category, setCategory] = useState<GetNewsCategory | undefined>(undefined);
  const [sort, setSort] = useState<GetNewsSort>('recent');
  const { data: news, isLoading } = useGetNews({ category, sort });

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-primary" />
            Intelligence Feed
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time aggregated global news and geopolitical alerts.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            variant={category === undefined ? "secondary" : "outline"} 
            size="sm" 
            onClick={() => setCategory(undefined)}
            className="text-xs uppercase tracking-wider h-8"
          >All</Button>
          <Button 
            variant={category === 'war' ? "secondary" : "outline"} 
            size="sm" 
            onClick={() => setCategory('war')}
            className="text-xs uppercase tracking-wider h-8"
          >Conflict</Button>
          <Button 
            variant={category === 'economy' ? "secondary" : "outline"} 
            size="sm" 
            onClick={() => setCategory('economy')}
            className="text-xs uppercase tracking-wider h-8"
          >Economy</Button>
          <Button 
            variant={category === 'diplomacy' ? "secondary" : "outline"} 
            size="sm" 
            onClick={() => setCategory('diplomacy')}
            className="text-xs uppercase tracking-wider h-8"
          >Diplomacy</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-10">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))
        ) : news?.length === 0 ? (
          <div className="h-40 flex items-center justify-center border border-dashed border-border/50 rounded-lg text-muted-foreground">
            No intelligence reports found for this category.
          </div>
        ) : (
          news?.map((article) => (
            <a href={article.link || '#'} key={article.id} className="block group">
              <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-colors">
                <CardContent className="p-0 flex flex-col sm:flex-row">
                  {article.thumbnailUrl && (
                    <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 relative overflow-hidden">
                      <img 
                        src={article.thumbnailUrl} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent sm:bg-gradient-to-r"></div>
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-primary/30 text-primary bg-primary/5">
                          {article.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{article.source}</span>
                        {article.region && (
                          <>
                            <span className="text-muted-foreground/30 text-[10px]">•</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{article.region}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors mb-2">
                        {article.headline}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {article.snippet}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {article.publishedAt}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                        Read Full Report <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
