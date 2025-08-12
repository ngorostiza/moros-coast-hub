import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ExpandableWidgetProps {
  children: React.ReactNode;
  expandUrl?: string;
  expandText?: string;
}

export default function ExpandableWidget({ 
  children, 
  expandUrl = "/admin", 
  expandText = "Ver más" 
}: ExpandableWidgetProps) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link to={expandUrl}>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-7 px-2 text-xs"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            {expandText}
          </Button>
        </Link>
      </div>
    </div>
  );
}