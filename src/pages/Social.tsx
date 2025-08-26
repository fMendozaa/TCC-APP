import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
}

interface Post {
  id: number;
  user: string;
  content: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  image: string;
  timestamp: Date;
}

const initialPosts: Post[] = [
  {
    id: 1,
    user: "fashionista_ana",
    content: "Loving this summer vibe! 🌞 Combinação perfeita para o fim de semana!",
    likes: 24,
    isLiked: false,
    comments: [
      { id: "1", user: "style_guru", text: "Onde comprou essa jaqueta? Ficou incrível! 😍", timestamp: new Date(Date.now() - 120000) },
      { id: "2", user: "trend_lover", text: "Inspiração total! Já salvei nos favoritos 💕", timestamp: new Date(Date.now() - 60000) },
      { id: "3", user: "moda_brasil", text: "Perfeita para esse calor de São Paulo!", timestamp: new Date(Date.now() - 45000) }
    ],
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop&crop=center",
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: 2,
    user: "streetwear_king",
    content: "New outfit, who dis? 😎 Trendfy sempre entregando as melhores peças!",
    likes: 18,
    isLiked: false,
    comments: [
      { id: "4", user: "fashion_police", text: "Slaying it! 🔥 Onde conseguiu esse tênis?", timestamp: new Date(Date.now() - 30000) },
      { id: "5", user: "urban_style", text: "Estilo urbano no ponto! Adorei a combinação", timestamp: new Date(Date.now() - 15000) }
    ],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop&crop=center",
    timestamp: new Date(Date.now() - 7200000)
  },
  {
    id: 3,
    user: "minimal_chic",
    content: "Less is more ✨ Apostando no minimalismo para essa sexta-feira!",
    likes: 31,
    isLiked: false,
    comments: [
      { id: "6", user: "clean_style", text: "Simplicidade é tudo! Que visual elegante", timestamp: new Date(Date.now() - 90000) },
      { id: "7", user: "fashion_lover", text: "Estilo atemporal, nunca sai de moda! 👏", timestamp: new Date(Date.now() - 60000) },
      { id: "8", user: "basic_trends", text: "Prova que básico pode ser chique", timestamp: new Date(Date.now() - 30000) }
    ],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop&crop=center",
    timestamp: new Date(Date.now() - 14400000)
  },
  {
    id: 4,
    user: "vintage_soul",
    content: "Garimpo de domingo rendeu! 🛍️ Achados incríveis no brechó do centro",
    likes: 42,
    isLiked: false,
    comments: [
      { id: "9", user: "eco_fashion", text: "Moda sustentável é o futuro! Que achados lindos", timestamp: new Date(Date.now() - 180000) },
      { id: "10", user: "retro_vibes", text: "Vintage nunca decepciona! Qual brechó?", timestamp: new Date(Date.now() - 120000) },
      { id: "11", user: "sustainable_me", text: "Adorei! Também sou viciada em brechós 💚", timestamp: new Date(Date.now() - 75000) }
    ],
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop&crop=center",
    timestamp: new Date(Date.now() - 21600000)
  }
];

export function Social() {
  const [posts, setPosts] = useState(initialPosts);
  const [newComment, setNewComment] = useState<{[key: number]: string}>({});
  const { toast } = useToast();

  const handleLike = (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked
            }
          : post
      )
    );
  };

  const handleAddComment = (postId: number) => {
    const commentText = newComment[postId]?.trim();
    if (!commentText) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      user: "trendfy_verificado",
      text: commentText,
      timestamp: new Date()
    };

    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, newCommentObj] }
          : post
      )
    );

    setNewComment(prev => ({ ...prev, [postId]: '' }));
    
    toast({
      title: "Comentário adicionado! 💬",
      description: "Seu comentário foi publicado com sucesso",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">TRENDFY</h1>
          <h2 className="text-xl font-semibold">Social</h2>
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

        {/* Photo Feed Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Photo Feed</h2>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="p-0 bg-gradient-card shadow-card border-border/50 overflow-hidden">
              {/* Post Header */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">@{post.user}</h4>
                    <p className="text-xs text-muted-foreground">
                      {post.timestamp.toLocaleDateString('pt-BR')} às {post.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Image */}
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src={post.image}
                  alt="Post content"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-3">
                {/* Post Content */}
                <div>
                  <p className="text-foreground leading-relaxed">{post.content}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleLike(post.id)}
                    className={`${
                      post.isLiked 
                        ? 'text-red-500 hover:text-red-600' 
                        : 'text-muted-foreground hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments.length}
                  </Button>
                </div>

                {/* Comments */}
                <div className="space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground text-sm">@{comment.user.replace('_verificado', '')}</span>
                            {comment.user.includes('verificado') && (
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="currentColor" 
                                className="w-4 h-4 text-blue-500"
                              >
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.28 7.28L11 14.56l-3.28-3.28a.75.75 0 00-1.06 1.06l3.812 3.813a.75.75 0 001.06 0l5.56-5.56a.75.75 0 00-1.06-1.06z" stroke="#fff" strokeWidth="0.5" />
                              </svg>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {comment.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Escreva um comentário..."
                    value={newComment[post.id] || ''}
                    onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    className="flex-1 bg-background border-border text-sm"
                  />
                  <Button
                    onClick={() => handleAddComment(post.id)}
                    disabled={!newComment[post.id]?.trim()}
                    className="bg-gradient-primary hover:bg-gradient-accent text-white"
                    size="sm"
                  >
                    POST
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
