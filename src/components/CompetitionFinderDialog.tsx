import { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Calendar, Award, ExternalLink, Globe, Loader2 } from 'lucide-react';
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
import { calculateDistance, isWithinRadius } from '@/utils/distanceUtils';
import { getCompetitions, Competition } from '@/services/competitionService';
import { toast } from "sonner";

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

const LOCATIONS = [
  "All Locations",
  "Virtual Only",
  "Within 25 miles",
  "Within 50 miles",
  "Within 100 miles",
];

const CompetitionFinderDialog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clubType, setClubType] = useState('All Types');
  const [location, setLocation] = useState('Within 50 miles');
  const [zipCode, setZipCode] = useState('');
  const [open, setOpen] = useState(false);
  const [radius, setRadius] = useState(50);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchCompetitionData = async () => {
      if (open && competitions.length === 0) {
        setLoading(true);
        try {
          const dataPromise = getCompetitions();
          const timeoutPromise = new Promise(resolve => setTimeout(resolve, 300));
          
          const data = await dataPromise;
          await timeoutPromise;
          
          if (isMounted) {
            setCompetitions(data);
          }
        } catch (error) {
          console.error("Failed to fetch competitions:", error);
          if (isMounted) {
            toast.error("Failed to load competitions. Please try again later.");
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };

    fetchCompetitionData();
    
    return () => {
      isMounted = false;
    };
  }, [open, competitions.length]);

  const competitionsWithDistance = useMemo(() => {
    return competitions.map(comp => {
      const distance = zipCode ? calculateDistance(comp.zipCode, zipCode) : -1;
      return {
        ...comp,
        distance,
        isVirtual: comp.zipCode === "00000" || comp.isVirtual
      };
    });
  }, [competitions, zipCode]);

  const filteredCompetitions = useMemo(() => {
    return competitionsWithDistance.filter(comp => {
      const matchesSearch = 
        comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = clubType === 'All Types' || comp.type === clubType;
      
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
      }
      
      return matchesSearch && matchesType && matchesLocation;
    }).sort((a, b) => {
      if (location === 'Virtual Only') {
        if (a.isVirtual && !b.isVirtual) return -1;
        if (!a.isVirtual && b.isVirtual) return 1;
      }
      
      if (a.distance >= 0 && b.distance >= 0) {
        return a.distance - b.distance;
      }
      
      return a.title.localeCompare(b.title);
    });
  }, [competitionsWithDistance, searchTerm, clubType, location, zipCode]);

  const handleLocationChange = (value: string) => {
    setLocation(value);
    
    if (value === 'Within 25 miles') {
      setRadius(25);
    } else if (value === 'Within 50 miles') {
      setRadius(50);
    } else if (value === 'Within 100 miles') {
      setRadius(100);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border border-clubseed-500 text-clubseed-600 bg-white hover:bg-clubseed-50"
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
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="zip-code"
                  type="text"
                  placeholder="Enter your ZIP code"
                  className="pl-10"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
                  maxLength={5}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter your ZIP code to find nearby competitions
              </p>
            </div>
            
            <div className="space-y-4">
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
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Distance
                </label>
                <Select onValueChange={handleLocationChange} defaultValue={location}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Distance" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map(loc => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mt-2">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 text-clubseed-500 animate-spin" />
              <span className="ml-2 text-gray-600">Loading competitions...</span>
            </div>
          ) : filteredCompetitions.length > 0 ? (
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
              <p className="text-gray-500">
                {zipCode ? 
                  "No competitions found in your area matching your criteria." :
                  "Please enter your ZIP code to find nearby competitions."
                }
              </p>
              {(zipCode || searchTerm !== '' || clubType !== 'All Types') && (
                <Button 
                  variant="link" 
                  className="mt-2 text-clubseed-500"
                  onClick={() => {
                    setSearchTerm('');
                    setClubType('All Types');
                    setLocation('Within 50 miles');
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompetitionFinderDialog;
