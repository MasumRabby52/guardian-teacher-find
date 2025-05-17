
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import FindTutors from "./pages/FindTutors";
import BecomeTutor from "./pages/BecomeTutor";
import About from "./pages/About";
import TeacherProfile from "./pages/TeacherProfile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Initialize shared data system 
const initializeSharedData = () => {
  // Define global teachers key for consistency
  const GLOBAL_TEACHERS_KEY = "global_teachers_data";
  
  try {
    // Check if we have any local data that needs to be synced
    const localData = localStorage.getItem(GLOBAL_TEACHERS_KEY);
    if (localData) {
      // Get any existing shared data
      const sharedData = sessionStorage.getItem(GLOBAL_TEACHERS_KEY);
      
      if (sharedData) {
        // Merge local and shared data
        const localTeachers = JSON.parse(localData);
        const sharedTeachers = JSON.parse(sharedData);
        
        // Create a combined array with no duplicates
        const combinedTeachers = [...sharedTeachers];
        const sharedIds = sharedTeachers.map((t: any) => t.id);
        
        localTeachers.forEach((teacher: any) => {
          if (!sharedIds.includes(teacher.id)) {
            combinedTeachers.push(teacher);
          }
        });
        
        // Update shared storage with combined data
        sessionStorage.setItem(GLOBAL_TEACHERS_KEY, JSON.stringify(combinedTeachers));
        console.log("Synced local data with shared storage");
      } else {
        // Initialize shared storage with local data
        sessionStorage.setItem(GLOBAL_TEACHERS_KEY, localData);
        console.log("Initialized shared storage with local data");
      }
    }
  } catch (e) {
    console.error("Error initializing shared data:", e);
  }
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize shared data on app startup
    initializeSharedData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/find-tutors" element={<FindTutors />} />
            <Route path="/become-tutor" element={<BecomeTutor />} />
            <Route path="/about" element={<About />} />
            <Route path="/teacher/:id" element={<TeacherProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
