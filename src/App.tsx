import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Calculate from "./pages/Calculate";
import BookDemo from "./pages/BookDemo";
import Pricing from "./pages/Pricing";
import ContactSales from "./pages/ContactSales";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Product pages
import ProductOverview from "./pages/product/Overview";
import ProductCalculator from "./pages/product/Calculator";
import ProductReporting from "./pages/product/Reporting";
import ProductReduction from "./pages/product/Reduction";
import ProductIntegrations from "./pages/product/Integrations";
import ProductAPI from "./pages/product/API";

// Solutions pages
import Manufacturing from "./pages/solutions/Manufacturing";
import Retail from "./pages/solutions/Retail";
import Technology from "./pages/solutions/Technology";
import Finance from "./pages/solutions/Finance";
import Healthcare from "./pages/solutions/Healthcare";
import Enterprise from "./pages/solutions/Enterprise";
import MidMarket from "./pages/solutions/MidMarket";
import SmallBusiness from "./pages/solutions/SmallBusiness";

// Resources pages
import CaseStudies from "./pages/resources/CaseStudies";
import Documentation from "./pages/resources/Documentation";
import Webinars from "./pages/resources/Webinars";
import Guide from "./pages/resources/Guide";
import Standards from "./pages/resources/Standards";

// Company pages
import Careers from "./pages/company/Careers";
import Press from "./pages/company/Press";
import Partners from "./pages/company/Partners";
import Contact from "./pages/company/Contact";

// Legal pages
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Cookies from "./pages/legal/Cookies";
import Security from "./pages/legal/Security";
import Compliance from "./pages/legal/Compliance";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                {/* Main pages */}
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/calculate" element={<Calculate />} />
                <Route path="/book-demo" element={<BookDemo />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact-sales" element={<ContactSales />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/menu" element={<Menu />} />

                {/* Product pages */}
                <Route path="/product/overview" element={<ProductOverview />} />
                <Route path="/product/calculator" element={<ProductCalculator />} />
                <Route path="/product/reporting" element={<ProductReporting />} />
                <Route path="/product/reduction" element={<ProductReduction />} />
                <Route path="/product/integrations" element={<ProductIntegrations />} />
                <Route path="/product/api" element={<ProductAPI />} />

                {/* Solutions pages */}
                <Route path="/solutions/manufacturing" element={<Manufacturing />} />
                <Route path="/solutions/retail" element={<Retail />} />
                <Route path="/solutions/technology" element={<Technology />} />
                <Route path="/solutions/finance" element={<Finance />} />
                <Route path="/solutions/healthcare" element={<Healthcare />} />
                <Route path="/solutions/enterprise" element={<Enterprise />} />
                <Route path="/solutions/mid-market" element={<MidMarket />} />
                <Route path="/solutions/small-business" element={<SmallBusiness />} />

                {/* Resources pages */}
                <Route path="/resources/case-studies" element={<CaseStudies />} />
                <Route path="/resources/docs" element={<Documentation />} />
                <Route path="/resources/webinars" element={<Webinars />} />
                <Route path="/resources/guide" element={<Guide />} />
                <Route path="/resources/standards" element={<Standards />} />

                {/* Company pages */}
                <Route path="/company/careers" element={<Careers />} />
                <Route path="/company/press" element={<Press />} />
                <Route path="/company/partners" element={<Partners />} />
                <Route path="/company/contact" element={<Contact />} />

                {/* Legal pages */}
                <Route path="/legal/terms" element={<Terms />} />
                <Route path="/legal/privacy" element={<Privacy />} />
                <Route path="/legal/cookies" element={<Cookies />} />
                <Route path="/legal/security" element={<Security />} />
                <Route path="/legal/compliance" element={<Compliance />} />

                {/* Admin pages */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* Catch-all 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
