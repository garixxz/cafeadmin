import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock, Utensils, Truck, MapPin, Phone, Home, RefreshCcw } from 'lucide-react';

interface OrderStatus {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  active: boolean;
  estimatedTime?: string;
}

export const OrderTracking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order') || 'CF123456';
  const orderType = searchParams.get('type') || 'room-delivery';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('20-25 minutes');
  const [orderTime] = useState(new Date());

  // Order statuses based on order type
  const getOrderStatuses = (type: string): OrderStatus[] => {
    const baseStatuses = [
      {
        id: 'received',
        name: 'Order Received',
        description: 'Your order has been confirmed and payment processed',
        icon: <CheckCircle2 className="w-5 h-5" />,
        completed: false,
        active: false,
        estimatedTime: '0 min'
      },
      {
        id: 'preparing',
        name: 'Preparing Your Order',
        description: 'Our chefs are carefully preparing your items',
        icon: <Utensils className="w-5 h-5" />,
        completed: false,
        active: false,
        estimatedTime: '10-15 min'
      }
    ];

    if (type === 'room-delivery') {
      return [
        ...baseStatuses,
        {
          id: 'out-for-delivery',
          name: 'Out for Delivery',
          description: 'Your order is on its way to your room',
          icon: <Truck className="w-5 h-5" />,
          completed: false,
          active: false,
          estimatedTime: '15-20 min'
        },
        {
          id: 'delivered',
          name: 'Delivered',
          description: 'Enjoy your meal!',
          icon: <Home className="w-5 h-5" />,
          completed: false,
          active: false,
          estimatedTime: '0 min'
        }
      ];
    } else if (type === 'dine-in') {
      return [
        ...baseStatuses,
        {
          id: 'ready',
          name: 'Ready for Pickup',
          description: 'Your order is ready at the counter',
          icon: <CheckCircle2 className="w-5 h-5" />,
          completed: false,
          active: false,
          estimatedTime: '0 min'
        }
      ];
    } else {
      return [
        ...baseStatuses,
        {
          id: 'ready',
          name: 'Ready for Pickup',
          description: 'Your order is ready for takeaway',
          icon: <CheckCircle2 className="w-5 h-5" />,
          completed: false,
          active: false,
          estimatedTime: '0 min'
        }
      ];
    }
  };

  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>(getOrderStatuses(orderType));

  // Simulate real-time order progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setCurrentStep((prevStep) => {
        const nextStep = prevStep < orderStatuses.length - 1 ? prevStep + 1 : prevStep;
        
        // Update progress percentage
        const newProgress = ((nextStep + 1) / orderStatuses.length) * 100;
        setProgress(newProgress);
        
        // Update estimated time
        if (nextStep === 0) setEstimatedTime('15-20 minutes');
        else if (nextStep === 1) setEstimatedTime('10-15 minutes');
        else if (nextStep === 2) setEstimatedTime('5-8 minutes');
        else setEstimatedTime('Order Complete');
        
        return nextStep;
      });
    }, 8000); // Progress every 8 seconds for demo

    return () => clearInterval(progressInterval);
  }, [orderStatuses.length]);

  // Update order statuses based on current step
  useEffect(() => {
    setOrderStatuses(prevStatuses => 
      prevStatuses.map((status, index) => ({
        ...status,
        completed: index < currentStep,
        active: index === currentStep
      }))
    );
  }, [currentStep]);

  const handleRefresh = () => {
    // Simulate refresh - in real app this would fetch latest status
    window.location.reload();
  };

  const getDeliveryInfo = () => {
    if (orderType === 'room-delivery') {
      return {
        title: 'Delivery Address',
        details: 'Hostel A - Room 205, 2nd Floor',
        phone: '+91 98765 43210',
        icon: <MapPin className="w-4 h-4" />
      };
    } else if (orderType === 'dine-in') {
      return {
        title: 'Table Number',
        details: 'Table 5 (4 seats)',
        phone: 'Counter pickup',
        icon: <Utensils className="w-4 h-4" />
      };
    } else {
      return {
        title: 'Pickup Location',
        details: 'Café Trident Counter',
        phone: 'Self pickup',
        icon: <MapPin className="w-4 h-4" />
      };
    }
  };

  const deliveryInfo = getDeliveryInfo();

  return (
    <div className="min-h-screen bg-background py-6">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl font-bold mb-2">
            Track Your Order
          </h1>
          <Badge variant="outline" className="text-lg px-4 py-2 font-mono">
            #{orderNumber}
          </Badge>
          <p className="text-muted-foreground mt-2">
            Placed at {orderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-playfair text-xl font-semibold">Order Progress</h2>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="mb-4">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>0%</span>
              <span className="font-medium">
                {progress.toFixed(0)}% Complete
              </span>
              <span>100%</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              {estimatedTime}
            </div>
            <p className="text-sm text-muted-foreground">
              {currentStep === orderStatuses.length - 1 ? 'Order Complete!' : 'Estimated remaining time'}
            </p>
          </div>
        </Card>

        {/* Order Status Steps */}
        <Card className="p-6 mb-6">
          <h2 className="font-playfair text-xl font-semibold mb-6">Order Status</h2>
          
          <div className="space-y-4">
            {orderStatuses.map((status, index) => (
              <div
                key={status.id}
                className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 ${
                  status.active 
                    ? 'bg-accent/10 border-2 border-accent/30 animate-pulse' 
                    : status.completed 
                    ? 'bg-secondary/20' 
                    : 'bg-muted/20'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    status.completed 
                      ? 'bg-secondary text-secondary-foreground' 
                      : status.active 
                      ? 'bg-accent text-accent-foreground animate-bounce-in' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {status.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${
                      status.active ? 'text-accent' : status.completed ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {status.name}
                    </h3>
                    {status.completed && (
                      <Badge variant="secondary" className="text-xs">
                        ✓ Done
                      </Badge>
                    )}
                    {status.active && (
                      <Badge variant="default" className="text-xs animate-pulse">
                        In Progress
                      </Badge>
                    )}
                  </div>
                  <p className={`text-sm ${
                    status.active ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {status.description}
                  </p>
                  {status.estimatedTime && (
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {status.estimatedTime}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Delivery Information */}
        <Card className="p-6 mb-6">
          <h2 className="font-playfair text-xl font-semibold mb-4">{deliveryInfo.title}</h2>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              {deliveryInfo.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium mb-1">{deliveryInfo.details}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{deliveryInfo.phone}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Support */}
        <Card className="p-6 mb-6 bg-gradient-warm">
          <div className="text-center">
            <h3 className="font-playfair text-lg font-semibold mb-2">
              Need Help?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our support team is here to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="café-outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call Support
              </Button>
              <Button variant="outline" size="sm">
                Chat with Us
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="rounded-2xl"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <Button 
            variant="café" 
            onClick={() => navigate('/menu')}
            className="rounded-2xl"
          >
            Order Again
          </Button>
        </div>

        {/* Live Updates Notice */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            🔴 Live tracking • Updates automatically every few seconds
          </p>
        </div>
      </div>
    </div>
  );
};