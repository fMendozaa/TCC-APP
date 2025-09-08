import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useFavorites } from "@/hooks/useFavorites";
import { useCurrency } from "@/hooks/useCurrency";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Product {
  id: number | string;
  name: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { formatPrice, convertPrice } = useCurrency();
  const { toast } = useToast();

  const handleAddToCart = () => {
    const convertedPrice = convertPrice(product.price);
    const productId = typeof product.id === 'string' ? parseInt(product.id) : product.id;
    
    addItem({
      id: productId || Math.floor(Math.random() * 10000),
      name: product.name,
      price: formatPrice(convertedPrice),
      priceValue: convertedPrice,
      image: product.image
    });

    toast({
      title: "Adicionado ao carrinho! 🛒",
      description: product.name,
    });
  };

  const handleToggleFavorite = async () => {
    const convertedPrice = convertPrice(product.price);
    const productIdStr = String(product.id);
    
    if (isFavorite(productIdStr)) {
      await removeFromFavorites(productIdStr);
    } else {
      await addToFavorites({
        id: productIdStr,
        name: product.name,
        image: product.image,
        price: convertedPrice
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-3 h-3",
          i < rating 
            ? "text-yellow-400 fill-yellow-400" 
            : "text-muted-foreground"
        )}
      />
    ));
  };

  return (
    <Card className={cn("overflow-hidden bg-card shadow-card border-border/50", className)}>
      <div className="aspect-square bg-muted/10 relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleFavorite}
          className={cn(
            "absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors",
            isFavorite(String(product.id)) 
              ? "text-red-500 hover:text-red-600" 
              : "text-muted-foreground hover:text-red-500"
          )}
        >
          <Heart className={cn("w-4 h-4", isFavorite(String(product.id)) && "fill-current")} />
        </Button>
        
        {product.category && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 bg-white/80"
          >
            {product.category}
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {product.rating && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)}
            </span>
            {product.reviewCount && (
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-primary">
            {formatPrice(convertPrice(product.price))}
          </span>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
    </Card>
  );
}