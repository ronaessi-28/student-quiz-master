
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { User, GraduationCap } from 'lucide-react';

const HomePage: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = (userType: 'student' | 'teacher') => {
    if (userType === 'student') {
      login({
        id: 'raman-001',
        name: 'Raman',
        role: 'student',
        email: 'raman@example.com'
      });
    } else {
      login({
        id: 'viney-001',
        name: 'Viney',
        role: 'teacher',
        email: 'viney@example.com'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Mastery Platform</h1>
          <p className="text-xl text-gray-600">Choose your role to continue</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Login as Raman</CardTitle>
              <CardDescription className="text-lg">Student Dashboard</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Access your personalized learning dashboard, track your progress, 
                and take quizzes across theory, aptitude, and coding sections.
              </p>
              <Button 
                onClick={() => handleLogin('student')}
                className="w-full text-lg py-3"
                size="lg"
              >
                Enter Student Portal
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Login as Viney</CardTitle>
              <CardDescription className="text-lg">Teacher Dashboard</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Create and manage quizzes, monitor student progress, 
                and utilize AI-powered quiz generation for different subjects.
              </p>
              <Button 
                onClick={() => handleLogin('teacher')}
                className="w-full text-lg py-3"
                size="lg"
                variant="secondary"
              >
                Enter Teacher Portal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
