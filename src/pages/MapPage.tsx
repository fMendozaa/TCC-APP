import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Store } from "lucide-react";

const stores = [
  { name: "Santa Cruz Shopping", distance: "2.1 km", type: "Shopping Center" },
  { name: "Brenda Carvalho Lash Designer", distance: "1.8 km", type: "Beauty Salon" },
  { name: "Davos Pizza Pré-assada", distance: "3.2 km", type: "Restaurant" },
];

export function MapPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">TRENDFY</h1>
          <h2 className="text-xl font-semibold">Map</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Map Placeholder */}
        <Card className="w-full h-64 bg-gradient-card shadow-card border-border/50 overflow-hidden">
          <div className="w-full h-full bg-muted/20 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
            <div className="text-center z-10">
              <MapPin className="w-12 h-12 mx-auto text-primary mb-2" />
              <p className="text-muted-foreground">Juiz de Fora, MG</p>
              <p className="text-sm text-muted-foreground/70">Interactive map would load here</p>
            </div>
            
            {/* Mock map pins */}
            <div className="absolute top-4 left-8">
              <div className="w-6 h-6 bg-gradient-primary rounded-full shadow-glow animate-pulse"></div>
            </div>
            <div className="absolute bottom-8 right-12">
              <div className="w-6 h-6 bg-gradient-accent rounded-full shadow-glow animate-pulse"></div>
            </div>
            <div className="absolute top-12 right-6">
              <div className="w-6 h-6 bg-brand-pink rounded-full shadow-glow animate-pulse"></div>
            </div>
          </div>
        </Card>

        {/* Current Location */}
        <Card className="p-4 bg-gradient-card shadow-card border-border/50">
          <div className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Sua localização</h3>
              <p className="text-sm text-muted-foreground">Centro, Juiz de Fora</p>
            </div>
          </div>
        </Card>

        {/* Nearby Stores */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Lojas próximas</h3>
          
          {stores.map((store, index) => (
            <Card key={index} className="p-4 bg-gradient-card shadow-card border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                    <Store className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{store.name}</h4>
                    <p className="text-sm text-muted-foreground">{store.type}</p>
                    <p className="text-xs text-primary">{store.distance}</p>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  className="bg-gradient-primary hover:bg-gradient-accent text-white shadow-glow"
                >
                  Ir
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}