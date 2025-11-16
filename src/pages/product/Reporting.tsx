import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  Award,
  Clock,
  BarChart3,
  FileSpreadsheet,
  Mail
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Sample data for charts
const emissionsData = [
  { month: "Jan", scope1: 450, scope2: 320, scope3: 780, total: 1550 },
  { month: "Feb", scope1: 420, scope2: 310, scope3: 750, total: 1480 },
  { month: "Mar", scope1: 480, scope2: 340, scope3: 820, total: 1640 },
  { month: "Apr", scope1: 440, scope2: 330, scope3: 790, total: 1560 },
  { month: "May", scope1: 410, scope2: 300, scope3: 740, total: 1450 },
  { month: "Jun", scope1: 390, scope2: 290, scope3: 720, total: 1400 },
];

const comparisonData = [
  { period: "Q1 2024", value: 4670 },
  { period: "Q1 2023", value: 5200 },
];

const categoryData = [
  { name: "Transportation", value: 2340, color: "hsl(var(--chart-1))" },
  { name: "Energy", value: 1890, color: "hsl(var(--chart-2))" },
  { name: "Manufacturing", value: 1560, color: "hsl(var(--chart-3))" },
  { name: "Supply Chain", value: 1210, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 400, color: "hsl(var(--chart-5))" },
];

const scheduledReports = [
  { id: 1, name: "Monthly Carbon Report", frequency: "Monthly", nextRun: "2024-02-01", format: "PDF", status: "Active" },
  { id: 2, name: "Quarterly Sustainability Report", frequency: "Quarterly", nextRun: "2024-04-01", format: "Excel", status: "Active" },
  { id: 3, name: "Weekly Emissions Summary", frequency: "Weekly", nextRun: "2024-01-15", format: "CSV", status: "Active" },
  { id: 4, name: "Annual Impact Report", frequency: "Yearly", nextRun: "2025-01-01", format: "PDF", status: "Active" },
];

const Reporting = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["scope1", "scope2", "scope3"]);
  const [reportFormat, setReportFormat] = useState("pdf");
  const [scheduleFrequency, setScheduleFrequency] = useState("monthly");

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Month,Scope 1,Scope 2,Scope 3,Total\n"
      + emissionsData.map(row => `${row.month},${row.scope1},${row.scope2},${row.scope3},${row.total}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "emissions_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel format...");
    // In a real implementation, you would use a library like xlsx
  };

  const handleGenerateReport = () => {
    console.log("Generating report with filters:", { dateFrom, dateTo, selectedScopes, reportFormat });
  };

  const handleGenerateCertificate = () => {
    console.log("Generating carbon offset certificate...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Advanced Reporting & Analytics</h1>
          <p className="text-lg text-muted-foreground">
            Generate comprehensive emission reports, schedule automated reporting, and export data in multiple formats
          </p>
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="builder">Report Builder</TabsTrigger>
            <TabsTrigger value="schedule">Scheduled Reports</TabsTrigger>
            <TabsTrigger value="compare">Compare Periods</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,400 tCO₂e</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingDown className="h-3 w-3 text-primary" />
                    <span className="text-primary">12% decrease</span> from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scope 1 Emissions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,590 tCO₂e</div>
                  <p className="text-xs text-muted-foreground">Direct emissions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scope 2 Emissions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,890 tCO₂e</div>
                  <p className="text-xs text-muted-foreground">Energy indirect</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scope 3 Emissions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4,620 tCO₂e</div>
                  <p className="text-xs text-muted-foreground">Value chain</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Emissions Trends</CardTitle>
                <CardDescription>Monthly emissions breakdown by scope (Last 6 months)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    scope1: { label: "Scope 1", color: "hsl(var(--chart-1))" },
                    scope2: { label: "Scope 2", color: "hsl(var(--chart-2))" },
                    scope3: { label: "Scope 3", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emissionsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="scope1" stackId="a" fill="hsl(var(--chart-1))" />
                      <Bar dataKey="scope2" stackId="a" fill="hsl(var(--chart-2))" />
                      <Bar dataKey="scope3" stackId="a" fill="hsl(var(--chart-3))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emissions by Category</CardTitle>
                <CardDescription>Distribution of emissions across different categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    transportation: { label: "Transportation", color: "hsl(var(--chart-1))" },
                    energy: { label: "Energy", color: "hsl(var(--chart-2))" },
                    manufacturing: { label: "Manufacturing", color: "hsl(var(--chart-3))" },
                    supplyChain: { label: "Supply Chain", color: "hsl(var(--chart-4))" },
                    other: { label: "Other", color: "hsl(var(--chart-5))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button onClick={handleExportCSV} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button onClick={handleExportExcel} variant="outline" className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Export Excel
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </TabsContent>

          {/* Report Builder Tab */}
          <TabsContent value="builder" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>Build customized reports with advanced filters and options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input id="report-name" placeholder="e.g., Q1 2024 Sustainability Report" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="report-format">Report Format</Label>
                    <Select value={reportFormat} onValueChange={setReportFormat}>
                      <SelectTrigger id="report-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV File</SelectItem>
                        <SelectItem value="json">JSON Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateFrom && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateFrom}
                          onSelect={setDateFrom}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Date To</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateTo && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateTo}
                          onSelect={setDateTo}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Select Emission Scopes</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="scope1" 
                        checked={selectedScopes.includes("scope1")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedScopes([...selectedScopes, "scope1"]);
                          } else {
                            setSelectedScopes(selectedScopes.filter(s => s !== "scope1"));
                          }
                        }}
                      />
                      <Label htmlFor="scope1" className="font-normal cursor-pointer">
                        Scope 1 - Direct emissions from owned or controlled sources
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="scope2" 
                        checked={selectedScopes.includes("scope2")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedScopes([...selectedScopes, "scope2"]);
                          } else {
                            setSelectedScopes(selectedScopes.filter(s => s !== "scope2"));
                          }
                        }}
                      />
                      <Label htmlFor="scope2" className="font-normal cursor-pointer">
                        Scope 2 - Indirect emissions from purchased electricity, heat, or steam
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="scope3" 
                        checked={selectedScopes.includes("scope3")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedScopes([...selectedScopes, "scope3"]);
                          } else {
                            setSelectedScopes(selectedScopes.filter(s => s !== "scope3"));
                          }
                        }}
                      />
                      <Label htmlFor="scope3" className="font-normal cursor-pointer">
                        Scope 3 - All other indirect emissions in the value chain
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="white-label">White Label Options (Enterprise)</Label>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox id="company-logo" />
                    <Label htmlFor="company-logo" className="font-normal cursor-pointer">
                      Include company logo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox id="custom-branding" />
                    <Label htmlFor="custom-branding" className="font-normal cursor-pointer">
                      Apply custom branding colors
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remove-watermark" />
                    <Label htmlFor="remove-watermark" className="font-normal cursor-pointer">
                      Remove Clever Reduction watermark
                    </Label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleGenerateReport} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Save as Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Reports Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Automated Reports</CardTitle>
                <CardDescription>Set up recurring reports to be generated and delivered automatically</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-name">Schedule Name</Label>
                    <Input id="schedule-name" placeholder="e.g., Monthly Executive Summary" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-recipients">Email Recipients</Label>
                    <Input id="email-recipients" placeholder="email@example.com, email2@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schedule-format">Report Format</Label>
                    <Select>
                      <SelectTrigger id="schedule-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV File</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Create Schedule
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Scheduled Reports</CardTitle>
                <CardDescription>Manage your automated report schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Next Run</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.frequency}</TableCell>
                        <TableCell>{report.nextRun}</TableCell>
                        <TableCell>{report.format}</TableCell>
                        <TableCell>
                          <Badge variant={report.status === "Active" ? "default" : "secondary"}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">Pause</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compare Periods Tab */}
          <TabsContent value="compare" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Period Comparison</CardTitle>
                <CardDescription>Compare emissions across different time periods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="compare-type">Comparison Type</Label>
                    <Select>
                      <SelectTrigger id="compare-type">
                        <SelectValue placeholder="Select comparison" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mom">Month over Month</SelectItem>
                        <SelectItem value="qoq">Quarter over Quarter</SelectItem>
                        <SelectItem value="yoy">Year over Year</SelectItem>
                        <SelectItem value="custom">Custom Period</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="base-period">Base Period</Label>
                    <Select>
                      <SelectTrigger id="base-period">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="q1-2024">Q1 2024</SelectItem>
                        <SelectItem value="q4-2023">Q4 2023</SelectItem>
                        <SelectItem value="q3-2023">Q3 2023</SelectItem>
                        <SelectItem value="q2-2023">Q2 2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Comparison
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Period Comparison Results</CardTitle>
                  <CardDescription>Emissions comparison: Q1 2024 vs Q1 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: { label: "Emissions (tCO₂e)", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="hsl(var(--chart-1))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Change</p>
                      <p className="text-2xl font-bold">-530 tCO₂e</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                      <TrendingDown className="h-5 w-5" />
                      <span className="text-lg font-semibold">10.2%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">Scope 1 Reduction</span>
                      <span className="font-semibold text-primary">-8.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">Scope 2 Reduction</span>
                      <span className="font-semibold text-primary">-11.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">Scope 3 Reduction</span>
                      <span className="font-semibold text-primary">-10.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Offset Certificates</CardTitle>
                <CardDescription>Generate official certificates for carbon offset achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cert-organization">Organization Name</Label>
                    <Input id="cert-organization" placeholder="Your Organization" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cert-period">Certification Period</Label>
                    <Select>
                      <SelectTrigger id="cert-period">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">Full Year 2024</SelectItem>
                        <SelectItem value="q1-2024">Q1 2024</SelectItem>
                        <SelectItem value="q2-2024">Q2 2024</SelectItem>
                        <SelectItem value="q3-2024">Q3 2024</SelectItem>
                        <SelectItem value="q4-2024">Q4 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cert-offset">Carbon Offset Amount (tCO₂e)</Label>
                    <Input id="cert-offset" type="number" placeholder="e.g., 1500" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cert-project">Offset Project</Label>
                    <Select>
                      <SelectTrigger id="cert-project">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reforestation">Reforestation Initiative</SelectItem>
                        <SelectItem value="renewable">Renewable Energy</SelectItem>
                        <SelectItem value="methane">Methane Capture</SelectItem>
                        <SelectItem value="ocean">Ocean Conservation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleGenerateCertificate} className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Generate Certificate
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificate Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-primary/20 rounded-lg p-8 bg-gradient-to-br from-background to-muted/30">
                  <div className="text-center space-y-6">
                    <Award className="h-16 w-16 mx-auto text-primary" />
                    <div>
                      <h3 className="text-3xl font-bold text-foreground mb-2">Carbon Offset Certificate</h3>
                      <p className="text-muted-foreground">Official Verification of Carbon Neutrality Achievement</p>
                    </div>
                    
                    <div className="py-6 space-y-4">
                      <p className="text-lg">This certifies that</p>
                      <p className="text-2xl font-bold text-primary">Your Organization</p>
                      <p className="text-lg">has successfully offset</p>
                      <p className="text-4xl font-bold">1,500 tCO₂e</p>
                      <p className="text-lg">of carbon emissions during Q1 2024</p>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <p className="text-sm text-muted-foreground">Certificate ID: CR-2024-Q1-001</p>
                      <p className="text-sm text-muted-foreground">Issued: {format(new Date(), "MMMM dd, yyyy")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reporting;