import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  FileText, 
  MessageSquare, 
  LayoutDashboard, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { StatsCard } from "@/components/admin/StatsCard";

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  status: "published" | "draft";
  category: string;
  comments: Comment[];
}

const AdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    variant?: "default" | "destructive";
  }>({
    open: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });
  
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: "",
    status: "draft" as "published" | "draft",
    category: "General",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = ["General", "Technology", "Environment", "Lifestyle", "Community", "Tips"];

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    const savedPosts = localStorage.getItem("blogPosts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
    navigate("/admin/login");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && editingId) {
      const updatedPosts = posts.map(post =>
        post.id === editingId
          ? { ...post, ...formData }
          : post
      );
      setPosts(updatedPosts);
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
      toast({
        title: "Post Updated",
        description: "Your blog post has been successfully updated"
      });
    } else {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        comments: []
      };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
      toast({
        title: "Post Created",
        description: "Your new blog post has been created"
      });
    }
    
    resetForm();
    setActiveTab("posts");
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      status: post.status,
      category: post.category,
    });
    setIsEditing(true);
    setEditingId(post.id);
    setActiveTab("editor");
  };

  const handleDelete = (id: string) => {
    setConfirmDialog({
      open: true,
      title: "Delete Post",
      description: "Are you sure you want to delete this post? This action cannot be undone.",
      variant: "destructive",
      onConfirm: () => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
        toast({
          title: "Post Deleted",
          description: "The blog post has been deleted"
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleCommentAction = (postId: string, commentId: string, action: "approve" | "reject" | "delete") => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        if (action === "delete") {
          return {
            ...post,
            comments: post.comments.filter(c => c.id !== commentId)
          };
        } else {
          return {
            ...post,
            comments: post.comments.map(c =>
              c.id === commentId ? { ...c, status: (action === "approve" ? "approved" : "rejected") as "approved" | "rejected" } : c
            )
          };
        }
      }
      return post;
    });
    
    setPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
    
    const actionText = action === "delete" ? "deleted" : action === "approve" ? "approved" : "rejected";
    toast({
      title: `Comment ${actionText}`,
      description: `The comment has been ${actionText}`
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      author: "",
      status: "draft",
      category: "General",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowPreview(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || post.status === filterStatus;
    const matchesCategory = filterCategory === "all" || post.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const allComments = posts.flatMap(post => 
    post.comments.map(comment => ({
      ...comment,
      postTitle: post.title,
      postId: post.id
    }))
  );

  const pendingComments = allComments.filter(c => c.status === "pending");

  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.status === "published").length,
    draftPosts: posts.filter(p => p.status === "draft").length,
    pendingComments: pendingComments.length,
    totalComments: allComments.length,
    approvedComments: allComments.filter(c => c.status === "approved").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="posts" className="gap-2">
              <FileText className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="editor" className="gap-2">
              <Plus className="h-4 w-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="comments" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Comments
              {pendingComments.length > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 min-w-5 px-1">
                  {pendingComments.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your blog.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatsCard
                title="Total Posts"
                value={stats.totalPosts}
                icon={FileText}
                description={`${stats.publishedPosts} published, ${stats.draftPosts} drafts`}
              />
              <StatsCard
                title="Pending Comments"
                value={stats.pendingComments}
                icon={Clock}
                description="Awaiting approval"
              />
              <StatsCard
                title="Total Comments"
                value={stats.totalComments}
                icon={MessageSquare}
                description={`${stats.approvedComments} approved`}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest posts and comments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.slice(0, 5).map(post => (
                    <div key={post.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {post.date} • {post.author}
                        </p>
                      </div>
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status}
                      </Badge>
                    </div>
                  ))}
                  {posts.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No posts yet. Create your first post!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Management Tab */}
          <TabsContent value="posts" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Blog Posts</h2>
                <p className="text-muted-foreground">Manage all your blog posts</p>
              </div>
              <Button onClick={() => setActiveTab("editor")}>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Filters & Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                          <Badge variant={post.status === "published" ? "default" : "secondary"}>
                            {post.status}
                          </Badge>
                          <Badge variant="outline">{post.category}</Badge>
                          <span>•</span>
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {post.comments.length} comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredPosts.length === 0 && (
                <Card>
                  <CardContent className="py-16 text-center">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No posts found</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Editor Tab */}
          <TabsContent value="editor" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {isEditing ? "Edit Post" : "Create New Post"}
                </h2>
                <p className="text-muted-foreground">
                  {isEditing ? "Update your blog post" : "Write and publish a new blog post"}
                </p>
              </div>
              {isEditing && (
                <Button variant="outline" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Post title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author *</Label>
                      <Input
                        id="author"
                        placeholder="Author name"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status *</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: "published" | "draft") => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Featured Image URL *</Label>
                    <Input
                      id="image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description of the post"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Content *</CardTitle>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {showPreview ? "Hide Preview" : "Show Preview"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {!showPreview ? (
                    <RichTextEditor
                      value={formData.content}
                      onChange={(value) => setFormData({ ...formData, content: value })}
                      placeholder="Write your blog post content here..."
                    />
                  ) : (
                    <div className="prose dark:prose-invert max-w-none p-6 border rounded-lg bg-muted/20">
                      <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Comments Management</h2>
              <p className="text-muted-foreground">Review and moderate blog comments</p>
            </div>

            <div className="grid gap-4">
              {allComments.length === 0 ? (
                <Card>
                  <CardContent className="py-16 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No comments yet</p>
                  </CardContent>
                </Card>
              ) : (
                allComments.map((comment) => (
                  <Card key={comment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-semibold">{comment.author}</p>
                              <Badge
                                variant={
                                  comment.status === "approved"
                                    ? "default"
                                    : comment.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {comment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {comment.email} • {comment.date}
                            </p>
                            <p className="text-sm text-muted-foreground mb-3">
                              On post: <span className="font-medium text-foreground">{comment.postTitle}</span>
                            </p>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {comment.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => handleCommentAction(comment.postId, comment.id, "approve")}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCommentAction(comment.postId, comment.id, "reject")}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setConfirmDialog({
                                open: true,
                                title: "Delete Comment",
                                description: "Are you sure you want to delete this comment? This action cannot be undone.",
                                variant: "destructive",
                                onConfirm: () => {
                                  handleCommentAction(comment.postId, comment.id, "delete");
                                  setConfirmDialog({ ...confirmDialog, open: false });
                                }
                              });
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.onConfirm}
        variant={confirmDialog.variant}
        confirmText={confirmDialog.variant === "destructive" ? "Delete" : "Continue"}
      />
    </div>
  );
};

export default AdminDashboard;
