import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation } from 'lucide-react';

const stores = [
  { 
    name: "Santa Cruz Shopping", 
    coordinates: [-43.35, -21.76], 
    type: "Shopping Center",
    distance: "2.1 km"
  },
  { 
    name: "Brenda Carvalho Lash Designer", 
    coordinates: [-43.34, -21.75], 
    type: "Beauty Salon",
    distance: "1.8 km"
  },
  { 
    name: "Davos Pizza", 
    coordinates: [-43.36, -21.77], 
    type: "Restaurant",
    distance: "3.2 km"
  },
];

export function InteractiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [selectedStore, setSelectedStore] = useState<any>(null);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-43.35, -21.76], // Juiz de Fora coordinates
      zoom: 13,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add stores as markers
    stores.forEach((store, index) => {
      const marker = new mapboxgl.Marker({
        color: '#6366f1',
        scale: 1.2
      })
        .setLngLat(store.coordinates as [number, number])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold text-white">${store.name}</h3>
                <p class="text-gray-300 text-sm">${store.type}</p>
                <p class="text-blue-400 text-xs">${store.distance}</p>
              </div>
            `)
        )
        .addTo(map.current!);

      // Add click handler
      marker.getElement().addEventListener('click', () => {
        setSelectedStore(store);
      });
    });

    // Add user location marker (center)
    new mapboxgl.Marker({
      color: '#ef4444',
      scale: 1.5
    })
      .setLngLat([-43.35, -21.76])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML('<div class="p-2 text-white"><strong>Sua localização</strong></div>')
      )
      .addTo(map.current!);

    setShowTokenInput(false);
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="p-6 space-y-4">
        <Card className="p-6 bg-gradient-card shadow-card border-border/50 text-center">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Configure o Mapa Interativo</h3>
          <p className="text-muted-foreground mb-4">
            Para usar o mapa interativo, você precisa de um token do Mapbox. 
            Visite <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a> e crie uma conta gratuita.
          </p>
          
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Cole seu token público do Mapbox aqui..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="bg-background border-border"
            />
            <Button 
              onClick={initializeMap}
              disabled={!mapboxToken.trim()}
              className="bg-gradient-primary hover:bg-gradient-accent text-white shadow-glow"
            >
              Ativar Mapa Interativo
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div ref={mapContainer} className="w-full h-96 rounded-lg overflow-hidden shadow-card" />
      
      {selectedStore && (
        <Card className="p-4 bg-gradient-card shadow-card border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{selectedStore.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedStore.type}</p>
                <p className="text-xs text-primary">{selectedStore.distance}</p>
              </div>
            </div>
            
            <Button
              size="sm"
              className="bg-gradient-primary hover:bg-gradient-accent text-white shadow-glow"
            >
              <Navigation className="w-4 h-4 mr-1" />
              Navegar
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}