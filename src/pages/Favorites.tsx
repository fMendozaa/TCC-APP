import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { useCurrency } from "@/hooks/useCurrency";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/hooks/use-toast";

export function Favorites() {
  const navigate = useNavigate();
  const { favorites, loading, removeFromFavorites } = useFavorites();
  const { formatPrice, convertPrice } = useCurrency();
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = (favorite: any) => {
    const convertedPrice = convertPrice(favorite.product_price);
    addItem({
      id: parseInt(favorite.product_id) || Math.floor(Math.random() * 10000),
      name: favorite.product_name,
      price: formatPrice(convertedPrice),
      priceValue: convertedPrice,
      image: favorite.product_image || "/placeholder.svg"
    });

    toast({
      title: "Adicionado ao carrinho! 🛒",
      description: favorite.product_name,
    });
  };

  const handleRemoveFavorite = async (productId: string) => {
    await removeFromFavorites(productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/account')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Favoritos</h1>
        </div>
        <p className="text-white/90">
          {favorites.length} {favorites.length === 1 ? 'item favoritado' : 'itens favoritados'}
        </p>
      </div>

      <div className="p-6">
        {favorites.length === 0 ? (
          <Card className="p-8 text-center bg-card shadow-card border-border/50">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              Nenhum favorito ainda
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore nossos produtos e adicione seus favoritos aqui!
            </p>
            <Button onClick={() => navigate('/market')}>
              Explorar Produtos
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <Card key={favorite.id} className="overflow-hidden bg-card shadow-card border-border/50">
                <div className="aspect-square bg-muted/10 relative">
                  <img
                    src={favorite.product_image || "/placeholder.svg"}
                    alt={favorite.product_name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFavorite(favorite.product_id)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">
                    {favorite.product_name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(convertPrice(favorite.product_price))}
                    </span>
                    <Badge variant="secondary">
                      ❤️ Favorito
                    </Badge>
                  </div>
                  
                  <Button 
                    onClick={() => handleAddToCart(favorite)}
                    className="w-full"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}