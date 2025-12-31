import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filtersFilePath = path.join(process.cwd(), 'data', 'menu-filters.json');

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const defaultFilters = {
  priceRange: {
    min: 0,
    max: 250,
    step: 10,
  },
  categories: [
    { id: 'steamed', name: 'Steamed Perfection', enabled: true },
    { id: 'fried', name: 'Crispy Fried Delights', enabled: true },
    { id: 'kurkure', name: 'Magic Signatures', enabled: true },
    { id: 'pizza', name: 'Fusion Innovations', enabled: true },
    { id: 'combo', name: 'Combo Platters', enabled: true },
  ],
  spiceLevels: [
    { id: 'mild', name: 'Mild', emoji: '😊', enabled: true },
    { id: 'medium', name: 'Medium', emoji: '🌶️', enabled: true },
    { id: 'hot', name: 'Hot', emoji: '🔥', enabled: true },
    { id: 'extra-magic', name: 'Extra Magic', emoji: '✨', enabled: true },
  ],
  fillingTypes: [
    { id: 'veg', name: 'Veg', emoji: '🌱', enabled: true },
    { id: 'paneer', name: 'Paneer', emoji: '🧀', enabled: true },
    { id: 'soya', name: 'Soya', emoji: '💪', enabled: true },
    { id: 'cheese-corn', name: 'Cheese Corn', emoji: '🌽', enabled: true },
  ],
};

if (!fs.existsSync(filtersFilePath)) {
  fs.writeFileSync(filtersFilePath, JSON.stringify(defaultFilters, null, 2));
}

export async function GET() {
  try {
    const data = fs.readFileSync(filtersFilePath, 'utf-8');
    const filters = JSON.parse(data);
    return NextResponse.json(filters);
  } catch (error) {
    console.error('Error reading filter settings:', error);
    return NextResponse.json(defaultFilters);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    fs.writeFileSync(filtersFilePath, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true, message: 'Filter settings updated successfully' });
  } catch (error) {
    console.error('Error saving filter settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save filter settings' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    fs.writeFileSync(filtersFilePath, JSON.stringify(defaultFilters, null, 2));
    return NextResponse.json({ success: true, message: 'Filter settings reset to default' });
  } catch (error) {
    console.error('Error resetting filter settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset filter settings' },
      { status: 500 }
    );
  }
}
