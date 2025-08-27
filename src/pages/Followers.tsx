import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, Users, UserPlus, UserMinus, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
  isFollowingYou: boolean;
  verified?: boolean;
  bio?: string;
  followers: number;
}

const mockFollowers: User[] = [
  {
    id: "1",
    name: "Ana Fashion",
    username: "fashionista_ana",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
    isFollowing: true,
    isFollowingYou: true,
    verified: true,
    bio: "Apaixonada por moda sustentável 🌱",
    followers: 2341
  },
  {
    id: "2",
    name: "Style Guru",
    username: "style_guru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isFollowing: false,
    isFollowingYou: true,
    bio: "Dicas de estilo para todos os dias",
    followers: 8756
  },
  {
    id: "3",
    name: "Trend Lover",
    username: "trend_lover",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    isFollowing: true,
    isFollowingYou: false,
    verified: true,
    bio: "Sempre na vanguarda das tendências",
    followers: 1523
  },
  {
    id: "4",
    name: "Fashion Police",
    username: "fashion_police",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isFollowing: true,
    isFollowingYou: true,
    bio: "Crítico de moda e lifestyle",
    followers: 945
  }
];

const mockFollowing: User[] = [
  {
    id: "5",
    name: "Fabricio M",
    username: "fabricio",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    isFollowing: true,
    isFollowingYou: false,
    bio: "Fundador da TrendFy",
    followers: 24542
  },
  {
    id: "6",
    name: "Rafael Ikeda",
    username: "rafaelikeda",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    isFollowing: true,
    isFollowingYou: true,
    verified: true,
    bio: "Fundador TrendFy",
    followers: 25753
  },
  {
    id: "7",
    name: "Samir",
    username: "samir",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    isFollowing: true,
    isFollowingYou: true,
    verified: true,
    bio: "Fundador TrendFy",
    followers: 19737
  },
  {
    id: "8",
    name: "Bernardo A",
    username: "bernardo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    isFollowing: true,
    isFollowingYou: true,
    verified: true,
    bio: "Fundador TrendFy",
    followers: 10104
  },
  {
    id: "9",
    name: "Eloah",
    username: "eloah",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    isFollowing: true,
    isFollowingYou: true,
    verified: true,
    bio: "Fundadora TrendFy",
    followers: 12321
  },
  {
    id: "10",
    name: "Nicole",
    username: "nicole",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    isFollowing: true,
    isFollowingYou: true,
    verified: true,
    bio: "Fundadora TrendFy",
    followers: 12312
  }
];

export function Followers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');
  const [searchQuery, setSearchQuery] = useState("");
  const [followers, setFollowers] = useState(mockFollowers);
  const [following, setFollowing] = useState(mockFollowing);

  const currentList = activeTab === 'followers' ? followers : following;
  const filteredUsers = currentList.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollowToggle = (userId: string) => {
    const updateUser = (users: User[]) => 
      users.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      );

    if (activeTab === 'followers') {
      setFollowers(updateUser);
    } else {
      setFollowing(updateUser);
    }

    const user = currentList.find(u => u.id === userId);
    if (user) {
      toast({
        title: user.isFollowing ? "Deixou de seguir" : "Agora seguindo!",
        description: user.isFollowing ? `Você não segue mais @${user.username}` : `Você está seguindo @${user.username}`,
      });
    }
  };

  const VerifiedBadge = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-4 h-4 text-blue-500 ml-1"
    >
      <path 
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.28 7.28L11 14.56l-3.28-3.28a.75.75 0 00-1.06 1.06l3.812 3.813a.75.75 0 001.06 0l5.56-5.56a.75.75 0 00-1.06-1.06z"
        stroke="#fff" 
        strokeWidth="0.5" 
      />
    </svg>
  );

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
          <h1 className="text-2xl font-bold">Conexões</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar usuários..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'followers' ? "default" : "outline"}
            onClick={() => setActiveTab('followers')}
            className={`flex-1 ${
              activeTab === 'followers' 
                ? 'bg-gradient-primary text-white' 
                : 'border-border text-muted-foreground'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Seguidores ({mockFollowers.length})
          </Button>
          <Button
            variant={activeTab === 'following' ? "default" : "outline"}
            onClick={() => setActiveTab('following')}
            className={`flex-1 ${
              activeTab === 'following' 
                ? 'bg-gradient-primary text-white' 
                : 'border-border text-muted-foreground'
            }`}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Seguindo ({mockFollowing.length})
          </Button>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsers.length === 0 ? (
            <Card className="p-8 bg-gradient-card shadow-card border-border/50 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery ? "Nenhum usuário encontrado" : `Nenhum ${activeTab === 'followers' ? 'seguidor' : 'seguindo'}`}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Tente buscar por outro nome ou username" 
                  : `Você ainda não ${activeTab === 'followers' ? 'tem seguidores' : 'segue ninguém'}`
                }
              </p>
            </Card>
          ) : (
            filteredUsers.map((user) => (
              <Card key={user.id} className="p-4 bg-gradient-card shadow-card border-border/50">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 shadow-glow">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                      {user.verified && <VerifiedBadge />}
                    </div>
                    <p className="text-sm text-primary">@{user.username}</p>
                    {user.bio && (
                      <p className="text-sm text-muted-foreground mt-1 truncate">{user.bio}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {user.followers.toLocaleString()} seguidores
                      </span>
                      {user.isFollowingYou && (
                        <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                          Te segue
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant={user.isFollowing ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleFollowToggle(user.id)}
                    className={user.isFollowing 
                      ? "border-border text-foreground hover:border-red-500 hover:text-red-500" 
                      : "bg-gradient-primary hover:bg-gradient-accent text-white"
                    }
                  >
                    {user.isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-1" />
                        Seguindo
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-1" />
                        Seguir
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
