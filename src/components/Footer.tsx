import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold text-card-foreground">EcoTrack</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Tracking carbon footprints for a sustainable future
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 EcoTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
