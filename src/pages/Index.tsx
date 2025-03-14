import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import CallToAction from '@/components/CallToAction';
import CompetitionFinderDialog from '@/components/CompetitionFinderDialog';
import { Link } from 'react-router-dom';
import { Activity, Award, BookOpen, Users, ChevronRight, Zap, Target, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Animation for elements as they enter viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.reveal').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Mission Section */}
      <section className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              ClubSeed is dedicated to bridging the opportunity gap in underfunded schools by providing resources, mentorship, and support to create meaningful extracurricular activities.
            </p>
            <p className="text-gray-600 mb-8">
              We believe that every student deserves access to enriching clubs and activities that foster growth, creativity, and community—regardless of their school's financial resources.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button variant="outline" className="flex items-center border-clubseed-500 text-clubseed-600 hover:bg-clubseed-50">
                  Learn About Our Story
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <CompetitionFinderDialog />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 reveal">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Activity className="h-8 w-8 text-clubseed-500 mb-2" />
                <CardTitle className="text-xl">Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We connect schools with experienced mentors who guide and support club development.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <BookOpen className="h-8 w-8 text-clubseed-500 mb-2" />
                <CardTitle className="text-xl">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Free access to templates, guides, and tools for successful club management.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Award className="h-8 w-8 text-clubseed-500 mb-2" />
                <CardTitle className="text-xl">Competitions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We help clubs find and prepare for competitions relevant to their interests.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Users className="h-8 w-8 text-clubseed-500 mb-2" />
                <CardTitle className="text-xl">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Building a network of educators and students who support each other.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Stats />
      
      {/* Featured Tools */}
      <section className="section bg-clubseed-50">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Tools for Club Success</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ClubSeed provides interactive tools designed to help schools start and sustain successful clubs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 reveal">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-clubseed-100 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-clubseed-600" />
              </div>
              <CardTitle>Club Starter Kit</CardTitle>
              <CardDescription>Generate a customized guide for your club</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our interactive tool helps you generate a step-by-step guide, including necessary resources, funding strategies, and mentorship opportunities.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/resources/club-starter">
                <Button variant="outline" className="text-clubseed-500 hover:bg-clubseed-50">
                  Generate Your Kit
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 reveal">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-clubseed-100 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-clubseed-600" />
              </div>
              <CardTitle>Club Roadmap</CardTitle>
              <CardDescription>Visualize and track your club's journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                A customizable visual timeline that helps you track milestones, set goals, and measure progress for your club throughout the year.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/resources/roadmap">
                <Button variant="outline" className="text-clubseed-500 hover:bg-clubseed-50">
                  Create Roadmap
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 reveal">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-clubseed-100 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-clubseed-600" />
              </div>
              <CardTitle>Competition Finder</CardTitle>
              <CardDescription>Discover events relevant to your club</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our location-responsive search tool helps you find local and national competitions tailored to your club's interests and goals.
              </p>
            </CardContent>
            <CardFooter>
              <CompetitionFinderDialog />
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <CallToAction />
    </div>
  );
};

export default Index;
