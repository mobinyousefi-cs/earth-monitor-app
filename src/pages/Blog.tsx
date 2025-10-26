import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar, User, MessageSquare } from "lucide-react";
import renewableImage from "@/assets/blog-renewable.jpg";
import cyclingImage from "@/assets/blog-cycling.jpg";
import communityImage from "@/assets/blog-community.jpg";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  comments: Comment[];
}

const defaultPosts: BlogPost[] = [];

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultPosts);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const { toast } = useToast();

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("blogPosts");
    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts);
        setBlogPosts(parsed.length > 0 ? parsed : defaultPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
        setBlogPosts(defaultPosts);
      }
    }
  }, []);

  const handleCommentSubmit = (postId: number) => {
    if (!newComment.name.trim() || !newComment.text.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both name and comment fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Comment Posted!",
      description: "Thank you for sharing your thoughts."
    });
    setNewComment({ name: "", text: "" });
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container space-y-12">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-bold">Environmental Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, stories, and updates on sustainability and carbon footprint reduction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPost(post)}
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="hover:text-primary transition-colors">{post.title}</CardTitle>
                <CardDescription className="space-y-2">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments.length} comments</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Post Modal/Detail View */}
        {selectedPost && (
          <Card className="mt-8 animate-fade-in">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title}
              className="w-full h-64 lg:h-96 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-3xl">{selectedPost.title}</CardTitle>
              <CardDescription className="flex items-center gap-4 text-base">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedPost.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {selectedPost.date}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-lg leading-relaxed">{selectedPost.content}</p>

              {/* Comments Section */}
              <div className="space-y-6 border-t pt-6">
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <MessageSquare className="h-6 w-6" />
                  Comments ({selectedPost.comments.length})
                </h3>
                
                <div className="space-y-4">
                  {selectedPost.comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{comment.author}</span>
                              <span className="text-sm text-muted-foreground">{comment.date}</span>
                            </div>
                            <p className="text-muted-foreground">{comment.text}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add Comment Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Add Your Comment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input 
                      placeholder="Your name"
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    />
                    <Textarea 
                      placeholder="Share your thoughts..."
                      value={newComment.text}
                      onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                      rows={4}
                    />
                    <Button onClick={() => handleCommentSubmit(selectedPost.id)}>
                      Post Comment
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Button 
                variant="outline" 
                onClick={() => setSelectedPost(null)}
                className="w-full"
              >
                Back to All Posts
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Blog;
