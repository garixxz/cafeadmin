import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  CreditCard,
  Download,
  Calendar,
  PieChart,
  BarChart3
} from "lucide-react";

const revenueData = [
  { period: "Today", revenue: 12450, orders: 89, change: 12.5 },
  { period: "This Week", revenue: 68750, orders: 542, change: 8.3 },
  { period: "This Month", revenue: 285000, orders: 2180, change: 15.7 },
];

const paymentMethods = [
  { method: "UPI", amount: 156000, percentage: 52, color: "bg-blue-500" },
  { method: "Card", amount: 89000, percentage: 30, color: "bg-green-500" },
  { method: "Cash", amount: 34000, percentage: 12, color: "bg-yellow-500" },
  { method: "Wallet", amount: 18000, percentage: 6, color: "bg-purple-500" },
];

const topSellingItems = [
  { name: "Chicken Biryani", orders: 156, revenue: 46800, growth: 12.5 },
  { name: "Margherita Pizza", orders: 132, revenue: 32868, growth: -2.3 },
  { name: "Masala Chai", orders: 245, revenue: 6125, growth: 18.7 },
  { name: "Veg Sandwich", orders: 98, revenue: 13720, growth: 5.4 },
  { name: "Cold Coffee", orders: 87, revenue: 6525, growth: 8.9 },
];

const categories = [
  { name: "Biryani", revenue: 89500, orders: 298, percentage: 31.4 },
  { name: "Pizza", revenue: 67800, orders: 271, percentage: 23.8 },
  { name: "Beverages", revenue: 45600, orders: 456, percentage: 16.0 },
  { name: "Snacks", revenue: 38900, orders: 234, percentage: 13.7 },
  { name: "Desserts", revenue: 43200, orders: 189, percentage: 15.1 },
];

const hourlyTrends = [
  { hour: "8-9 AM", orders: 12, revenue: 2100 },
  { hour: "9-10 AM", orders: 18, revenue: 3400 },
  { hour: "10-11 AM", orders: 25, revenue: 4800 },
  { hour: "11-12 PM", orders: 32, revenue: 6200 },
  { hour: "12-1 PM", orders: 45, revenue: 9800 },
  { hour: "1-2 PM", orders: 38, revenue: 8600 },
  { hour: "2-3 PM", orders: 28, revenue: 5400 },
  { hour: "3-4 PM", orders: 22, revenue: 4100 },
  { hour: "4-5 PM", orders: 35, revenue: 7200 },
  { hour: "5-6 PM", orders: 41, revenue: 8900 },
  { hour: "6-7 PM", orders: 52, revenue: 11400 },
  { hour: "7-8 PM", orders: 48, revenue: 10200 },
];

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-semibold">Revenue Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive analytics and performance insights
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-32">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {revenueData.map((data, index) => (
          <Card key={data.period}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {data.period}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{data.revenue.toLocaleString()}</div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span className="text-muted-foreground">{data.orders} orders</span>
                <div className="flex items-center">
                  {data.change > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={data.change > 0 ? "text-green-500" : "text-red-500"}>
                    {data.change > 0 ? '+' : ''}{data.change}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.method} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${method.color}`} />
                    <span className="font-medium">{method.method}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{method.amount.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={method.percentage} className="w-16 h-1.5" />
                      <span className="text-xs text-muted-foreground">{method.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Top Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{category.revenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{category.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Selling Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top Selling Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Rank</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Item</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Orders</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Revenue</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topSellingItems.map((item, index) => (
                  <tr key={item.name} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="p-2 font-medium">{item.name}</td>
                    <td className="p-2">{item.orders}</td>
                    <td className="p-2 font-medium">₹{item.revenue.toLocaleString()}</td>
                    <td className="p-2">
                      <Badge variant={item.growth > 0 ? "default" : "destructive"}>
                        {item.growth > 0 ? '+' : ''}{item.growth}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Hourly Order Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-6 lg:grid-cols-12">
            {hourlyTrends.map((trend) => {
              const maxOrders = Math.max(...hourlyTrends.map(t => t.orders));
              const height = (trend.orders / maxOrders) * 100;
              
              return (
                <div key={trend.hour} className="text-center">
                  <div className="h-20 flex items-end justify-center mb-2">
                    <div 
                      className="w-8 bg-primary rounded-t transition-all hover:bg-primary/80"
                      style={{ height: `${height}%` }}
                      title={`${trend.orders} orders, ₹${trend.revenue}`}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{trend.hour}</div>
                  <div className="text-xs font-medium">{trend.orders}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}