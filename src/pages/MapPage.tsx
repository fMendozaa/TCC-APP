import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Store } from "lucide-react";
// Usando Google Maps sem necessidade de API key

const stores = [
  { name: "Oficina de Moda", distance: "24m", type: "Shopping Loja de Roupas" },
  { name: "Loja Nikas", distance: "210 m", type: "Loja de Roupas" },
  { name: "Nucleon Moda Feminina", distance: "450 m", type: "Loja de Roupas" },
  { name: "Damoda Roupas e Acessórios", distance: "1.1 km", type: "Loja de Roupas" },
  { name: "Lojão do Brás", distance: "3.7 km", type: "Loja de Roupas"},
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
        {/* Map Container */}
        <div className="h-[400px] rounded-lg overflow-hidden shadow-card bg-gradient-card border border-border/50">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29267.068242073495!2d-46.65844954999999!3d-23.561684399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59541c6c79c3%3A0x36b90a85f0f8cb33!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1spt!2sbr!4v1706886400000!5m2!1spt!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa - São Paulo Centro"
            key="google-maps"
          />
        </div>

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

        {/* Current Location */}
        <Card className="p-4 bg-gradient-card shadow-card border-border/50">
          <div className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Sua localização</h3>
              <p className="text-sm text-muted-foreground">Fiap School, Lins de Vasconcelos</p>
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
                  onClick={() => {
                    const mapFrame = document.querySelector('iframe') as HTMLIFrameElement;
                    if (mapFrame) {
                      const newSrc = `https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=pt&amp;q=${encodeURIComponent(store.name + " São Paulo SP")}+(${encodeURIComponent(store.name)})&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`;
                      mapFrame.src = newSrc;
                    }
                  }}
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
