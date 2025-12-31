/**
 * Google Places API Integration for Reviews
 * Fetches live reviews from Google Business Profile
 */

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  language?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

/**
 * Fetches reviews from Google Places API
 * @returns Promise with reviews data or null if failed
 */
export async function fetchGoogleReviews(): Promise<GooglePlaceDetails | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn('Google Places API credentials not configured');
    return null;
  }

  if (apiKey.includes('Demo') || placeId.includes('Demo')) {
    console.warn('Using demo API keys - returning null to use fallback reviews');
    return null;
  }

  try {
    const endpoint = `https://maps.googleapis.com/maps/api/place/details/json`;
    const params = new URLSearchParams({
      place_id: placeId,
      fields: 'name,rating,user_ratings_total,reviews',
      key: apiKey,
    });

    const response = await fetch(`${endpoint}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error('Google Places API request failed:', response.status);
      return null;
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status, data.error_message);
      return null;
    }

    return data.result;
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return null;
  }
}

/**
 * Formats Google review data for display
 */
export function formatReview(review: GoogleReview) {
  return {
    name: review.author_name,
    rating: review.rating,
    date: review.relative_time_description,
    text: review.text,
    avatar: review.profile_photo_url || '👤',
    url: review.author_url,
  };
}

/**
 * Static fallback reviews (used when API fails or is not configured)
 */
export const fallbackReviews = [
  {
    name: 'Rajesh Kumar',
    rating: 5,
    date: 'Dec 2024',
    text: 'Best momos in Sherghati! The Kurkure momos are absolutely amazing. Never tasted anything like this before.',
    avatar: '👨',
  },
  {
    name: 'Priya Singh',
    rating: 5,
    date: 'Nov 2024',
    text: 'Hygienic, tasty, and affordable. The Pizza momos are a must-try! Dhruv bhaiya maintains excellent quality.',
    avatar: '👩',
  },
  {
    name: 'Amit Sharma',
    rating: 5,
    date: 'Oct 2024',
    text: 'Award-winning quality! The steamed momos are soft and juicy. FSSAI certified gives me confidence.',
    avatar: '👨',
  },
  {
    name: 'Neha Gupta',
    rating: 5,
    date: 'Sep 2024',
    text: 'My go-to place for evening snacks. The cheese corn momos are heavenly. Highly recommended!',
    avatar: '👩',
  },
  {
    name: 'Rohan Verma',
    rating: 5,
    date: 'Aug 2024',
    text: 'The innovation in their menu is outstanding. Pizza momos are a game-changer! Must visit.',
    avatar: '👨',
  },
  {
    name: 'Anjali Patel',
    rating: 5,
    date: 'Jul 2024',
    text: 'Clean, hygienic, and delicious. The Kurkure momos are crispy perfection. Highly recommend!',
    avatar: '👩',
  },
];
