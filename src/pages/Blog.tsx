import { useState } from "react";
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

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of Renewable Energy",
    excerpt: "How solar and wind power are transforming our energy landscape and reducing global carbon emissions.",
    content: "Renewable energy sources have seen unprecedented growth over the past decade. Solar and wind power installations have increased by over 300%, making clean energy more accessible and affordable than ever before. This transition is crucial in our fight against climate change.",
    image: renewableImage,
    date: "March 15, 2025",
    author: "Sarah Johnson",
    comments: [
      { id: 1, author: "Mike Chen", text: "Great article! I've installed solar panels on my home last year and the savings are incredible.", date: "March 16, 2025" },
      { id: 2, author: "Emma Wilson", text: "This gives me hope for the future. We need more investments in renewable infrastructure.", date: "March 17, 2025" }
    ]
  },
  {
    id: 2,
    title: "Sustainable Transportation Choices",
    excerpt: "Exploring eco-friendly alternatives to reduce your daily commute's carbon footprint.",
    content: "Transportation accounts for nearly 29% of global greenhouse gas emissions. By choosing sustainable options like cycling, public transit, or electric vehicles, individuals can significantly reduce their environmental impact. Even small changes in daily habits can create meaningful differences.",
    image: cyclingImage,
    date: "March 10, 2025",
    author: "David Martinez",
    comments: [
      { id: 1, author: "Lisa Anderson", text: "I've been cycling to work for 6 months now. Not only am I reducing emissions, but I feel healthier too!", date: "March 11, 2025" }
    ]
  },
  {
    id: 3,
    title: "Community Action for Climate Change",
    excerpt: "How local initiatives are making a global impact on carbon reduction efforts.",
    content: "Communities around the world are taking action against climate change through tree-planting campaigns, local renewable energy projects, and sustainable agriculture. These grassroots movements demonstrate that collective action at the local level can drive significant environmental change.",
    image: communityImage,
    date: "March 5, 2025",
    author: "Rachel Green",
    comments: [
      { id: 1, author: "Tom Harris", text: "Our neighborhood started a community garden last month. It's amazing how much we can accomplish together!", date: "March 6, 2025" },
      { id: 2, author: "Sophie Lee", text: "I'd love to see more articles about local initiatives. They're so inspiring!", date: "March 7, 2025" }
    ]
  }
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const { toast } = useToast();

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
