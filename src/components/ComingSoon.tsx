import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
}

const ComingSoon = ({ 
  title = "Preparing...", 
  subtitle = "This section will be available soon 🌱" 
}: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;
