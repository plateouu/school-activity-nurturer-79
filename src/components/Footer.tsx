
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-clubseed-500 flex items-center justify-center">
                <span className="font-bold text-white text-xl">CS</span>
              </div>
              <span className="font-montserrat font-bold text-xl">ClubSeed</span>
            </div>
            <p className="text-gray-600 mb-4">
              Empowering underfunded schools with resources and mentorship to create meaningful activities and clubs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-clubseed-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-clubseed-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-clubseed-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-clubseed-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-clubseed-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-clubseed-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-clubseed-500 transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-clubseed-500 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-clubseed-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/resources/club-starter" className="text-gray-600 hover:text-clubseed-500 transition-colors">Club Starter Kit</Link>
              </li>
              <li>
                <Link to="/resources/competition-finder" className="text-gray-600 hover:text-clubseed-500 transition-colors">Competition Finder</Link>
              </li>
              <li>
                <Link to="/resources/roadmap" className="text-gray-600 hover:text-clubseed-500 transition-colors">Club Roadmap</Link>
              </li>
              <li>
                <Link to="/resources/funding" className="text-gray-600 hover:text-clubseed-500 transition-colors">Funding Guide</Link>
              </li>
              <li>
                <Link to="/resources/mentor-network" className="text-gray-600 hover:text-clubseed-500 transition-colors">Mentor Network</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-clubseed-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">123 Education Lane, Learning City, LC 10001</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-clubseed-500" />
                <a href="mailto:info@clubseed.org" className="text-gray-600 hover:text-clubseed-500 transition-colors">info@clubseed.org</a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-clubseed-500" />
                <a href="tel:+15551234567" className="text-gray-600 hover:text-clubseed-500 transition-colors">(555) 123-4567</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="py-8 my-8 border-t border-b border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="font-semibold text-xl mb-2">Stay Connected</h4>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest updates, resources, and success stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-clubseed-500 focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-2 bg-clubseed-500 text-white rounded-lg hover:bg-clubseed-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} ClubSeed. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-clubseed-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-clubseed-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
