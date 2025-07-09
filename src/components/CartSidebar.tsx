import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, Plus, Minus, X, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const CartSidebar: React.FC = () => {
  const {
    items,
    total,
    itemCount,
    updateQuantity,
    removeItem
  } = useCart();
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate('/order-type');
  };
  return <Sheet>
      <SheetTrigger asChild>
        
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-playfair text-2xl">Your Order</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {items.length === 0 ? <div className="text-center py-8">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Add some delicious items to get started!
              </p>
              
              {/* Quick Action Buttons */}
              <div className="space-y-2">
                <Button variant="café-outline" size="sm" onClick={() => navigate('/menu')} className="w-full">
                  Browse Menu
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/order-tracking')} className="w-full">
                  <Truck className="w-4 h-4 mr-2" />
                  Track Order
                </Button>
              </div>
            </div> : <>
              {items.map(item => <div key={item.id} className="flex items-center gap-3 p-3 bg-card rounded-2xl border">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">₹{item.price}</p>
                    {item.notes && <p className="text-xs text-muted-foreground italic mt-1">
                        Note: {item.notes}
                      </p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="café-outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="font-medium min-w-[2ch] text-center">
                      {item.quantity}
                    </span>
                    <Button variant="café" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>)}
              
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                
                <Button variant="café" size="lg" className="w-full" onClick={handleCheckout} disabled={items.length === 0}>
                  Choose Dining Option
                </Button>
              </div>
            </>}
        </div>
      </SheetContent>
    </Sheet>;
};