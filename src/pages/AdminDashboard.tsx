import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  LogOut, 
  FileText, 
  LayoutDashboard, 
  Plus, 
  Trash2, 
  Eye,
  Users,
  Settings,
  Save,
  Building2,
  BookOpen,
  MessageSquare,
  CheckCircle,
  Clock
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { StatsCard } from "@/components/admin/StatsCard";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  status: "published" | "draft";
}

interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "editor" | "viewer";
  isMainAdmin: boolean;
}

interface CompanyPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

interface SupportTicket {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  status: "open" | "in_progress" | "closed";
  createdAt: string;
  response?: string;
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Carbon Tracking",
    excerpt: "Learn the basics of measuring your company's carbon footprint...",
    content: "Full content here...",
    author: "Admin User",
    date: "2024-03-15",
    status: "published",
  },
  {
    id: "2",
    title: "5 Ways to Reduce Emissions in Manufacturing",
    excerpt: "Practical tips for reducing carbon emissions in industrial settings...",
    content: "Full content here...",
    author: "Admin User",
    date: "2024-03-10",
    status: "draft",
  },
];

const mockCompanyPages: CompanyPage[] = [
  { id: "1", slug: "careers", title: "Careers", content: "" },
  { id: "2", slug: "contact", title: "Contact Us", content: "" },
  { id: "3", slug: "press", title: "Press", content: "" },
  { id: "4", slug: "partners", title: "Partners", content: "" },
];

const mockResourcePages: CompanyPage[] = [
  { id: "1", slug: "webinars", title: "Webinars", content: "" },
  { id: "2", slug: "guide", title: "Guides", content: "" },
  { id: "3", slug: "standards", title: "Standards", content: "" },
  { id: "4", slug: "case-studies", title: "Case Studies", content: "" },
  { id: "5", slug: "documentation", title: "Documentation", content: "" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState("");
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [newAdminForm, setNewAdminForm] = useState({
    email: "",
    fullName: "",
    role: "viewer" as AdminUser['role'],
    password: "",
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [ticketResponse, setTicketResponse] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    const savedAdmins = localStorage.getItem("adminUsers");
    if (savedAdmins) {
      const adminsList = JSON.parse(savedAdmins);
      setAdmins(adminsList);
      setCurrentAdmin(adminsList[0]);
      setProfileForm({
        fullName: adminsList[0].fullName,
        email: adminsList[0].email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      const mainAdmin: AdminUser = {
        id: "1",
        email: "admin@cleverreduction.com",
        fullName: "Main Admin",
        role: "admin",
        isMainAdmin: true,
      };
      setAdmins([mainAdmin]);
      setCurrentAdmin(mainAdmin);
      setProfileForm({
        fullName: mainAdmin.fullName,
        email: mainAdmin.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      localStorage.setItem("adminUsers", JSON.stringify([mainAdmin]));
    }

    // Load support tickets
    const savedTickets = localStorage.getItem("supportTickets");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAdmin?.role !== 'admin') {
      toast.error("Only admins can create new administrators");
      return;
    }

    const newAdmin: AdminUser = {
      id: String(admins.length + 1),
      email: newAdminForm.email,
      fullName: newAdminForm.fullName,
      role: newAdminForm.role,
      isMainAdmin: false,
    };

    const updatedAdmins = [...admins, newAdmin];
    setAdmins(updatedAdmins);
    localStorage.setItem("adminUsers", JSON.stringify(updatedAdmins));
    setNewAdminForm({ email: "", fullName: "", role: "viewer", password: "" });
    toast.success("Admin created successfully");
  };

  const handleDeleteAdmin = () => {
    if (!adminToDelete) return;
    
    if (adminToDelete.isMainAdmin) {
      toast.error("Cannot delete the main admin account");
      return;
    }

    const updatedAdmins = admins.filter(admin => admin.id !== adminToDelete.id);
    setAdmins(updatedAdmins);
    localStorage.setItem("adminUsers", JSON.stringify(updatedAdmins));
    setIsDeleteDialogOpen(false);
    setAdminToDelete(null);
    toast.success("Admin deleted successfully");
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (profileForm.newPassword && profileForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    toast.success("Profile updated successfully");
    setProfileForm({ ...profileForm, currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleUpdateTicketStatus = (ticketId: string, newStatus: SupportTicket['status']) => {
    const updatedTickets = tickets.map(t => 
      t.id === ticketId ? { ...t, status: newStatus } : t
    );
    setTickets(updatedTickets);
    localStorage.setItem("supportTickets", JSON.stringify(updatedTickets));
    toast.success("Ticket status updated");
  };

  const handleRespondToTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const updatedTickets = tickets.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, response: ticketResponse, status: "closed" as const } 
        : t
    );
    setTickets(updatedTickets);
    localStorage.setItem("supportTickets", JSON.stringify(updatedTickets));
    setTicketResponse("");
    setSelectedTicket(null);
    toast.success("Response sent and ticket closed");
  };

  const mockStats = {
    totalPosts: 24,
    publishedPosts: 18,
    draftPosts: 6,
    totalViews: 12483,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Modern Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-primary to-primary/70 p-2.5 rounded-xl shadow-md">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{currentAdmin?.fullName} • {currentAdmin?.role}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 hover:bg-muted">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-card border shadow-sm p-1.5 h-auto flex-wrap gap-1">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="posts" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <FileText className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="editor" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <Plus className="h-4 w-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="admins" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <Users className="h-4 w-4" />
              Admins
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <Settings className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="company" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <Building2 className="h-4 w-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <BookOpen className="h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="tickets" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <MessageSquare className="h-4 w-4" />
              Support Tickets
              {tickets.filter(t => t.status === 'open').length > 0 && (
                <span className="ml-1 bg-destructive text-destructive-foreground rounded-full px-2 py-0.5 text-xs">
                  {tickets.filter(t => t.status === 'open').length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Posts"
                value={mockStats.totalPosts}
                description="+12% from last month"
                icon={FileText}
              />
              <StatsCard
                title="Published"
                value={mockStats.publishedPosts}
                description="Live on website"
                icon={Eye}
              />
              <StatsCard
                title="Draft Posts"
                value={mockStats.draftPosts}
                description="Awaiting review"
                icon={FileText}
              />
              <StatsCard
                title="Total Views"
                value={mockStats.totalViews}
                description="+5% from last week"
                icon={Eye}
              />
            </div>

            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg">Recent Posts</CardTitle>
                <CardDescription>Your latest blog posts</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {mockPosts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0 hover:bg-muted/20 -mx-4 px-4 py-2 rounded-lg transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                        <div className="flex gap-4 items-center">
                          <span className="text-xs text-muted-foreground">{post.author}</span>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            post.status === 'published' 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {post.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts List Tab */}
          <TabsContent value="posts" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg">All Posts</CardTitle>
                <CardDescription>Manage your blog posts</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {mockPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                        <div className="flex gap-4 items-center">
                          <span className="text-xs text-muted-foreground">{post.author}</span>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            post.status === 'published' 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {post.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary hover:border-primary">Edit</Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:border-destructive">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Editor Tab */}
          <TabsContent value="editor" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg">Create New Post</CardTitle>
                <CardDescription>Write and publish your blog post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Post Title</Label>
                  <Input id="title" placeholder="Enter post title..." className="h-11" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-sm font-medium">Excerpt</Label>
                  <Input id="excerpt" placeholder="Brief description..." className="h-11" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Content</Label>
                  <RichTextEditor
                    value={editorContent}
                    onChange={setEditorContent}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 h-11">Publish Post</Button>
                  <Button variant="outline" className="flex-1 h-11">Save as Draft</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admins Management Tab */}
          <TabsContent value="admins" className="space-y-6">
            <Alert className="border-primary/20 bg-primary/5">
              <AlertDescription className="text-sm">
                <strong className="text-primary">Security Note:</strong> This is a demo admin panel using localStorage. 
                In production, implement proper authentication with secure backend validation, password hashing, 
                and role-based access control (RBAC). Never rely on client-side storage for authentication.
              </AlertDescription>
            </Alert>

            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg">Admin Users</CardTitle>
                <CardDescription>Manage site administrators and their roles</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {admins.map((admin) => (
                    <div key={admin.id} className="flex items-center justify-between border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{admin.fullName}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{admin.email}</p>
                        <div className="flex gap-2 mt-3">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            admin.role === 'admin' ? 'bg-primary/10 text-primary' :
                            admin.role === 'editor' ? 'bg-secondary/10 text-secondary' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {admin.role}
                          </span>
                          {admin.isMainAdmin && (
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                              Main Admin
                            </span>
                          )}
                        </div>
                      </div>
                      {!admin.isMainAdmin && currentAdmin?.role === 'admin' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 hover:border-destructive"
                          onClick={() => {
                            setAdminToDelete(admin);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {currentAdmin?.role === 'admin' && (
              <Card className="shadow-sm">
                <CardHeader className="border-b bg-muted/20">
                  <CardTitle className="text-lg">Create New Admin</CardTitle>
                  <CardDescription>Add a new administrator to the system</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleCreateAdmin} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="new-admin-email" className="text-sm font-medium">Email</Label>
                        <Input
                          id="new-admin-email"
                          type="email"
                          value={newAdminForm.email}
                          onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-admin-name" className="text-sm font-medium">Full Name</Label>
                        <Input
                          id="new-admin-name"
                          value={newAdminForm.fullName}
                          onChange={(e) => setNewAdminForm({ ...newAdminForm, fullName: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-admin-role" className="text-sm font-medium">Role</Label>
                        <Select
                          value={newAdminForm.role}
                          onValueChange={(value) => setNewAdminForm({ ...newAdminForm, role: value as AdminUser['role'] })}
                        >
                          <SelectTrigger id="new-admin-role" className="h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-admin-password" className="text-sm font-medium">Password</Label>
                        <Input
                          id="new-admin-password"
                          type="password"
                          value={newAdminForm.password}
                          onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button type="submit" className="w-full gap-2 h-11">
                        <Plus className="h-4 w-4" />
                        Create Admin
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg">Role Descriptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium h-fit">Admin</div>
                  <p className="text-sm text-muted-foreground pt-1">Full access to all features including user management</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-xs font-medium h-fit">Editor</div>
                  <p className="text-sm text-muted-foreground pt-1">Can create, edit, and publish content</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-muted text-muted-foreground px-3 py-1.5 rounded-full text-xs font-medium h-fit">Viewer</div>
                  <p className="text-sm text-muted-foreground pt-1">Read-only access to content and analytics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg">Profile Settings</CardTitle>
                <CardDescription>Update your personal information and password</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="profile-name" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="profile-name"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profile-email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="profile-email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-base font-medium mb-4">Change Password</h3>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-sm font-medium">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={profileForm.currentPassword}
                          onChange={(e) => setProfileForm({ ...profileForm, currentPassword: e.target.value })}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-sm font-medium">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={profileForm.newPassword}
                          onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={profileForm.confirmPassword}
                          onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                          className="h-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full gap-2 h-11">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg">Company Pages</CardTitle>
                <CardDescription>Manage content for company-related pages</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {mockCompanyPages.map((page) => (
                    <div key={page.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">{page.title}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">/{page.slug}</p>
                        </div>
                        <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary hover:border-primary">
                          Edit Content
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg">Support Tickets</CardTitle>
                <CardDescription>Manage and respond to customer support requests</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {tickets.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No support tickets yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tickets.map((ticket) => (
                      <div 
                        key={ticket.id} 
                        className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-foreground">{ticket.subject}</h3>
                              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                ticket.status === 'open' ? 'bg-destructive/10 text-destructive' :
                                ticket.status === 'in_progress' ? 'bg-secondary/10 text-secondary' :
                                'bg-primary/10 text-primary'
                              }`}>
                                {ticket.status === 'open' ? <Clock className="h-3 w-3 inline mr-1" /> : 
                                 ticket.status === 'closed' ? <CheckCircle className="h-3 w-3 inline mr-1" /> : null}
                                {ticket.status.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {ticket.firstName} {ticket.lastName} • {ticket.email} • {ticket.company}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(ticket.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-3 p-3 bg-muted/30 rounded">{ticket.message}</p>
                        
                        {ticket.response && (
                          <div className="mt-3 p-3 bg-primary/5 border-l-4 border-primary rounded">
                            <p className="text-sm font-medium mb-1">Admin Response:</p>
                            <p className="text-sm">{ticket.response}</p>
                          </div>
                        )}
                        
                        <div className="flex gap-2 mt-3">
                          {ticket.status !== 'closed' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedTicket(ticket)}
                              >
                                Respond
                              </Button>
                              {ticket.status === 'open' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateTicketStatus(ticket.id, 'in_progress')}
                                >
                                  Mark In Progress
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Response Dialog */}
            {selectedTicket && (
              <Card className="shadow-sm border-primary/50">
                <CardHeader className="border-b bg-primary/5">
                  <CardTitle className="text-lg">Respond to Ticket</CardTitle>
                  <CardDescription>
                    Responding to: {selectedTicket.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleRespondToTicket} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Response</Label>
                      <Textarea
                        value={ticketResponse}
                        onChange={(e) => setTicketResponse(e.target.value)}
                        placeholder="Type your response..."
                        rows={6}
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="gap-2">
                        Send Response & Close Ticket
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setSelectedTicket(null);
                          setTicketResponse("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg">Resources</CardTitle>
                <CardDescription>Manage blog posts and resource pages</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-medium">Blog Posts</h3>
                      <Button variant="outline" size="sm">
                        View All Posts
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Manage blog posts from the Posts and Editor tabs</p>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-base font-medium mb-4">Resource Pages</h3>
                    <div className="space-y-3">
                      {mockResourcePages.map((page) => (
                        <div key={page.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-foreground">{page.title}</h4>
                              <p className="text-sm text-muted-foreground mt-0.5">/{page.slug}</p>
                            </div>
                            <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary hover:border-primary">
                              Edit Content
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Administrator"
        description={`Are you sure you want to delete ${adminToDelete?.fullName}? This action cannot be undone.`}
        onConfirm={handleDeleteAdmin}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
};

export default AdminDashboard;
