// NEMESIS App — Obsidian Chronicle Design
// Routes: /, /group/:id, /activities, /server-wiki, /creator-wiki

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import GroupPage from "./pages/GroupPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import ServerWikiPage from "./pages/ServerWikiPage";
import CreatorWikiPage from "./pages/CreatorWikiPage";
import MoreTeamsPage from "./pages/MoreTeamsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/group/:id" component={GroupPage} />
      <Route path="/more-teams" component={MoreTeamsPage} />
      <Route path="/activities" component={ActivitiesPage} />
      <Route path="/server-wiki" component={ServerWikiPage} />
      <Route path="/creator-wiki" component={CreatorWikiPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
