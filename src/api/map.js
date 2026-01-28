import { MAP_TOKEN } from "../utils/constants";

export const fetchSuggestions = async (query) => {
    if (!query)
        return [];
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAP_TOKEN}&limit=5&country=IN`);
    const data = await res.json();
    return data.features.map((place) => ({
        label: place.place_name,
        lat: place.center[1],
        lng: place.center[0]
    }))
}

export const fetchRoute = async ({ queryKey }) => {
    const [_key, start, end] = queryKey;
    const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&access_token=${MAP_TOKEN}`);
const data=await res.json();
return data.routes[0].geometry;
}