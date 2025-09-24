import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import OwnerLayout from "./components/OwnerLayout";
import AdminLayout from "./components/AdminLayout";
import OwnerRoutes from "./routes/OwnerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Detect subdomain or admin path for routing
const getSubdomain = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  if (parts.length > 2) {
    return parts[0]; // Return first part as subdomain
  }
  return null;
};

const isAdminAccess = () => {
  const subdomain = getSubdomain();
  const pathname = window.location.pathname;
  return subdomain === 'admin' || pathname.startsWith('/admin');
};

const App = () => {
  const showAdminLayout = isAdminAccess();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {showAdminLayout ? (
            <AdminLayout />
          ) : (
            <OwnerLayout />
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;