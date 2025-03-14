
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { MenuIcon, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Resources', href: '/resources' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <RouterLink 
            to="/" 
            className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
          >
            <div className="h-10 w-10 rounded-lg bg-clubseed-500 flex items-center justify-center">
              <span className="font-bold text-white text-xl">CS</span>
            </div>
            <span className="font-montserrat font-bold text-xl">ClubSeed</span>
          </RouterLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <RouterLink 
                key={link.name}
                to={link.href}
                className={cn(
                  "font-medium transition-all duration-300 border-b-2",
                  location.pathname === link.href 
                    ? "border-clubseed-500 text-clubseed-700" 
                    : "border-transparent hover:border-clubseed-300"
                )}
              >
                {link.name}
              </RouterLink>
            ))}
            <RouterLink 
              to="/login" 
              className="text-clubseed-500 font-medium border-2 border-clubseed-500 rounded-lg px-4 py-2 transition-all duration-300 hover:bg-clubseed-50"
            >
              Log In
            </RouterLink>
            <RouterLink 
              to="/join" 
              className="bg-clubseed-500 text-white font-medium rounded-lg px-4 py-2 transition-all duration-300 hover:bg-clubseed-600 hover:shadow-md"
            >
              Join Us
            </RouterLink>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-clubseed-500 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden fixed inset-0 transform transition-transform duration-300 ease-in-out filter z-50",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col bg-white h-full overflow-y-auto pb-12 shadow-xl">
            <div className="px-6 pt-6">
              <div className="flex items-center justify-between">
                <RouterLink to="/" className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-lg bg-clubseed-500 flex items-center justify-center">
                    <span className="font-bold text-white text-xl">CS</span>
                  </div>
                  <span className="font-montserrat font-bold text-xl">ClubSeed</span>
                </RouterLink>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-clubseed-500 focus:outline-none"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="mt-6 px-6 space-y-4">
              {navLinks.map((link) => (
                <RouterLink
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "block py-3 px-4 text-base font-medium rounded-lg transition-all duration-200",
                    location.pathname === link.href
                      ? "bg-clubseed-50 text-clubseed-700" 
                      : "hover:bg-gray-50"
                  )}
                >
                  {link.name}
                </RouterLink>
              ))}
              <div className="pt-4 space-y-3">
                <RouterLink 
                  to="/login" 
                  className="block w-full text-center text-clubseed-500 font-medium border-2 border-clubseed-500 rounded-lg px-4 py-2"
                >
                  Log In
                </RouterLink>
                <RouterLink 
                  to="/join" 
                  className="block w-full text-center bg-clubseed-500 text-white font-medium rounded-lg px-4 py-2"
                >
                  Join Us
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
