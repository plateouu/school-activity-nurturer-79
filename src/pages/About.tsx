
import { useEffect } from 'react';
import { Mail, Calendar, Award, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
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
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-clubseed-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h1 className="font-bold text-4xl md:text-5xl mb-6">Our Story</h1>
              <p className="text-xl text-gray-600 mb-8">
                Founded in 2020, ClubSeed emerged from a simple observation: students at underfunded schools were missing out on the transformative power of extracurricular activities.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                What began as a small initiative to support five local schools has grown into a nationwide movement, connecting resources, mentors, and opportunities to students who need them most.
              </p>
              <div className="flex space-x-4">
                <Link to="/join">
                  <Button className="bg-clubseed-500 hover:bg-clubseed-600">Join Our Mission</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-clubseed-500 text-clubseed-600 hover:bg-clubseed-50">Contact Us</Button>
                </Link>
              </div>
            </div>
            
            <div className="relative reveal">
              <div className="absolute -z-10 top-0 left-0 w-full h-full bg-clubseed-100 rounded-lg transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Students collaborating on a project" 
                className="rounded-lg shadow-lg object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Values</h2>
            <p className="text-lg text-gray-600">
              At the heart of ClubSeed is a commitment to educational equity. We believe that meaningful extracurricular activities should be accessible to all students, regardless of their school's resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 reveal">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To empower underfunded schools with the resources, mentorship, and support needed to create and sustain meaningful clubs and activities that enrich student lives and open doors to future opportunities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-clubseed-100 text-clubseed-600 mr-3 mt-0.5">1</span>
                  <span>Bridge the opportunity gap in extracurricular activities</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-clubseed-100 text-clubseed-600 mr-3 mt-0.5">2</span>
                  <span>Provide resources that schools can use immediately</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-clubseed-100 text-clubseed-600 mr-3 mt-0.5">3</span>
                  <span>Connect students with mentors and opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-clubseed-100 text-clubseed-600 mr-3 mt-0.5">4</span>
                  <span>Create sustainable programs that thrive long-term</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-clubseed-100 text-clubseed-600 mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-2">Excellence</h4>
                  <p className="text-sm text-gray-600">Striving for high quality in everything we provide</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-clubseed-100 text-clubseed-600 mb-4">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-2">Compassion</h4>
                  <p className="text-sm text-gray-600">Leading with empathy and understanding</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-clubseed-100 text-clubseed-600 mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-2">Consistency</h4>
                  <p className="text-sm text-gray-600">Building long-term, sustainable solutions</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-clubseed-100 text-clubseed-600 mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-2">Collaboration</h4>
                  <p className="text-sm text-gray-600">Working together to achieve greater impact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              The passionate individuals behind ClubSeed bring diverse expertise in education, nonprofit management, and youth development.
            </p>
          </div>
          
          <Tabs defaultValue="leadership" className="w-full reveal">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="advisors">Advisors</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
            </TabsList>
            
            <TabsContent value="leadership" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Alex Morgan",
                    role: "Founder & Executive Director",
                    bio: "Former teacher with 10+ years experience in education policy and nonprofit leadership.",
                    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  },
                  {
                    name: "Jamie Reynolds",
                    role: "Director of Programs",
                    bio: "Passionate about creating equitable educational opportunities for all students.",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  },
                  {
                    name: "Taylor Washington",
                    role: "Partnerships Director",
                    bio: "Brings expertise in building strategic partnerships between schools and community organizations.",
                    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  }
                ].map((person, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-16 w-16 mr-4">
                          <AvatarImage src={person.image} alt={person.name} />
                          <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-lg">{person.name}</h4>
                          <p className="text-clubseed-500">{person.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{person.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="advisors" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Dr. Robin Chen",
                    role: "Education Policy Advisor",
                    bio: "Professor of Education with research focus on extracurricular impact on student outcomes.",
                    image: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  },
                  {
                    name: "Michael Stevens",
                    role: "Nonprofit Strategy Advisor",
                    bio: "25+ years experience scaling educational nonprofits and measuring impact.",
                    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  },
                  {
                    name: "Sophia Martinez",
                    role: "Youth Development Advisor",
                    bio: "Specializes in creating effective mentorship programs for underserved communities.",
                    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  }
                ].map((person, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-16 w-16 mr-4">
                          <AvatarImage src={person.image} alt={person.name} />
                          <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-lg">{person.name}</h4>
                          <p className="text-clubseed-500">{person.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{person.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="staff" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Jordan Lee",
                    role: "Program Manager",
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  },
                  {
                    name: "Casey Williams",
                    role: "Outreach Coordinator",
                    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  },
                  {
                    name: "Riley Johnson",
                    role: "Resource Specialist",
                    image: "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  },
                  {
                    name: "Avery Thompson",
                    role: "School Liaison",
                    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  },
                  {
                    name: "Quinn Rodriguez",
                    role: "Mentor Coordinator",
                    image: "https://images.unsplash.com/photo-1554727242-741c14fa561c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  },
                  {
                    name: "Sasha Patel",
                    role: "Communications Specialist",
                    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  },
                  {
                    name: "Elliot Kim",
                    role: "Technology Coordinator",
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  },
                  {
                    name: "Dana Foster",
                    role: "Grant Writer",
                    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  }
                ].map((person, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src={person.image} alt={person.name} />
                        <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{person.name}</h4>
                        <p className="text-sm text-clubseed-500">{person.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Get Involved Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Involved</h2>
            <p className="text-lg text-gray-600">
              There are many ways to support our mission. Whether you're a teacher, student, mentor, or donor, we'd love to have you join our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-40 bg-clubseed-500 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Schools</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Apply to receive support for starting or expanding clubs at your school. We work with schools across the country to build sustainable programs.
                </p>
                <Link to="/join">
                  <Button className="w-full bg-clubseed-500 hover:bg-clubseed-600">Apply for Support</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-40 bg-clubseed-600 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Mentors</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Share your expertise and experience with students. Our mentors provide guidance, support, and real-world connections for club activities.
                </p>
                <Link to="/join">
                  <Button className="w-full bg-clubseed-600 hover:bg-clubseed-700">Become a Mentor</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-40 bg-clubseed-700 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Donors</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Support our mission through donations that directly fund club activities, resources, and operations. Every contribution makes a difference.
                </p>
                <Link to="/donate">
                  <Button className="w-full bg-clubseed-700 hover:bg-clubseed-800">Donate Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="py-20 bg-clubseed-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions or need more information? We'd love to hear from you. Fill out the form and our team will get back to you as soon as possible.
              </p>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clubseed-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clubseed-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clubseed-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clubseed-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full bg-clubseed-500 hover:bg-clubseed-600">Send Message</Button>
                </form>
              </div>
            </div>
            
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-lg reveal">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30594994064!2d-74.2598727731884!3d40.69701446299742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1635187123196!5m2!1sen!2sca" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="ClubSeed location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
