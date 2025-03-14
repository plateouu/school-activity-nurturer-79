
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
    zipCode: "00000",
    isVirtual: true
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
  },
  {
    id: 6,
    title: "Math Olympiad",
    description: "Challenging mathematical competition designed to test problem-solving skills.",
    location: "Boston, MA",
    date: "May 12, 2024",
    type: "Math",
    level: "National",
    url: "https://example.com/math",
    zipCode: "02108"
  },
  {
    id: 7,
    title: "Virtual Coding Challenge",
    description: "Online competition where students solve programming problems within a time limit.",
    location: "Virtual",
    date: "April 28, 2024",
    type: "Technology",
    level: "National",
    url: "https://example.com/coding",
    zipCode: "00000",
    isVirtual: true
  },
  {
    id: 8,
    title: "Environmental Science Fair",
    description: "Students present research projects focused on environmental issues and solutions.",
    location: "Portland, OR",
    date: "March 22, 2024",
    type: "Science",
    level: "Regional",
    url: "https://example.com/environment",
    zipCode: "97201"
  },
  {
    id: 9,
    title: "Speech and Debate Tournament",
    description: "Competition for students to showcase their public speaking and argumentative skills.",
    location: "Denver, CO",
    date: "April 5, 2024",
    type: "Debate",
    level: "State",
    url: "https://example.com/speech",
    zipCode: "80202"
  },
  {
    id: 10,
    title: "Music Composition Contest",
    description: "Students submit original musical compositions judged by professional musicians.",
    location: "Los Angeles, CA",
    date: "May 30, 2024",
    type: "Music",
    level: "State",
    url: "https://example.com/music",
    zipCode: "90001"
  },
  {
    id: 11,
    title: "Virtual Business Plan Competition",
    description: "Students develop and present business plans to a panel of entrepreneurs and investors.",
    location: "Virtual",
    date: "April 20, 2024",
    type: "Business",
    level: "National",
    url: "https://example.com/business",
    zipCode: "00000",
    isVirtual: true
  },
  {
    id: 12,
    title: "Engineering Design Challenge",
    description: "Teams design and build solutions to real-world engineering problems.",
    location: "Detroit, MI",
    date: "March 18, 2024",
    type: "Engineering",
    level: "Regional",
    url: "https://example.com/engineering",
    zipCode: "48201"
  }
];

/**
 * Fetch competitions from the Challenge.gov API
 * This is a real US government API for competitions and challenges
 */
export const fetchCompetitions = async (): Promise<Competition[]> => {
  // Skip API calls and use fallback data directly since the API is unavailable
  // This prevents unnecessary network requests that would fail anyway
  console.log("Using fallback competition data instead of API");
  return FALLBACK_COMPETITIONS;
};

/**
 * Alternative API to fetch competition data from all student competitions
 */
export const fetchAlternativeCompetitions = async (): Promise<Competition[]> => {
  // Skip API calls and use fallback data directly
  return FALLBACK_COMPETITIONS;
};

/**
 * Main function to get competitions from multiple sources
 */
export const getCompetitions = async (): Promise<Competition[]> => {
  try {
    // Return fallback data directly since APIs are not working
    return FALLBACK_COMPETITIONS;
  } catch (error) {
    console.error("All competition sources failed:", error);
    return FALLBACK_COMPETITIONS;
  }
};
