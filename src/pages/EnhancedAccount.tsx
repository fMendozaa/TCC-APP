import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Settings, Heart, ShoppingBag, Users, Camera, Edit3, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  followers: number;
  following: number;
  posts: number;
}

export function EnhancedAccount() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "Anna Silva",
    username: "fashionista_anna",
    bio: "Passionate about fashion and trends | Style lover ✨",
    email: "anna@example.com",
    phone: "(11) 99999-9999",
    location: "São Paulo, SP",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
    followers: 1247,
    following: 856,
    posts: 47
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    toast({
      title: "Perfil atualizado! ✅",
      description: "Suas informações foram salvas com sucesso",
    });
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">TRENDFY</h1>
          <h2 className="text-xl font-semibold">Perfil</h2>
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
            <div className="relative">
              <Avatar className="w-24 h-24 shadow-glow">
                <AvatarImage src={profile.avatar} alt="Profile picture" />
                <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-white">
                  {profile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-primary hover:bg-gradient-accent shadow-glow"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {isEditing ? (
              <div className="w-full max-w-md space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground text-sm">Nome</Label>
                  <Input
                    id="name"
                    value={tempProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-background border-border text-center"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground text-sm">Username</Label>
                  <Input
                    id="username"
                    value={tempProfile.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="bg-background border-border text-center"
                    placeholder="@username"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-foreground text-sm">Bio</Label>
                  <Input
                    id="bio"
                    value={tempProfile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="bg-background border-border text-center"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-foreground text-sm">Localização</Label>
                  <Input
                    id="location"
                    value={tempProfile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-background border-border text-center"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={handleSave}
                    className="flex-1 bg-gradient-primary hover:bg-gradient-accent text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 border-border"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                  <p className="text-primary font-medium">@{profile.username}</p>
                  <p className="text-muted-foreground mt-2">{profile.bio}</p>
                  <p className="text-sm text-muted-foreground mt-1">📍 {profile.location}</p>
                </div>
                
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  EDITAR PERFIL
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-card shadow-card border-border/50 text-center">
            <p className="text-2xl font-bold text-foreground">{profile.posts}</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </Card>
          
          <Card className="p-4 bg-gradient-card shadow-card border-border/50 text-center">
            <p className="text-2xl font-bold text-foreground">{profile.followers.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Seguidores</p>
          </Card>
          
          <Card className="p-4 bg-gradient-card shadow-card border-border/50 text-center">
            <p className="text-2xl font-bold text-foreground">{profile.following}</p>
            <p className="text-sm text-muted-foreground">Seguindo</p>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Conquistas</h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gradient-primary text-white">Fashionista</Badge>
            <Badge className="bg-gradient-accent text-white">Trend Setter</Badge>
            <Badge className="bg-brand-pink text-white">Style Expert</Badge>
            <Badge variant="secondary">Early Adopter</Badge>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-card shadow-card border-border/50">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">847</p>
                <p className="text-sm text-muted-foreground">Curtidas</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card shadow-card border-border/50">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-sm text-muted-foreground">Compras</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Settings & Options */}
        <div className="space-y-3">
          {[
            { icon: Settings, label: "Configurações da Conta", color: "text-muted-foreground", action: () => console.log('Settings') },
            { icon: Heart, label: "Itens Favoritos", color: "text-red-500", action: () => console.log('Favorites') },
            { icon: ShoppingBag, label: "Histórico de Compras", color: "text-primary", action: () => console.log('Orders') },
            { icon: Users, label: "Amigos e Seguidores", color: "text-accent", action: () => console.log('Friends') },
          ].map((item, index) => (
            <Card key={index} className="p-4 bg-gradient-card shadow-card border-border/50 hover:bg-muted/10 transition-colors cursor-pointer">
              <div className="flex items-center justify-between" onClick={item.action}>
                <div className="flex items-center gap-4">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className="text-foreground font-medium">{item.label}</span>
                </div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}