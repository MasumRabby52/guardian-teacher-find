
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchFilters from "@/components/common/SearchFilters";
import TeacherCard, { TeacherType } from "@/components/common/TeacherCard";
import { toast } from "@/components/ui/use-toast";

// Sample fallback data
const sampleTeachers = [
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
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    subjects: ["Chemistry", "Biology"],
    experience: 6,
    rating: 4.7,
    hourlyRate: 40,
    location: "San Francisco, CA",
    availability: "Weekday evenings, Saturday mornings",
    bio: "Chemistry professor with a passion for making science fun and engaging. I use real-world examples and interactive experiments to help students understand complex concepts."
  },
  {
    id: "3",
    name: "Jennifer Lopez",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    subjects: ["English", "Literature", "Writing"],
    experience: 10,
    rating: 5.0,
    hourlyRate: 50,
    location: "Chicago, IL",
    availability: "Monday-Friday, flexible hours",
    bio: "Former journalist with a master's in English Literature. I help students improve their writing skills, comprehension, and literary analysis through engaging discussions and personalized feedback."
  }
];

const FindTutors: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  useEffect(() => {
    const loadTeachers = () => {
      try {
        // Get teachers from localStorage
        const teachersJSON = localStorage.getItem('teachers');
        const profileFormJSON = localStorage.getItem('profileForm');
        
        let allTeachers = [...sampleTeachers]; // Start with sample data
        
        // Add teacher from profile form if exists
        if (profileFormJSON) {
          try {
            const profileFormData = JSON.parse(profileFormJSON);
            // Create a teacher object from profile form data
            const newTeacher = {
              id: `profile-${Date.now()}`,
              name: profileFormData.fullName || 'New Teacher',
              avatar: profileFormData.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
              subjects: profileFormData.subjects ? profileFormData.subjects.split(',').map((s: string) => s.trim()) : ['General'],
              experience: parseInt(profileFormData.experienceYears) || 1,
              rating: 5.0, // Default rating for new teachers
              hourlyRate: parseInt(profileFormData.hourlyRate) || 30,
              location: profileFormData.location || 'Unknown Location',
              availability: profileFormData.availability || 'Flexible hours',
              bio: profileFormData.bio || 'New tutor on the platform',
              education: profileFormData.qualifications ? [profileFormData.qualifications] : ['Bachelor\'s degree'],
              certifications: profileFormData.certifications ? [profileFormData.certifications] : ['Certified Teacher']
            };
            allTeachers.push(newTeacher);
          } catch (e) {
            console.error("Error parsing profile form data:", e);
          }
        }
        
        // Add teachers from localStorage if exist
        if (teachersJSON) {
          try {
            const storedTeachers = JSON.parse(teachersJSON);
            if (Array.isArray(storedTeachers) && storedTeachers.length > 0) {
              // Combine with existing teachers but avoid duplicates by ID
              const existingIds = allTeachers.map(t => t.id);
              const uniqueStoredTeachers = storedTeachers.filter(
                (t: TeacherType) => !existingIds.includes(t.id)
              );
              allTeachers = [...allTeachers, ...uniqueStoredTeachers];
            }
          } catch (e) {
            console.error("Error parsing teachers from localStorage:", e);
          }
        }
        
        console.log(`Loaded ${allTeachers.length} teachers`);
        setTeachers(allTeachers);
        
        // Save all teachers back to localStorage for consistency
        localStorage.setItem('teachers', JSON.stringify(allTeachers));
        
      } catch (error) {
        console.error("Error loading teachers:", error);
        toast({
          title: "Error",
          description: "Failed to load teacher data",
          variant: "destructive",
        });
        setTeachers(sampleTeachers);
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, []);

  // Filter teachers based on search and filters
  const filteredTeachers = teachers.filter((teacher) => {
    // Search term filter (name, subjects, location)
    const matchesSearch = searchTerm === "" || 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some(subject => 
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      (teacher.location && teacher.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Subject filter
    const matchesSubject = subjectFilter === "" || 
      teacher.subjects.includes(subjectFilter);
    
    // Price range filter
    const matchesPrice = teacher.hourlyRate >= priceRange[0] && 
      teacher.hourlyRate <= priceRange[1];
    
    return matchesSearch && matchesSubject && matchesPrice;
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSubjectFilter = (value: string) => {
    setSubjectFilter(value);
  };

  const handlePriceRange = (value: [number, number]) => {
    setPriceRange(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect <span className="gradient-text">Tutor</span>
            </h1>
            <p className="text-lg text-gray-600">
              Browse through our qualified tutors and find the perfect match for your learning needs
            </p>
          </div>
          
          {/* Search and Filters */}
          <SearchFilters 
            onSearch={handleSearch}
            onSubjectFilter={handleSubjectFilter}
            onPriceRange={handlePriceRange}
          />
          
          {/* Teachers Grid */}
          <div className="mt-12">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-xl">Loading tutors...</p>
              </div>
            ) : filteredTeachers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeachers.map((teacher) => (
                  <TeacherCard key={teacher.id} teacher={teacher} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl">No tutors found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindTutors;
