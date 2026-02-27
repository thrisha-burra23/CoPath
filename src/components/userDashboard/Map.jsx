import { useRoute } from "@/src/reactQuery/MapHooks";
import { MAP_TOKEN } from "@/src/utils/constants";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = MAP_TOKEN;

const Map = ({ searchData }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef=useRef([]);

  const{data:route}=useRoute(searchData);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.4867, 17.385],
      zoom: 10,
    });
    return () => mapRef.current?.remove();
  }, []);

  useEffect(() => {
  if (!searchData || !mapRef.current || !route) return;

  const { startLocation, endLocation } = searchData;

  // clear old markers
  markersRef.current.forEach((marker) => marker.remove());
  markersRef.current = [];

  // clear old route
  if (mapRef.current.getLayer("route-layer")) {
    mapRef.current.removeLayer("route-layer");
  }
  if (mapRef.current.getSource("route")) {
    mapRef.current.removeSource("route");
  }

  // add markers
  const startMarker = new mapboxgl.Marker({ color: "green" })
    .setLngLat([startLocation.lng, startLocation.lat])
    .addTo(mapRef.current);

  const endMarker = new mapboxgl.Marker({ color: "red" })
    .setLngLat([endLocation.lng, endLocation.lat])
    .addTo(mapRef.current);

  markersRef.current.push(startMarker, endMarker);

  // add route
  mapRef.current.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: route,
    },
  });

  mapRef.current.addLayer({
    id: "route-layer",
    type: "line",
    source: "route",
    paint: {
      "line-color": "#2563eb",
      "line-width": 5,
    },
  });

  // 🔥 FIT MAP TO ROUTE
  const bounds = new mapboxgl.LngLatBounds();
  route.coordinates.forEach((coord) => bounds.extend(coord));

  mapRef.current.fitBounds(bounds, {
    padding: 80,
    duration: 1000,
  });
}, [searchData, route]);


  return (
    <div
  className="h-100 w-full rounded-lg border flex items-center justify-center text-muted-foreground"
  ref={mapContainerRef}
/>

  );
};

export default Map;
