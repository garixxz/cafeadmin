import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Users, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Table {
  id: string;
  number: number;
  seats: number;
  status: 'available' | 'occupied' | 'reserved';
  availableAt?: string;
  position: { x: number; y: number };
}

const mockTables: Table[] = [
  { id: '1', number: 1, seats: 2, status: 'available', position: { x: 20, y: 20 } },
  { id: '2', number: 2, seats: 2, status: 'occupied', position: { x: 60, y: 20 } },
  { id: '3', number: 3, seats: 4, status: 'available', position: { x: 20, y: 50 } },
  { id: '4', number: 4, seats: 4, status: 'reserved', availableAt: '2:30 PM', position: { x: 60, y: 50 } },
  { id: '5', number: 5, seats: 6, status: 'available', position: { x: 40, y: 80 } },
  { id: '6', number: 6, seats: 2, status: 'available', position: { x: 80, y: 20 } },
  { id: '7', number: 7, seats: 4, status: 'available', position: { x: 80, y: 50 } },
  { id: '8', number: 8, seats: 2, status: 'occupied', position: { x: 20, y: 80 } },
];

export const TableBooking = () => {
  const navigate = useNavigate();
  const { items, total, itemCount } = useCart();
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [seatFilter, setSeatFilter] = useState<number | 'all'>('all');

  const handleTableSelect = (table: Table) => {
    if (table.status === 'available') {
      setSelectedTable(table);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedTable) {
      navigate('/checkout', { 
        state: { 
          orderType: 'dine-in', 
          tableNumber: selectedTable.number,
          tableSeats: selectedTable.seats
        } 
      });
    }
  };

  const filteredTables = mockTables.filter(table => 
    seatFilter === 'all' || table.seats === seatFilter
  );

  const availableTables = filteredTables.filter(table => table.status === 'available');

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-4">
            Choose Your Table
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a perfect spot for your dining experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table Map */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-96 lg:h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-playfair text-xl font-semibold">Live Table Map</h2>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 text-sm">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span>Selected</span>
                  </div>
                </div>
              </div>

              {/* Seat Filter */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={seatFilter === 'all' ? 'café' : 'outline'}
                  size="sm"
                  onClick={() => setSeatFilter('all')}
                >
                  All Tables
                </Button>
                <Button
                  variant={seatFilter === 2 ? 'café' : 'outline'}
                  size="sm"
                  onClick={() => setSeatFilter(2)}
                >
                  2-Seater
                </Button>
                <Button
                  variant={seatFilter === 4 ? 'café' : 'outline'}
                  size="sm"
                  onClick={() => setSeatFilter(4)}
                >
                  4-Seater
                </Button>
                <Button
                  variant={seatFilter === 6 ? 'café' : 'outline'}
                  size="sm"
                  onClick={() => setSeatFilter(6)}
                >
                  6-Seater
                </Button>
              </div>

              {/* Table Layout */}
              <div className="relative bg-gradient-warm rounded-2xl h-64 lg:h-80 overflow-hidden">
                <div className="absolute inset-4">
                  {filteredTables.map((table) => (
                    <div
                      key={table.id}
                      className={cn(
                        "absolute w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 text-white font-semibold text-sm border-2",
                        {
                          'table-available hover:scale-110': table.status === 'available',
                          'table-occupied': table.status === 'occupied',
                          'table-selected': selectedTable?.id === table.id,
                          'bg-muted border-muted-foreground': table.status === 'reserved'
                        }
                      )}
                      style={{
                        left: `${table.position.x}%`,
                        top: `${table.position.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => handleTableSelect(table)}
                    >
                      {table.number}
                    </div>
                  ))}
                  
                  {/* Café Elements */}
                  <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded">
                    Counter
                  </div>
                  <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded">
                    Window
                  </div>
                  <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded">
                    Entrance
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Panel */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="p-6">
              <h3 className="font-playfair text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Table Selection */}
            <Card className="p-6">
              <h3 className="font-playfair text-lg font-semibold mb-4">Table Selection</h3>
              
              {selectedTable ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-2xl border border-accent/20">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                    <div>
                      <p className="font-semibold">Table {selectedTable.number}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedTable.seats} seats • Available now
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="café" 
                    className="w-full" 
                    size="lg"
                    onClick={handleConfirmBooking}
                  >
                    Confirm Booking
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground mb-2">No table selected</p>
                  <p className="text-sm text-muted-foreground">
                    Tap on an available table above
                  </p>
                </div>
              )}
            </Card>

            {/* Available Tables List */}
            <Card className="p-6">
              <h3 className="font-playfair text-lg font-semibold mb-4">
                Available Tables ({availableTables.length})
              </h3>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availableTables.map((table) => (
                  <div
                    key={table.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors",
                      selectedTable?.id === table.id 
                        ? "bg-accent/20 border border-accent/30" 
                        : "bg-secondary/10 hover:bg-secondary/20"
                    )}
                    onClick={() => handleTableSelect(table)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-sm font-semibold">
                        {table.number}
                      </div>
                      <div>
                        <p className="font-medium">Table {table.number}</p>
                        <p className="text-xs text-muted-foreground">
                          {table.seats} seats
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Available
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Back Button */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/order-type')}
            >
              Back to Order Type
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};