import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    
    if (!apiKey) {
      throw new Error('Google Places API key not configured');
    }

    // First, search for the place by name to get the correct place_id
    const searchQuery = 'Tulsi Indian Restaurant Valladolid Spain';
    const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(searchQuery)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
    
    console.log('Searching for place:', searchQuery);
    
    const searchResponse = await fetch(findPlaceUrl);
    const searchData = await searchResponse.json();
    
    console.log('Find place response:', JSON.stringify(searchData));
    
    if (searchData.status !== 'OK' || !searchData.candidates || searchData.candidates.length === 0) {
      throw new Error(`Place not found: ${searchData.status}`);
    }
    
    const placeId = searchData.candidates[0].place_id;
    console.log('Found place_id:', placeId);

    // Now get the place details with rating
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total&key=${apiKey}`;
    
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
