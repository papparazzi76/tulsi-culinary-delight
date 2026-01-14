import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Tulsi Indian Restaurant Place ID
const PLACE_ID = 'ChIJpZK6XRWRQQ0RqqqEqN0g6SY';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    
    if (!apiKey) {
      throw new Error('Google Places API key not configured');
    }

    // Use the new Places API (v1)
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount,displayName&key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Places API error:', errorText);
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('Google Places API response:', JSON.stringify(data));

    return new Response(
      JSON.stringify({
        rating: data.rating || 4.7,
        totalReviews: data.userRatingCount || 312,
        name: data.displayName?.text || 'Tulsi Indian Restaurant',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    
    // Return fallback data on error
    return new Response(
      JSON.stringify({
        rating: 4.7,
        totalReviews: 312,
        name: 'Tulsi Indian Restaurant',
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
