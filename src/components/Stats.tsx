
import { useState, useEffect, useRef } from 'react';
import { CircleUser, Building, School, Award } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  delay: number;
}

const StatItem = ({ icon, value, label, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const step = 16; // ~60fps
    
    setTimeout(() => {
      const timer = setInterval(() => {
        start += step;
        const progress = Math.min(start / duration, 1);
        setCount(Math.floor(progress * value));

        if (progress === 1) {
          clearInterval(timer);
        }
      }, step);

      return () => clearInterval(timer);
    }, delay);
  }, [inView, value, delay]);

  return (
    <div 
      ref={ref}
      className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm transition-all duration-500 hover:shadow-md"
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-clubseed-100 text-clubseed-600 mb-4">
        {icon}
      </div>
      <h3 className="text-4xl font-bold mb-2">{count}+</h3>
      <p className="text-gray-600 text-center">{label}</p>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-20 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Impact in Numbers</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Since our founding, ClubSeed has helped schools across the nation build meaningful clubs and activities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem 
            icon={<School size={32} />} 
            value={120} 
            label="Schools Supported" 
            delay={0} 
          />
          <StatItem 
            icon={<CircleUser size={32} />} 
            value={4500} 
            label="Students Reached" 
            delay={200} 
          />
          <StatItem 
            icon={<Building size={32} />} 
            value={350} 
            label="Clubs Created" 
            delay={400} 
          />
          <StatItem 
            icon={<Award size={32} />} 
            value={75} 
            label="Competition Wins" 
            delay={600} 
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
