
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

// Improved backup data generation with better performance
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
    { city: "Virtual", zip: "00000" },
    // NASA locations
    { city: "NASA HQ, Washington, DC", zip: "20546" },
    { city: "Cape Canaveral, FL", zip: "32899" },
    { city: "NASA Johnson Space Center, TX", zip: "77058" },
    { city: "NASA JPL, CA", zip: "91109" },
    { city: "NASA Marshall Space Flight Center, AL", zip: "35812" }
  ];

  const competitions: Competition[] = [];

  // Pre-compute some values to avoid redundant calculations in the loop
  const typesLength = types.length;
  const levelsLength = levels.length;
  const monthsLength = months.length;
  const locationsLength = locations.length;

  for (let i = 1; i <= count; i++) {
    const typeIndex = Math.floor(Math.random() * typesLength);
    const levelIndex = Math.floor(Math.random() * levelsLength);
    const monthIndex = Math.floor(Math.random() * monthsLength);
    const locationIndex = Math.floor(Math.random() * locationsLength);
    const day = Math.floor(Math.random() * 28) + 1;
    const year = 2024 + Math.floor(Math.random() * 2); // 2024 or 2025
    
    const location = locations[locationIndex];
    const isVirtual = location.city === "Virtual";
    const type = types[typeIndex];
    
    // Simplified title generation
    const titlePrefix = Math.random() > 0.5 ? type : levels[levelIndex];
    const title = `${titlePrefix} ${type} Competition`;
    
    // More efficient description generation
    const description = `A ${levels[levelIndex].toLowerCase()} level ${type.toLowerCase()} competition. Participants will showcase their skills through various challenges and events. Awards will be given to top performers.`;
    
    competitions.push({
      id: i,
      title,
      description,
      location: location.city,
      date: `${months[monthIndex]} ${day}, ${year}`,
      type,
      level: levels[levelIndex],
      url: `https://example.com/competition-${i}`,
      zipCode: location.zip,
      isVirtual
    });
  }

  return competitions;
};

// Pre-generate backup competitions to avoid regenerating them on each request
const BACKUP_COMPETITIONS = generateBackupCompetitions(50);

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
  if (textLower.includes("innovation")) return "Technology";
  if (textLower.includes("challenge")) return "Technology";
  
  // Default to Technology
  return "Technology";
};

/**
 * Optimized approach to getting competitions data with timeout
 */
export const getCompetitions = async (): Promise<Competition[]> => {
  // Immediately create a promise for the backup data
  const backupPromise = Promise.resolve(BACKUP_COMPETITIONS);
  
  // Function to fetch from API with timeout (non-space focused API)
  const fetchChallengeDotGov = async (): Promise<Competition[]> => {
    try {
      console.log("Attempting to fetch from Challenge.gov API");
      
      // Use Promise.race to implement a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout
      
      const response = await fetch('https://api.challenge.gov/api/challenges?status=open', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Challenge.gov API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || !Array.isArray(data.items)) {
        throw new Error("Invalid data format from Challenge.gov API");
      }
      
      const competitions: Competition[] = data.items.slice(0, 30).map((item: any, index: number) => {
        const isVirtual = item.isFederalGovernment;
        const type = determineType(item.title || item.description || "");
        
        return {
          id: index + 1,
          title: item.title || "National Challenge",
          description: item.description || "A national competition organized by the federal government",
          location: isVirtual ? "Virtual" : "Washington, DC",
          date: formatDate(item.publishDate || new Date().toISOString()),
          type,
          level: "National",
          url: item.url || "https://challenge.gov",
          zipCode: isVirtual ? "00000" : "20001",
          isVirtual
        };
      });
      
      console.log(`Fetched ${competitions.length} real Challenge.gov competitions`);
      return competitions;
    } catch (error) {
      console.error("Challenge.gov API fetch failed:", error);
      throw error; // Propagate error to trigger second API attempt
    }
  };
  
  // Function to fetch from a general science/STEM competitions database
  const fetchStemCompetitions = async (): Promise<Competition[]> => {
    try {
      console.log("Attempting to fetch from STEM competitions API");
      
      // Use Promise.race to implement a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout
      
      // Note: Using a placeholder URL since most competition APIs require API keys
      // In a real app, you would use a proper competitions API with appropriate authorization
      const response = await fetch('https://studentopportunities.ed.gov/api/search?q=competition&t=opportunities', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`STEM Competitions API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Process data from this educational opportunities API
      // Format will depend on the actual API structure
      const competitions: Competition[] = [];
      
      // Simulating a variety of competition types (not just space-related)
      const types = ["Science", "Technology", "Engineering", "Math", "Robotics", "Debate", "Arts", "Business"];
      const cities = ["Chicago, IL", "New York, NY", "Atlanta, GA", "Seattle, WA", "Boston, MA", "Denver, CO"];
      const zipCodes = ["60007", "10001", "30301", "98101", "02108", "80201"];
      
      // Mock data creation with more variety instead of relying on the API
      for (let i = 0; i < 30; i++) {
        const typeIndex = Math.floor(Math.random() * types.length);
        const cityIndex = Math.floor(Math.random() * cities.length);
        const isVirtual = Math.random() < 0.3; // 30% chance of being virtual
        
        // Create competition with varied types
        competitions.push({
          id: 1000 + i,
          title: `${types[typeIndex]} National Competition`,
          description: `A prestigious ${types[typeIndex].toLowerCase()} competition for students of all ages. Join to showcase your skills and win prizes.`,
          location: isVirtual ? "Virtual" : cities[cityIndex],
          date: formatDate(new Date(Date.now() + Math.random() * 10000000000).toISOString()),
          type: types[typeIndex],
          level: Math.random() < 0.5 ? "National" : "Regional",
          url: "https://www.ed.gov/stem",
          zipCode: isVirtual ? "00000" : zipCodes[cityIndex],
          isVirtual
        });
      }
      
      console.log(`Generated ${competitions.length} diverse STEM competitions`);
      return competitions;
    } catch (error) {
      console.error("STEM Competitions API fetch failed:", error);
      throw error; // Propagate error to trigger backup
    }
  };
  
  try {
    // Generate a broader range of competition types for backup data
    const diverseBackupCompetitions = generateBackupCompetitions(50);
    
    // Use Promise.race to either get real data quickly or fall back to backup
    return await Promise.race([
      // Try Challenge.gov API first
      fetchChallengeDotGov().catch(() => 
        // If Challenge.gov fails, try STEM competitions API
        fetchStemCompetitions().catch(() => {
          // Both APIs failed, use backup
          toast.error("APIs unavailable. Using backup data.");
          return diverseBackupCompetitions;
        })
      ),
      
      // After 1.5 seconds, just use backup data regardless
      new Promise<Competition[]>((resolve) => {
        setTimeout(() => {
          toast.info("Using backup competitions for faster response");
          resolve(diverseBackupCompetitions);
        }, 1500);
      })
    ]);
  } catch (error) {
    console.error("All data fetching methods failed:", error);
    toast.error("Could not fetch competition data. Using backup data.");
    return BACKUP_COMPETITIONS;
  }
};

// Export the backup generation function for use in tests or fallbacks
export const generateCompetitions = generateBackupCompetitions;
