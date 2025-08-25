import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const products = [
  {
    id: 1,
    name: "Jaqueta Jeans",
    price: "R$ 199,90",
    priceValue: 199.90,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Camiseta Branca",
    price: "R$ 59,90",
    priceValue: 59.90,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Calça Jeans",
    price: "R$ 149,90",
    priceValue: 149.90,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 4,
    name: "Óculos de Sol",
    price: "R$ 89,90",
    priceValue: 89.90,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 5,
    name: "Tênis Casual",
    price: "R$ 299,90",
    priceValue: 299.90,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  }
];

const categories = ["PRODUTOS", "CARRINHO", "BUSCA"];

export function Market() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem, items, getTotalItems } = useCartStore();
  const [activeTab, setActiveTab] = useState(0);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceValue: product.priceValue,
      image: product.image
    });
    
    toast({
      title: "Produto adicionado! 🛒",
      description: `${product.name} foi adicionado ao carrinho`,
    });
  };

  const getItemQuantity = (productId: number) => {
    const item = items.find(item => item.id === productId);
    return item?.quantity || 0;
  };

  const renderContent = () => {
    if (activeTab === 1) {
      // Carrinho
      return (
        <div className="space-y-4">
          {items.length === 0 ? (
            <Card className="p-8 bg-gradient-card shadow-card border-border/50 text-center">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Carrinho vazio</h3>
              <p className="text-muted-foreground">Adicione alguns produtos para continuar</p>
            </Card>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((item) => (
                  <Card key={item.id} className="p-4 bg-gradient-card shadow-card border-border/50">
                    <div className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-primary font-semibold">{item.price}</p>
                        <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="p-4 bg-gradient-card shadow-card border-border/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-foreground">Total: R$ {items.reduce((total, item) => total + (item.priceValue * item.quantity), 0).toFixed(2)}</span>
                  <Badge variant="secondary">{getTotalItems()} itens</Badge>
                </div>
                
                <Button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-gradient-primary hover:bg-gradient-accent text-white font-semibold py-3 rounded-lg shadow-glow transition-all duration-300"
                >
                  Finalizar Compra
                </Button>
              </Card>
            </>
          )}
        </div>
      );
    }

    // Produtos (tab padrão)
    return (
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
                
                {getItemQuantity(product.id) > 0 && (
                  <Badge variant="secondary" className="mt-2">
                    {getItemQuantity(product.id)} no carrinho
                  </Badge>
                )}
              </div>
            </div>
            
            <Button 
              onClick={() => handleAddToCart(product)}
              className="w-full mt-4 bg-gradient-primary hover:bg-gradient-accent text-white font-semibold py-3 rounded-lg shadow-glow transition-all duration-300 hover:scale-[0.98]"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              ADICIONAR
            </Button>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">TRENDFY</h1>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Market</h2>
            {getTotalItems() > 0 && (
              <Badge className="bg-white text-primary">
                {getTotalItems()}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex border-b border-border">
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => setActiveTab(index)}
            className={`flex-1 p-4 text-center font-medium transition-colors ${
              activeTab === index 
                ? 'text-primary border-b-2 border-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {category}
            {index === 1 && getTotalItems() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getTotalItems()}
              </Badge>
            )}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {/* Search - only show on products tab */}
        {activeTab === 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar produtos..."
              className="pl-10 bg-card border-border"
            />
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
}