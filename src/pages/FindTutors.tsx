
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TeacherCard, { TeacherType } from "@/components/common/TeacherCard";
import SearchFilters from "@/components/common/SearchFilters";

// Sample teacher data
const initialTeachers: TeacherType[] = [
  {
    id: "1",
    name: "Dr. Sarah Williams",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    subjects: ["Mathematics", "Physics"],
    experience: 8,
    rating: 4.9,
    hourlyRate: 45,
    location: "New York, NY",
    availability: "Weekdays after 4pm, Weekends",
    bio: "Ph.D. in Mathematics with 8 years of teaching experience. I specialize in making complex math concepts accessible and engaging for students of all levels."
  },
  {
    id: "2",
    name: "James Rodriguez",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    subjects: ["English", "History"],
    experience: 12,
    rating: 4.8,
    hourlyRate: 40,
    location: "Boston, MA",
    availability: "Monday-Friday, flexible hours",
    bio: "Former high school English teacher with a passion for literature and history. I help students develop critical thinking skills while improving their reading and writing abilities."
  },
  {
    id: "3",
    name: "Emily Chen",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    subjects: ["Chemistry", "Biology"],
    experience: 5,
    rating: 4.7,
    hourlyRate: 38,
    location: "San Francisco, CA",
    availability: "Evenings and weekends",
    bio: "Biochemistry researcher who loves making science accessible. My teaching approach combines theoretical knowledge with practical applications and experiments."
  },
  {
    id: "4",
    name: "Michael Johnson",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    subjects: ["Computer Science", "Mathematics"],
    experience: 7,
    rating: 4.9,
    hourlyRate: 50,
    location: "Austin, TX",
    availability: "Weekends, Thursday evenings",
    bio: "Software engineer with a strong foundation in computer science and mathematics. I teach programming, algorithms, and help students prepare for technical interviews."
  },
  {
    id: "5",
    name: "Lisa Thompson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    subjects: ["Music", "Art"],
    experience: 15,
    rating: 5.0,
    hourlyRate: 35,
    location: "Chicago, IL",
    availability: "Flexible schedule",
    bio: "Professional musician and art teacher with 15 years of experience. I create a supportive environment for students to explore their creativity and develop their skills."
  },
  {
    id: "6",
    name: "David Wilson",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    subjects: ["Foreign Languages", "History"],
    experience: 10,
    rating: 4.8,
    hourlyRate: 42,
    location: "Seattle, WA",
    availability: "Mornings and weekends",
    bio: "Multilingual educator specializing in Spanish, French, and world history. I use immersive teaching methods to help students become confident in new languages."
  }
];

const FindTutors: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherType[]>(initialTeachers);
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherType[]>(initialTeachers);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (filters: any) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      let results = [...teachers];
      
      // Filter by search query (name or subjects)
      if (filters.query) {
        const query = filters.query.toLowerCase();
        results = results.filter(
          teacher => 
            teacher.name.toLowerCase().includes(query) || 
            teacher.subjects.some(subject => subject.toLowerCase().includes(query)) ||
            teacher.bio.toLowerCase().includes(query)
        );
      }
      
      // Filter by selected subjects
      if (filters.subjects.length > 0) {
        results = results.filter(
          teacher => filters.subjects.some((subject: string) => 
            teacher.subjects.includes(subject)
          )
        );
      }
      
      // Filter by minimum experience
      if (filters.minExperience > 0) {
        results = results.filter(teacher => teacher.experience >= filters.minExperience);
      }
      
      // Filter by maximum price
      if (filters.maxPrice < 200) {
        results = results.filter(teacher => teacher.hourlyRate <= filters.maxPrice);
      }
      
      setFilteredTeachers(results);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Find Your Perfect <span className="gradient-text">Tutor</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Search filters sidebar */}
            <div className="lg:col-span-1">
              <SearchFilters onSearch={handleSearch} />
            </div>
            
            {/* Teachers grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
                </div>
              ) : (
                <>
                  {filteredTeachers.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
                      <h3 className="text-xl font-semibold mb-2">No tutors found</h3>
                      <p className="text-gray-600">
                        Try adjusting your search filters to find more results.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="mb-4 text-gray-600">
                        Found {filteredTeachers.length} {filteredTeachers.length === 1 ? 'tutor' : 'tutors'} matching your criteria
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredTeachers.map(teacher => (
                          <TeacherCard key={teacher.id} teacher={teacher} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindTutors;
