import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FoodItem, useCart } from '@/contexts/CartContext';
import { Plus, Minus, Leaf, Flame } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addItem, items, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(0);
  
  const cartItem = items.find(cartItem => cartItem.id === item.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem(item);
    toast({
      title: "Added to cart! 🎉",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      updateQuantity(item.id, 0);
      toast({
        title: "Removed from cart",
        description: `${item.name} has been removed from your cart.`,
      });
    } else {
      updateQuantity(item.id, newQuantity);
    }
    setQuantity(newQuantity);
  };

  return (
    <Card className="food-card group cursor-pointer overflow-hidden">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {item.isVeg && (
            <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground">
              <Leaf className="w-3 h-3 mr-1" />
              Veg
            </Badge>
          )}
          {item.isPopular && (
            <Badge variant="destructive" className="bg-destructive/90">
              <Flame className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-card/90 backdrop-blur-sm font-semibold">
            ₹{item.price}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
            {item.name}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {currentQuantity === 0 ? (
            <Button 
              variant="café" 
              size="sm" 
              onClick={handleAdd}
              className="flex-1"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center gap-3 flex-1">
              <Button
                variant="café-outline"
                size="sm"
                onClick={() => handleQuantityChange(currentQuantity - 1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-semibold text-lg min-w-[2ch] text-center">
                {currentQuantity}
              </span>
              <Button
                variant="café"
                size="sm"
                onClick={() => handleQuantityChange(currentQuantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};