import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, Home, RefreshCw } from 'lucide-react';

export const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    orderNumber,
    orderType,
    tableNumber,
    deliveryDetails,
    customerName,
    estimatedTime,
    total
  } = location.state || {};

  useEffect(() => {
    // Confetti effect could be added here
    document.title = `Order Confirmed - Café Trident`;
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleTrackOrder = () => {
    // In a real app, this would navigate to order tracking
    navigate('/');
  };

  if (!orderNumber) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold mb-4">Order not found</h1>
          <p className="text-muted-foreground mb-6">
            Unable to find order details
          </p>
          <Button variant="café" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        {/* Success Animation */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce-in">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-playfair text-3xl font-bold mb-2 text-foreground">
            Order Confirmed! 🎉
          </h1>
          <p className="text-muted-foreground">
            Thank you {customerName}, your order is being prepared
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="p-6 animate-slide-up">
          <div className="text-center mb-6">
            <Badge variant="outline" className="text-lg px-4 py-2 font-mono">
              #{orderNumber}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium">
                    {orderType === 'dine-in' ? 'Dine In' : 
                     orderType === 'room-delivery' ? 'Room Delivery' : 'Takeaway'}
                  </p>
                  {orderType === 'dine-in' && tableNumber && (
                    <p className="text-sm text-muted-foreground">
                      Table {tableNumber}
                    </p>
                  )}
                  {orderType === 'room-delivery' && deliveryDetails && (
                    <div className="text-sm text-muted-foreground">
                      <p>{deliveryDetails.hostelName}</p>
                      <p>Room {deliveryDetails.roomNumber}</p>
                    </div>
                  )}
                </div>
              </div>
              <Badge variant="secondary">
                {orderType === 'dine-in' ? '🍽️' : 
                 orderType === 'room-delivery' ? '🏠' : '🛍️'}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-medium">Estimated Time</p>
                  <p className="text-sm text-muted-foreground">{estimatedTime}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {orderType === 'room-delivery' ? 'Out for Delivery' : 'Preparing'}
              </Badge>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total Paid</span>
                <span className="font-bold text-xl text-accent">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="café-outline" 
            className="flex-1"
            onClick={handleTrackOrder}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Track Order
          </Button>
          <Button 
            variant="café" 
            className="flex-1"
            onClick={handleGoHome}
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>

        {/* Additional Info */}
        <Card className="p-4 bg-card/50">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              📱 {orderType === 'room-delivery' 
                    ? "Our delivery person will call you when they arrive" 
                    : "We'll send you updates via SMS"}
            </p>
            <p className="text-sm text-muted-foreground">
              Need help? Call us at <span className="font-medium">+91 98765 43210</span>
            </p>
            {orderType === 'room-delivery' && deliveryDetails?.phoneNumber && (
              <p className="text-xs text-muted-foreground">
                Delivery contact: {deliveryDetails.phoneNumber}
              </p>
            )}
          </div>
        </Card>

        {/* Fun Message */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground italic">
            "Great things take time... but not too much time! ⏰"
          </p>
        </div>
      </div>
    </div>
  );
};