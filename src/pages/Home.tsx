import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Coffee, Utensils, Package, ShoppingBag } from 'lucide-react';
import heroCafe from '@/assets/hero-cafe.jpg';
export const Home = () => {
  const navigate = useNavigate();
  const quickAccessTiles = [{
    icon: Coffee,
    label: 'Coffee',
    category: 'Coffee',
    color: 'bg-gradient-coffee'
  }, {
    icon: Utensils,
    label: 'Meals',
    category: 'Meals',
    color: 'bg-gradient-warm'
  }, {
    icon: Package,
    label: 'Snacks',
    category: 'Snacks',
    color: 'bg-gradient-accent'
  }];
  const studentPerks = ["Buy 1 Get 1 on Mondays ☕", "Student Discount: 10% off with ID 🎓", "Free WiFi & Study Space 📚", "Group Study Discounts Available 👥"];
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${heroCafe})`,
        filter: 'brightness(0.7)'
      }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-float">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Fuel Your Study Breaks
              <br />
              <span className="bg-clip-text bg-gradient-to-r from-rose-milk to-accent-purple text-purple-50">
                at Café Trident
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Where great coffee meets perfect study vibes ☕ 
            <br />
            Your campus café designed for Gen Z
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" onClick={() => navigate('/menu')} className="animate-bounce-in">
              Browse Menu 🍽️
            </Button>
            <Button variant="café-outline" size="xl" className="border-/30 text-zinc-50 bg-[#000a0e]/25">
              Today's Offers ✨
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Tiles */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-center mb-12">
            What's your craving today?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickAccessTiles.map((tile, index) => <Card key={tile.label} className="food-card cursor-pointer group overflow-hidden h-48" onClick={() => navigate(`/menu?category=${tile.category}`)}>
                <div className={`${tile.color} h-full flex flex-col items-center justify-center text-foreground transition-all duration-300 group-hover:scale-105`}>
                  <tile.icon className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform text-primary" />
                  <h3 className="font-playfair text-2xl font-semibold text-primary">{tile.label}</h3>
                  <p className="text-sm opacity-80 mt-2 text-muted-foreground">Tap to explore</p>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Student Perks Section */}
      <section className="py-16 px-4 bg-gradient-warm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-8 text-foreground">
            Student Perks & Offers 🎓
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {studentPerks.map((perk, index) => <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border border-border/50">
                <p className="text-lg font-medium text-foreground">{perk}</p>
              </Card>)}
          </div>
          
          <Badge variant="outline" className="text-lg px-6 py-2 bg-accent/10 text-accent border-accent/30">
            Updated Weekly - Follow us for more! 📱
          </Badge>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-8">
            What Students Are Saying 💬
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
            name: "Alex M.",
            review: "Perfect study spot! Great coffee and vibes ☕",
            rating: "⭐⭐⭐⭐⭐"
          }, {
            name: "Priya S.",
            review: "Love the student discounts and free WiFi 📶",
            rating: "⭐⭐⭐⭐⭐"
          }, {
            name: "Josh K.",
            review: "Best sandwiches on campus, hands down! 🥪",
            rating: "⭐⭐⭐⭐⭐"
          }].map((testimonial, index) => <Card key={index} className="p-6 food-card">
                <p className="text-lg mb-4">"{testimonial.review}"</p>
                <div className="text-accent text-xl mb-2">{testimonial.rating}</div>
                <p className="font-semibold text-muted-foreground">- {testimonial.name}</p>
              </Card>)}
          </div>
        </div>
      </section>
    </div>;
};