import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Leaf, Globe, TrendingDown } from "lucide-react";
import heroImage from "@/assets/hero-earth.jpg";

const countryData = [
  { country: "USA", emissions: 15.5, population: 331 },
  { country: "China", emissions: 7.4, population: 1444 },
  { country: "India", emissions: 1.9, population: 1393 },
  { country: "Germany", emissions: 8.5, population: 83 },
  { country: "UK", emissions: 5.6, population: 67 },
  { country: "Brazil", emissions: 2.2, population: 213 },
];

const emissionsBySource = [
  { name: "Transportation", value: 29, color: "hsl(var(--chart-1))" },
  { name: "Electricity", value: 27, color: "hsl(var(--chart-2))" },
  { name: "Industry", value: 23, color: "hsl(var(--chart-3))" },
  { name: "Agriculture", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 9, color: "hsl(var(--chart-5))" },
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted">
        <div className="container flex flex-col lg:flex-row items-center gap-8 py-16 lg:py-24">
          <div className="flex-1 space-y-6 animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Track Your Carbon Footprint
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Understanding your environmental impact is the first step towards a sustainable future. 
              Join us in making data-driven decisions to reduce emissions globally.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="transition-transform hover:scale-105">
                Calculate Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="transition-transform hover:scale-105">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1 animate-slide-in-right">
            <img 
              src={heroImage} 
              alt="Earth with green energy symbols representing sustainability"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center animate-fade-in">
              <CardHeader>
                <Globe className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="text-3xl">195+</CardTitle>
                <CardDescription>Countries Tracking</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <TrendingDown className="h-12 w-12 mx-auto text-secondary" />
                <CardTitle className="text-3xl">30%</CardTitle>
                <CardDescription>Average Reduction Goal</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <Leaf className="h-12 w-12 mx-auto text-accent" />
                <CardTitle className="text-3xl">1M+</CardTitle>
                <CardDescription>Tons CO₂ Saved</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Country Comparison Section */}
      <section className="py-16 bg-background">
        <div className="container space-y-8">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-3xl lg:text-5xl font-bold">Global Emission Comparison</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Per capita CO₂ emissions vary significantly across countries. 
              Understanding these differences helps us identify opportunities for improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="animate-slide-in-left">
              <CardHeader>
                <CardTitle>Per Capita Emissions by Country</CardTitle>
                <CardDescription>Metric tons of CO₂ per person annually</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={countryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="country" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="emissions" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="animate-slide-in-right">
              <CardHeader>
                <CardTitle>Emissions by Source</CardTitle>
                <CardDescription>Percentage breakdown of global CO₂ sources</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={emissionsBySource}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emissionsBySource.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center space-y-6 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold">Ready to Make a Difference?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Start tracking your carbon footprint today and join millions working towards a sustainable future.
          </p>
          <Button size="lg" variant="secondary" className="transition-transform hover:scale-105">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
