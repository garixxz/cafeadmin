import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { CartSidebar } from "@/components/CartSidebar";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { OrderType } from "./pages/OrderType";
import { TableBooking } from "./pages/TableBooking";
import { RoomDelivery } from "./pages/RoomDelivery";
import { Checkout } from "./pages/Checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { OrderTracking } from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import { MenuManagement } from "./pages/admin/MenuManagement";
import { OrderManagement } from "./pages/admin/OrderManagement";
import { Reports } from "./pages/admin/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order-type" element={<OrderType />} />
            <Route path="/table-booking" element={<TableBooking />} />
            <Route path="/room-delivery" element={<RoomDelivery />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CartSidebar />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
