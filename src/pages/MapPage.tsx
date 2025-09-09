
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LeafletMap } from "@/components/LeafletMap";
import { MapPin, Phone, Clock, Star } from "lucide-react";

export function MapPage() {
  const stores = [
    {
      id: 1,
      name: "FASTION São Paulo",
      address: "Rua Augusta, 123 - São Paulo, SP",
      phone: "(11) 99999-9999",
      hours: "09:00 - 18:00",
      rating: 4.8
    },
    {
      id: 2,
      name: "FASTION Rio de Janeiro", 
      address: "Av. Copacabana, 456 - Rio de Janeiro, RJ",
      phone: "(21) 99999-9999",
      hours: "09:00 - 18:00",
      rating: 4.9
    },
    {
      id: 3,
      name: "FASTION Belo Horizonte",
      address: "Rua da Bahia, 789 - Belo Horizonte, MG",
      phone: "(31) 99999-9999", 
      hours: "09:00 - 18:00",
      rating: 4.7
    },
    {
      id: 4,
      name: "FASTION Brasília",
      address: "SCS Quadra 1 - Brasília, DF",
      phone: "(61) 99999-9999",
      hours: "09:00 - 18:00", 
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Nossas Lojas</h1>
        <p className="text-white/80">Encontre a loja FASTION mais próxima de você</p>
      </div>

      {/* Map */}
      <div className="p-4">
        <LeafletMap />
      </div>

      {/* Store List */}
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-foreground">Todas as Lojas</h2>
        
        {stores.map((store) => (
          <Card key={store.id} className="p-4 bg-card border-border shadow-card">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-foreground">{store.name}</h3>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {store.rating}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {store.address}
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                {store.phone}
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                {store.hours}
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`tel:${store.phone}`)}
                className="flex-1"
              >
                <Phone className="w-4 h-4 mr-2" />
                Ligar
              </Button>
              
              <Button 
                variant="default"
                size="sm" 
                onClick={() => {
                  const storeCoords = {
                    1: "-23.5505,-46.6333",
                    2: "-22.9068,-43.1729", 
                    3: "-19.9167,-43.9345",
                    4: "-15.8267,-47.9218"
                  };
                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${storeCoords[store.id as keyof typeof storeCoords]}`, '_blank');
                }}
                className="flex-1"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Direções
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
