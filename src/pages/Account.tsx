import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Settings, Heart, ShoppingBag, Users } from "lucide-react";

export function Account() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">TRENDFY</h1>
          <h2 className="text-xl font-semibold">Account</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Pesquisar..."
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Profile Section */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
              <span className="text-white text-2xl font-bold">U</span>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-foreground">@username</h2>
              <p className="text-muted-foreground mt-1">Passionate about fashion and trends | 1k followers</p>
            </div>
            
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              EDIT PROFILE
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-card shadow-card border-border/50 text-center">
            <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold text-foreground">47</p>
            <p className="text-sm text-muted-foreground">Likes</p>
          </Card>
          
          <Card className="p-4 bg-gradient-card shadow-card border-border/50 text-center">
            <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">Orders</p>
          </Card>
          
          <Card className="p-4 bg-gradient-card shadow-card border-border/50 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold text-foreground">1K</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </Card>
        </div>

        {/* Settings & Options */}
        <div className="space-y-3">
          {[
            { icon: Settings, label: "Configurações", color: "text-muted-foreground" },
            { icon: Heart, label: "Favoritos", color: "text-red-500" },
            { icon: ShoppingBag, label: "Meus Pedidos", color: "text-primary" },
            { icon: Users, label: "Amigos", color: "text-accent" },
          ].map((item, index) => (
            <Card key={index} className="p-4 bg-gradient-card shadow-card border-border/50">
              <div className="flex items-center gap-4">
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-foreground font-medium">{item.label}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}