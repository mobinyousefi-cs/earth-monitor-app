import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Heart, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container space-y-16">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-bold">About EcoTrack</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering individuals and organizations to understand and reduce their environmental impact
          </p>
        </div>

        {/* Mission Section */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-muted-foreground">
              <p>
                EcoTrack was founded with a simple yet powerful vision: to make carbon footprint tracking 
                accessible, understandable, and actionable for everyone. We believe that awareness is the 
                first step toward meaningful change.
              </p>
              <p>
                Our mission is to provide accurate, real-time data and insights that help individuals, 
                businesses, and governments make informed decisions about their environmental impact. 
                By democratizing access to carbon footprint information, we're building a more sustainable 
                future together.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center animate-slide-in-left">
            <CardHeader>
              <Globe className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Global Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We work with partners worldwide to create solutions that address climate change on a global scale.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-secondary mb-4" />
              <CardTitle>Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform thrives on community engagement, bringing together millions who care about the planet.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center animate-slide-in-right">
            <CardHeader>
              <Heart className="h-12 w-12 mx-auto text-accent mb-4" />
              <CardTitle>Passionate Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our diverse team of environmental scientists, engineers, and activists are dedicated to making a difference.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* What We Do Section */}
        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">What We Do</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Carbon Footprint Tracking</h3>
                  <p className="text-muted-foreground">
                    We provide comprehensive tools to measure and monitor carbon emissions across various activities 
                    and industries, from personal transportation to large-scale manufacturing.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Data Analytics</h3>
                  <p className="text-muted-foreground">
                    Our advanced analytics platform processes millions of data points to deliver actionable insights 
                    and personalized recommendations for emission reduction.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Education & Resources</h3>
                  <p className="text-muted-foreground">
                    Through our blog, guides, and educational materials, we empower users with knowledge about 
                    climate change and sustainable practices.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Community Building</h3>
                  <p className="text-muted-foreground">
                    We connect like-minded individuals and organizations, fostering collaboration and collective 
                    action toward environmental sustainability.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="bg-primary text-primary-foreground rounded-2xl p-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Our Impact in Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-5xl font-bold">1.2M+</div>
                <div className="text-lg opacity-90">Active Users</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-bold">195</div>
                <div className="text-lg opacity-90">Countries</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-bold">3.5M</div>
                <div className="text-lg opacity-90">Tons CO₂ Tracked</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-bold">25%</div>
                <div className="text-lg opacity-90">Avg. Reduction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="text-center space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-3xl lg:text-4xl font-bold">Join Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're an individual looking to reduce your carbon footprint or an organization 
            seeking sustainability solutions, we're here to help you make a difference.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
