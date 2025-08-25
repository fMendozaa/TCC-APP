import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageCircle } from "lucide-react";

const posts = [
  {
    id: 1,
    user: "friend1",
    content: "Loving this summer vibe! 🌞",
    likes: 24,
    comments: [
      { user: "friend1", text: "Looks amazing!" },
      { user: "friend2", text: "Where is this?" }
    ],
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: 2,
    user: "friend2",
    content: "New outfit, who dis? 😎",
    likes: 18,
    comments: [
      { user: "friend3", text: "Slaying it!" }
    ],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop&crop=center"
  }
];

export function Social() {
  const [newComment, setNewComment] = useState<{[key: number]: string}>({});

  const handleAddComment = (postId: number) => {
    const comment = newComment[postId];
    if (comment?.trim()) {
      // Here you would normally add the comment to the post
      console.log(`Adding comment to post ${postId}: ${comment}`);
      setNewComment(prev => ({ ...prev, [postId]: '' }));
    }
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
                  <p className="font-semibold text-foreground">{post.content}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments.length}
                  </Button>
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-semibold text-foreground">{comment.user}</span>
                      <span className="text-muted-foreground ml-2">{comment.text}</span>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment[post.id] || ''}
                    onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                    className="flex-1 bg-background border-border text-sm"
                  />
                  <Button
                    onClick={() => handleAddComment(post.id)}
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