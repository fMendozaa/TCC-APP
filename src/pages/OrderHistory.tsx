import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, Package, Calendar, CreditCard, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Order {
  id: string;
  date: Date;
  status: 'delivered' | 'shipping' | 'preparing' | 'cancelled';
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

const mockOrders: Order[] = [
  {
    id: "TR-2024-001",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "delivered",
    total: 459.80,
    items: [
      { name: "Jaqueta Jeans", quantity: 1, price: 199.90, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop" },
      { name: "Tênis Casual", quantity: 1, price: 299.90, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop" }
    ]
  },
  {
    id: "TR-2024-002",
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    status: "shipping",
    total: 249.80,
    items: [
      { name: "Vestido Floral", quantity: 1, price: 129.90, image: "https://images.unsplash.com/photo-1587920197475-7b068305c482?w=100&h=100&fit=crop" },
      { name: "Óculos de Sol", quantity: 1, price: 89.90, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop" }
    ]
  },
  {
    id: "TR-2024-003",
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    status: "delivered",
    total: 895.70,
    items: [
      { name: "Bolsa de Couro", quantity: 1, price: 350.00, image: "https://images.unsplash.com/photo-1566150917024-db0b5368a2d1?w=100&h=100&fit=crop" },
      { name: "Relógio de Pulso", quantity: 1, price: 499.90, image: "https://images.unsplash.com/photo-1524805844463-b8830919d658?w=100&h=100&fit=crop" }
    ]
  }
];

export function OrderHistory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return { label: 'Entregue', color: 'bg-green-500', icon: Package };
      case 'shipping':
        return { label: 'A caminho', color: 'bg-blue-500', icon: Truck };
      case 'preparing':
        return { label: 'Preparando', color: 'bg-yellow-500', icon: Package };
      case 'cancelled':
        return { label: 'Cancelado', color: 'bg-red-500', icon: Package };
      default:
        return { label: 'Pendente', color: 'bg-gray-500', icon: Package };
    }
  };

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
          <h1 className="text-2xl font-bold">Histórico de Compras</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Buscar por pedido ou produto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { value: "all", label: "Todos" },
              { value: "delivered", label: "Entregues" },
              { value: "shipping", label: "A caminho" },
              { value: "preparing", label: "Preparando" },
              { value: "cancelled", label: "Cancelados" }
            ].map((status) => (
              <Button
                key={status.value}
                variant={selectedStatus === status.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus(status.value)}
                className={`whitespace-nowrap ${
                  selectedStatus === status.value 
                    ? 'bg-gradient-primary text-white' 
                    : 'border-border text-muted-foreground'
                }`}
              >
                {status.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="p-8 bg-gradient-card shadow-card border-border/50 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum pedido encontrado</h3>
              <p className="text-muted-foreground">Tente ajustar os filtros ou faça sua primeira compra!</p>
              <Button 
                onClick={() => navigate('/market')}
                className="mt-4 bg-gradient-primary hover:bg-gradient-accent text-white"
              >
                Ir às compras
              </Button>
            </Card>
          ) : (
            filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <Card key={order.id} className="p-6 bg-gradient-card shadow-card border-border/50">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Pedido {order.id}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="w-4 h-4" />
                        {order.date.toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <Badge className={`${statusConfig.color} text-white`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-foreground font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                        </div>
                        <p className="text-primary font-semibold">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm">Total do pedido</span>
                    </div>
                    <p className="text-lg font-bold text-primary">
                      R$ {order.total.toFixed(2)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 border-border text-foreground"
                    >
                      Ver detalhes
                    </Button>
                    {order.status === 'delivered' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Comprar novamente
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}