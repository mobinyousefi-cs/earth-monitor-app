import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      name: "Demo",
      price: "Free",
      description: "Try our platform with sample data",
      features: [
        "Sample emissions data",
        "Basic dashboard access",
        "Limited reporting",
        "Email support",
        "14-day trial period"
      ],
      cta: "Start Free Trial",
      popular: false,
      action: () => navigate("/signup")
    },
    {
      name: "Emissions Calculation",
      price: "$99",
      period: "/month",
      description: "Comprehensive carbon footprint tracking",
      features: [
        "Complete emissions tracking",
        "Real-time data analysis",
        "Custom reporting",
        "API access",
        "Priority email support",
        "Data export functionality",
        "Multi-user access (up to 5)"
      ],
      cta: "Get Started",
      popular: true,
      action: () => navigate("/contact-sales")
    },
    {
      name: "Consultant",
      price: "$199",
      period: "/month",
      description: "Full tracking with expert reduction strategies",
      features: [
        "Everything in Emissions Calculation",
        "Dedicated sustainability consultant",
        "Custom reduction strategies",
        "Quarterly strategy reviews",
        "Industry benchmarking",
        "Advanced analytics & insights",
        "Unlimited users",
        "Phone & priority support"
      ],
      cta: "Contact Sales",
      popular: false,
      action: () => navigate("/contact-sales")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your sustainability journey
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name}
                className={`relative flex flex-col shadow-lg transition-all hover:shadow-xl ${
                  plan.popular 
                    ? 'border-primary border-2 scale-105' 
                    : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground text-lg ml-1">{plan.period}</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6 pb-8">
                  <Button 
                    className="w-full h-11"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={plan.action}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              All plans include a 30-day money-back guarantee
            </p>
            <p className="text-sm text-muted-foreground">
              Need a custom plan for your enterprise?{" "}
              <button 
                onClick={() => navigate("/contact-sales")}
                className="text-primary hover:underline font-medium"
              >
                Contact our sales team
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Can I switch plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, debit cards, and bank transfers for annual subscriptions.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Is there a setup fee?</h3>
              <p className="text-muted-foreground">
                No, there are no setup fees. The price you see is the price you pay.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">What happens after the free trial?</h3>
              <p className="text-muted-foreground">
                Your trial will automatically convert to the paid plan you selected. You can cancel anytime during the trial period with no charges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
