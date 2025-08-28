
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Store } from "lucide-react";

const stores = [
  { name: "Oficina de Moda", distance: "24m", type: "Shopping Loja de Roupas", address: "Rua Augusta, 123 - Centro, São Paulo" },
  { name: "Loja Nikas", distance: "210 m", type: "Loja de Roupas", address: "Av. Paulista, 456 - Bela Vista, São Paulo" },
  { name: "Nucleon Moda Feminina", distance: "450 m", type: "Loja de Roupas", address: "Rua Oscar Freire, 789 - Jardins, São Paulo" },
  { name: "Damoda Roupas e Acessórios", distance: "1.1 km", type: "Loja de Roupas", address: "Rua 25 de Março, 321 - Centro, São Paulo" },
  { name: "Lojão do Brás", distance: "3.7 km", type: "Loja de Roupas", address: "Rua do Brás, 654 - Brás, São Paulo" },
];

export function GoogleMap() {
  const handleNavigateToStore = (storeName: string, address: string) => {
    const query = encodeURIComponent(`${storeName}, ${address}`);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapUrl, '_blank');
  };

  const handleGetDirections = (address: string) => {
    const query = encodeURIComponent(address);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Map Container with improved Google Maps embed */}
      <div className="h-[400px] rounded-lg overflow-hidden shadow-card bg-gradient-card border border-border/50">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58027.97628402119!2d-46.65844954999999!3d-23.561684399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1spt!2sbr!4v1703772800000!5m2!1spt!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa - São Paulo Centro"
        />
      </div>

      {/* Current Location */}
      <Card className="p-4 bg-gradient-card shadow-card border-border/50">
        <div className="flex items-center gap-3">
          <Navigation className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Sua localização</h3>
            <p className="text-sm text-muted-foreground">Centro de São Paulo, SP</p>
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
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleNavigateToStore(store.name, store.address)}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Ver
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleGetDirections(store.address)}
                  className="bg-gradient-primary hover:bg-gradient-accent text-white shadow-glow"
                >
                  <Navigation className="w-4 h-4 mr-1" />
                  Ir
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
