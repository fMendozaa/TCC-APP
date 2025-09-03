import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingCart, ShoppingBag, Plus, Minus, Filter, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { ProductCard } from "@/components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const products = [
  {
    id: 1,
    name: "Jaqueta Jeans Premium",
    price: "R$ 199,90",
    priceValue: 199.90,
    category: "roupas",
    tags: ["jaqueta", "jeans", "casual", "unissex"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Camiseta Básica Branca",
    price: "R$ 59,90",
    priceValue: 59.90,
    category: "roupas",
    tags: ["camiseta", "básica", "branca", "algodão"],
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Calça Jeans Skinny",
    price: "R$ 149,90",
    priceValue: 149.90,
    category: "roupas",
    tags: ["calça", "jeans", "skinny", "feminina"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 4,
    name: "Óculos de Sol Ray-Ban",
    price: "R$ 89,90",
    priceValue: 89.90,
    category: "acessorios",
    tags: ["óculos", "sol", "ray-ban", "proteção"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 5,
    name: "Tênis Nike Air Max",
    price: "R$ 299,90",
    priceValue: 299.90,
    category: "calcados",
    tags: ["tênis", "nike", "air max", "esportivo"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 6,
    name: "Vestido Floral Verão",
    price: "R$ 129,90",
    priceValue: 129.90,
    category: "roupas",
    tags: ["vestido", "floral", "verão", "feminino"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1587920197475-7b068305c482?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 7,
    name: "Bolsa de Couro Legítimo",
    price: "R$ 350,00",
    priceValue: 350.00,
    category: "acessorios",
    tags: ["bolsa", "couro", "feminina", "elegante"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566150917024-db0b5368a2d1?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 8,
    name: "Chapéu Panamá Original",
    price: "R$ 75,50",
    priceValue: 75.50,
    category: "acessorios",
    tags: ["chapéu", "panamá", "verão", "proteção"],
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1523380486603-9d9361732e4d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 9,
    name: "Relógio Smartwatch",
    price: "R$ 499,90",
    priceValue: 499.90,
    category: "acessorios",
    tags: ["relógio", "smartwatch", "tecnologia", "fitness"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1524805844463-b8830919d658?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 10,
    name: "Cinto de Couro Masculino",
    price: "R$ 65,00",
    priceValue: 65.00,
    category: "acessorios",
    tags: ["cinto", "couro", "masculino", "formal"],
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1555620956-62c686d0b64d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 11,
    name: "Moletom Cinza Comfort",
    price: "R$ 159,90",
    priceValue: 159.90,
    category: "roupas",
    tags: ["moletom", "cinza", "comfort", "inverno"],
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1588661817540-02e20b330369?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 12,
    name: "Saia Plissada Midi",
    price: "R$ 110,00",
    priceValue: 110.00,
    category: "roupas",
    tags: ["saia", "plissada", "midi", "elegante"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1557022206-ce6660f6d149?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 13,
    name: "Blazer Social Masculino",
    price: "R$ 399,90",
    priceValue: 399.90,
    category: "roupas",
    tags: ["blazer", "social", "masculino", "formal"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1616215383568-18e00184b233?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 14,
    name: "Cachecol de Lã Merino",
    price: "R$ 45,90",
    priceValue: 45.90,
    category: "acessorios",
    tags: ["cachecol", "lã", "merino", "inverno"],
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1579752533355-6c7c0b852f85?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 15,
    name: "Bota de Cano Alto Feminina",
    price: "R$ 279,90",
    priceValue: 279.90,
    category: "calcados",
    tags: ["bota", "cano alto", "feminina", "couro"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519782806746-8e1c6499f57d?w=400&h=400&fit=crop&crop=center"
  }
];

export function EnhancedMarket() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  const [searchResults, setSearchResults] = useState(products);
  const { addItem, items } = useCartStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults(products);
    } else {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(filtered);
    }
  };

  const filteredProducts = searchResults.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.priceValue - b.priceValue;
      case "price-high":
        return b.priceValue - a.priceValue;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default: // popular
        return b.rating * Math.random() - a.rating * Math.random();
    }
  });

  const handleQuantityChange = (productId: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta)
    }));
  };

  const handleAddToCart = (product: typeof products[0]) => {
    const quantity = quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        priceValue: product.priceValue,
        image: product.image
      });
    }
    
    setQuantities(prev => ({ ...prev, [product.id]: 0 }));
    
    toast({
      title: "Produto adicionado! 🛍️",
      description: `${product.name} foi adicionado ao carrinho`,
    });
  };

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">TRENDFY</h1>
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Market</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/checkout')}
              className="text-white hover:bg-white/20 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar produtos por nome ou categoria..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 bg-card border-border">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="roupas">Roupas</SelectItem>
                <SelectItem value="calcados">Calçados</SelectItem>
                <SelectItem value="acessorios">Acessórios</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-card border-border">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Populares</SelectItem>
                <SelectItem value="price-low">Menor preço</SelectItem>
                <SelectItem value="price-high">Maior preço</SelectItem>
                <SelectItem value="rating">Avaliação</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="border-border">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} produto(s) encontrado(s)
            </p>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults(products);
                }}
                className="text-primary hover:bg-primary/10"
              >
                Limpar busca
              </Button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card className="p-8 bg-gradient-card shadow-card border-border/50 text-center">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou buscar por outros termos</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="p-0 bg-gradient-card shadow-card border-border/50 overflow-hidden hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-4 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {product.category === "roupas" ? "Roupas" : 
                         product.category === "calcados" ? "Calçados" : "Acessórios"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">{product.rating}</span>
                      </div>
                      <p className="text-lg font-bold text-primary">{product.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(product.id, -1)}
                      disabled={!quantities[product.id]}
                      className="w-8 h-8 p-0 border-border"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <span className="flex-1 text-center font-medium text-foreground">
                      {quantities[product.id] || 1}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="w-8 h-8 p-0 border-border"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-primary hover:bg-gradient-accent text-white font-semibold py-2 rounded-lg shadow-glow transition-all duration-300 hover:scale-[0.98]"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>

                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-border text-muted-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}