import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Jaqueta Jeans",
    price: "R$ 199,90",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Camiseta Branca",
    price: "R$ 59,90",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Calça Jeans",
    price: "R$ 149,90",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center"
  }
];

const categories = ["PRODUTOS", "CARRINHO", "BUSCA"];

export function Market() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">TRENDFY</h1>
          <h2 className="text-xl font-semibold">Market</h2>
        </div>
      </div>

      {/* Categories */}
      <div className="flex border-b border-border">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`flex-1 p-4 text-center font-medium transition-colors ${
              index === 0 
                ? 'text-primary border-b-2 border-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Pesquisar produtos..."
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Products */}
        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id} className="p-4 bg-gradient-card shadow-card border-border/50">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden shadow-card">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mt-1">{product.price}</p>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4 bg-gradient-primary hover:bg-gradient-accent text-white font-semibold py-3 rounded-lg shadow-glow transition-all duration-300 hover:scale-[0.98]"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                ADICIONAR
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}