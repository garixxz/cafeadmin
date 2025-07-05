import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, Utensils, Clock, Users } from 'lucide-react';

export const OrderType = () => {
  const navigate = useNavigate();
  const { items, total, itemCount } = useCart();

  const handleOrderTypeSelect = (type: 'takeaway' | 'dine-in') => {
    if (type === 'dine-in') {
      navigate('/table-booking');
    } else {
      navigate('/checkout', { state: { orderType: 'takeaway' } });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="font-playfair text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add some items to your cart before proceeding
          </p>
          <Button variant="café" onClick={() => navigate('/menu')}>
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-4">
            How would you like your order?
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose your preferred dining option
          </p>
        </div>

        {/* Order Summary */}
        <Card className="p-6 mb-8 bg-gradient-warm border-border/50">
          <h2 className="font-playfair text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-sm text-muted-foreground">
                +{items.length - 3} more item{items.length - 3 !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="border-t pt-4 flex justify-between font-semibold text-lg">
            <span>Total ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </Card>

        {/* Order Type Options */}
        <div className="space-y-4">
          {/* Takeaway Option */}
          <Card 
            className="food-card cursor-pointer group"
            onClick={() => handleOrderTypeSelect('takeaway')}
          >
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-secondary/20 rounded-full flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                <ShoppingBag className="w-10 h-10 text-secondary-foreground" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-3">
                Takeaway 🛍️
              </h3>
              <p className="text-muted-foreground mb-4">
                Perfect for grabbing your order and heading to class
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>5-10 mins</span>
                </div>
              </div>
              <div className="text-green-600 font-medium">
                ✅ Ready to go • No table booking needed
              </div>
            </div>
          </Card>

          {/* Dine-In Option */}
          <Card 
            className="food-card cursor-pointer group"
            onClick={() => handleOrderTypeSelect('dine-in')}
          >
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <Utensils className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-3">
                Dine In 🍽️
              </h3>
              <p className="text-muted-foreground mb-4">
                Enjoy your meal in our cozy café atmosphere
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Perfect for groups</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>10-15 mins</span>
                </div>
              </div>
              <div className="text-accent font-medium">
                🪑 Choose your table • Study-friendly environment
              </div>
            </div>
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/menu')}
            className="rounded-2xl"
          >
            Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};