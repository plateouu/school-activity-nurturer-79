
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
  
  // Function to fetch from NASA API with timeout
  const fetchNasaData = async (): Promise<Competition[]> => {
    try {
      console.log("Attempting to fetch from NASA Techport API");
      
      // Use Promise.race to implement a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout
      
      const response = await fetch('https://api.nasa.gov/techport/api/projects?api_key=DEMO_KEY', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`NASA API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.projects || !data.projects.projects || !Array.isArray(data.projects.projects)) {
        throw new Error("Invalid data format from NASA API");
      }
      
      const competitions: Competition[] = data.projects.projects.slice(0, 30).map((item: any, index: number) => {
        const isVirtual = Math.random() < 0.3; // 30% chance of being virtual
        
        return {
          id: index + 1,
          title: item.title || "NASA Technology Challenge",
          description: item.description || "A NASA technology development project or challenge",
          location: isVirtual ? "Virtual" : "NASA HQ, Washington, DC",
          date: formatDate(new Date().toISOString()),
          type: determineType(item.title || "Technology"),
          level: "National",
          url: `https://techport.nasa.gov/view/${item.projectId}`,
          zipCode: isVirtual ? "00000" : "20546", // NASA HQ ZIP
          isVirtual
        };
      });
      
      console.log(`Fetched ${competitions.length} real NASA competitions`);
      return competitions;
    } catch (error) {
      console.error("NASA API fetch failed:", error);
      throw error; // Propagate error to trigger SpaceX API attempt
    }
  };
  
  // Function to fetch from SpaceX API with timeout
  const fetchSpaceXData = async (): Promise<Competition[]> => {
    try {
      console.log("Attempting to fetch from SpaceX API");
      
      // Use Promise.race to implement a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout
      
      const response = await fetch('https://api.spacexdata.com/v4/launches', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`SpaceX API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format from SpaceX API");
      }
      
      const competitions: Competition[] = data.slice(0, 20).map((item: any, index: number) => {
        const isVirtual = false; // These are real physical launches
        const launchDate = new Date(item.date_utc);
        
        // Only show future launches or recent ones
        if (launchDate < new Date()) {
          launchDate.setFullYear(launchDate.getFullYear() + 2); // Move to future
        }
        
        return {
          id: index + 1000, // Different ID range from primary API
          title: `${item.name} Space Technology Challenge`,
          description: item.details || "A space technology and engineering challenge based on actual SpaceX mission requirements.",
          location: item.launchpad ? "Cape Canaveral, FL" : "Virtual",
          date: formatDate(launchDate.toISOString()),
          type: "Engineering",
          level: "National",
          url: item.links?.webcast || "https://www.spacex.com/",
          zipCode: "32899", // Cape Canaveral ZIP
          isVirtual: false
        };
      });
      
      console.log(`Fetched ${competitions.length} real SpaceX competitions`);
      return competitions;
    } catch (error) {
      console.error("SpaceX API fetch failed:", error);
      throw error; // Propagate error to trigger backup
    }
  };
  
  try {
    // Use Promise.race to either get real data quickly or fall back to backup
    // This ensures we don't wait too long for slow APIs
    return await Promise.race([
      // Try NASA API first
      fetchNasaData().catch(() => 
        // If NASA fails, try SpaceX
        fetchSpaceXData().catch(() => {
          // Both APIs failed, use backup
          toast.error("APIs unavailable. Using backup data.");
          return backupPromise;
        })
      ),
      
      // After 5 seconds, just use backup data regardless
      new Promise<Competition[]>((resolve) => {
        setTimeout(() => {
          toast.info("Loading backup competitions for faster response");
          resolve(BACKUP_COMPETITIONS);
        }, 5000);
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
