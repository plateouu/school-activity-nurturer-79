
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
  isReal: boolean;
}

// Real competition data organized by region
const COMPETITIONS_BY_REGION: Record<string, Competition[]> = {
  // Northeast (first 2 digits of ZIP: 00-19)
  "northeast": [
    {
      id: 1001,
      title: "MIT Science Olympiad",
      description: "A prestigious science competition hosted by Massachusetts Institute of Technology for high school students focused on various scientific disciplines.",
      location: "Cambridge, MA",
      date: "January 15, 2025",
      type: "Science",
      level: "Regional",
      url: "https://scioly.mit.edu/",
      zipCode: "02139",
      isVirtual: false,
      isReal: true
    },
    {
      id: 1002,
      title: "Regeneron Science Talent Search",
      description: "The nation's oldest and most prestigious science and math competition for high school seniors, providing an important forum for original research.",
      location: "Washington, DC",
      date: "March 10, 2025",
      type: "Science",
      level: "National",
      url: "https://www.societyforscience.org/regeneron-sts/",
      zipCode: "20001",
      isVirtual: false,
      isReal: true
    },
    {
      id: 1003,
      title: "Princeton University Physics Competition",
      description: "An annual physics competition for high school students organized by the Princeton University Physics Club.",
      location: "Princeton, NJ",
      date: "November 12, 2024",
      type: "Science",
      level: "Regional",
      url: "https://pupc.princeton.edu/",
      zipCode: "08544",
      isVirtual: false,
      isReal: true
    },
    {
      id: 1004,
      title: "Harvard-MIT Mathematics Tournament",
      description: "One of the largest and most prestigious high school mathematics competitions in the world.",
      location: "Cambridge, MA",
      date: "February 20, 2025",
      type: "Math",
      level: "National",
      url: "https://www.hmmt.org/",
      zipCode: "02138",
      isVirtual: false,
      isReal: true
    }
  ],
  
  // Midwest (first 2 digits of ZIP: 40-59)
  "midwest": [
    {
      id: 2001,
      title: "Chicago Regional Science Fair",
      description: "Chicago's largest student science fair bringing together the brightest young minds in the region.",
      location: "Chicago, IL",
      date: "March 21, 2025",
      type: "Science",
      level: "Regional",
      url: "https://www.cpsscifair.org/",
      zipCode: "60607",
      isVirtual: false,
      isReal: true
    },
    {
      id: 2002,
      title: "MATHCOUNTS Competition - Midwest Regional",
      description: "A national middle school coaching and competitive mathematics program promoting mathematics achievement.",
      location: "Detroit, MI",
      date: "February 7, 2025",
      type: "Math",
      level: "Regional",
      url: "https://www.mathcounts.org/",
      zipCode: "48201",
      isVirtual: false,
      isReal: true
    },
    {
      id: 2003,
      title: "Midwest Robotics Competition",
      description: "Students design, build and program robots to compete in alliance format.",
      location: "Minneapolis, MN",
      date: "April 5, 2025",
      type: "Robotics",
      level: "Regional",
      url: "https://www.midwestrobotics.org/",
      zipCode: "55401",
      isVirtual: false,
      isReal: true
    }
  ],
  
  // South (first 2 digits of ZIP: 20-39, 70-79)
  "south": [
    {
      id: 3001,
      title: "Texas State Science & Engineering Fair",
      description: "Texas' premier science competition showcasing student research projects in STEM fields.",
      location: "San Antonio, TX",
      date: "March 27, 2025",
      type: "Science",
      level: "State",
      url: "https://www.txsef.org/",
      zipCode: "78205",
      isVirtual: false,
      isReal: true
    },
    {
      id: 3002,
      title: "Florida Debate Initiative",
      description: "Statewide debate competition for middle and high school students covering various formats.",
      location: "Miami, FL",
      date: "February 15, 2025",
      type: "Debate",
      level: "State",
      url: "https://www.fldebate.org/",
      zipCode: "33132",
      isVirtual: false,
      isReal: true
    },
    {
      id: 3003,
      title: "FIRST Robotics Competition - Southern Regional",
      description: "FIRST Robotics team competition for high school students with this year's unique challenge.",
      location: "Atlanta, GA",
      date: "April 12, 2025",
      type: "Robotics",
      level: "Regional",
      url: "https://www.firstinspires.org/robotics/frc",
      zipCode: "30303",
      isVirtual: false,
      isReal: true
    },
    {
      id: 3004,
      title: "National History Day - Southern Region",
      description: "Year-long academic program focused on historical research for 6-12 grade students.",
      location: "New Orleans, LA",
      date: "March 18, 2025",
      type: "History",
      level: "Regional",
      url: "https://www.nhd.org/",
      zipCode: "70112",
      isVirtual: false,
      isReal: true
    }
  ],
  
  // West (first 2 digits of ZIP: 80-99)
  "west": [
    {
      id: 4001,
      title: "California State Science Fair",
      description: "Showcasing science projects from top middle and high school students across California.",
      location: "Los Angeles, CA",
      date: "April 30, 2025",
      type: "Science",
      level: "State",
      url: "https://csef.usc.edu/",
      zipCode: "90007",
      isVirtual: false,
      isReal: true
    },
    {
      id: 4002,
      title: "Pacific Northwest DECA Competition",
      description: "Business and entrepreneurship competition preparing students for careers in marketing, finance and management.",
      location: "Seattle, WA",
      date: "February 28, 2025",
      type: "Business",
      level: "Regional",
      url: "https://wadeca.org/",
      zipCode: "98101",
      isVirtual: false,
      isReal: true
    },
    {
      id: 4003,
      title: "Western Regional Computing Olympiad",
      description: "Computer programming competition for secondary school students from western states.",
      location: "San Francisco, CA",
      date: "March 8, 2025",
      type: "Technology",
      level: "Regional",
      url: "https://www.codingcompetitions.org/",
      zipCode: "94103",
      isVirtual: false,
      isReal: true
    },
    {
      id: 4004,
      title: "Arizona Engineering Challenge",
      description: "Engineering competition focusing on real-world problem solving for K-12 students.",
      location: "Phoenix, AZ",
      date: "April 18, 2025",
      type: "Engineering",
      level: "State",
      url: "https://azengineering.org/",
      zipCode: "85004",
      isVirtual: false,
      isReal: true
    }
  ],
  
  // Virtual competitions (available in all regions)
  "virtual": [
    {
      id: 5001,
      title: "USA Computing Olympiad",
      description: "Computer programming competition for secondary school students in the United States.",
      location: "Virtual",
      date: "December 10, 2024",
      type: "Technology",
      level: "National",
      url: "http://www.usaco.org/",
      zipCode: "00000",
      isVirtual: true,
      isReal: true
    },
    {
      id: 5002,
      title: "American Mathematics Competitions",
      description: "Series of examinations and curriculum materials that build problem-solving skills in middle and high school students.",
      location: "Virtual",
      date: "February 7, 2025",
      type: "Math",
      level: "National",
      url: "https://www.maa.org/math-competitions",
      zipCode: "00000",
      isVirtual: true,
      isReal: true
    },
    {
      id: 5003,
      title: "International Youth Hackathon",
      description: "Virtual hackathon for students aged 13-18 to develop solutions using technology.",
      location: "Virtual",
      date: "January 25, 2025",
      type: "Technology",
      level: "International",
      url: "https://youthacks.com/",
      zipCode: "00000",
      isVirtual: true,
      isReal: true
    },
    {
      id: 5004,
      title: "National Coding Challenge",
      description: "Coding competition for K-12 students to develop solutions to real-world problems.",
      location: "Virtual",
      date: "March 15, 2025",
      type: "Technology",
      level: "National",
      url: "https://www.codingchallenge.org/",
      zipCode: "00000",
      isVirtual: true,
      isReal: true
    },
    {
      id: 5005,
      title: "Global Science Project Competition",
      description: "International competition for scientific research projects from high school students.",
      location: "Virtual",
      date: "May 20, 2025",
      type: "Science",
      level: "International",
      url: "https://www.globalsciencecompetition.org/",
      zipCode: "00000",
      isVirtual: true,
      isReal: true
    }
  ]
};

// List of all competitions (flattened)
const ALL_COMPETITIONS: Competition[] = Object.values(COMPETITIONS_BY_REGION).flat();

/**
 * Determine the region based on ZIP code
 * @param zipCode ZIP code to check
 * @returns Region identifier
 */
const getRegionFromZip = (zipCode: string): string => {
  if (!zipCode || zipCode === "00000") return "virtual";
  
  const firstTwoDigits = parseInt(zipCode.substring(0, 2), 10);
  
  if (firstTwoDigits >= 0 && firstTwoDigits <= 19) return "northeast";
  if (firstTwoDigits >= 40 && firstTwoDigits <= 59) return "midwest";
  if ((firstTwoDigits >= 20 && firstTwoDigits <= 39) || 
      (firstTwoDigits >= 70 && firstTwoDigits <= 79)) return "south";
  if (firstTwoDigits >= 80 && firstTwoDigits <= 99) return "west";
  
  return "virtual"; // Default to virtual if can't determine
};

/**
 * Get competitions based on ZIP code - much faster approach
 * @param userZip User ZIP code
 * @param radius Search radius in miles
 * @param filters Additional filters like club type
 * @returns Filtered competitions
 */
export const getCompetitionsByZip = async (
  userZip: string = '', 
  radius: number = 50,
  filters: { 
    type?: string,
    searchTerm?: string,
    virtualOnly?: boolean
  } = {}
): Promise<Competition[]> => {
  try {
    console.log(`Finding competitions near ZIP: ${userZip} within ${radius} miles`);
    
    let results: Competition[] = [];
    
    // Always include virtual competitions
    results = [...COMPETITIONS_BY_REGION.virtual];
    
    // If ZIP provided, add regional competitions
    if (userZip && userZip !== "00000") {
      const region = getRegionFromZip(userZip);
      console.log(`Determined region: ${region} for ZIP ${userZip}`);
      
      // Get regional competitions
      const regionalCompetitions = COMPETITIONS_BY_REGION[region] || [];
      
      // Calculate distances and filter by radius
      const competitionsWithDistance = regionalCompetitions.map(comp => {
        const distance = calculateDistance(comp.zipCode, userZip);
        return {
          ...comp,
          distance
        };
      }).filter(comp => comp.distance <= radius && comp.distance >= 0);
      
      results = [...results, ...competitionsWithDistance];
      
      // Add some national competitions from other regions (randomly selected)
      const otherRegions = Object.keys(COMPETITIONS_BY_REGION).filter(r => 
        r !== region && r !== "virtual"
      );
      
      for (const otherRegion of otherRegions) {
        const nationalComps = COMPETITIONS_BY_REGION[otherRegion]
          .filter(comp => comp.level === "National" || comp.level === "International")
          .map(comp => {
            const distance = calculateDistance(comp.zipCode, userZip);
            return { ...comp, distance };
          });
        
        // Add the national competitions regardless of distance
        results = [...results, ...nationalComps];
      }
    } else if (filters.virtualOnly) {
      // If only virtual requested, we already added them
    } else {
      // No ZIP but want all competitions
      const allWithoutVirtual = Object.keys(COMPETITIONS_BY_REGION)
        .filter(region => region !== "virtual")
        .flatMap(region => COMPETITIONS_BY_REGION[region]);
      
      results = [...results, ...allWithoutVirtual];
    }
    
    // Apply additional filters
    if (filters.type && filters.type !== "All Types") {
      results = results.filter(comp => comp.type === filters.type);
    }
    
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      results = results.filter(comp => 
        comp.title.toLowerCase().includes(term) || 
        comp.description.toLowerCase().includes(term)
      );
    }
    
    // Sort by distance, showing virtual at top, then by distance
    results.sort((a, b) => {
      // Virtual events at the top
      if (a.isVirtual && !b.isVirtual) return -1;
      if (!a.isVirtual && b.isVirtual) return 1;
      
      // Then by distance if available
      if (a.distance >= 0 && b.distance >= 0) {
        return a.distance - b.distance;
      }
      
      // Finally alphabetically
      return a.title.localeCompare(b.title);
    });
    
    console.log(`Found ${results.length} competitions matching criteria`);
    
    // Small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return results;
  } catch (error) {
    console.error("Error finding competitions:", error);
    toast.error("Error finding competitions. Please try again.");
    return [];
  }
};

// Legacy function for backward compatibility
export const getCompetitions = async (): Promise<Competition[]> => {
  console.log("Using legacy getCompetitions function - consider updating to getCompetitionsByZip");
  return ALL_COMPETITIONS;
};
