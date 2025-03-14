
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-clubseed-50" ref={heroRef}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-clubseed-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-clubseed-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-spin-slow animation-delay-2000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="font-montserrat font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-6 bg-gradient-to-r from-clubseed-700 to-clubseed-500 bg-clip-text text-transparent">
            Growing possibilities through school clubs
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Empowering underfunded schools with resources and mentorship to create meaningful activities and clubs for all students.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/resources">
              <Button className="bg-clubseed-500 hover:bg-clubseed-600 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-clubseed-100/50 hover:shadow-xl hover:shadow-clubseed-200/50 transition-all duration-300 transform hover:-translate-y-1">
                Start a Club
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="bg-white border-2 border-clubseed-500 text-clubseed-600 px-8 py-6 text-lg rounded-lg hover:bg-clubseed-50 transition-all duration-300">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={scrollToContent}
        >
          <ChevronDown className="w-10 h-10 text-clubseed-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
