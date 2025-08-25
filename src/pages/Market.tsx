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
  },
  {
    id: 6,
    name: "Vestido Floral",
    price: "R$ 129,90",
    priceValue: 129.90,
    image: "https://images.unsplash.com/photo-1587920197475-7b068305c482?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 7,
    name: "Bolsa de Couro",
    price: "R$ 350,00",
    priceValue: 350.00,
    image: "https://images.unsplash.com/photo-1566150917024-db0b5368a2d1?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 8,
    name: "Chapéu Panamá",
    price: "R$ 75,50",
    priceValue: 75.50,
    image: "https://images.unsplash.com/photo-1523380486603-9d9361732e4d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 9,
    name: "Relógio de Pulso",
    price: "R$ 499,90",
    priceValue: 499.90,
    image: "https://images.unsplash.com/photo-1524805844463-b8830919d658?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 10,
    name: "Cinto de Couro",
    price: "R$ 65,00",
    priceValue: 65.00,
    image: "https://images.unsplash.com/photo-1555620956-62c686d0b64d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 11,
    name: "Moletom Cinza",
    price: "R$ 159,90",
    priceValue: 159.90,
    image: "https://images.unsplash.com/photo-1588661817540-02e20b330369?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 12,
    name: "Saia Plissada",
    price: "R$ 110,00",
    priceValue: 110.00,
    image: "https://images.unsplash.com/photo-1557022206-ce6660f6d149?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 13,
    name: "Blazer Masculino",
    price: "R$ 399,90",
    priceValue: 399.90,
    image: "https://images.unsplash.com/photo-1616215383568-18e00184b233?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 14,
    name: "Cachecol de Lã",
    price: "R$ 45,90",
    priceValue: 45.90,
    image: "https://images.unsplash.com/photo-1579752533355-6c7c0b852f85?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 15,
    name: "Bota de Cano Alto",
    price: "R$ 279,90",
    priceValue: 279.90,
    image: "https://images.unsplash.com/photo-1519782806746-8e1c6499f57d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 16,
    name: "Macacão Jeans",
    price: "R$ 220,00",
    priceValue: 220.00,
    image: "https://images.unsplash.com/photo-1589139268897-42777618991a?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 17,
    name: "Maiô",
    price: "R$ 95,00",
    priceValue: 95.00,
    image: "https://images.unsplash.com/photo-1550993079-8877501a3512?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 18,
    name: "Bermuda Cargo",
    price: "R$ 89,90",
    priceValue: 89.90,
    image: "https://images.unsplash.com/photo-1596707328637-bf7f9754f7a7?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 19,
    name: "Boné Preto",
    price: "R$ 39,90",
    priceValue: 39.90,
    image: "https://images.unsplash.com/photo-1589088686150-13f5c71d3748?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 20,
    name: "Blusa de Tricô",
    price: "R$ 135,00",
    priceValue: 135.00,
    image: "https://images.unsplash.com/photo-1574343869265-4720e69888d3?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 21,
    name: "Sandália Rasteira",
    price: "R$ 75,00",
    priceValue: 75.00,
    image: "https://images.unsplash.com/photo-1596707328637-bf7f9754f7a7?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 22,
    name: "Cueca Boxer",
    price: "R$ 29,90",
    priceValue: 29.90,
    image: "https://images.unsplash.com/photo-1589088686150-13f5c71d3748?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 23,
    name: "Sutiã de Renda",
    price: "R$ 49,90",
    priceValue: 49.90,
    image: "https://images.unsplash.com/photo-1574343869265-4720e69888d3?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 24,
    name: "Calça de Moletom",
    price: "R$ 115,00",
    priceValue: 115.00,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 25,
    name: "Jaqueta de Couro",
    price: "R$ 450,00",
    priceValue: 450.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 26,
    name: "Blazer Feminino",
    price: "R$ 280,00",
    priceValue: 280.00,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 27,
    name: "Shorts de Sarja",
    price: "R$ 79,90",
    priceValue: 79.90,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 28,
    name: "Polo Listrada",
    price: "R$ 99,90",
    priceValue: 99.90,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 29,
    name: "Meia Esportiva",
    price: "R$ 15,00",
    priceValue: 15.00,
    image: "https://images.unsplash.com/photo-1587920197475-7b068305c482?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 30,
    name: "Gravata de Seda",
    price: "R$ 85,00",
    priceValue: 85.00,
    image: "https://images.unsplash.com/photo-1566150917024-db0b5368a2d1?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 31,
    name: "Pijama de Algodão",
    price: "R$ 130,00",
    priceValue: 130.00,
    image: "https://images.unsplash.com/photo-1523380486603-9d9361732e4d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 32,
    name: "Mochila de Lona",
    price: "R$ 170,00",
    priceValue: 170.00,
    image: "https://images.unsplash.com/photo-1524805844463-b8830919d658?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 33,
    name: "Chapéu de Sol",
    price: "R$ 55,00",
    priceValue: 55.00,
    image: "https://images.unsplash.com/photo-1555620956-62c686d0b64d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 34,
    name: "Tênis de Corrida",
    price: "R$ 350,00",
    priceValue: 350.00,
    image: "https://images.unsplash.com/photo-1588661817540-02e20b330369?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 35,
    name: "Camisa Social",
    price: "R$ 180,00",
    priceValue: 180.00,
    image: "https://images.unsplash.com/photo-1557022206-ce6660f6d149?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 36,
    name: "Regata Esportiva",
    price: "R$ 69,90",
    priceValue: 69.90,
    image: "https://images.unsplash.com/photo-1616215383568-18e00184b233?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 37,
    name: "Casaco de Lã",
    price: "R$ 299,90",
    priceValue: 299.90,
    image: "https://images.unsplash.com/photo-1579752533355-6c7c0b852f85?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 38,
    name: "Calça de Alfaiataria",
    price: "R$ 210,00",
    priceValue: 210.00,
    image: "https://images.unsplash.com/photo-1519782806746-8e1c6499f57d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 39,
    name: "Sapatênis",
    price: "R$ 179,90",
    priceValue: 179.90,
    image: "https://images.unsplash.com/photo-1589139268897-42777618991a?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 40,
    name: "Colar de Prata",
    price: "R$ 150,00",
    priceValue: 150.00,
    image: "https://images.unsplash.com/photo-1550993079-8877501a3512?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 41,
    name: "Vestido de Festa",
    price: "R$ 499,00",
    priceValue: 499.00,
    image: "https://images.unsplash.com/photo-1596707328637-bf7f9754f7a7?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 42,
    name: "Cinto de Fivela",
    price: "R$ 59,90",
    priceValue: 59.90,
    image: "https://images.unsplash.com/photo-1589088686150-13f5c71d3748?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 43,
    name: "Tênis Branco",
    price: "R$ 250,00",
    priceValue: 250.00,
    image: "https://images.unsplash.com/photo-1574343869265-4720e69888d3?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 44,
    name: "Óculos de Grau",
    price: "R$ 190,00",
    priceValue: 190.00,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 45,
    name: "Saia de Couro",
    price: "R$ 240,00",
    priceValue: 240.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 46,
    name: "Bermuda Jeans",
    price: "R$ 99,90",
    priceValue: 99.90,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 47,
    name: "Camisa de Flanela",
    price: "R$ 119,90",
    priceValue: 119.90,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 48,
    name: "Relógio Digital",
    price: "R$ 180,00",
    priceValue: 180.00,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 49,
    name: "Boné Vermelho",
    price: "R$ 39,90",
    priceValue: 39.90,
    image: "https://images.unsplash.com/photo-1587920197475-7b068305c482?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 50,
    name: "Camisa de Gola V",
    price: "R$ 69,90",
    priceValue: 69.90,
    image: "https://images.unsplash.com/photo-1566150917024-db0b5368a2d1?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 51,
    name: "Calça Skinny",
    price: "R$ 155,00",
    priceValue: 155.00,
    image: "https://images.unsplash.com/photo-1523380486603-9d9361732e4d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 52,
    name: "Blusa de Lã",
    price: "R$ 145,00",
    priceValue: 145.00,
    image: "https://images.unsplash.com/photo-1524805844463-b8830919d658?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 53,
    name: "Bolsa de Lado",
    price: "R$ 210,00",
    priceValue: 210.00,
    image: "https://images.unsplash.com/photo-1555620956-62c686d0b64d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 54,
    name: "Shorts de Corrida",
    price: "R$ 80,00",
    priceValue: 80.00,
    image: "https://images.unsplash.com/photo-1588661817540-02e20b330369?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 55,
    name: "Jaqueta Corta Vento",
    price: "R$ 189,90",
    priceValue: 189.90,
    image: "https://images.unsplash.com/photo-1557022206-ce6660f6d149?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 56,
    name: "Vestido de Verão",
    price: "R$ 105,00",
    priceValue: 105.00,
    image: "https://images.unsplash.com/photo-1616215383568-18e00184b233?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 57,
    name: "Tênis de Skate",
    price: "R$ 230,00",
    priceValue: 230.00,
    image: "https://images.unsplash.com/photo-1579752533355-6c7c0b852f85?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 58,
    name: "Luvas de Couro",
    price: "R$ 90,00",
    priceValue: 90.00,
    image: "https://images.unsplash.com/photo-1519782806746-8e1c6499f57d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 59,
    name: "Meia-calça",
    price: "R$ 25,00",
    priceValue: 25.00,
    image: "https://images.unsplash.com/photo-1589139268897-42777618991a?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 60,
    name: "Sapatilha",
    price: "R$ 85,00",
    priceValue: 85.00,
    image: "https://images.unsplash.com/photo-1550993079-8877501a3512?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 61,
    name: "Vestido de Renda",
    price: "R$ 199,00",
    priceValue: 199.00,
    image: "https://images.unsplash.com/photo-1596707328637-bf7f9754f7a7?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 62,
    name: "Camisa Jeans",
    price: "R$ 139,90",
    priceValue: 139.90,
    image: "https://images.unsplash.com/photo-1589088686150-13f5c71d3748?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 63,
    name: "Calça de Couro",
    price: "R$ 350,00",
    priceValue: 350.00,
    image: "https://images.unsplash.com/photo-1574343869265-4720e69888d3?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 64,
    name: "Biquíni",
    price: "R$ 110,00",
    priceValue: 110.00,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 65,
    name: "Chinelo de Borracha",
    price: "R$ 45,00",
    priceValue: 45.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 66,
    name: "Cinto de Pano",
    price: "R$ 35,00",
    priceValue: 35.00,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 67,
    name: "Macacão Curto",
    price: "R$ 160,00",
    priceValue: 160.00,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 68,
    name: "Tênis Casual Preto",
    price: "R$ 280,00",
    priceValue: 280.00,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 69,
    name: "Óculos de Natação",
    price: "R$ 70,00",
    priceValue: 70.00,
    image: "https://images.unsplash.com/photo-1587920197475-7b068305c482?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 70,
    name: "Bolsa Transparente",
    price: "R$ 140,00",
    priceValue: 140.00,
    image: "https://images.unsplash.com/photo-1566150917024-db0b5368a2d1?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 71,
    name: "Blusa de Algodão",
    price: "R$ 75,00",
    priceValue: 75.00,
    image: "https://images.unsplash.com/photo-1523380486603-9d9361732e4d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 72,
    name: "Shorts de Banho",
    price: "R$ 65,00",
    priceValue: 65.00,
    image: "https://images.unsplash.com/photo-1524805844463-b8830919d658?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 73,
    name: "Jaqueta de Nylon",
    price: "R$ 215,00",
    priceValue: 215.00,
    image: "https://images.unsplash.com/photo-1555620956-62c686d0b64d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 74,
    name: "Vestido Midi",
    price: "R$ 180,00",
    priceValue: 180.00,
    image: "https://images.unsplash.com/photo-1588661817540-02e20b330369?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 75,
    name: "Sapato Social",
    price: "R$ 320,00",
    priceValue: 320.00,
    image: "https://images.unsplash.com/photo-1557022206-ce6660f6d149?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 76,
    name: "Meias Coloridas",
    price: "R$ 20,00",
    priceValue: 20.00,
    image: "https://images.unsplash.com/photo-1616215383568-18e00184b233?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 77,
    name: "Chapéu de Feltro",
    price: "R$ 120,00",
    priceValue: 120.00,
    image: "https://images.unsplash.com/photo-1579752533355-6c7c0b852f85?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 78,
    name: "Mochila de Couro",
    price: "R$ 380,00",
    priceValue: 380.00,
    image: "https://images.unsplash.com/photo-1519782806746-8e1c6499f57d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 79,
    name: "Cinto de Corda",
    price: "R$ 40,00",
    priceValue: 40.00,
    image: "https://images.unsplash.com/photo-1589139268897-42777618991a?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 80,
    name: "Camisa Polo Branca",
    price: "R$ 99,90",
    priceValue: 99.90,
    image: "https://images.unsplash.com/photo-1550993079-8877501a3512?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 81,
    name: "Tênis de Basquete",
    price: "R$ 450,00",
    priceValue: 450.00,
    image: "https://images.unsplash.com/photo-1596707328637-bf7f9754f7a7?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 82,
    name: "Blusa de Cetim",
    price: "R$ 160,00",
    priceValue: 160.00,
    image: "https://images.unsplash.com/photo-1589088686150-13f5c71d3748?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 83,
    name: "Jaqueta de Camurça",
    price: "R$ 300,00",
    priceValue: 300.00,
    image: "https://images.unsplash.com/photo-1574343869265-4720e69888d3?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 84,
    name: "Calça Social",
    price: "R$ 220,00",
    priceValue: 220.00,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 85,
    name: "Sandália de Salto",
    price: "R$ 150,00",
    priceValue: 150.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 86,
    name: "Cachecol de Seda",
    price: "R$ 75,00",
    priceValue: 75.00,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 87,
    name: "Vestido Longo",
    price: "R$ 250,00",
    priceValue: 250.00,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 88,
    name: "Gorro de Lã",
    price: "R$ 55,00",
    priceValue: 55.00,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 89,
    name: "Mala de Viagem",
    price: "R$ 400,00",
    priceValue: 400.00,
    image: "https://images.unsplash.com/photo-1587920197475-7b068305c482?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 90,
    name: "Blusa de Frio",
    price: "R$ 170,00",
    priceValue: 170.00,
    image: "https://images.unsplash.com/photo-1566150917024-db0b5368a2d1?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 91,
    name: "Sapato de Salto Alto",
    price: "R$ 280,00",
    priceValue: 280.00,
    image: "https://images.unsplash.com/photo-1523380486603-9d9361732e4d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 92,
    name: "Calça Pantalona",
    price: "R$ 190,00",
    priceValue: 190.00,
    image: "https://images.unsplash.com/photo-1524805844463-b8830919d658?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 93,
    name: "Jaqueta Puffer",
    price: "R$ 299,00",
    priceValue: 299.00,
    image: "https://images.unsplash.com/photo-1555620956-62c686d0b64d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 94,
    name: "Camisa de Manga Longa",
    price: "R$ 120,00",
    priceValue: 120.00,
    image: "https://images.unsplash.com/photo-1588661817540-02e20b330369?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 95,
    name: "Bolsa de Ombro",
    price: "R$ 199,00",
    priceValue: 199.00,
    image: "https://images.unsplash.com/photo-1557022206-ce6660f6d149?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 96,
    name: "Saia Lápis",
    price: "R$ 95,00",
    priceValue: 95.00,
    image: "https://images.unsplash.com/photo-1616215383568-18e00184b233?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 97,
    name: "Cinto de Corrente",
    price: "R$ 60,00",
    priceValue: 60.00,
    image: "https://images.unsplash.com/photo-1579752533355-6c7c0b852f85?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 98,
    name: "Tênis de Lona",
    price: "R$ 125,00",
    priceValue: 125.00,
    image: "https://images.unsplash.com/photo-1519782806746-8e1c6499f57d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 99,
    name: "Mochila de Couro Sintético",
    price: "R$ 150,00",
    priceValue: 150.00,
    image: "https://images.unsplash.com/photo-1589139268897-42777618991a?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 100,
    name: "Vestido de Gola Alta",
    price: "R$ 180,00",
    priceValue: 180.00,
    image: "https://images.unsplash.com/photo-1550993079-8877501a3512?w=400&h=400&fit=crop&crop=center"
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
