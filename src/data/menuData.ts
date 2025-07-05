import { FoodItem } from '@/contexts/CartContext';
import latteArt from '@/assets/latte-art.jpg';
import sandwich from '@/assets/sandwich.jpg';
import croissant from '@/assets/croissant.jpg';

export const menuData: FoodItem[] = [
  {
    id: '1',
    name: 'Artisan Latte',
    price: 120,
    image: latteArt,
    category: 'Coffee',
    description: 'Rich espresso with perfectly steamed milk and beautiful latte art',
    isVeg: true,
    isPopular: true,
    tags: ['Hot', 'Caffeine', 'Creamy']
  },
  {
    id: '2',
    name: 'Gourmet Avocado Sandwich',
    price: 180,
    image: sandwich,
    category: 'Meals',
    description: 'Fresh avocado with tomatoes, lettuce on artisan sourdough bread',
    isVeg: true,
    isPopular: false,
    tags: ['Healthy', 'Fresh', 'Filling']
  },
  {
    id: '3',
    name: 'Chocolate Croissant',
    price: 85,
    image: croissant,
    category: 'Desserts',
    description: 'Buttery, flaky pastry filled with rich dark chocolate',
    isVeg: true,
    isPopular: true,
    tags: ['Sweet', 'Pastry', 'Indulgent']
  },
  {
    id: '4',
    name: 'Cappuccino',
    price: 100,
    image: latteArt,
    category: 'Coffee',
    description: 'Classic Italian coffee with equal parts espresso, steamed milk, and foam',
    isVeg: true,
    isPopular: true,
    tags: ['Hot', 'Classic', 'Strong']
  },
  {
    id: '5',
    name: 'Club Sandwich',
    price: 220,
    image: sandwich,
    category: 'Meals',
    description: 'Triple-layered sandwich with chicken, bacon, lettuce, and tomato',
    isVeg: false,
    isPopular: false,
    tags: ['Protein', 'Filling', 'Classic']
  },
  {
    id: '6',
    name: 'Blueberry Muffin',
    price: 95,
    image: croissant,
    category: 'Desserts',
    description: 'Freshly baked muffin bursting with juicy blueberries',
    isVeg: true,
    isPopular: false,
    tags: ['Sweet', 'Fresh', 'Breakfast']
  },
  {
    id: '7',
    name: 'Iced Americano',
    price: 90,
    image: latteArt,
    category: 'Coffee',
    description: 'Bold espresso shots over ice with cold water',
    isVeg: true,
    isPopular: false,
    tags: ['Cold', 'Strong', 'Refreshing']
  },
  {
    id: '8',
    name: 'Caesar Salad',
    price: 160,
    image: sandwich,
    category: 'Meals',
    description: 'Crisp romaine lettuce with parmesan, croutons, and caesar dressing',
    isVeg: true,
    isPopular: false,
    tags: ['Healthy', 'Light', 'Fresh']
  }
];

export const categories = ['All', 'Coffee', 'Meals', 'Desserts', 'Snacks'];
export const dietaryTags = ['All', 'Veg', 'Non-Veg', 'Popular'];