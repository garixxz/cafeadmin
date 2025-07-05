import React, { useState, useEffect } from 'react';
import { FoodCard } from '@/components/FoodCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { menuData, categories, dietaryTags } from '@/data/menuData';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const Menu = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDietTag, setSelectedDietTag] = useState('All');
  const [filteredItems, setFilteredItems] = useState(menuData);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = menuData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by dietary preference
    if (selectedDietTag === 'Veg') {
      filtered = filtered.filter(item => item.isVeg);
    } else if (selectedDietTag === 'Non-Veg') {
      filtered = filtered.filter(item => !item.isVeg);
    } else if (selectedDietTag === 'Popular') {
      filtered = filtered.filter(item => item.isPopular);
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, selectedDietTag]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDietTagClick = (tag: string) => {
    setSelectedDietTag(tag);
  };

  return (
    <div className="min-h-screen bg-background py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handcrafted with love, perfect for your study breaks ☕✨
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search for coffee, meals, desserts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-2xl border-border/50 focus:border-accent"
          />
        </div>

        {/* Filter Buttons */}
        <div className="space-y-4 mb-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center gap-2 mr-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Categories:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'café' : 'café-outline'}
                size="sm"
                onClick={() => handleCategoryClick(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center gap-2 mr-4">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Diet:</span>
            </div>
            {dietaryTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedDietTag === tag ? 'café-secondary' : 'outline'}
                size="sm"
                onClick={() => handleDietTagClick(tag)}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-center mb-6">
          <Badge variant="outline" className="text-sm">
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
          </Badge>
        </div>

        {/* Food Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-playfair text-2xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button
              variant="café-outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedDietTag('All');
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Popular Items Section */}
        {selectedCategory === 'All' && selectedDietTag === 'All' && !searchTerm && (
          <section className="mt-16 pt-8 border-t border-border/50">
            <h2 className="font-playfair text-3xl font-semibold text-center mb-8">
              Student Favorites 🔥
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuData
                .filter(item => item.isPopular)
                .map((item) => (
                  <FoodCard key={`popular-${item.id}`} item={item} />
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};