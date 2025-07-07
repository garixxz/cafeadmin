import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowUp, 
  ArrowDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

const stats = [
  {
    name: "Today's Revenue",
    value: "₹12,450",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    name: "Total Orders",
    value: "89",
    change: "+8.2%",
    changeType: "positive", 
    icon: ShoppingCart,
  },
  {
    name: "Active Customers",
    value: "67",
    change: "-2.1%",
    changeType: "negative",
    icon: Users,
  },
  {
    name: "Avg Order Value",
    value: "₹340",
    change: "+5.7%",
    changeType: "positive",
    icon: TrendingUp,
  },
];

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "Arjun Sharma",
    amount: "₹450",
    status: "preparing",
    type: "Dine-in",
    time: "2 mins ago",
  },
  {
    id: "#ORD-002", 
    customer: "Priya Patel",
    amount: "₹280",
    status: "ready",
    type: "Takeaway",
    time: "5 mins ago",
  },
  {
    id: "#ORD-003",
    customer: "Rohit Kumar",
    amount: "₹620",
    status: "delivered",
    type: "Room Delivery",
    time: "12 mins ago",
  },
  {
    id: "#ORD-004",
    customer: "Sneha Gupta",
    amount: "₹390",
    status: "pending",
    type: "Dine-in",
    time: "15 mins ago",
  },
];

const topItems = [
  { name: "Chicken Biryani", orders: 24, revenue: "₹4,800" },
  { name: "Margherita Pizza", orders: 18, revenue: "₹3,240" },
  { name: "Masala Chai", orders: 35, revenue: "₹1,750" },
  { name: "Veg Sandwich", orders: 16, revenue: "₹1,440" },
];

export function Dashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "preparing": return "bg-blue-500";
      case "ready": return "bg-green-500";
      case "delivered": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="secondary">Pending</Badge>;
      case "preparing": return <Badge className="bg-blue-500 hover:bg-blue-600">Preparing</Badge>;
      case "ready": return <Badge className="bg-green-500 hover:bg-green-600">Ready</Badge>;
      case "delivered": return <Badge variant="outline">Delivered</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-playfair font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening at your café today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="hover:shadow-soft transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.changeType === "positive" ? (
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from yesterday</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`} />
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium">{order.amount}</p>
                      <p className="text-xs text-muted-foreground">{order.type}</p>
                    </div>
                    {getStatusBadge(order.status)}
                    <span className="text-xs text-muted-foreground">{order.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Selling Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topItems.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{item.revenue}</p>
                    <Progress value={(item.orders / 35) * 100} className="w-16 h-1.5 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h3 className="font-medium">Mark Items Unavailable</h3>
              <p className="text-sm text-muted-foreground mt-1">Update stock status</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h3 className="font-medium">View Pending Orders</h3>
              <p className="text-sm text-muted-foreground mt-1">12 orders waiting</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h3 className="font-medium">Export Reports</h3>
              <p className="text-sm text-muted-foreground mt-1">Download today's data</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h3 className="font-medium">Send Notifications</h3>
              <p className="text-sm text-muted-foreground mt-1">Notify customers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}