import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, DollarSign, ShoppingCart, Users, TrendingUp, Clock, CheckCircle, AlertCircle, Utensils, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
const stats = [{
  name: "Today's Revenue",
  value: "₹12,450",
  change: "+12.5%",
  changeType: "positive",
  icon: DollarSign
}, {
  name: "Total Orders",
  value: "89",
  change: "+8.2%",
  changeType: "positive",
  icon: ShoppingCart
}, {
  name: "Active Customers",
  value: "67",
  change: "-2.1%",
  changeType: "negative",
  icon: Users
}, {
  name: "Avg Order Value",
  value: "₹340",
  change: "+5.7%",
  changeType: "positive",
  icon: TrendingUp
}];
const recentOrders = [{
  id: "#ORD-001",
  customer: "Arjun Sharma",
  amount: "₹450",
  status: "preparing",
  type: "Dine-in",
  time: "2 mins ago"
}, {
  id: "#ORD-002",
  customer: "Priya Patel",
  amount: "₹280",
  status: "ready",
  type: "Takeaway",
  time: "5 mins ago"
}, {
  id: "#ORD-003",
  customer: "Rohit Kumar",
  amount: "₹620",
  status: "delivered",
  type: "Room Delivery",
  time: "12 mins ago"
}, {
  id: "#ORD-004",
  customer: "Sneha Gupta",
  amount: "₹390",
  status: "pending",
  type: "Dine-in",
  time: "15 mins ago"
}];
const topItems = [{
  name: "Chicken Biryani",
  orders: 24,
  revenue: "₹4,800"
}, {
  name: "Margherita Pizza",
  orders: 18,
  revenue: "₹3,240"
}, {
  name: "Masala Chai",
  orders: 35,
  revenue: "₹1,750"
}, {
  name: "Veg Sandwich",
  orders: 16,
  revenue: "₹1,440"
}];

const pendingOrders = [
  {
    id: "#ORD-005",
    customer: "Rahul Singh",
    amount: "₹520",
    status: "pending",
    type: "dine-in",
    time: "5 mins ago",
    items: ["Chicken Biryani", "Masala Chai"],
    tableNumber: "Table 5"
  },
  {
    id: "#ORD-006",
    customer: "Meera Joshi",
    amount: "₹680",
    status: "pending",
    type: "delivery",
    time: "8 mins ago",
    items: ["Margherita Pizza", "Veg Sandwich"],
    deliveryAddress: "Room 203, Hotel Blue Moon"
  },
  {
    id: "#ORD-007",
    customer: "Amit Verma",
    amount: "₹320",
    status: "pending",
    type: "dine-in",
    time: "10 mins ago",
    items: ["Samosa (2)", "Masala Chai"],
    tableNumber: "Table 12"
  },
  {
    id: "#ORD-008",
    customer: "Kavya Reddy",
    amount: "₹450",
    status: "pending",
    type: "delivery",
    time: "12 mins ago",
    items: ["Chicken Biryani", "Croissant"],
    deliveryAddress: "Room 105, Sunrise Resort"
  }
];

export function Dashboard() {
  const navigate = useNavigate();
  
  // Separate pending orders by type
  const { dineInOrders, deliveryOrders } = useMemo(() => {
    const dineIn = pendingOrders.filter(order => order.type === 'dine-in');
    const delivery = pendingOrders.filter(order => order.type === 'delivery');
    return { dineInOrders: dineIn, deliveryOrders: delivery };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "preparing":
        return "bg-blue-500";
      case "ready":
        return "bg-green-500";
      case "delivered":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">Pending</Badge>;
      case "preparing":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Preparing</Badge>;
      case "ready":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Ready</Badge>;
      case "delivered":
        return <Badge variant="outline">Delivered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleOrderClick = (orderId: string) => {
    navigate('/admin/orders', { state: { highlightOrder: orderId } });
  };

  const PendingOrderCard = ({ order }: { order: any }) => (
    <div 
      className="p-4 border rounded-lg hover:bg-muted/30 cursor-pointer transition-all duration-200 hover:shadow-md animate-fade-in"
      onClick={() => handleOrderClick(order.id)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusBadge(order.status)}
          <Badge variant="outline" className="text-xs">
            {order.type === 'dine-in' ? 'Dine-in' : 'Delivery'}
          </Badge>
        </div>
        <span className="text-sm text-muted-foreground">{order.time}</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-primary">{order.id}</h4>
          <span className="font-bold text-lg">{order.amount}</span>
        </div>
        
        <p className="text-sm font-medium">{order.customer}</p>
        
        <div className="text-sm space-y-1">
          <p className="text-muted-foreground">
            <span className="font-medium">Items:</span> {order.items.join(", ")}
          </p>
          {order.type === 'dine-in' ? (
            <p className="text-muted-foreground">
              <span className="font-medium">Table:</span> {order.tableNumber}
            </p>
          ) : (
            <p className="text-muted-foreground">
              <span className="font-medium">Address:</span> {order.deliveryAddress}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-playfair font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening at your café today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.name} className="hover:shadow-soft transition-all duration-200 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
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
        <Card className="lg:col-span-2 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => handleOrderClick(order.id)}
                >
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
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Selling Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topItems.map((item, index) => (
                <div 
                  key={item.name} 
                  className="flex items-center justify-between hover:bg-muted/30 p-2 rounded-lg transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                    </div>
                  </div>
                  <span className="font-semibold text-primary">{item.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Orders Section - Two Columns */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Dine-in Orders */}
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-orange-500" />
              Pending Dine-in Orders
              <Badge variant="secondary" className="ml-2">
                {dineInOrders.length}
              </Badge>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/admin/orders?filter=dine-in')}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {dineInOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Utensils className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No pending dine-in orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dineInOrders.map((order, index) => (
                  <div key={order.id} style={{ animationDelay: `${index * 100}ms` }}>
                    <PendingOrderCard order={order} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delivery Orders */}
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-500" />
              Pending Delivery Orders
              <Badge variant="secondary" className="ml-2">
                {deliveryOrders.length}
              </Badge>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/admin/orders?filter=delivery')}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {deliveryOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Truck className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No pending delivery orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {deliveryOrders.map((order, index) => (
                  <div key={order.id} style={{ animationDelay: `${index * 100}ms` }}>
                    <PendingOrderCard order={order} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}