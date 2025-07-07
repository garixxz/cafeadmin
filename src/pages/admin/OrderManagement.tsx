import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  Phone,
  MessageSquare,
  Copy,
  MapPin,
  User,
  Edit,
  Eye,
  Utensils,
  Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockOrders = [
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
      { name: "Chicken Biryani", quantity: 1, price: 299, isVeg: false },
      { name: "Masala Chai", quantity: 2, price: 50, isVeg: true },
      { name: "Raita", quantity: 1, price: 101, isVeg: true },
    ],
    timestamp: "2024-01-15T10:30:00Z",
    paymentStatus: "paid",
    paymentMethod: "UPI",
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
      { name: "Margherita Pizza", quantity: 1, price: 249, isVeg: true },
      { name: "Coke", quantity: 1, price: 31, isVeg: true },
    ],
    timestamp: "2024-01-15T10:25:00Z",
    paymentStatus: "paid",
    paymentMethod: "Card",
    address: null,
  },
  {
    id: "ORD-003",
    customer: "Rohit Kumar",
    phone: "+91 9876543212",
    email: "rohit@example.com",
    amount: 620,
    status: "delivered",
    type: "delivery",
    tableNumber: null,
    items: [
      { name: "Chicken Biryani", quantity: 2, price: 598, isVeg: false },
      { name: "Samosa", quantity: 2, price: 22, isVeg: true },
    ],
    timestamp: "2024-01-15T09:45:00Z",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    address: {
      hostelNumber: "A",
      roomNumber: "204",
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
      { name: "Veg Pizza", quantity: 1, price: 199, isVeg: true },
      { name: "Garlic Bread", quantity: 1, price: 149, isVeg: true },
      { name: "Cold Coffee", quantity: 1, price: 42, isVeg: true },
    ],
    timestamp: "2024-01-15T10:35:00Z",
    paymentStatus: "paid",
    paymentMethod: "Wallet",
    address: null,
  },
];

export function OrderManagement() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [editingOrder, setEditingOrder] = useState<typeof orders[0] | null>(null);
  const [viewDetailsOrder, setViewDetailsOrder] = useState<typeof orders[0] | null>(null);
  const { toast } = useToast();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesType = typeFilter === "all" || order.type === typeFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentMethod === paymentFilter;
    return matchesSearch && matchesStatus && matchesType && matchesPayment;
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
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been marked as ${getStatusText(newStatus)}.`,
    });

    // Show delivery sharing modal when marking delivery orders as ready
    if (newStatus === "ready") {
      const order = updatedOrders.find(o => o.id === orderId);
      console.log("Order found:", order);
      console.log("Order type:", order?.type);
      console.log("Setting selectedOrder for delivery sharing");
      
      if (order && order.type === "delivery") {
        setSelectedOrder(order);
      }
    }
  };

  const shareViaWhatsApp = (order: typeof orders[0]) => {
    const message = `🍽️ *Order Ready for Delivery*\n\n*Order ID:* ${order.id}\n*Customer:* ${order.customer}\n*Amount:* ₹${order.amount}\n\n*Delivery Address:*\nHostel: ${order.address?.hostelNumber}\nRoom: ${order.address?.roomNumber}\n${order.address?.landmark}\n\n*Contact:* ${order.phone}\n\n*Items:*\n${order.items.map(item => `${item.quantity}x ${item.name}`).join('\n')}`;
    const url = `https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const shareViaSMS = (order: typeof orders[0]) => {
    const message = `Order ${order.id} ready for delivery. Hostel ${order.address?.hostelNumber}, Room ${order.address?.roomNumber}. Customer: ${order.customer}, Phone: ${order.phone}. Amount: ₹${order.amount}`;
    const url = `sms:${order.phone}?body=${encodeURIComponent(message)}`;
    window.open(url);
  };

  const copyOrderDetails = (order: typeof orders[0]) => {
    const details = `Order: ${order.id}\nCustomer: ${order.customer}\nPhone: ${order.phone}\n${order.address ? `Address: Hostel ${order.address.hostelNumber}, Room ${order.address.roomNumber}` : `Table: ${order.tableNumber}`}\nAmount: ₹${order.amount}\nItems:\n${order.items.map(item => `${item.quantity}x ${item.name} - ₹${item.price}`).join('\n')}`;
    navigator.clipboard.writeText(details);
    toast({
      title: "Copied to Clipboard",
      description: "Order details have been copied to clipboard.",
    });
  };

  const handleItemAvailabilityToggle = (orderId: string, itemName: string) => {
    toast({
      title: "Item Availability Updated",
      description: `${itemName} availability has been toggled.`,
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

      {/* Enhanced Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, name, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
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
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dine-in">Dine-in</SelectItem>
                <SelectItem value="takeaway">Takeaway</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="Wallet">Wallet</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setTypeFilter("all");
              setPaymentFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {order.type.replace('-', ' ')}
                      </Badge>
                      {order.type === "dine-in" && (
                        <span className="text-sm text-muted-foreground">
                          {order.tableNumber}
                        </span>
                      )}
                      {order.type === "delivery" && (
                        <span className="text-sm text-muted-foreground">
                          H{order.address?.hostelNumber}-{order.address?.roomNumber}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-emerald-600">₹{order.amount}</p>
                      <p className="text-xs text-muted-foreground">{order.paymentMethod}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(order.timestamp).toLocaleTimeString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewDetailsOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingOrder(order)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {order.status !== "delivered" && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          Mark {getStatusText(getNextStatus(order.status))}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <Dialog open={!!viewDetailsOrder} onOpenChange={() => setViewDetailsOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Order Details - {viewDetailsOrder?.id}
            </DialogTitle>
          </DialogHeader>
          
          {viewDetailsOrder && (
            <div className="space-y-6">
              {/* Customer & Order Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Customer Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="font-medium">{viewDetailsOrder.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-medium">{viewDetailsOrder.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">{viewDetailsOrder.email}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Order Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(viewDetailsOrder.status)}>
                        {getStatusText(viewDetailsOrder.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium">{viewDetailsOrder.type.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment:</span>
                      <span className="font-medium">{viewDetailsOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">
                        {new Date(viewDetailsOrder.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Location Details */}
              {viewDetailsOrder.type === "dine-in" && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Utensils className="h-4 w-4" />
                      Dine-in Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span>Table Number:</span>
                      <Badge variant="outline" className="font-medium">
                        {viewDetailsOrder.tableNumber}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {viewDetailsOrder.type === "delivery" && viewDetailsOrder.address && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Delivery Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Hostel:</span>
                      <span className="font-medium">Block {viewDetailsOrder.address.hostelNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Room:</span>
                      <span className="font-medium">{viewDetailsOrder.address.roomNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Landmark:</span>
                      <span className="font-medium">{viewDetailsOrder.address.landmark}</span>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => shareViaWhatsApp(viewDetailsOrder)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        onClick={() => shareViaSMS(viewDetailsOrder)}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        SMS
                      </Button>
                      <Button
                        onClick={() => copyOrderDetails(viewDetailsOrder)}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Order Items */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {viewDetailsOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant={item.isVeg ? "default" : "destructive"} className="text-xs">
                            {item.isVeg ? "Veg" : "Non-Veg"}
                          </Badge>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-emerald-600">₹{viewDetailsOrder.amount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Order Modal */}
      <Dialog open={!!editingOrder} onOpenChange={() => setEditingOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Order - {editingOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {editingOrder && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select 
                  value={editingOrder.status} 
                  onValueChange={(value) => setEditingOrder({...editingOrder, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {editingOrder.type === "dine-in" && (
                <div>
                  <label className="text-sm font-medium">Table Number</label>
                  <Input
                    value={editingOrder.tableNumber || ""}
                    onChange={(e) => setEditingOrder({...editingOrder, tableNumber: e.target.value})}
                    placeholder="T-01"
                  />
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm font-medium">Items Availability</label>
                {editingOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Badge variant={item.isVeg ? "default" : "destructive"} className="text-xs">
                        {item.isVeg ? "V" : "N"}
                      </Badge>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleItemAvailabilityToggle(editingOrder.id, item.name)}
                    >
                      Toggle
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => {
                    setOrders(orders.map(order => 
                      order.id === editingOrder.id ? editingOrder : order
                    ));
                    setEditingOrder(null);
                    toast({
                      title: "Order Updated",
                      description: `Order ${editingOrder.id} has been updated successfully.`,
                    });
                  }}
                  className="flex-1"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingOrder(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Ready Order Delivery Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => {
        console.log("Closing delivery sharing modal");
        setSelectedOrder(null);
      }}>
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
                    <p className="font-medium">Hostel Block {selectedOrder.address.hostelNumber}</p>
                    <p>Room: {selectedOrder.address.roomNumber}</p>
                    <p className="text-muted-foreground">{selectedOrder.address.landmark}</p>
                  </div>
                </div>
              )}

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Share with Delivery Person</h3>
                <div className="grid gap-2">
                  <Button
                    onClick={() => {
                      console.log("Sharing via WhatsApp");
                      shareViaWhatsApp(selectedOrder);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Share via WhatsApp
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("Sharing via SMS");
                      shareViaSMS(selectedOrder);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Send SMS
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("Copying order details");
                      copyOrderDetails(selectedOrder);
                    }}
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
