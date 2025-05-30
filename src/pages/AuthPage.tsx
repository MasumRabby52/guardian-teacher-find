
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { UserPlus, LogIn, BookOpen, Users, Star, Trophy } from "lucide-react";

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold gradient-text">TutorConnect</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect with the <span className="gradient-text">Perfect Tutor</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community of qualified teachers and passionate students. 
              Start your educational journey today!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Tutors</h3>
              <p className="text-gray-600">Learn from qualified and experienced teachers</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Join a supportive learning community</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Success</h3>
              <p className="text-gray-600">Achieve your academic goals</p>
            </div>
          </div>

          {/* Auth Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Login Card */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center">
                  <LogIn className="h-5 w-5 text-brand-blue" />
                  Welcome Back
                </CardTitle>
                <CardDescription>
                  Sign in to your existing account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-brand-blue hover:bg-brand-blue/90">
                  <Link to="/login">
                    Login to Your Account
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Register Card */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center">
                  <UserPlus className="h-5 w-5 text-brand-purple" />
                  Get Started
                </CardTitle>
                <CardDescription>
                  Create a new account to begin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-brand-purple hover:bg-brand-purple/90">
                  <Link to="/register">
                    Create New Account
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-blue mb-2">500+</div>
              <div className="text-sm text-gray-600">Expert Tutors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-purple mb-2">10k+</div>
              <div className="text-sm text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">4.9</div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                Rating
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
