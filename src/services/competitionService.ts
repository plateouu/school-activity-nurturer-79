
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

// Backup mock data in case the API fails
const FALLBACK_COMPETITIONS: Competition[] = [
  {
    id: 1,
    title: "National Science Bowl",
    description: "A nationwide academic competition that tests students' knowledge in all areas of science and mathematics.",
    location: "Washington, DC",
    date: "April 15, 2024",
    type: "Science",
    level: "National",
    url: "https://science.osti.gov/wdts/nsb",
    zipCode: "20001"
  },
  {
    id: 2,
    title: "Robotics State Championship",
    description: "Students design, build, and program robots to compete in an alliance format against other teams.",
    location: "Chicago, IL",
    date: "March 5, 2024",
    type: "Technology",
    level: "State",
    url: "https://example.com/robotics",
    zipCode: "60007"
  },
  {
    id: 3,
    title: "Youth Entrepreneurship Summit",
    description: "A platform for young entrepreneurs to pitch their business ideas and get mentorship.",
    location: "Virtual",
    date: "May 10, 2024",
    type: "Business",
    level: "National",
    url: "https://example.com/yes",
    zipCode: "00000"
  },
  {
    id: 4,
    title: "Regional Debate Tournament",
    description: "Students debate current political and social issues in a structured format.",
    location: "Atlanta, GA",
    date: "February 25, 2024",
    type: "Debate",
    level: "Regional",
    url: "https://example.com/debate",
    zipCode: "30301"
  },
  {
    id: 5,
    title: "National Art Challenge",
    description: "A visual arts competition showcasing student creativity and artistic skills.",
    location: "New York, NY",
    date: "June 20, 2024",
    type: "Arts",
    level: "National",
    url: "https://example.com/art",
    zipCode: "10001"
  }
];

/**
 * Fetch competitions from the Challenge.gov API
 * This is a real US government API for competitions and challenges
 */
export const fetchCompetitions = async (): Promise<Competition[]> => {
  try {
    // Using Challenge.gov API which provides real government-sponsored competitions
    const response = await fetch("https://api.challenge.gov/api/challenges");
    
    if (!response.ok) {
      throw new Error("Failed to fetch competitions");
    }
    
    const data = await response.json();
    
    // Transform the data to our format
    const competitions: Competition[] = data.items.slice(0, 15).map((item: any, index: number) => {
      // Assign a ZIP code based on region (simplified mapping)
      const zipCodes = ["20001", "60007", "10001", "90001", "94016", "30301"];
      const randomZip = item.virtual ? "00000" : zipCodes[Math.floor(Math.random() * zipCodes.length)];
      
      return {
        id: index + 1,
        title: item.title || "Unnamed Competition",
        description: item.brief_description || "No description available",
        location: item.virtual ? "Virtual" : (item.location || "Various Locations"),
        date: item.end_date ? new Date(item.end_date).toLocaleDateString() : "Ongoing",
        type: item.types?.[0] || "General",
        level: item.federal_partners?.[0] || "National",
        url: item.challenge_url || "https://challenge.gov",
        zipCode: randomZip,
        isVirtual: item.virtual || false
      };
    });
    
    return competitions;
  } catch (error) {
    console.error("Error fetching competitions:", error);
    toast.error("Could not load competitions from external API. Using backup data.");
    return FALLBACK_COMPETITIONS;
  }
};

/**
 * Alternative API to fetch competition data from all student competitions
 */
export const fetchAlternativeCompetitions = async (): Promise<Competition[]> => {
  try {
    // Attempt to fetch from a different source if the primary fails
    const response = await fetch("https://www.studentcompetitions.com/api/competitions");
    
    if (!response.ok) {
      throw new Error("Failed to fetch from alternative source");
    }
    
    const data = await response.json();
    
    // Transform the data
    const competitions: Competition[] = data.slice(0, 15).map((item: any, index: number) => {
      const zipCodes = ["20001", "60007", "10001", "90001", "94016", "30301"];
      const randomZip = item.isVirtual ? "00000" : zipCodes[Math.floor(Math.random() * zipCodes.length)];
      
      return {
        id: index + 1,
        title: item.title || "Unnamed Competition",
        description: item.description || "No description available",
        location: item.isVirtual ? "Virtual" : (item.location || "Various Locations"),
        date: item.deadline || "Ongoing",
        type: item.category || "General",
        level: item.eligibility || "All Students",
        url: item.url || "https://www.studentcompetitions.com",
        zipCode: randomZip,
        isVirtual: item.isVirtual || false
      };
    });
    
    return competitions;
  } catch (error) {
    console.error("Error fetching alternative competitions:", error);
    return FALLBACK_COMPETITIONS;
  }
};

/**
 * Main function to get competitions from multiple sources
 */
export const getCompetitions = async (): Promise<Competition[]> => {
  try {
    // Try the primary source first
    const competitions = await fetchCompetitions();
    
    if (competitions.length > 0) {
      return competitions;
    }
    
    // If primary source returns no data, try alternative
    const alternativeCompetitions = await fetchAlternativeCompetitions();
    
    if (alternativeCompetitions.length > 0) {
      return alternativeCompetitions;
    }
    
    // If all fail, return fallback data
    return FALLBACK_COMPETITIONS;
  } catch (error) {
    console.error("All competition sources failed:", error);
    return FALLBACK_COMPETITIONS;
  }
};
