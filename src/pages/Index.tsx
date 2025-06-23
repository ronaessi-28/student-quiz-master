import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, User, BookOpen, Award } from 'lucide-react';
import { quizData } from '@/data/quizData';
import { useToast } from '@/hooks/use-toast';

interface StudentResponse {
  studentName: string;
  subject: string;
  answers: Record<number, string>;
  completedAt: Date;
  score?: number;
}

const Index = () => {
  const [studentName, setStudentName] = useState('');
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [allResponses, setAllResponses] = useState<StudentResponse[]>([]);
  const [isTeacherView, setIsTeacherView] = useState(false);
  const { toast } = useToast();

  const currentQuestions = currentSubject ? quizData[currentSubject] : [];

  const handleStartQuiz = (subject: string) => {
    if (!studentName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name before starting the quiz.",
        variant: "destructive"
      });
      return;
    }
    setCurrentSubject(subject);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmitQuiz = () => {
    if (!currentSubject) return;

    const response: StudentResponse = {
      studentName,
      subject: currentSubject,
      answers,
      completedAt: new Date()
    };

    setAllResponses(prev => [...prev, response]);
    setShowResults(true);
    
    toast({
      title: "Quiz Submitted!",
      description: "Your responses have been recorded successfully.",
    });
  };

  const resetQuiz = () => {
    setCurrentSubject(null);
    setAnswers({});
    setShowResults(false);
    setStudentName('');
  };

  const isQuizComplete = () => {
    return currentQuestions.length > 0 && currentQuestions.every((_, index) => answers[index]);
  };

  if (isTeacherView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Student Responses</h1>
            <Button onClick={() => setIsTeacherView(false)} variant="outline">
              Back to Quiz
            </Button>
          </div>
          
          {allResponses.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No responses yet. Students need to complete quizzes.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {allResponses.map((response, index) => (
                <Card key={index} className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {response.studentName} - {response.subject}
                    </CardTitle>
                    <p className="text-blue-100">
                      Completed: {response.completedAt.toLocaleString()}
                    </p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {Object.entries(response.answers).map(([questionIndex, answer]) => {
                        const question = quizData[response.subject][parseInt(questionIndex)];
                        return (
                          <div key={questionIndex} className="border-l-4 border-blue-500 pl-4">
                            <p className="font-medium text-gray-800 mb-2">
                              Q{parseInt(questionIndex) + 1}: {question.question}
                            </p>
                            <p className="text-blue-600 font-medium">Answer: {answer}</p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Award className="h-8 w-8" />
              Quiz Completed!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Great job, {studentName}!
            </h2>
            <p className="text-gray-600 mb-8">
              You have successfully completed the {currentSubject} quiz. Your responses have been submitted.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700">
                Take Another Quiz
              </Button>
              <Button onClick={() => setIsTeacherView(true)} variant="outline">
                View All Responses
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentSubject && currentQuestions.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{currentSubject}</h1>
              <div className="text-gray-600">
                Total Questions: {currentQuestions.length}
              </div>
            </div>
          </div>

          <Card className="shadow-xl mb-6">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              <CardTitle>All Questions - {currentSubject}</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                {currentQuestions.map((question, questionIndex) => (
                  <div key={questionIndex} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Q{questionIndex + 1}: {question.question}
                    </h3>
                    
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            value={option}
                            checked={answers[questionIndex] === option}
                            onChange={(e) => handleAnswerSelect(questionIndex, e.target.value)}
                            className="mr-3 h-4 w-4 text-purple-600"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button 
                  onClick={() => setCurrentSubject(null)} 
                  variant="outline"
                >
                  Back to Subjects
                </Button>
                <Button 
                  onClick={handleSubmitQuiz}
                  disabled={!isQuizComplete()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Submit Quiz ({Object.keys(answers).length}/{currentQuestions.length} answered)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Student Quiz Portal</h1>
          <p className="text-xl text-gray-600">Test your knowledge across multiple subjects</p>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Name
              </label>
              <Input
                type="text"
                placeholder="Your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="text-center text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Choose a Subject</h2>
            <Button onClick={() => setIsTeacherView(true)} variant="outline">
              Teacher View ({allResponses.length} responses)
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(quizData).map((subject) => (
              <Card key={subject} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {subject}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">
                    {quizData[subject].length} Questions
                  </p>
                  <Button 
                    onClick={() => handleStartQuiz(subject)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
