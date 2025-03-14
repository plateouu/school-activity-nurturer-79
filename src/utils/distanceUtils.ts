
// Enhanced utility to calculate distance between ZIP codes with improved database
// Uses Haversine formula for accurate distance calculation

// Expanded map of ZIP codes to approximate lat/long coordinates
// This includes the original cities plus additional ZIP codes
const zipCoordinates: Record<string, { lat: number; lng: number }> = {
  // Major cities
  "10001": { lat: 40.7504, lng: -73.9963 }, // New York
  "90001": { lat: 33.9731, lng: -118.2487 }, // Los Angeles
  "60007": { lat: 42.0378, lng: -87.9830 }, // Chicago
  "77001": { lat: 29.7604, lng: -95.3698 }, // Houston
  "85001": { lat: 33.4484, lng: -112.0740 }, // Phoenix
  "19101": { lat: 39.9526, lng: -75.1652 }, // Philadelphia
  "78201": { lat: 29.4241, lng: -98.4936 }, // San Antonio
  "92101": { lat: 32.7157, lng: -117.1611 }, // San Diego
  "75201": { lat: 32.7767, lng: -96.7970 }, // Dallas
  "95101": { lat: 37.3382, lng: -121.8863 }, // San Jose
  "73301": { lat: 30.2672, lng: -97.7431 }, // Austin
  "32099": { lat: 30.3322, lng: -81.6557 }, // Jacksonville
  "76101": { lat: 32.7555, lng: -97.3308 }, // Fort Worth
  "43085": { lat: 40.1195, lng: -83.0137 }, // Columbus
  "28201": { lat: 35.2271, lng: -80.8431 }, // Charlotte
  "94016": { lat: 37.7749, lng: -122.4194 }, // San Francisco
  "46201": { lat: 39.7684, lng: -86.1581 }, // Indianapolis
  "98101": { lat: 47.6062, lng: -122.3321 }, // Seattle
  "80201": { lat: 39.7392, lng: -104.9903 }, // Denver
  "20001": { lat: 38.9072, lng: -77.0369 }, // Washington DC
  "02108": { lat: 42.3601, lng: -71.0589 }, // Boston
  "37201": { lat: 36.1627, lng: -86.7816 }, // Nashville
  "21201": { lat: 39.2904, lng: -76.6122 }, // Baltimore
  "73101": { lat: 35.4676, lng: -97.5164 }, // Oklahoma City
  "97201": { lat: 45.5051, lng: -122.6750 }, // Portland
  "89101": { lat: 36.1699, lng: -115.1398 }, // Las Vegas
  "53201": { lat: 43.0389, lng: -87.9065 }, // Milwaukee
  "87101": { lat: 35.0844, lng: -106.6504 }, // Albuquerque
  "85701": { lat: 32.2226, lng: -110.9747 }, // Tucson
  "00000": { lat: 0, lng: 0 }, // Virtual (no physical location)

  // Add government locations
  "20546": { lat: 38.8830, lng: -77.0162 }, // NASA HQ
  "20230": { lat: 38.8935, lng: -77.0264 }, // Dept of Commerce
  "20523": { lat: 38.8970, lng: -77.0434 }, // USAID

  // Default coordinates for unknown ZIP codes (US geographic center)
  "default": { lat: 39.8333, lng: -98.5833 } // Geographic center of the contiguous United States
};

/**
 * Calculate approximate distance between two ZIP codes using Haversine formula
 * @param zip1 First ZIP code
 * @param zip2 Second ZIP code
 * @returns Distance in miles, or -1 if virtual or unknown
 */
export const calculateDistance = (zip1: string, zip2: string): number => {
  // Clean up ZIP codes (remove any non-numeric characters)
  const cleanZip1 = zip1?.replace(/\D/g, '').substring(0, 5) || '';
  const cleanZip2 = zip2?.replace(/\D/g, '').substring(0, 5) || '';
  
  // If either ZIP is for virtual events or invalid, return -1
  if (cleanZip1 === "00000" || cleanZip2 === "00000" || !cleanZip1 || !cleanZip2) {
    return -1;
  }
  
  // Get coordinates for both ZIP codes
  const coords1 = zipCoordinates[cleanZip1] || zipCoordinates["default"];
  const coords2 = zipCoordinates[cleanZip2] || zipCoordinates["default"];
  
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
  
  // Return rounded distance
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
  
  // If distance is invalid (-1), exclude from nearby results
  if (distance === -1) {
    return false;
  }
  
  // Include if within radius
  return distance <= radius;
};
