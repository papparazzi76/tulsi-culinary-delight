import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Tulsi Indian Restaurant - Place ID from Google Reviews URL
const PLACE_ID = 'ChIJrW7lvmsTRw0RJGckrtY-Ycc';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    
    if (!apiKey) {
      throw new Error('Google Places API key not configured');
    }

    console.log('Fetching details for place_id:', PLACE_ID);

    // Get the place details with rating using the legacy Places API
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total&key=${apiKey}`;
    
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();
    
    console.log('Place details response:', JSON.stringify(detailsData));

    if (detailsData.status !== 'OK') {
      throw new Error(`Place details error: ${detailsData.status}`);
    }

    const result = detailsData.result;
    
    return new Response(
      JSON.stringify({
        rating: result.rating || 4.7,
        totalReviews: result.user_ratings_total || 312,
        name: result.name || 'Tulsi Indian Restaurant',
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
