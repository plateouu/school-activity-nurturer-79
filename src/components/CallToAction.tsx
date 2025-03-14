
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-24 bg-clubseed-500 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-clubseed-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-clubseed-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Club Journey?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Join ClubSeed today and get access to resources, mentorship, and funding opportunities to help your school create meaningful activities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/join" 
              className="px-8 py-4 bg-white text-clubseed-600 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/resources" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/10"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
