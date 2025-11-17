import { useState } from "react";
import { Download, Search, Star, Heart, FileText, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  industry: string;
  type: "guide" | "template" | "toolkit" | "checklist";
  downloads: number;
  rating: number;
  isFavorite: boolean;
  fileSize: string;
  format: string;
  lastUpdated: string;
}

const Guide = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const guides: Guide[] = [
    {
      id: "1",
      title: "Complete Carbon Accounting Guide",
      description: "Comprehensive 50-page guide covering all aspects of carbon footprint measurement and reduction",
      category: "accounting",
      industry: "all",
      type: "guide",
      downloads: 2345,
      rating: 4.9,
      isFavorite: true,
      fileSize: "2.4 MB",
      format: "PDF",
      lastUpdated: "2024-01-15"
    },
    {
      id: "2",
      title: "Emissions Calculation Spreadsheet",
      description: "Excel template with pre-built formulas for Scope 1, 2, and 3 emissions calculations",
      category: "calculation",
      industry: "all",
      type: "template",
      downloads: 5678,
      rating: 4.8,
      isFavorite: false,
      fileSize: "1.2 MB",
      format: "XLSX",
      lastUpdated: "2024-01-20"
    },
    {
      id: "3",
      title: "Manufacturing Sustainability Toolkit",
      description: "Complete toolkit for implementing sustainability initiatives in manufacturing operations",
      category: "implementation",
      industry: "manufacturing",
      type: "toolkit",
      downloads: 1234,
      rating: 4.7,
      isFavorite: true,
      fileSize: "8.5 MB",
      format: "ZIP",
      lastUpdated: "2024-01-10"
    },
    {
      id: "4",
      title: "Net Zero Roadmap Template",
      description: "Strategic planning template to help organizations chart their path to net zero emissions",
      category: "strategy",
      industry: "all",
      type: "template",
      downloads: 3456,
      rating: 4.9,
      isFavorite: false,
      fileSize: "1.8 MB",
      format: "PPTX",
      lastUpdated: "2024-01-25"
    },
    {
      id: "5",
      title: "Retail Carbon Reduction Checklist",
      description: "Step-by-step checklist for implementing carbon reduction measures in retail operations",
      category: "reduction",
      industry: "retail",
      type: "checklist",
      downloads: 987,
      rating: 4.6,
      isFavorite: false,
      fileSize: "0.5 MB",
      format: "PDF",
      lastUpdated: "2024-01-18"
    },
    {
      id: "6",
      title: "Supplier Engagement Toolkit",
      description: "Resources for engaging suppliers in your sustainability journey and tracking Scope 3 emissions",
      category: "supply-chain",
      industry: "all",
      type: "toolkit",
      downloads: 2109,
      rating: 4.8,
      isFavorite: true,
      fileSize: "5.2 MB",
      format: "ZIP",
      lastUpdated: "2024-01-12"
    },
    {
      id: "7",
      title: "Healthcare Sustainability Guide",
      description: "Industry-specific guide for reducing carbon footprint in healthcare facilities",
      category: "industry-guide",
      industry: "healthcare",
      type: "guide",
      downloads: 876,
      rating: 4.7,
      isFavorite: false,
      fileSize: "3.1 MB",
      format: "PDF",
      lastUpdated: "2024-01-08"
    },
    {
      id: "8",
      title: "ESG Reporting Template",
      description: "Professional template for creating comprehensive ESG reports with sustainability metrics",
      category: "reporting",
      industry: "all",
      type: "template",
      downloads: 4321,
      rating: 4.9,
      isFavorite: true,
      fileSize: "2.7 MB",
      format: "DOCX",
      lastUpdated: "2024-01-22"
    }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || guide.category === categoryFilter;
    const matchesIndustry = industryFilter === "all" || guide.industry === industryFilter;
    const matchesType = typeFilter === "all" || guide.type === typeFilter;
    return matchesSearch && matchesCategory && matchesIndustry && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide": return "bg-blue-500/10 text-blue-500";
      case "template": return "bg-green-500/10 text-green-500";
      case "toolkit": return "bg-purple-500/10 text-purple-500";
      case "checklist": return "bg-orange-500/10 text-orange-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Resource Library</h1>
          <p className="text-muted-foreground">Download guides, templates, toolkits, and checklists to support your sustainability journey</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="guide">Guides</SelectItem>
                  <SelectItem value="template">Templates</SelectItem>
                  <SelectItem value="toolkit">Toolkits</SelectItem>
                  <SelectItem value="checklist">Checklists</SelectItem>
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="accounting">Accounting</SelectItem>
                  <SelectItem value="calculation">Calculation</SelectItem>
                  <SelectItem value="strategy">Strategy</SelectItem>
                  <SelectItem value="reporting">Reporting</SelectItem>
                  <SelectItem value="reduction">Reduction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{guides.length}</div>
              <div className="text-sm text-muted-foreground">Total Resources</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {guides.reduce((sum, g) => sum + g.downloads, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {(guides.reduce((sum, g) => sum + g.rating, 0) / guides.length).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {guides.filter(g => g.isFavorite).length}
              </div>
              <div className="text-sm text-muted-foreground">Your Favorites</div>
            </CardContent>
          </Card>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getTypeColor(guide.type)}>
                    {guide.type.charAt(0).toUpperCase() + guide.type.slice(1)}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Heart className={`h-4 w-4 ${guide.isFavorite ? "fill-current text-red-500" : ""}`} />
                  </Button>
                </div>
                <CardTitle className="text-lg">{guide.title}</CardTitle>
                <CardDescription className="line-clamp-2">{guide.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">{guide.format}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{guide.fileSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Downloads:</span>
                    <span className="font-medium">{guide.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                      <span className="font-medium">{guide.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-muted-foreground">Updated:</span>
                    <span className="font-medium">
                      {new Date(guide.lastUpdated).toLocaleDateString("en-US", { 
                        month: "short", 
                        day: "numeric", 
                        year: "numeric" 
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guide;
