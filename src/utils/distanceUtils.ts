
// Simple utility to calculate distance between ZIP codes
// This is a simplified version - in a real app, we would use a geocoding API

// Map of ZIP codes to approximate lat/long coordinates for our sample data
const zipCoordinates: Record<string, { lat: number; lng: number }> = {
  "20001": { lat: 38.9072, lng: -77.0369 }, // Washington DC
  "60007": { lat: 42.0378, lng: -87.9830 }, // Chicago area
  "00000": { lat: 0, lng: 0 }, // Virtual (no physical location)
  "30301": { lat: 33.7490, lng: -84.3880 }, // Atlanta
  "10001": { lat: 40.7504, lng: -73.9963 }, // New York
  "90001": { lat: 33.9731, lng: -118.2487 }, // Los Angeles
  "94016": { lat: 37.7542, lng: -122.4530 } // San Francisco area
};

/**
 * Calculate approximate distance between two ZIP codes using Haversine formula
 * @param zip1 First ZIP code
 * @param zip2 Second ZIP code
 * @returns Distance in miles, or -1 if virtual or unknown
 */
export const calculateDistance = (zip1: string, zip2: string): number => {
  // If either ZIP is for virtual events, return -1
  if (zip1 === "00000" || zip2 === "00000") {
    return -1;
  }
  
  // Get coordinates for both ZIP codes
  const coords1 = zipCoordinates[zip1];
  const coords2 = zipCoordinates[zip2];
  
  // If we don't have coordinates for either ZIP, return a large number
  if (!coords1 || !coords2) {
    return 9999; // Unknown distance
  }
  
  // Calculate distance using Haversine formula
  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLng = toRad(coords2.lng - coords1.lng);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return Math.round(distance);
};

// Convert degrees to radians
const toRad = (degrees: number): number => {
  return degrees * Math.PI / 180;
};

/**
 * Check if a competition is within the specified radius of a ZIP code
 * @param compZip Competition ZIP code
 * @param userZip User ZIP code
 * @param radius Radius in miles
 * @returns Boolean indicating if within radius, or true for virtual events
 */
export const isWithinRadius = (compZip: string, userZip: string, radius: number): boolean => {
  // Virtual events are always included
  if (compZip === "00000") {
    return true;
  }
  
  const distance = calculateDistance(compZip, userZip);
  
  // Include if within radius or if distance calculation failed but we want to show it anyway
  return distance <= radius || distance === 9999;
};
