
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchFilters from "@/components/common/SearchFilters";
import TeacherCard, { TeacherType } from "@/components/common/TeacherCard";
import { toast } from "@/components/ui/use-toast";

// More detailed sample fallback data
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
  },
  {
    id: "4",
    name: "Robert Johnson",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    subjects: ["Computer Science", "Programming"],
    experience: 12,
    rating: 4.8,
    hourlyRate: 55,
    location: "Austin, TX",
    availability: "Evenings and weekends",
    bio: "Software engineer with over a decade of experience teaching coding and computer science. I focus on practical skills and real-world applications to help students succeed in tech careers."
  },
  {
    id: "5",
    name: "Emily Zhang",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    subjects: ["History", "Geography", "Social Studies"],
    experience: 7,
    rating: 4.9,
    hourlyRate: 42,
    location: "Boston, MA",
    availability: "Flexible schedule, seven days a week",
    bio: "History teacher with a passion for bringing the past to life. I use storytelling, primary sources, and interactive discussions to make learning history engaging and meaningful."
  }
];

const FindTutors: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [experienceFilter, setExperienceFilter] = useState<number>(0);
  
  // Use a global storage key for consistency
  const GLOBAL_TEACHERS_KEY = "global_teachers_data";

  useEffect(() => {
    const loadTeachers = () => {
      try {
        // Always start with the sample data to ensure profiles are available
        let allTeachers = [...sampleTeachers];
        
        // Process and get profile form data from localStorage
        const processProfileForms = () => {
          // Get all profile forms
          const profileFormsJSON = localStorage.getItem('profileForms');
          if (!profileFormsJSON) return [];
          
          try {
            const profileForms = JSON.parse(profileFormsJSON);
            return profileForms.map((formData: any) => {
              // Create a teacher object from profile form data
              return {
                id: formData.id || `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: formData.fullName || formData.name || 'New Teacher',
                avatar: formData.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
                subjects: formData.subjects ? (Array.isArray(formData.subjects) ? 
                  formData.subjects : formData.subjects.split(',').map((s: string) => s.trim())) : ['General'],
                experience: parseInt(formData.experienceYears || formData.experience) || 1,
                rating: 5.0,
                hourlyRate: parseInt(formData.hourlyRate) || 30,
                location: formData.location || 'Unknown Location',
                availability: formData.availability || 'Flexible hours',
                bio: formData.bio || 'New tutor on the platform',
                education: formData.qualifications ? [formData.qualifications] : ['Bachelor\'s degree'],
                certifications: formData.certifications ? [formData.certifications] : ['Certified Teacher'],
                createdBy: formData.userId || 'anonymous'
              };
            });
          } catch (e) {
            console.error("Error parsing profile forms:", e);
            return [];
          }
        };
        
        // Get global teachers data
        const teachersJSON = localStorage.getItem(GLOBAL_TEACHERS_KEY);
        
        // Add teachers from global storage if they exist
        if (teachersJSON) {
          try {
            const storedTeachers = JSON.parse(teachersJSON);
            if (Array.isArray(storedTeachers) && storedTeachers.length > 0) {
              // Filter out any duplicate IDs from sample data
              const sampleIds = sampleTeachers.map(t => t.id);
              const uniqueStoredTeachers = storedTeachers.filter(
                (t: TeacherType) => !sampleIds.includes(t.id)
              );
              
              // Combine all teachers
              allTeachers = [...allTeachers, ...uniqueStoredTeachers];
            }
          } catch (e) {
            console.error("Error parsing teachers from localStorage:", e);
          }
        }
        
        // Add profile form teachers
        const profileTeachers = processProfileForms();
        if (profileTeachers.length > 0) {
          // Add each profile teacher, avoiding duplicates
          profileTeachers.forEach((profileTeacher: TeacherType) => {
            const existingTeacherIndex = allTeachers.findIndex(t => t.id === profileTeacher.id);
            if (existingTeacherIndex === -1) {
              allTeachers.push(profileTeacher);
            } else {
              // Update existing teacher if it's the same profile
              allTeachers[existingTeacherIndex] = {
                ...allTeachers[existingTeacherIndex],
                ...profileTeacher
              };
            }
          });
        }
        
        // Also process individual profile form submission if it exists
        const profileFormJSON = localStorage.getItem('profileForm');
        if (profileFormJSON) {
          try {
            const profileFormData = JSON.parse(profileFormJSON);
            
            // Get current user
            const currentUserJSON = localStorage.getItem('currentUser');
            const currentUser = currentUserJSON ? JSON.parse(currentUserJSON) : null;
            
            const newTeacher = {
              id: profileFormData.id || `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              name: profileFormData.fullName || profileFormData.name || (currentUser ? currentUser.name : 'New Teacher'),
              avatar: profileFormData.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
              subjects: profileFormData.subjects ? (Array.isArray(profileFormData.subjects) ? 
                profileFormData.subjects : profileFormData.subjects.split(',').map((s: string) => s.trim())) : ['General'],
              experience: parseInt(profileFormData.experienceYears || profileFormData.experience) || 1,
              rating: 5.0,
              hourlyRate: parseInt(profileFormData.hourlyRate) || 30,
              location: profileFormData.location || 'Unknown Location',
              availability: profileFormData.availability || 'Flexible hours',
              bio: profileFormData.bio || 'New tutor on the platform',
              education: profileFormData.qualifications ? [profileFormData.qualifications] : ['Bachelor\'s degree'],
              certifications: profileFormData.certifications ? [profileFormData.certifications] : ['Certified Teacher'],
              createdBy: currentUser ? currentUser.id : 'anonymous'
            };
            
            // Check if this profile already exists
            const existingIndex = allTeachers.findIndex(t => t.id === newTeacher.id);
            if (existingIndex === -1) {
              allTeachers.push(newTeacher);
              
              // Add to profile forms collection
              const profileForms = profileFormsJSON ? JSON.parse(profileFormsJSON) : [];
              profileForms.push({
                ...profileFormData,
                id: newTeacher.id,
                userId: currentUser ? currentUser.id : 'anonymous'
              });
              localStorage.setItem('profileForms', JSON.stringify(profileForms));
            } else {
              // Update if exists
              allTeachers[existingIndex] = {
                ...allTeachers[existingIndex],
                ...newTeacher
              };
            }
          } catch (e) {
            console.error("Error processing individual profile form:", e);
          }
        }
        
        console.log(`Loaded ${allTeachers.length} teachers`);
        setTeachers(allTeachers);
        
        // Save all teachers to global storage for persistence and sharing
        localStorage.setItem(GLOBAL_TEACHERS_KEY, JSON.stringify(allTeachers));
        
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
    
    // Experience filter
    const matchesExperience = teacher.experience >= experienceFilter;
    
    return matchesSearch && matchesSubject && matchesPrice && matchesExperience;
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

  const handleExperienceFilter = (value: number) => {
    setExperienceFilter(value);
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
            onExperienceRange={handleExperienceFilter}
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
