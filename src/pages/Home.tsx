import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import fashionHero from "@/assets/fashion-hero.jpg";

export function Home() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">FASTION</h1>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Bem-Vindo,</h2>
          <p className="text-white/90">ao nosso app de looks!</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* AI Section */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Conheça a nossa AI!</h3>
          <Button 
            className="bg-gradient-primary hover:bg-gradient-accent text-white font-semibold px-8 py-3 rounded-lg shadow-glow transition-all duration-300 hover:scale-105"
          >
            VENHA CONHECER!
          </Button>
        </Card>

        {/* Map Section */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Veja lojas próximas a você!</h3>
          <Button 
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            MAPA
          </Button>
        </Card>

        {/* Fashion Showcase */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50 overflow-hidden">
          <div className="flex gap-4">
            <div className="flex-1">
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Óculos de sol em formato de coração
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Jaqueta jeans
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-pink rounded-full"></div>
                  Camiseta branca lisa
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Calça jeans
                </li>
              </ul>
            </div>
            <div className="w-32 h-32 rounded-xl overflow-hidden shadow-card">
              <img 
                src={fashionHero} 
                alt="Fashion style showcase" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}