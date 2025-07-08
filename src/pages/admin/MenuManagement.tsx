
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
  Leaf,
  ChefHat
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const defaultCategories = ["Biryani", "Pizza", "Snacks", "Beverages", "Desserts"];

const mockMenuItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 299,
    description: "Aromatic basmati rice with tender chicken and spices",
    image: "/src/assets/chicken-biryani.jpg",
    available: true,
    isVeg: false,
    orders: 24,
  },
  {
    id: 2,
    name: "Margherita Pizza",
    category: "Pizza", 
    price: 249,
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    image: "/src/assets/margherita-pizza.jpg",
    available: true,
    isVeg: true,
    orders: 18,
  },
  {
    id: 3,
    name: "Samosa",
    category: "Snacks",
    price: 45,
    description: "Crispy fried pastry with spiced potato filling",
    image: "/src/assets/samosa.jpg",
    available: false,
    isVeg: true,
    orders: 12,
  },
  {
    id: 4,
    name: "Masala Chai",
    category: "Beverages",
    price: 25,
    description: "Traditional Indian tea with aromatic spices",
    image: "/src/assets/masala-chai.jpg",
    available: true,
    isVeg: true,
    orders: 35,
  },
];

export function MenuManagement() {
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [categories, setCategories] = useState(defaultCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [vegFilter, setVegFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<typeof menuItems[0] | null>(null);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { toast } = useToast();

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    isVeg: true,
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesVeg = vegFilter === "all" || 
      (vegFilter === "veg" && item.isVeg) || 
      (vegFilter === "non-veg" && !item.isVeg);
    const matchesAvailability = availabilityFilter === "all" || 
      (availabilityFilter === "available" && item.available) ||
      (availabilityFilter === "unavailable" && !item.available);
    return matchesSearch && matchesCategory && matchesVeg && matchesAvailability;
  });

  const handleAddItem = () => {
    const id = Math.max(...menuItems.map(item => item.id)) + 1;
    const item = {
      id,
      name: newItem.name,
      category: newItem.category,
      price: parseInt(newItem.price),
      description: newItem.description,
      image: newItem.image || "/api/placeholder/300/200",
      available: true,
      isVeg: newItem.isVeg,
      orders: 0,
    };
    
    setMenuItems([...menuItems, item]);
    toast({
      title: "Item Added",
      description: `${newItem.name} has been added to the menu.`,
    });
    
    setIsAddDialogOpen(false);
    setNewItem({ name: "", category: "", price: "", description: "", image: "", isVeg: true });
  };

  const handleEditItem = () => {
    if (!editingItem) return;
    
    setMenuItems(menuItems.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    
    toast({
      title: "Item Updated",
      description: `${editingItem.name} has been updated successfully.`,
    });
    
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: number) => {
    const item = menuItems.find(i => i.id === itemId);
    setMenuItems(menuItems.filter(item => item.id !== itemId));
    
    toast({
      title: "Item Deleted",
      description: `${item?.name} has been removed from the menu.`,
      variant: "destructive",
    });
  };

  const handleToggleAvailability = (itemId: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
    
    const item = menuItems.find(i => i.id === itemId);
    toast({
      title: item?.available ? "Item Marked Unavailable" : "Item Marked Available",
      description: `${item?.name} is now ${item?.available ? "unavailable" : "available"}.`,
    });
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()]);
      toast({
        title: "Category Added",
        description: `${newCategoryName} has been added to categories.`,
      });
      setNewCategoryName("");
      setIsAddCategoryOpen(false);
    }
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
                <div className="flex gap-2">
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
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsAddCategoryOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
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
              <div className="flex items-center space-x-2">
                <Switch
                  id="isVeg"
                  checked={newItem.isVeg}
                  onCheckedChange={(checked) => setNewItem({...newItem, isVeg: checked})}
                />
                <Label htmlFor="isVeg" className="flex items-center gap-2">
                  {newItem.isVeg ? (
                    <>
                      <Leaf className="h-4 w-4 text-green-600" />
                      Vegetarian
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 bg-red-500 rounded-full" />
                      Non-Vegetarian
                    </>
                  )}
                </Label>
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

      {/* Enhanced Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
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
            <Select value={vegFilter} onValueChange={setVegFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Diet Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="veg">Vegetarian</SelectItem>
                <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
              </SelectContent>
            </Select>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setVegFilter("all");
              setAvailabilityFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{menuItems.length}</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{menuItems.filter(item => item.isVeg).length}</p>
                <p className="text-sm text-muted-foreground">Vegetarian</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold">{menuItems.filter(item => !item.isVeg).length}</p>
                <p className="text-sm text-muted-foreground">Non-Vegetarian</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold">{menuItems.filter(item => !item.available).length}</p>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                <Badge variant={item.isVeg ? "default" : "destructive"}>
                  {item.isVeg ? "Veg" : "Non-Veg"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    {item.name}
                    {item.isVeg ? (
                      <Leaf className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 bg-red-500 rounded-full" />
                    )}
                  </h3>
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setEditingItem(item)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Item Modal */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Item Name</Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={editingItem.category} 
                  onValueChange={(value) => setEditingItem({...editingItem, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
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
                <Label htmlFor="edit-price">Price (₹)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({...editingItem, price: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-isVeg"
                  checked={editingItem.isVeg}
                  onCheckedChange={(checked) => setEditingItem({...editingItem, isVeg: checked})}
                />
                <Label htmlFor="edit-isVeg" className="flex items-center gap-2">
                  {editingItem.isVeg ? (
                    <>
                      <Leaf className="h-4 w-4 text-green-600" />
                      Vegetarian
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 bg-red-500 rounded-full" />
                      Non-Vegetarian
                    </>
                  )}
                </Label>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleEditItem} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditingItem(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No menu items found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddCategory} className="flex-1">
                Add Category
              </Button>
              <Button variant="outline" onClick={() => {
                setIsAddCategoryOpen(false);
                setNewCategoryName("");
              }}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
