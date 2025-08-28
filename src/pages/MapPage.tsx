
import { GoogleMap } from "@/components/GoogleMap";
import { InteractiveMap } from "@/components/InteractiveMap";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

export function MapPage() {
  const [useInteractiveMap, setUseInteractiveMap] = useState(false);

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
        {/* Map Options */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-card shadow-card border-border/50">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">Centro SP</h4>
                <p className="text-sm text-muted-foreground">Região central</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card shadow-card border-border/50">
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-accent" />
              <div>
                <h4 className="font-semibold text-foreground">Navegação</h4>
                <p className="text-sm text-muted-foreground">Rotas disponíveis</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Map Type Selector */}
        <Card className="p-4 bg-gradient-card shadow-card border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Tipo de Mapa</h3>
              <p className="text-sm text-muted-foreground">
                {useInteractiveMap ? "Mapa interativo com Mapbox" : "Mapa integrado do Google"}
              </p>
            </div>
            <Button
              onClick={() => setUseInteractiveMap(!useInteractiveMap)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              {useInteractiveMap ? "Usar Google Maps" : "Mapa Interativo"}
            </Button>
          </div>
        </Card>

        {/* Map Component */}
        {useInteractiveMap ? <InteractiveMap /> : <GoogleMap />}
      </div>
    </div>
  );
}
