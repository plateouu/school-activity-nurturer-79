import { toast } from "sonner";
import { calculateDistance } from "@/utils/distanceUtils";

export interface Competition {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  type: string;
  level: string;
  url: string;
  zipCode: string;
  isVirtual?: boolean;
  distance?: number;
}

// Backup data in case the API fails
const generateBackupCompetitions = (count: number): Competition[] => {
  const types = ["Science", "Technology", "Engineering", "Math", "Robotics", "Debate", "Arts", "Business", "Music", "Sports", "Literature", "History"];
  const levels = ["National", "Regional", "State", "Local"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Real zip codes for major US cities
  const locations = [
    { city: "New York, NY", zip: "10001" },
    { city: "Los Angeles, CA", zip: "90001" },
    { city: "Chicago, IL", zip: "60007" },
    { city: "Houston, TX", zip: "77001" },
    { city: "Phoenix, AZ", zip: "85001" },
    { city: "Philadelphia, PA", zip: "19101" },
    { city: "San Antonio, TX", zip: "78201" },
    { city: "San Diego, CA", zip: "92101" },
    { city: "Dallas, TX", zip: "75201" },
    { city: "San Jose, CA", zip: "95101" },
    { city: "Austin, TX", zip: "73301" },
    { city: "Jacksonville, FL", zip: "32099" },
    { city: "Fort Worth, TX", zip: "76101" },
    { city: "Columbus, OH", zip: "43085" },
    { city: "Charlotte, NC", zip: "28201" },
    { city: "San Francisco, CA", zip: "94016" },
    { city: "Indianapolis, IN", zip: "46201" },
    { city: "Seattle, WA", zip: "98101" },
    { city: "Denver, CO", zip: "80201" },
    { city: "Washington, DC", zip: "20001" },
    { city: "Boston, MA", zip: "02108" },
    { city: "Nashville, TN", zip: "37201" },
    { city: "Baltimore, MD", zip: "21201" },
    { city: "Oklahoma City, OK", zip: "73101" },
    { city: "Portland, OR", zip: "97201" },
    { city: "Las Vegas, NV", zip: "89101" },
    { city: "Milwaukee, WI", zip: "53201" },
    { city: "Albuquerque, NM", zip: "87101" },
    { city: "Tucson, AZ", zip: "85701" },
    { city: "Virtual", zip: "00000" }
  ];

  const competitions: Competition[] = [];

  for (let i = 1; i <= count; i++) {
    const typeIndex = Math.floor(Math.random() * types.length);
    const levelIndex = Math.floor(Math.random() * levels.length);
    const monthIndex = Math.floor(Math.random() * months.length);
    const locationIndex = Math.floor(Math.random() * locations.length);
    const day = Math.floor(Math.random() * 28) + 1;
    const year = 2024 + Math.floor(Math.random() * 2); // 2024 or 2025
    
    const location = locations[locationIndex];
    const isVirtual = location.city === "Virtual";
    const type = types[typeIndex];
    
    // Create more descriptive and realistic competition titles
    const titlePrefixes = ["National", "Annual", "Regional", "State", "International", type];
    const titlePrefix = titlePrefixes[Math.floor(Math.random() * titlePrefixes.length)];
    
    const titleSuffixes = ["Competition", "Challenge", "Tournament", "Olympiad", "Championship", "Contest", "Exhibition", "Summit"];
    const titleSuffix = titleSuffixes[Math.floor(Math.random() * titleSuffixes.length)];
    
    const title = `${titlePrefix} ${type} ${titleSuffix}`;
    
    // More detailed descriptions
    const descriptionParts = [
      `A ${levels[levelIndex].toLowerCase()} level ${type.toLowerCase()} competition designed for students of all ages.`,
      `Participants will showcase their skills in ${type.toLowerCase()} through various challenges and events.`,
      `Awards and prizes will be given to top performers.`,
      `Great opportunity for networking and learning from experts in the field.`
    ];
    
    const description = descriptionParts.join(' ');
    
    competitions.push({
      id: i,
      title,
      description,
      location: location.city,
      date: `${months[monthIndex]} ${day}, ${year}`,
      type,
      level: levels[levelIndex],
      url: `https://example.com/${type.toLowerCase()}-competition-${i}`,
      zipCode: location.zip,
      isVirtual
    });
  }

  return competitions;
};

// Generate 50 competitions as backup
const BACKUP_COMPETITIONS = generateBackupCompetitions(50);

/**
 * Fetch competitions from the Challenge.gov API
 * This uses a real government API for competitions and challenges
 */
export const fetchCompetitions = async (): Promise<Competition[]> => {
  try {
    console.log("Fetching competitions from Challenge.gov API");
    
    // NASA Competitions API - provides real competitions and challenges
    const response = await fetch('https://api.nasa.gov/challenges/v1/api?api_key=DEMO_KEY');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("NASA API response:", data);
    
    // Map the API response to our Competition interface
    const competitions: Competition[] = data.results.map((item: any, index: number) => {
      // Extract location and ZIP code if available
      const locationInfo = extractLocation(item.description || "");
      
      return {
        id: index + 1,
        title: item.title || "NASA Challenge",
        description: item.description || "A NASA challenge or competition",
        location: locationInfo.location || "United States",
        date: formatDate(item.pubDate || new Date().toISOString()),
        type: item.category?.[0] || "Science",
        level: "National",
        url: item.link || "https://www.nasa.gov/solve/",
        zipCode: locationInfo.zipCode || "20546", // NASA HQ ZIP
        isVirtual: item.isVirtual || locationInfo.isVirtual || false
      };
    });
    
    console.log(`Fetched ${competitions.length} real competitions`);
    return competitions;
  } catch (error) {
    console.error("Failed to fetch competitions from NASA API:", error);
    toast.error("Error fetching competitions. Using backup data.");
    return BACKUP_COMPETITIONS;
  }
};

// Helper function to try extracting location and ZIP code from description
const extractLocation = (description: string): { location: string; zipCode: string; isVirtual: boolean } => {
  // Default values
  let location = "United States";
  let zipCode = "20546"; // NASA HQ ZIP
  let isVirtual = false;
  
  // Check if virtual
  if (description.toLowerCase().includes("virtual") || 
      description.toLowerCase().includes("online") ||
      description.toLowerCase().includes("remote")) {
    isVirtual = true;
    location = "Virtual";
    zipCode = "00000";
    return { location, zipCode, isVirtual };
  }
  
  // Try to find ZIP code in the text
  const zipMatch = description.match(/\b\d{5}(?:-\d{4})?\b/);
  if (zipMatch) {
    zipCode = zipMatch[0].substring(0, 5);
  }
  
  // Common city-state formats
  const cityStateMatch = description.match(/([A-Za-z\s.]+),\s*([A-Z]{2})/);
  if (cityStateMatch) {
    location = `${cityStateMatch[1].trim()}, ${cityStateMatch[2]}`;
  }
  
  return { location, zipCode, isVirtual };
};

// Format date to be more readable
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  } catch (e) {
    return "Upcoming";
  }
};

/**
 * Alternative API to fetch competition data from the Challenge.gov API
 */
export const fetchAlternativeCompetitions = async (): Promise<Competition[]> => {
  try {
    console.log("Fetching from Challenge.gov API");
    
    // Challenge.gov - another source of real competitions
    const response = await fetch('https://challenge.gov/api/challenges');
    
    if (!response.ok) {
      throw new Error(`Challenge.gov API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Challenge.gov API response:", data);
    
    // Map the API response to our Competition interface
    const competitions: Competition[] = data.items.map((item: any, index: number) => {
      const locationInfo = extractLocation(item.description || "");
      
      return {
        id: index + 1000, // Different ID range from primary API
        title: item.title || "Government Challenge",
        description: item.brief_description || item.description || "A government challenge or competition",
        location: locationInfo.location || "United States",
        date: formatDate(item.submission_period_end || new Date().toISOString()),
        type: determineType(item.challenge_type || item.title || ""),
        level: "National",
        url: item.challenge_url || "https://challenge.gov",
        zipCode: locationInfo.zipCode || "20230", // Dept of Commerce ZIP
        isVirtual: locationInfo.isVirtual
      };
    });
    
    console.log(`Fetched ${competitions.length} real competitions from Challenge.gov`);
    return competitions;
  } catch (error) {
    console.error("Failed to fetch from Challenge.gov API:", error);
    return []; // Empty array if this secondary source fails
  }
};

// Helper to determine competition type from text
const determineType = (text: string): string => {
  const textLower = text.toLowerCase();
  
  if (textLower.includes("science")) return "Science";
  if (textLower.includes("tech")) return "Technology";
  if (textLower.includes("engineer")) return "Engineering";
  if (textLower.includes("math")) return "Math";
  if (textLower.includes("robot")) return "Robotics";
  if (textLower.includes("debate")) return "Debate";
  if (textLower.includes("art")) return "Arts";
  if (textLower.includes("business")) return "Business";
  if (textLower.includes("music")) return "Music";
  if (textLower.includes("sport")) return "Sports";
  if (textLower.includes("literature")) return "Literature";
  if (textLower.includes("history")) return "History";
  
  return "Science"; // Default
};

/**
 * Main function to get competitions from multiple sources
 */
export const getCompetitions = async (): Promise<Competition[]> => {
  try {
    // Try primary source first
    const primaryCompetitions = await fetchCompetitions();
    
    // If primary source returned very few results, try secondary source
    if (primaryCompetitions.length < 10 && primaryCompetitions !== BACKUP_COMPETITIONS) {
      const secondaryCompetitions = await fetchAlternativeCompetitions();
      
      // Combine unique competitions from both sources
      const allCompetitions = [...primaryCompetitions];
      
      // Add secondary competitions that don't duplicate titles
      secondaryCompetitions.forEach(comp => {
        if (!primaryCompetitions.some(p => p.title === comp.title)) {
          allCompetitions.push(comp);
        }
      });
      
      console.log(`Returning ${allCompetitions.length} combined competitions`);
      return allCompetitions;
    }
    
    console.log(`Returning ${primaryCompetitions.length} competitions from primary source`);
    return primaryCompetitions;
  } catch (error) {
    console.error("All competition sources failed:", error);
    toast.error("Could not fetch competition data. Using backup data.");
    return BACKUP_COMPETITIONS;
  }
};

// Export the backup generation function for use in tests or fallbacks
export const generateCompetitions = generateBackupCompetitions;
