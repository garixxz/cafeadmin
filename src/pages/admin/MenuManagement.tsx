import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Upload,
  Filter,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = ["Biryani", "Pizza", "Snacks", "Beverages", "Desserts"];

const menuItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 299,
    description: "Aromatic basmati rice with tender chicken and spices",
    image: "/api/placeholder/300/200",
    available: true,
    orders: 24,
  },
  {
    id: 2,
    name: "Margherita Pizza",
    category: "Pizza", 
    price: 249,
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    image: "/api/placeholder/300/200",
    available: true,
    orders: 18,
  },
  {
    id: 3,
    name: "Samosa",
    category: "Snacks",
    price: 45,
    description: "Crispy fried pastry with spiced potato filling",
    image: "/api/placeholder/300/200",
    available: false,
    orders: 12,
  },
  {
    id: 4,
    name: "Masala Chai",
    category: "Beverages",
    price: 25,
    description: "Traditional Indian tea with aromatic spices",
    image: "/api/placeholder/300/200",
    available: true,
    orders: 35,
  },
];

export function MenuManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<typeof menuItems[0] | null>(null);
  const { toast } = useToast();

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    toast({
      title: "Item Added",
      description: `${newItem.name} has been added to the menu.`,
    });
    setIsAddDialogOpen(false);
    setNewItem({ name: "", category: "", price: "", description: "", image: "" });
  };

  const handleToggleAvailability = (itemId: number) => {
    const item = menuItems.find(i => i.id === itemId);
    toast({
      title: item?.available ? "Item Marked Unavailable" : "Item Marked Available",
      description: `${item?.name} is now ${item?.available ? "unavailable" : "available"}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-semibold">Menu Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your restaurant's menu items and categories
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  placeholder="Enter item description"
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    value={newItem.image}
                    onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                    placeholder="Image URL or upload"
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleAddItem} className="w-full">
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-soft transition-shadow">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Badge variant={item.available ? "default" : "secondary"}>
                  {item.available ? "Available" : "Out of Stock"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-lg font-bold text-emerald-600">₹{item.price}</p>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">
                  {item.orders} orders today
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Available</span>
                  <Switch
                    checked={item.available}
                    onCheckedChange={() => handleToggleAvailability(item.id)}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No menu items found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}