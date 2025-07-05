import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Home, MapPin, Clock, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const RoomDelivery = () => {
  const navigate = useNavigate();
  const { items, total, itemCount } = useCart();
  
  const [hostelName, setHostelName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [landmark, setLandmark] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const hostels = [
    'Hostel A - Boys',
    'Hostel B - Girls', 
    'Hostel C - Boys',
    'Hostel D - Girls',
    'Hostel E - Boys',
    'Hostel F - Girls',
    'Graduate Hostel - Mixed',
    'International Hostel'
  ];

  const handleProceedToCheckout = () => {
    // Validation
    if (!hostelName || !roomNumber || !phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in hostel name, room number, and phone number.",
        variant: "destructive"
      });
      return;
    }

    if (phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive"
      });
      return;
    }

    // Navigate to checkout with room delivery details
    navigate('/checkout', {
      state: {
        orderType: 'room-delivery',
        deliveryDetails: {
          hostelName,
          roomNumber,
          floorNumber,
          landmark,
          phoneNumber,
          specialInstructions
        }
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <Home className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
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
          <Home className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="font-playfair text-4xl font-bold mb-4">
            Room Delivery Details
          </h1>
          <p className="text-muted-foreground text-lg">
            Tell us where to deliver your order
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

        {/* Delivery Details Form */}
        <Card className="p-6 mb-8">
          <h2 className="font-playfair text-xl font-semibold mb-6">Delivery Address</h2>
          
          <div className="space-y-6">
            {/* Hostel Selection */}
            <div>
              <Label htmlFor="hostel" className="text-sm font-medium mb-2 block">
                Select Hostel *
              </Label>
              <Select value={hostelName} onValueChange={setHostelName}>
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="Choose your hostel" />
                </SelectTrigger>
                <SelectContent>
                  {hostels.map((hostel) => (
                    <SelectItem key={hostel} value={hostel}>
                      {hostel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Room and Floor */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="room" className="text-sm font-medium mb-2 block">
                  Room Number *
                </Label>
                <Input
                  id="room"
                  placeholder="e.g., 205"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="rounded-2xl"
                />
              </div>
              <div>
                <Label htmlFor="floor" className="text-sm font-medium mb-2 block">
                  Floor (Optional)
                </Label>
                <Input
                  id="floor"
                  placeholder="e.g., 2nd Floor"
                  value={floorNumber}
                  onChange={(e) => setFloorNumber(e.target.value)}
                  className="rounded-2xl"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                Phone Number *
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="rounded-2xl"
              />
            </div>

            {/* Landmark */}
            <div>
              <Label htmlFor="landmark" className="text-sm font-medium mb-2 block">
                Nearby Landmark (Optional)
              </Label>
              <Input
                id="landmark"
                placeholder="e.g., Near library, Next to vending machine"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="rounded-2xl"
              />
            </div>

            {/* Special Instructions */}
            <div>
              <Label htmlFor="instructions" className="text-sm font-medium mb-2 block">
                Special Delivery Instructions (Optional)
              </Label>
              <Textarea
                id="instructions"
                placeholder="e.g., Call when you arrive, Leave at door, etc."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="rounded-2xl"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Delivery Info */}
        <Card className="p-6 mb-8 bg-accent/10 border-accent/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent mt-1" />
            <div>
              <h3 className="font-semibold text-accent mb-2">Delivery Information</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Estimated delivery time: 20-30 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Our delivery person will call you when they arrive</span>
                </div>
                <p className="text-xs mt-3">
                  * Please ensure someone is available to receive the order at the specified location.
                  Delivery charges may apply based on distance.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            variant="café" 
            size="xl" 
            className="w-full"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout 
          </Button>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/order-type')}
              className="flex-1 rounded-2xl"
            >
              Back
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/menu')}
              className="flex-1 rounded-2xl"
            >
              Edit Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};