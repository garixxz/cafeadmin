import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { CreditCard, Smartphone, Wallet, MapPin, Clock, Users, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'upi',
    name: 'UPI',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'Pay with UPI apps'
  },
  {
    id: 'card',
    name: 'Card',
    icon: <CreditCard className="w-5 h-5" />,
    description: 'Credit/Debit Card'
  },
  {
    id: 'wallet',
    name: 'Wallet',
    icon: <Wallet className="w-5 h-5" />,
    description: 'Digital Wallets'
  }
];

export const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, total, itemCount, clearCart } = useCart();
  
  const orderData = location.state || {};
  const { orderType, tableNumber, tableSeats } = orderData;
  
  const [selectedPayment, setSelectedPayment] = useState<string>('upi');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [tip, setTip] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = orderType === 'takeaway' ? 0 : 10;
  const taxAmount = (total * 0.05); // 5% tax
  const finalTotal = total + deliveryFee + taxAmount + tip;

  const handleTipSelect = (tipAmount: number) => {
    setTip(tipAmount);
  };

  const handlePlaceOrder = async () => {
    if (!customerName || !customerPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number.",
        variant: "destructive"
      });
      return;
    }

    if (customerPhone.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      const orderNumber = `CF${Date.now().toString().slice(-6)}`;
      
      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order #${orderNumber} has been confirmed.`,
      });

      clearCart();
      navigate('/order-confirmation', {
        state: {
          orderNumber,
          orderType,
          tableNumber,
          customerName,
          estimatedTime: orderType === 'dine-in' ? '15-20 minutes' : '10-15 minutes',
          total: finalTotal
        }
      });
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle2 className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="font-playfair text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add some items to your cart before checkout
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
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-4">
            Checkout
          </h1>
          <p className="text-muted-foreground text-lg">
            Complete your order and get ready to enjoy!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Order Details & Customer Info */}
          <div className="space-y-6">
            {/* Order Type Info */}
            <Card className="p-6">
              <h2 className="font-playfair text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium">
                      {orderType === 'dine-in' ? 'Dine In' : 'Takeaway'}
                    </p>
                    {orderType === 'dine-in' && tableNumber && (
                      <p className="text-sm text-muted-foreground">
                        Table {tableNumber} • {tableSeats} seats
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="font-medium">Estimated Time</p>
                    <p className="text-sm text-muted-foreground">
                      {orderType === 'dine-in' ? '15-20 minutes' : '10-15 minutes'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Customer Information */}
            <Card className="p-6">
              <h2 className="font-playfair text-xl font-semibold mb-4">Your Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <Input
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="rounded-2xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input
                    placeholder="Enter your phone number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="rounded-2xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Special Instructions</label>
                  <Textarea
                    placeholder="Any special requests? (e.g., less sugar, extra spicy)"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="rounded-2xl"
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <h2 className="font-playfair text-xl font-semibold mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      {method.icon}
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card className="p-6">
              <h2 className="font-playfair text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.price} × {item.quantity}
                      </p>
                      {item.notes && (
                        <p className="text-xs text-muted-foreground italic">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tip Section */}
            <Card className="p-6">
              <h3 className="font-playfair text-lg font-semibold mb-4">Add a Tip?</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[10, 15, 20, 25].map((tipAmount) => (
                  <Button
                    key={tipAmount}
                    variant={tip === tipAmount ? 'café' : 'outline'}
                    size="sm"
                    onClick={() => handleTipSelect(tipAmount)}
                    className="rounded-xl"
                  >
                    ₹{tipAmount}
                  </Button>
                ))}
              </div>
              <Input
                type="number"
                placeholder="Custom amount"
                value={tip || ''}
                onChange={(e) => setTip(Number(e.target.value) || 0)}
                className="rounded-2xl"
              />
            </Card>

            {/* Bill Summary */}
            <Card className="p-6">
              <h3 className="font-playfair text-lg font-semibold mb-4">Bill Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                {orderType === 'dine-in' && (
                  <div className="flex justify-between">
                    <span>Service Charge</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>₹{taxAmount.toFixed(2)}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>Tip</span>
                    <span>₹{tip.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Place Order Button */}
            <Button 
              variant="café" 
              size="xl" 
              className="w-full"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Place Order • ₹${finalTotal.toFixed(2)}`}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By placing this order, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};