import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, Users, UserPlus, UserMinus, UserCheck, Heart, MessageCircle, Share, VerifiedIcon } from "lucide-react";
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

interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
}

interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
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

const mockPosts: Post[] = [
  {
    id: "1",
    user: mockFollowers[0],
    content: "Olha que look incrível para o final de semana! Apostei em peças sustentáveis e o resultado ficou perfeito 💚 #ModaSustentavel #OOTD",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
    likes: 234,
    comments: 28,
    shares: 12,
    timestamp: "2h",
    liked: false
  },
  {
    id: "2",
    user: mockFollowers[1],
    content: "Dica do dia: misturar estampas pode parecer arriscado, mas com as cores certas fica um charme! Qual vocês preferem? 🌟",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=400&h=400&fit=crop",
    likes: 456,
    comments: 67,
    shares: 23,
    timestamp: "4h",
    liked: true
  },
  {
    id: "3",
    user: mockFollowing[0],
    content: "Street style é mais que roupa, é atitude! 🔥 Quando você usa algo que te representa, isso transparece. #StreetWear #Atitude",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop",
    likes: 789,
    comments: 156,
    shares: 89,
    timestamp: "6h",
    liked: false
  }
];

const mockComments: Comment[] = [
  {
    id: "1",
    user: mockFollowers[1],
    content: "Que look maravilhoso! Onde conseguiu essa blusa? 😍",
    timestamp: "1h"
  },
  {
    id: "2",
    user: mockFollowing[1],
    content: "Perfeita combinação! Inspiração para o meu próximo look ✨",
    timestamp: "45min"
  },
  {
    id: "3",
    user: mockFollowers[2],
    content: "Amei! Moda sustentável é o futuro 🌱💚",
    timestamp: "30min"
  }
];

export function Social() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<"feed" | "followers" | "following">("feed");
  const [followers, setFollowers] = useState(mockFollowers);
  const [following, setFollowing] = useState(mockFollowing);
  const [posts, setPosts] = useState(mockPosts);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");

  // Incrementar seguidores aleatoriamente
  useEffect(() => {
    const interval = setInterval(() => {
      setFollowers(prev => prev.map(user => ({
        ...user,
        followers: user.followers + Math.floor(Math.random() * 3)
      })));
      setFollowing(prev => prev.map(user => ({
        ...user,
        followers: user.followers + Math.floor(Math.random() * 5)
      })));
    }, 15000); // A cada 15 segundos

    return () => clearInterval(interval);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        id: "me",
        name: "Você",
        username: "voce",
        avatar: "",
        verified: true,
        isFollowing: false,
        isFollowingYou: false,
        followers: 0
      },
      content: newComment,
      timestamp: "agora"
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment("");
    toast({
      title: "Comentário adicionado! ✅",
      description: "Seu comentário foi publicado com sucesso",
    });
  };

  const VerifiedBadge = () => (
    <VerifiedIcon className="w-4 h-4 text-blue-500 ml-1 fill-current" />
  );

  if (activeView === "feed") {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-gradient-primary p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">TRENDFY</h1>
            <h2 className="text-xl font-semibold">Social</h2>
          </div>
          <p className="text-white/90">Descubra tendências e conecte-se</p>
        </div>

        <div className="p-4 space-y-4">
          {/* Navigation Tabs */}
          <div className="flex gap-2 bg-card rounded-lg p-1">
            <Button
              variant={activeView === "feed" ? "default" : "ghost"}
              onClick={() => setActiveView("feed")}
              className={`flex-1 ${activeView === "feed" ? 'bg-gradient-primary text-white' : ''}`}
            >
              Feed
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveView("followers")}
              className="flex-1 hover:bg-gradient-primary hover:text-white"
            >
              Seguidores
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveView("following")}
              className="flex-1 hover:bg-gradient-primary hover:text-white"
            >
              Seguindo
            </Button>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <Card key={post.id} className="bg-gradient-card shadow-card border-border/50">
              {/* Post Header */}
              <div className="p-4 pb-0">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {post.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-foreground">{post.user.name}</h3>
                      {post.user.verified && <VerifiedBadge />}
                    </div>
                    <p className="text-sm text-muted-foreground">@{post.user.username} • {post.timestamp}</p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4 pt-2">
                <p className="text-foreground mb-3">{post.content}</p>
                {post.image && (
                  <div className="rounded-lg overflow-hidden mb-3">
                    <img src={post.image} alt="Post" className="w-full h-64 object-cover" />
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="p-4 pt-0 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`gap-2 ${post.liked ? 'text-red-500' : 'text-muted-foreground'}`}
                  >
                    <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <Share className="w-4 h-4" />
                    {post.shares}
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {/* Comments Section */}
          <Card className="bg-gradient-card shadow-card border-border/50">
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Comentários Recentes</h3>
              
              {/* Add Comment */}
              <div className="flex gap-3 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-primary text-white text-xs">V</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    size="sm"
                    className="bg-gradient-primary hover:bg-gradient-accent text-white"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback className="bg-gradient-primary text-white text-xs">
                        {comment.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="font-medium text-sm text-foreground">{comment.user.name}</span>
                          {comment.user.verified && <VerifiedBadge />}
                        </div>
                        <p className="text-sm text-foreground">{comment.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground ml-3 mt-1">{comment.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Followers/Following View
  const currentList = activeView === "followers" ? followers : following;
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

    if (activeView === "followers") {
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

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setActiveView("feed")}
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
            variant={activeView === "followers" ? "default" : "outline"}
            onClick={() => setActiveView("followers")}
            className={`flex-1 ${
              activeView === "followers" 
                ? 'bg-gradient-primary text-white' 
                : 'border-border text-muted-foreground'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Seguidores ({mockFollowers.length})
          </Button>
          <Button
            variant={activeView === "following" ? "default" : "outline"}
            onClick={() => setActiveView("following")}
            className={`flex-1 ${
              activeView === "following" 
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
                {searchQuery ? "Nenhum usuário encontrado" : `Nenhum ${activeView === "followers" ? 'seguidor' : 'seguindo'}`}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Tente buscar por outro nome ou username" 
                  : `Você ainda não ${activeView === "followers" ? 'tem seguidores' : 'segue ninguém'}`
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
