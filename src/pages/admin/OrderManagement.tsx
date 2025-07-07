import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  Truck,
  Phone,
  MessageSquare,
  Copy,
  Share2,
  MapPin,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const orders = [
  {
    id: "ORD-001",
    customer: "Arjun Sharma",
    phone: "+91 9876543210",
    email: "arjun@example.com",
    amount: 450,
    status: "preparing",
    type: "dine-in",
    tableNumber: "T-05",
    items: [
      { name: "Chicken Biryani", quantity: 1, price: 299 },
      { name: "Masala Chai", quantity: 2, price: 50 },
      { name: "Raita", quantity: 1, price: 101 },
    ],
    timestamp: "2024-01-15T10:30:00Z",
    paymentStatus: "paid",
    address: null,
  },
  {
    id: "ORD-002",
    customer: "Priya Patel",
    phone: "+91 9876543211",
    email: "priya@example.com",
    amount: 280,
    status: "ready",
    type: "takeaway",
    tableNumber: null,
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 249 },
      { name: "Coke", quantity: 1, price: 31 },
    ],
    timestamp: "2024-01-15T10:25:00Z",
    paymentStatus: "paid",
    address: null,
  },
  {
    id: "ORD-003",
    customer: "Rohit Kumar",
    phone: "+91 9876543212",
    email: "rohit@example.com",
    amount: 620,
    status: "delivered",
    type: "room-delivery",
    tableNumber: null,
    items: [
      { name: "Chicken Biryani", quantity: 2, price: 598 },
      { name: "Samosa", quantity: 2, price: 22 },
    ],
    timestamp: "2024-01-15T09:45:00Z",
    paymentStatus: "paid",
    address: {
      room: "A-204",
      hostel: "Hostel Block A",
      landmark: "Near Main Gate",
    },
  },
  {
    id: "ORD-004",
    customer: "Sneha Gupta",
    phone: "+91 9876543213",
    email: "sneha@example.com",
    amount: 390,
    status: "pending",
    type: "dine-in",
    tableNumber: "T-12",
    items: [
      { name: "Veg Pizza", quantity: 1, price: 199 },
      { name: "Garlic Bread", quantity: 1, price: 149 },
      { name: "Cold Coffee", quantity: 1, price: 42 },
    ],
    timestamp: "2024-01-15T10:35:00Z",
    paymentStatus: "paid",
    address: null,
  },
];

export function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const { toast } = useToast();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesType = typeFilter === "all" || order.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500 hover:bg-yellow-600";
      case "preparing": return "bg-blue-500 hover:bg-blue-600";
      case "ready": return "bg-green-500 hover:bg-green-600";
      case "delivered": return "bg-gray-500 hover:bg-gray-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Pending";
      case "preparing": return "Preparing";
      case "ready": return "Ready";
      case "delivered": return "Delivered";
      default: return status;
    }
  };

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case "pending": return "preparing";
      case "preparing": return "ready";
      case "ready": return "delivered";
      default: return currentStatus;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been marked as ${getStatusText(newStatus)}.`,
    });

    // If status is "ready", show delivery details
    if (newStatus === "ready") {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        setSelectedOrder(order);
      }
    }
  };

  const shareViaWhatsApp = (order: typeof orders[0]) => {
    const message = `🍽️ *Order Ready for Delivery*\n\n*Order ID:* ${order.id}\n*Customer:* ${order.customer}\n*Amount:* ₹${order.amount}\n\n*Delivery Address:*\n${order.address?.hostel}\nRoom: ${order.address?.room}\n${order.address?.landmark}\n\n*Contact:* ${order.phone}`;
    const url = `https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const shareViaSMS = (order: typeof orders[0]) => {
    const message = `Order ${order.id} ready for delivery. Address: ${order.address?.hostel}, Room ${order.address?.room}. Contact: ${order.phone}`;
    const url = `sms:${order.phone}?body=${encodeURIComponent(message)}`;
    window.open(url);
  };

  const copyOrderDetails = (order: typeof orders[0]) => {
    const details = `Order: ${order.id}\nCustomer: ${order.customer}\nPhone: ${order.phone}\nAddress: ${order.address?.hostel}, Room ${order.address?.room}\nAmount: ₹${order.amount}`;
    navigator.clipboard.writeText(details);
    toast({
      title: "Copied to Clipboard",
      description: "Order details have been copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-semibold">Order Management</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage all customer orders in real-time
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="dine-in">Dine-in</SelectItem>
                  <SelectItem value="takeaway">Takeaway</SelectItem>
                  <SelectItem value="room-delivery">Room Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-soft transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{order.id}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                    <Badge variant="outline">
                      {order.type.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{order.customer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{order.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(order.timestamp).toLocaleTimeString()}</span>
                    </div>
                    {order.tableNumber && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Table:</span>
                        <span className="font-medium">{order.tableNumber}</span>
                      </div>
                    )}
                    {order.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{order.address.hostel} - {order.address.room}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex-1">
                  <div className="text-sm">
                    <p className="font-medium mb-1">Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-muted-foreground">
                          <span>{item.quantity}x {item.name}</span>
                          <span>₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">₹{order.amount}</p>
                    <p className="text-xs text-muted-foreground">{order.paymentStatus}</p>
                  </div>
                  
                  {order.status !== "delivered" && (
                    <Button
                      onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Mark as {getStatusText(getNextStatus(order.status))}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ready Order Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Order Ready for Delivery
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Customer Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium">{selectedOrder.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-medium">{selectedOrder.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-medium">{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium text-emerald-600">₹{selectedOrder.amount}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.address && (
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Delivery Address
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{selectedOrder.address.hostel}</p>
                    <p>Room: {selectedOrder.address.room}</p>
                    <p className="text-muted-foreground">{selectedOrder.address.landmark}</p>
                  </div>
                </div>
              )}

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Share Order Details</h3>
                <div className="grid gap-2">
                  <Button
                    onClick={() => shareViaWhatsApp(selectedOrder)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Share via WhatsApp
                  </Button>
                  <Button
                    onClick={() => shareViaSMS(selectedOrder)}
                    variant="outline"
                    className="w-full"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Send SMS
                  </Button>
                  <Button
                    onClick={() => copyOrderDetails(selectedOrder)}
                    variant="outline"
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Details
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No orders found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}