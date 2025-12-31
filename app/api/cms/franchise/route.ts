import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function requireAuth(request: NextRequest) {
  return true;
}

function getDataFilePath() {
  const dataDir = path.join(process.cwd(), 'data', 'cms');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, 'franchise.json');
}

function readFranchiseData() {
  const filePath = getDataFilePath();
  if (!fs.existsSync(filePath)) {
    const defaultData = {
      settings: {
        investment: {
          franchiseFee: 50000,
          kitchenSetupMin: 100000,
          kitchenSetupMax: 200000,
          initialInventory: 25000,
          marketingSupport: 15000,
        },
        royalty: {
          percentage: 5,
          fixedAmount: 0,
          calculationType: 'percentage',
        },
        support: {
          trainingDuration: 15,
          marketingAssistance: true,
          operationalSupport: true,
          qualityControl: true,
        },
        isLaunched: false,
        launchDate: '2025-06-01',
      },
      locations: [],
      applications: [],
      testimonials: [],
      documents: [],
    };
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeFranchiseData(data: any) {
  const filePath = getDataFilePath();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET(request: NextRequest) {
  try {
    if (!requireAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = readFranchiseData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching franchise data:', error);
    return NextResponse.json({ error: 'Failed to fetch franchise data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!requireAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, data: itemData } = body;

    const franchiseData = readFranchiseData();

    switch (type) {
      case 'settings':
        franchiseData.settings = { ...franchiseData.settings, ...itemData };
        break;

      case 'location':
        if (itemData.id) {
          const index = franchiseData.locations.findIndex((loc: any) => loc.id === itemData.id);
          if (index !== -1) {
            franchiseData.locations[index] = itemData;
          } else {
            franchiseData.locations.push(itemData);
          }
        } else {
          franchiseData.locations.push({ ...itemData, id: Date.now().toString() });
        }
        break;

      case 'application':
        if (itemData.id) {
          const index = franchiseData.applications.findIndex((app: any) => app.id === itemData.id);
          if (index !== -1) {
            franchiseData.applications[index] = itemData;
          } else {
            franchiseData.applications.push(itemData);
          }
        } else {
          franchiseData.applications.push({
            ...itemData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: 'new',
          });
        }
        break;

      case 'testimonial':
        if (itemData.id) {
          const index = franchiseData.testimonials.findIndex((test: any) => test.id === itemData.id);
          if (index !== -1) {
            franchiseData.testimonials[index] = itemData;
          } else {
            franchiseData.testimonials.push(itemData);
          }
        } else {
          franchiseData.testimonials.push({ ...itemData, id: Date.now().toString() });
        }
        break;

      case 'document':
        if (itemData.id) {
          const index = franchiseData.documents.findIndex((doc: any) => doc.id === itemData.id);
          if (index !== -1) {
            franchiseData.documents[index] = itemData;
          } else {
            franchiseData.documents.push(itemData);
          }
        } else {
          franchiseData.documents.push({ ...itemData, id: Date.now().toString() });
        }
        break;

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    writeFranchiseData(franchiseData);
    return NextResponse.json({ success: true, data: franchiseData });
  } catch (error) {
    console.error('Error saving franchise data:', error);
    return NextResponse.json({ error: 'Failed to save franchise data' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!requireAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: 'Type and ID are required' }, { status: 400 });
    }

    const franchiseData = readFranchiseData();

    switch (type) {
      case 'location':
        franchiseData.locations = franchiseData.locations.filter((loc: any) => loc.id !== id);
        break;

      case 'application':
        franchiseData.applications = franchiseData.applications.filter((app: any) => app.id !== id);
        break;

      case 'testimonial':
        franchiseData.testimonials = franchiseData.testimonials.filter((test: any) => test.id !== id);
        break;

      case 'document':
        franchiseData.documents = franchiseData.documents.filter((doc: any) => doc.id !== id);
        break;

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    writeFranchiseData(franchiseData);
    return NextResponse.json({ success: true, data: franchiseData });
  } catch (error) {
    console.error('Error deleting franchise data:', error);
    return NextResponse.json({ error: 'Failed to delete franchise data' }, { status: 500 });
  }
}
