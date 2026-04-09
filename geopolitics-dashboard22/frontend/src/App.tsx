import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import MainLayout from "@/components/layout/main-layout";

import Home from "@/pages/home";
import MapPage from "@/pages/map";
import Countries from "@/pages/countries";
import CountryDetail from "@/pages/country-detail";
import Leaders from "@/pages/leaders";
import News from "@/pages/news";
import Wars from "@/pages/wars";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/map" component={MapPage} />
        <Route path="/countries" component={Countries} />
        <Route path="/countries/:name" component={CountryDetail} />
        <Route path="/leaders" component={Leaders} />
        <Route path="/news" component={News} />
        <Route path="/wars" component={Wars} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
