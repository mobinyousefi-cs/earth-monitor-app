import { useState } from "react";
import { Play, Clock, Star, Heart, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  views: number;
  rating: number;
  isFavorite: boolean;
  thumbnail: string;
  instructor: string;
  releaseDate: string;
}

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const tutorials: Tutorial[] = [
    {
      id: "1",
      title: "Carbon Footprint Basics: Getting Started",
      description: "Learn the fundamentals of carbon footprint measurement and why it matters for your organization",
      duration: "15:30",
      level: "beginner",
      category: "basics",
      views: 12453,
      rating: 4.9,
      isFavorite: true,
      thumbnail: "/placeholder.svg",
      instructor: "Sarah Johnson",
      releaseDate: "2024-01-15"
    },
    {
      id: "2",
      title: "Setting Up Your First Carbon Calculator",
      description: "Step-by-step tutorial on configuring and using the Clever Reduction calculator",
      duration: "22:45",
      level: "beginner",
      category: "calculator",
      views: 8932,
      rating: 4.8,
      isFavorite: false,
      thumbnail: "/placeholder.svg",
      instructor: "Michael Chen",
      releaseDate: "2024-01-20"
    },
    {
      id: "3",
      title: "Advanced Scope 3 Emissions Analysis",
      description: "Master complex supply chain emissions tracking and indirect impact measurement",
      duration: "45:20",
      level: "advanced",
      category: "analysis",
      views: 5421,
      rating: 4.9,
      isFavorite: true,
      thumbnail: "/placeholder.svg",
      instructor: "Dr. Emily Rodriguez",
      releaseDate: "2024-01-10"
    },
    {
      id: "4",
      title: "Creating Custom Emission Reports",
      description: "Learn how to build and customize reports that meet your specific business needs",
      duration: "28:15",
      level: "intermediate",
      category: "reporting",
      views: 6789,
      rating: 4.7,
      isFavorite: false,
      thumbnail: "/placeholder.svg",
      instructor: "David Park",
      releaseDate: "2024-01-18"
    },
    {
      id: "5",
      title: "API Integration Guide",
      description: "Integrate carbon tracking into your existing systems using our comprehensive API",
      duration: "35:50",
      level: "advanced",
      category: "integration",
      views: 3214,
      rating: 4.8,
      isFavorite: false,
      thumbnail: "/placeholder.svg",
      instructor: "James Wilson",
      releaseDate: "2024-01-25"
    },
    {
      id: "6",
      title: "Data Import and Export Workflows",
      description: "Efficiently manage your carbon data with automated import/export processes",
      duration: "18:40",
      level: "intermediate",
      category: "data-management",
      views: 7654,
      rating: 4.6,
      isFavorite: true,
      thumbnail: "/placeholder.svg",
      instructor: "Lisa Anderson",
      releaseDate: "2024-01-12"
    },
    {
      id: "7",
      title: "Building a Net Zero Strategy",
      description: "Comprehensive guide to developing and implementing a successful net zero roadmap",
      duration: "52:30",
      level: "intermediate",
      category: "strategy",
      views: 9876,
      rating: 4.9,
      isFavorite: true,
      thumbnail: "/placeholder.svg",
      instructor: "Dr. Sarah Johnson",
      releaseDate: "2024-01-08"
    },
    {
      id: "8",
      title: "Understanding Carbon Offsets",
      description: "Learn about different types of carbon offsets and how to choose quality offset projects",
      duration: "25:15",
      level: "beginner",
      category: "offsets",
      views: 11234,
      rating: 4.7,
      isFavorite: false,
      thumbnail: "/placeholder.svg",
      instructor: "Michael Chen",
      releaseDate: "2024-01-22"
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || tutorial.level === levelFilter;
    const matchesCategory = categoryFilter === "all" || tutorial.category === categoryFilter;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-green-500/10 text-green-500";
      case "intermediate": return "bg-blue-500/10 text-blue-500";
      case "advanced": return "bg-purple-500/10 text-purple-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const popularTutorials = [...tutorials].sort((a, b) => b.views - a.views).slice(0, 3);
  const recentTutorials = [...tutorials].sort((a, b) => 
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Video Tutorials</h1>
          <p className="text-muted-foreground">Learn at your own pace with our comprehensive video library</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="basics">Basics</SelectItem>
                  <SelectItem value="calculator">Calculator</SelectItem>
                  <SelectItem value="analysis">Analysis</SelectItem>
                  <SelectItem value="reporting">Reporting</SelectItem>
                  <SelectItem value="integration">Integration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Tutorials</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="flex flex-col group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <img 
                      src={tutorial.thumbnail} 
                      alt={tutorial.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-full p-4">
                        <Play className="h-8 w-8 text-primary fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {tutorial.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getLevelColor(tutorial.level)}>
                        {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Heart className={`h-4 w-4 ${tutorial.isFavorite ? "fill-current text-red-500" : ""}`} />
                      </Button>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{tutorial.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {tutorial.instructor}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{tutorial.views.toLocaleString()} views</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                          <span className="font-medium">{tutorial.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="flex flex-col">
                  <div className="relative aspect-video bg-muted">
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {tutorial.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className={getLevelColor(tutorial.level)}>
                      {tutorial.level}
                    </Badge>
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="flex flex-col">
                  <div className="relative aspect-video bg-muted">
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {tutorial.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className={getLevelColor(tutorial.level)}>
                      {tutorial.level}
                    </Badge>
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
