import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface Favorite {
  id: string;
  product_id: string;
  product_name: string;
  product_image?: string;
  product_price: number;
  created_at: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Verificar se usuário está logado (simulado)
  const getUserId = () => {
    // Por enquanto vamos usar um ID fixo simulado
    return 'user-demo-123';
  };

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar favoritos:', error);
        return;
      }

      setFavorites(data || []);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (product: {
    id: string;
    name: string;
    image?: string;
    price: number;
  }) => {
    try {
      const userId = getUserId();
      
      const { data, error } = await supabase
        .from('favorites')
        .insert({
          user_id: userId,
          product_id: product.id,
          product_name: product.name,
          product_image: product.image,
          product_price: product.price
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar favorito:', error);
        toast({
          title: "Erro",
          description: "Não foi possível adicionar aos favoritos",
          variant: "destructive"
        });
        return false;
      }

      setFavorites(prev => [data, ...prev]);
      toast({
        title: "Adicionado aos favoritos! ❤️",
        description: product.name
      });
      return true;
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar aos favoritos",
        variant: "destructive"
      });
      return false;
    }
  };

  const removeFromFavorites = async (productId: string) => {
    try {
      const userId = getUserId();
      
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) {
        console.error('Erro ao remover favorito:', error);
        toast({
          title: "Erro",
          description: "Não foi possível remover dos favoritos",
          variant: "destructive"
        });
        return false;
      }

      setFavorites(prev => prev.filter(fav => fav.product_id !== productId));
      toast({
        title: "Removido dos favoritos",
        description: "Item removido da sua lista de favoritos"
      });
      return true;
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      return false;
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.product_id === productId);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refetch: loadFavorites
  };
}