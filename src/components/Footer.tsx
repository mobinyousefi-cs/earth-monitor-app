import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Youtube, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/clever-reduction-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { title: "Platform Overview", href: "/product/overview" },
      { title: "Carbon Calculator", href: "/product/calculator" },
      { title: "Reporting & Analytics", href: "/product/reporting" },
      { title: "Reduction Planning", href: "/product/reduction" },
      { title: "Integrations", href: "/product/integrations" },
      { title: "Pricing", href: "/pricing" },
    ],
    solutions: [
      { title: "Manufacturing", href: "/solutions/manufacturing" },
      { title: "Retail & E-commerce", href: "/solutions/retail" },
      { title: "Technology", href: "/solutions/technology" },
      { title: "Enterprise", href: "/solutions/enterprise" },
      { title: "Small Business", href: "/solutions/small-business" },
    ],
    resources: [
      { title: "Blog", href: "/blog" },
      { title: "Case Studies", href: "/resources/case-studies" },
      { title: "Documentation", href: "/resources/docs" },
      { title: "Webinars", href: "/resources/webinars" },
      { title: "Sustainability Guide", href: "/resources/guide" },
      { title: "Carbon Standards", href: "/resources/standards" },
    ],
    company: [
      { title: "About Us", href: "/about" },
      { title: "Careers", href: "/company/careers" },
      { title: "Press & Media", href: "/company/press" },
      { title: "Partners", href: "/company/partners" },
      { title: "Contact", href: "/company/contact" },
    ],
    legal: [
      { title: "Terms of Service", href: "/legal/terms" },
      { title: "Privacy Policy", href: "/legal/privacy" },
      { title: "Cookie Policy", href: "/legal/cookies" },
      { title: "Data Security", href: "/legal/security" },
      { title: "Compliance", href: "/legal/compliance" },
    ],
  };

  return (
    <footer className="border-t border-border bg-card">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold text-card-foreground">Stay Updated</h3>
            <p className="text-muted-foreground">
              Get the latest insights on sustainability and carbon reduction
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="font-semibold">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Clever Reduction" className="h-8 w-8" />
              <span className="text-lg font-bold text-card-foreground">Clever Reduction</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering businesses to measure, reduce, and report their carbon footprint
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Clever Reduction. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-4 w-4" />
                English
              </button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 bg-muted rounded">ISO 14064</span>
                <span className="px-2 py-1 bg-muted rounded">GHG Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
