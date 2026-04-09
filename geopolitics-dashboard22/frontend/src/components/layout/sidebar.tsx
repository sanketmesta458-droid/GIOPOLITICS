import React from "react";
import { Link, useLocation } from "wouter";
import { Activity, Globe, Map as MapIcon, Users, Newspaper, ShieldAlert } from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Dashboard", icon: Activity },
    { href: "/map", label: "Intelligence Map", icon: MapIcon },
    { href: "/wars", label: "Conflict Tracker", icon: ShieldAlert },
    { href: "/countries", label: "Nations", icon: Globe },
    { href: "/leaders", label: "World Leaders", icon: Users },
    { href: "/news", label: "Live Intel", icon: Newspaper },
  ];

  return (
    <div className="w-64 border-r border-border bg-[#0a0f1c] flex flex-col h-full shrink-0">
      <div className="h-14 flex items-center px-4 border-b border-border">
        <ShieldAlert className="w-5 h-5 text-destructive mr-2" />
        <span className="font-bold tracking-wider text-sm uppercase text-foreground/90">Goval Intel</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {links.map((link) => {
            const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}>
                <Icon className={`w-4 h-4 mr-3 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-border/50 text-xs text-muted-foreground/50">
        Secure Terminal Session
      </div>
    </div>
  );
}
