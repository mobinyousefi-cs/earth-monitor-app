import { useState } from "react";
import { Calendar, Clock, Video, Users, Search, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  speaker: string;
  speakerTitle: string;
  category: string;
  status: "upcoming" | "replay";
  attendees: number;
  rating: number;
  isFavorite: boolean;
  thumbnail: string;
  videoUrl?: string;
}

const Webinars = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);

  const webinars: Webinar[] = [
    {
      id: "1",
      title: "Getting Started with Carbon Accounting",
      description: "Learn the fundamentals of measuring and tracking your organization's carbon footprint",
      date: "2024-02-15",
      time: "2:00 PM EST",
      duration: "60 min",
      speaker: "Dr. Sarah Johnson",
      speakerTitle: "Chief Sustainability Officer",
      category: "basics",
      status: "upcoming",
      attendees: 234,
      rating: 4.8,
      isFavorite: false,
      thumbnail: "/placeholder.svg"
    },
    {
      id: "2",
      title: "Advanced Scope 3 Emissions Tracking",
      description: "Deep dive into supply chain emissions and indirect impact measurement",
      date: "2024-01-20",
      time: "3:00 PM EST",
      duration: "90 min",
      speaker: "Michael Chen",
      speakerTitle: "Carbon Analytics Expert",
      category: "advanced",
      status: "replay",
      attendees: 567,
      rating: 4.9,
      isFavorite: true,
      thumbnail: "/placeholder.svg",
      videoUrl: "https://example.com/replay"
    },
    {
      id: "3",
      title: "Net Zero Strategies for Manufacturing",
      description: "Industry-specific approaches to achieving carbon neutrality in manufacturing",
      date: "2024-02-28",
      time: "1:00 PM EST",
      duration: "75 min",
      speaker: "Emily Rodriguez",
      speakerTitle: "Industry Solutions Director",
      category: "industry",
      status: "upcoming",
      attendees: 189,
      rating: 4.7,
      isFavorite: false,
      thumbnail: "/placeholder.svg"
    },
    {
      id: "4",
      title: "Compliance and Reporting Best Practices",
      description: "Navigate regulatory requirements and create compelling sustainability reports",
      date: "2024-01-10",
      time: "2:30 PM EST",
      duration: "60 min",
      speaker: "David Park",
      speakerTitle: "Compliance Specialist",
      category: "compliance",
      status: "replay",
      attendees: 432,
      rating: 4.6,
      isFavorite: false,
      thumbnail: "/placeholder.svg",
      videoUrl: "https://example.com/replay"
    }
  ];

  const filteredWebinars = webinars.filter(webinar => {
    const matchesSearch = webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         webinar.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || webinar.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || webinar.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleRegister = (webinar: Webinar) => {
    setSelectedWebinar(webinar);
    setRegistrationOpen(true);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Webinars & Training</h1>
          <p className="text-muted-foreground">Join live sessions or watch replays from our expert speakers</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search webinars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="basics">Basics</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="industry">Industry Specific</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Webinars</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="replay">Replays</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Webinars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWebinars.map((webinar) => (
            <Card key={webinar.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={webinar.status === "upcoming" ? "default" : "secondary"}>
                    {webinar.status === "upcoming" ? "Upcoming" : "Replay Available"}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Heart className={`h-4 w-4 ${webinar.isFavorite ? "fill-current text-red-500" : ""}`} />
                  </Button>
                </div>
                <CardTitle className="text-xl">{webinar.title}</CardTitle>
                <CardDescription>{webinar.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(webinar.date).toLocaleDateString("en-US", { 
                      month: "long", 
                      day: "numeric", 
                      year: "numeric" 
                    })}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {webinar.time} ({webinar.duration})
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {webinar.attendees} attendees
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                    <span className="font-medium">{webinar.rating}</span>
                    <span className="text-muted-foreground ml-1">rating</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium">{webinar.speaker}</p>
                    <p className="text-xs text-muted-foreground">{webinar.speakerTitle}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {webinar.status === "upcoming" ? (
                  <Button className="w-full" onClick={() => handleRegister(webinar)}>
                    Register Now
                  </Button>
                ) : (
                  <Button variant="secondary" className="w-full">
                    <Video className="h-4 w-4 mr-2" />
                    Watch Replay
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Registration Dialog */}
        <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register for Webinar</DialogTitle>
              <DialogDescription>
                {selectedWebinar?.title}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Your company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Executive</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setRegistrationOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setRegistrationOpen(false)} className="flex-1">
                Complete Registration
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Webinars;
