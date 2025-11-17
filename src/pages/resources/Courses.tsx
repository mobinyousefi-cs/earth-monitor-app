import { useState } from "react";
import { GraduationCap, Clock, Users, Star, Heart, Search, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  modules: number;
  lessons: number;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  enrolled: number;
  rating: number;
  isFavorite: boolean;
  price: string;
  thumbnail: string;
  progress?: number;
  isEnrolled?: boolean;
}

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const courses: Course[] = [
    {
      id: "1",
      title: "Carbon Accounting Fundamentals",
      description: "Complete course covering GHG Protocol, emission calculations, and reporting standards",
      instructor: "Dr. Sarah Johnson",
      duration: "8 hours",
      modules: 6,
      lessons: 32,
      level: "beginner",
      category: "accounting",
      enrolled: 1245,
      rating: 4.9,
      isFavorite: true,
      price: "Free",
      thumbnail: "/placeholder.svg",
      isEnrolled: true,
      progress: 45
    },
    {
      id: "2",
      title: "Net Zero Strategy Development",
      description: "Learn to create and implement comprehensive net zero strategies for any organization",
      instructor: "Michael Chen",
      duration: "12 hours",
      modules: 8,
      lessons: 48,
      level: "intermediate",
      category: "strategy",
      enrolled: 892,
      rating: 4.8,
      isFavorite: false,
      price: "$299",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "3",
      title: "Advanced Scope 3 Emissions",
      description: "Master complex supply chain emissions tracking and value chain impact assessment",
      instructor: "Dr. Emily Rodriguez",
      duration: "15 hours",
      modules: 10,
      lessons: 56,
      level: "advanced",
      category: "analysis",
      enrolled: 567,
      rating: 4.9,
      isFavorite: true,
      price: "$399",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "4",
      title: "Sustainability Reporting & Compliance",
      description: "Navigate TCFD, CDP, and other frameworks to create compelling sustainability reports",
      instructor: "David Park",
      duration: "10 hours",
      modules: 7,
      lessons: 42,
      level: "intermediate",
      category: "reporting",
      enrolled: 1034,
      rating: 4.7,
      isFavorite: false,
      price: "$249",
      thumbnail: "/placeholder.svg",
      isEnrolled: true,
      progress: 15
    },
    {
      id: "5",
      title: "Carbon Reduction Implementation",
      description: "Practical workshop on implementing real carbon reduction initiatives in your organization",
      instructor: "Lisa Anderson",
      duration: "6 hours",
      modules: 5,
      lessons: 28,
      level: "beginner",
      category: "reduction",
      enrolled: 1567,
      rating: 4.8,
      isFavorite: true,
      price: "Free",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "6",
      title: "ESG Data Management",
      description: "Learn to collect, manage, and analyze ESG data effectively using modern tools",
      instructor: "James Wilson",
      duration: "9 hours",
      modules: 6,
      lessons: 38,
      level: "intermediate",
      category: "data",
      enrolled: 734,
      rating: 4.6,
      isFavorite: false,
      price: "$199",
      thumbnail: "/placeholder.svg"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
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

  const enrolledCourses = courses.filter(c => c.isEnrolled);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Interactive Courses & Workshops</h1>
          <p className="text-muted-foreground">Structured learning paths with hands-on exercises and certification</p>
        </div>

        {/* Enrolled Courses Section */}
        {enrolledCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">Enrolled</Badge>
                      <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <Progress value={course.progress} className="mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {course.instructor}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {course.duration} • {course.modules} modules • {course.lessons} lessons
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Continue Course</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
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
                  <SelectItem value="accounting">Accounting</SelectItem>
                  <SelectItem value="strategy">Strategy</SelectItem>
                  <SelectItem value="analysis">Analysis</SelectItem>
                  <SelectItem value="reporting">Reporting</SelectItem>
                  <SelectItem value="reduction">Reduction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <div className="relative aspect-video bg-muted">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
                {course.isEnrolled && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-green-500/90 text-white">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Enrolled
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getLevelColor(course.level)}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Heart className={`h-4 w-4 ${course.isFavorite ? "fill-current text-red-500" : ""}`} />
                  </Button>
                </div>
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    {course.instructor}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {course.modules} modules • {course.lessons} lessons
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{course.enrolled.toLocaleString()} enrolled</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-2xl font-bold text-foreground">{course.price}</span>
                <Button>
                  {course.isEnrolled ? "Continue" : "Enroll Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
