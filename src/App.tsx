import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { CartSidebar } from "@/components/CartSidebar";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import { MenuManagement } from "./pages/admin/MenuManagement";
import { OrderManagement } from "./pages/admin/OrderManagement";
import { Reports } from "./pages/admin/Reports";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
