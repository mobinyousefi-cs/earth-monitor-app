import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Search, Menu as MenuIcon, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import logo from "@/assets/clever-reduction-logo.png";
import { cn } from "@/lib/utils";
import SearchDialog from "./SearchDialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const productLinks = [
    { title: "Platform Overview", href: "/product/overview", description: "Complete carbon management solution" },
    { title: "Carbon Calculator", href: "/product/calculator", description: "Measure your emissions accurately" },
    { title: "Reporting & Analytics", href: "/product/reporting", description: "Comprehensive insights and reports" },
    { title: "Reduction Planning", href: "/product/reduction", description: "Strategic emission reduction tools" },
    { title: "Integrations", href: "/product/integrations", description: "Connect with your existing systems" },
    { title: "API & Developer Tools", href: "/product/api", description: "Build custom solutions" },
  ];

  const solutionsLinks = [
    { title: "By Industry", items: [
      { title: "Manufacturing", href: "/solutions/manufacturing" },
      { title: "Retail & E-commerce", href: "/solutions/retail" },
      { title: "Technology", href: "/solutions/technology" },
      { title: "Finance", href: "/solutions/finance" },
      { title: "Healthcare", href: "/solutions/healthcare" },
    ]},
    { title: "By Company Size", items: [
      { title: "Enterprise", href: "/solutions/enterprise" },
      { title: "Mid-Market", href: "/solutions/mid-market" },
      { title: "Small Business", href: "/solutions/small-business" },
    ]},
  ];

  const resourcesLinks = [
    { title: "Blog", href: "/blog", description: "Latest insights and updates" },
    { title: "Case Studies", href: "/resources/case-studies", description: "Real-world success stories" },
    { title: "Documentation", href: "/resources/docs", description: "Technical guides and API docs" },
    { title: "Webinars", href: "/resources/webinars", description: "Live and recorded sessions" },
    { title: "Sustainability Guide", href: "/resources/guide", description: "Best practices and frameworks" },
    { title: "Carbon Standards", href: "/resources/standards", description: "Industry standards and compliance" },
  ];

  const companyLinks = [
    { title: "About Us", href: "/about" },
    { title: "Careers", href: "/company/careers" },
    { title: "Press & Media", href: "/company/press" },
    { title: "Partners", href: "/company/partners" },
    { title: "Contact", href: "/company/contact" },
  ];

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
              <img src={logo} alt="Clever Reduction" className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground hidden sm:inline">Clever Reduction</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Product */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                        {productLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{link.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Pricing */}
                  <NavigationMenuItem>
                    <Link to="/pricing" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Pricing
                    </Link>
                  </NavigationMenuItem>

                  {/* Solutions */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[500px] grid-cols-2 gap-6 p-6">
                        {solutionsLinks.map((category) => (
                          <div key={category.title}>
                            <h3 className="mb-2 text-sm font-semibold">{category.title}</h3>
                            <ul className="space-y-2">
                              {category.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    to={item.href}
                                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    {item.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Resources */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                        {resourcesLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{link.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Company */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] gap-2 p-4">
                        {companyLinks.map((link) => (
                          <li key={link.href}>
                            <Link
                              to={link.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{link.title}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>

              <Link to="/calculate">
                <Button size="lg" className="font-semibold">
                  Calculate Emissions
                </Button>
              </Link>

              <Link to="/book-demo">
                <Button size="lg" variant="outline" className="font-semibold">
                  Book a Demo
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    {/* Mobile CTAs */}
                    <div className="space-y-2">
                      <Link to="/calculate" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full font-semibold">Calculate Emissions</Button>
                      </Link>
                      <Link to="/book-demo" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full font-semibold">Book a Demo</Button>
                      </Link>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="space-y-4">
                      {/* Product */}
                      <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-semibold">
                          Product
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-2 pl-4">
                          {productLinks.map((link) => (
                            <Link
                              key={link.href}
                              to={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {link.title}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Solutions */}
                      <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-semibold">
                          Solutions
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-4 pl-4">
                          {solutionsLinks.map((category) => (
                            <div key={category.title}>
                              <h4 className="text-xs font-semibold text-muted-foreground mb-2">{category.title}</h4>
                              {category.items.map((item) => (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-1 text-sm text-muted-foreground hover:text-foreground"
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Resources */}
                      <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-semibold">
                          Resources
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-2 pl-4">
                          {resourcesLinks.map((link) => (
                            <Link
                              key={link.href}
                              to={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {link.title}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Company */}
                      <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-semibold">
                          Company
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-2 pl-4">
                          {companyLinks.map((link) => (
                            <Link
                              key={link.href}
                              to={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {link.title}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      <div className="border-t border-border pt-4 space-y-2">
                        <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-semibold">
                          Pricing
                        </Link>
                        <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-semibold">
                          Sign In
                        </Link>
                        <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-semibold">
                          Create Account
                        </Link>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Header;
