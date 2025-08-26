import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import { Checkout } from "./pages/Checkout";
import { Settings } from "./pages/Settings";
import { OrderHistory } from "./pages/OrderHistory";
import { Followers } from "./pages/Followers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <main className="flex-1 relative">
              <header className="h-12 flex items-center border-b border-border bg-gradient-card/80 backdrop-blur-sm sticky top-0 z-50">
                <SidebarTrigger className="ml-4 text-foreground hover:bg-muted/50" />
                <span className="ml-4 text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
                  TRENDFY
                </span>
              </header>
              <div className="relative">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/map" element={<Index />} />
                  <Route path="/ai" element={<Index />} />
                  <Route path="/social" element={<Index />} />
                  <Route path="/market" element={<Index />} />
                  <Route path="/account" element={<Index />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                  <Route path="/followers" element={<Followers />} />
                  <Route path="/favorites" element={<Index />} />
                  <Route path="/notifications" element={<Index />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
