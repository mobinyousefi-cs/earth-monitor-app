import logo from "@/assets/clever-reduction-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Clever Reduction" className="h-6 w-6" />
            <span className="text-lg font-semibold text-card-foreground">Clever Reduction</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Carbon footprint calculation and consulting for a sustainable future
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 Clever Reduction. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
