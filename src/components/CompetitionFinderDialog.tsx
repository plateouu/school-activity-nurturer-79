
import { useState } from 'react';
import { Search, MapPin, Calendar, Award, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";

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

const CompetitionFinderDialog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clubType, setClubType] = useState('All Types');
  const [zipCode, setZipCode] = useState('');
  const [open, setOpen] = useState(false);
  
  // Filter competitions based on search and filters
  const filteredCompetitions = COMPETITIONS.filter(comp => {
    const matchesSearch = 
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = clubType === 'All Types' || comp.type === clubType;
    const matchesZipCode = !zipCode || comp.zipCode.startsWith(zipCode);
    
    return matchesSearch && matchesType && matchesZipCode;
  });
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-clubseed-500 hover:bg-clubseed-600 text-white border-none"
        >
          Find Competitions Nearby
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Find Competitions for Your Club</DialogTitle>
          <DialogDescription>
            Discover competitions and events relevant to your club's interests in your area.
          </DialogDescription>
        </DialogHeader>
        
        {/* Search and filters */}
        <div className="grid grid-cols-1 gap-4 my-4">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <Input
                id="zip-code"
                type="text"
                placeholder="Enter your ZIP code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
                maxLength={5}
              />
            </div>
            
            <div>
              <label htmlFor="club-type" className="block text-sm font-medium text-gray-700 mb-1">
                Club Type
              </label>
              <Select onValueChange={setClubType} defaultValue={clubType}>
                <SelectTrigger id="club-type">
                  <SelectValue placeholder="Club Type" />
                </SelectTrigger>
                <SelectContent>
                  {CLUB_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Competition list */}
        <div className="space-y-4 mt-2">
          {filteredCompetitions.length > 0 ? (
            filteredCompetitions.map(competition => (
              <Card key={competition.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{competition.title}</CardTitle>
                      <CardDescription className="mt-1 flex items-center flex-wrap">
                        <span className="flex items-center mr-3">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {competition.location}
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
                  <p className="text-gray-600 text-sm">{competition.description}</p>
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
                  setZipCode('');
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompetitionFinderDialog;
