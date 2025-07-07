import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3 as Dashboard, 
  Menu as MenuIcon, 
  FileText, 
  Users, 
  Settings,
  PanelLeft,
  Bell,
  Search,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Dashboard, badge: null },
  { name: "Menu Management", href: "/admin/menu", icon: MenuIcon, badge: null },
  { name: "Order Management", href: "/admin/orders", icon: FileText, badge: 12 },
  { name: "Reports", href: "/admin/reports", icon: Users, badge: null },
  { name: "Settings", href: "/admin/settings", icon: Settings, badge: null },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        {/* Header */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="font-playfair font-semibold text-lg">Café Admin</h1>
              <p className="text-xs text-muted-foreground">Restaurant Management</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-accent-foreground" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@cafe.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-16"
      )}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex h-16 items-center gap-4 px-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8"
            >
              <PanelLeft className="h-4 w-4" />
            </Button>

            <div className="flex-1 flex items-center gap-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders, menu items..."
                  className="pl-9 w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}