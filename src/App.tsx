
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Login } from "./pages/Login";
import { Account } from "./pages/Account";
import { Settings } from "./pages/Settings";
import { Support } from "./pages/Support";
import { Language } from "./pages/Language";
import { OrderHistory } from "./pages/OrderHistory";
import { Favorites } from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/map" element={<Index />} />
          <Route path="/ai" element={<Index />} />
          <Route path="/social" element={<Index />} />
          <Route path="/market" element={<Index />} />
          <Route path="/checkout" element={<Index />} />
          <Route path="/account" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/language" element={<Language />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
