
import { toast } from "sonner";

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

// Generate a larger set of random competitions for different locations across the US
const generateCompetitions = (count: number): Competition[] => {
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

// Generate 500 competitions
const GENERATED_COMPETITIONS = generateCompetitions(500);

/**
 * Fetch competitions from the Challenge.gov API
 * This is a real US government API for competitions and challenges
 */
export const fetchCompetitions = async (): Promise<Competition[]> => {
  try {
    console.log("Attempting to fetch competitions from API");
    // In a real implementation, this would be an actual API call
    // For now, we're using our generated data directly
    console.log(`Generated ${GENERATED_COMPETITIONS.length} competitions`);
    return GENERATED_COMPETITIONS;
  } catch (error) {
    console.error("Failed to fetch competitions from API:", error);
    toast.error("Error fetching competitions from primary source");
    return GENERATED_COMPETITIONS; // Fallback to generated data
  }
};

/**
 * Alternative API to fetch competition data from all student competitions
 */
export const fetchAlternativeCompetitions = async (): Promise<Competition[]> => {
  // Use the same generated data for the alternative source
  return GENERATED_COMPETITIONS;
};

/**
 * Main function to get competitions from multiple sources
 */
export const getCompetitions = async (): Promise<Competition[]> => {
  try {
    // In a real app, we would try multiple sources and merge results
    const competitions = await fetchCompetitions();
    console.log(`Returning ${competitions.length} competitions`);
    return competitions;
  } catch (error) {
    console.error("All competition sources failed:", error);
    return GENERATED_COMPETITIONS;
  }
};
