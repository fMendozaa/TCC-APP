import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Store locations in Brazil
const storeLocations = [
  {
    id: 1,
    name: "FASTION São Paulo",
    position: [-23.5505, -46.6333],
    address: "Rua Augusta, 123 - São Paulo, SP",
    phone: "(11) 99999-9999"
  },
  {
    id: 2,
    name: "FASTION Rio de Janeiro",
    position: [-22.9068, -43.1729],
    address: "Av. Copacabana, 456 - Rio de Janeiro, RJ", 
    phone: "(21) 99999-9999"
  },
  {
    id: 3,
    name: "FASTION Belo Horizonte",
    position: [-19.9167, -43.9345],
    address: "Rua da Bahia, 789 - Belo Horizonte, MG",
    phone: "(31) 99999-9999"
  },
  {
    id: 4,
    name: "FASTION Brasília",
    position: [-15.8267, -47.9218],
    address: "SCS Quadra 1 - Brasília, DF",
    phone: "(61) 99999-9999"
  },
  {
    id: 5,
      name: "FASTION Antananarivo",
      position: [-18.9100, 47.5250],
      address: "Rua Ramahatra - Antananarivo, ANT",
      phone: "(261) 99999-9999",
  }
];

export const LeafletMap = () => {
  useEffect(() => {
    // Fix for default markers using CDN icons
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[-15.7942, -47.8822]} // Center of Brazil
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {storeLocations.map((store) => (
          <Marker key={store.id} position={store.position as [number, number]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg text-primary">{store.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{store.address}</p>
                <p className="text-sm font-medium">📞 {store.phone}</p>
                <div className="mt-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${store.position[0]},${store.position[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    🧭 Como chegar
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
