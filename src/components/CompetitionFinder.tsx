import { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Award, ExternalLink, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calculateDistance, isWithinRadius } from '@/utils/distanceUtils';

// Mock data for competitions
const COMPETITIONS = [
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
  },
  {
    id: 6,
    title: "Local Science Fair",
    description: "Elementary and middle school students present their science projects and innovations.",
    location: "Los Angeles, CA",
    date: "May 5, 2024",
    type: "Science",
    level: "Local",
    url: "https://example.com/sciencefair",
    zipCode: "90001"
  },
  {
    id: 7,
    title: "Coding Competition",
    description: "High school students compete to solve programming challenges in a limited time.",
    location: "San Francisco, CA",
    date: "April 30, 2024",
    type: "Technology",
    level: "Regional",
    url: "https://example.com/coding",
    zipCode: "94016"
  }
];

// Club types for filtering
const CLUB_TYPES = [
  "All Types",
  "Science",
  "Technology",
  "Engineering",
  "Math",
  "Robotics",
  "Debate",
  "Arts",
  "Business",
  "Music",
  "Sports"
];

// Locations for filtering
const LOCATIONS = [
  "All Locations",
  "Virtual Only",
  "Within 25 miles",
  "Within 50 miles",
  "Within 100 miles",
  "National",
  "Regional",
  "State",
  "Local"
];

const CompetitionFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clubType, setClubType] = useState('All Types');
  const [location, setLocation] = useState('All Locations');
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(50); // Default radius of 50 miles
  
  // Calculate distances for competitions based on user's ZIP
  const competitionsWithDistance = useMemo(() => {
    return COMPETITIONS.map(comp => {
      const distance = zipCode ? calculateDistance(comp.zipCode, zipCode) : -1;
      return {
        ...comp,
        distance,
        isVirtual: comp.zipCode === "00000"
      };
    });
  }, [zipCode]);
  
  // Filter competitions based on search, club type, location, and distance
  const filteredCompetitions = useMemo(() => {
    return competitionsWithDistance.filter(comp => {
      // Text search filter
      const matchesSearch = 
        comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Club type filter
      const matchesType = clubType === 'All Types' || comp.type === clubType;
      
      // Location and proximity filter
      let matchesLocation = false;
      
      if (location === 'All Locations') {
        matchesLocation = true;
      } else if (location === 'Virtual Only') {
        matchesLocation = comp.isVirtual;
      } else if (location === 'Within 25 miles') {
        matchesLocation = zipCode ? isWithinRadius(comp.zipCode, zipCode, 25) : false;
      } else if (location === 'Within 50 miles') {
        matchesLocation = zipCode ? isWithinRadius(comp.zipCode, zipCode, 50) : false;
      } else if (location === 'Within 100 miles') {
        matchesLocation = zipCode ? isWithinRadius(comp.zipCode, zipCode, 100) : false;
      } else {
        matchesLocation = comp.level === location;
      }
      
      return matchesSearch && matchesType && matchesLocation;
    }).sort((a, b) => {
      // Always put virtual events at the top if filtering for virtual
      if (location === 'Virtual Only') {
        if (a.isVirtual && !b.isVirtual) return -1;
        if (!a.isVirtual && b.isVirtual) return 1;
      }
      
      // Sort by distance if we have valid distances
      if (a.distance >= 0 && b.distance >= 0) {
        return a.distance - b.distance;
      }
      
      // Otherwise, sort alphabetically by title
      return a.title.localeCompare(b.title);
    });
  }, [competitionsWithDistance, searchTerm, clubType, location, zipCode]);

  // Auto-update radius based on location selection
  const handleLocationChange = (value: string) => {
    setLocation(value);
    
    // Update radius based on location selection
    if (value === 'Within 25 miles') {
      setRadius(25);
    } else if (value === 'Within 50 miles') {
      setRadius(50);
    } else if (value === 'Within 100 miles') {
      setRadius(100);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Find Competitions for Your Club</h3>
        <p className="text-gray-600 mb-6">
          Discover competitions and events relevant to your club's interests and location.
        </p>
        
        {/* Search and filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search competitions..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select onValueChange={setClubType} defaultValue={clubType}>
            <SelectTrigger>
              <SelectValue placeholder="Club Type" />
            </SelectTrigger>
            <SelectContent>
              {CLUB_TYPES.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select onValueChange={handleLocationChange} defaultValue={location}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Enter your ZIP code for local results"
              className="pl-10"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
              maxLength={5}
            />
          </div>
        </div>
      </div>
      
      {/* Competition list */}
      <div className="space-y-6">
        {filteredCompetitions.length > 0 ? (
          filteredCompetitions.map(competition => (
            <Card key={competition.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{competition.title}</CardTitle>
                    <CardDescription className="mt-1 flex items-center flex-wrap gap-y-1">
                      <span className="flex items-center mr-3">
                        {competition.isVirtual ? (
                          <Globe className="h-4 w-4 mr-1 text-gray-400" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        )}
                        {competition.location}
                        {competition.distance > 0 && !competition.isVirtual && (
                          <span className="ml-1 text-clubseed-600 font-medium">
                            ({competition.distance} mi)
                          </span>
                        )}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {competition.date}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge className="bg-clubseed-100 text-clubseed-700 hover:bg-clubseed-200">
                    {competition.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{competition.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Badge variant="outline" className="flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  {competition.level} Level
                </Badge>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <a href={competition.url} target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No competitions found matching your criteria.</p>
            <Button 
              variant="link" 
              className="mt-2 text-clubseed-500"
              onClick={() => {
                setSearchTerm('');
                setClubType('All Types');
                setLocation('All Locations');
                setZipCode('');
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionFinder;
