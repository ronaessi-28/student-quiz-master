
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, User, Award, Clock } from 'lucide-react';
import { quizData } from '@/data/quizData';
import { useToast } from '@/hooks/use-toast';

interface StudentResponse {
  studentName: string;
  answers: Record<number, string>;
  completedAt: Date;
  timeSpent: number;
}

const Index = () => {
  const [studentName, setStudentName] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [allResponses, setAllResponses] = useState<StudentResponse[]>([]);
  const [isTeacherView, setIsTeacherView] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180 * 60); // 180 minutes in seconds
  const [startTime, setStartTime] = useState<Date | null>(null);
  const { toast } = useToast();

  // Flatten all questions from all subjects into one array
  const allQuestions = Object.entries(quizData).flatMap(([subject, questions]) => 
    questions.map(question => ({ ...question, subject }))
  );

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (quizStarted && !showResults && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [quizStarted, showResults, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    if (!studentName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name before starting the quiz.",
        variant: "destructive"
      });
      return;
    }
    setAnswers({});
    setShowResults(false);
    setQuizStarted(true);
    setStartTime(new Date());
    setTimeRemaining(180 * 60); // Reset timer
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleAutoSubmit = () => {
    if (!startTime) return;
    
    const timeSpent = Math.round((new Date().getTime() - startTime.getTime()) / 1000);
    
    const response: StudentResponse = {
      studentName,
      answers,
      completedAt: new Date(),
      timeSpent
    };

    setAllResponses(prev => [...prev, response]);
    setShowResults(true);
    setQuizStarted(false);
    
    toast({
      title: "Time's Up!",
      description: "Your quiz has been automatically submitted.",
      variant: "destructive"
    });
  };

  const handleSubmitQuiz = () => {
    if (!startTime) return;
    
    const timeSpent = Math.round((new Date().getTime() - startTime.getTime()) / 1000);
    
    const response: StudentResponse = {
      studentName,
      answers,
      completedAt: new Date(),
      timeSpent
    };

    setAllResponses(prev => [...prev, response]);
    setShowResults(true);
    setQuizStarted(false);
    
    toast({
      title: "Quiz Submitted!",
      description: "Your responses have been recorded successfully.",
    });
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
    setStudentName('');
    setQuizStarted(false);
    setTimeRemaining(180 * 60);
    setStartTime(null);
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
                      {response.studentName}
                    </CardTitle>
                    <p className="text-blue-100">
                      Completed: {response.completedAt.toLocaleString()} | Time Spent: {formatTime(response.timeSpent)}
                    </p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {Object.entries(response.answers).map(([questionIndex, answer]) => {
                        const question = allQuestions[parseInt(questionIndex)];
                        return (
                          <div key={questionIndex} className="border-l-4 border-blue-500 pl-4">
                            <p className="font-medium text-gray-800 mb-2">
                              Q{parseInt(questionIndex) + 1}: {question.question}
                            </p>
                            {question.type === 'coding' ? (
                              <div className="bg-gray-100 p-3 rounded">
                                <p className="text-sm text-gray-600 mb-2">Code Answer:</p>
                                <pre className="text-blue-600 font-mono text-sm whitespace-pre-wrap">{answer}</pre>
                              </div>
                            ) : (
                              <p className="text-blue-600 font-medium">Answer: {answer}</p>
                            )}
                            <p className="text-sm text-gray-500">Subject: {question.subject}</p>
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
              You have successfully completed the quiz with {Object.keys(answers).length} out of {allQuestions.length} questions answered. Your responses have been submitted.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700">
                Take Quiz Again
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

  if (quizStarted && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Quiz - {studentName}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
                  <Clock className="h-5 w-5 text-red-500" />
                  <span className={`font-mono text-lg ${timeRemaining < 600 ? 'text-red-600' : 'text-gray-800'}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <div className="text-gray-600">
                  Answered: {Object.keys(answers).length}/{allQuestions.length}
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-xl mb-6">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              <CardTitle>All Questions ({allQuestions.length} Total)</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                {allQuestions.map((question, questionIndex) => (
                  <div key={questionIndex} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Q{questionIndex + 1}: {question.question}
                      </h3>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {question.subject}
                      </span>
                    </div>
                    
                    {question.type === 'coding' ? (
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Write your code here:
                        </label>
                        <Textarea
                          placeholder="Enter your code here..."
                          value={answers[questionIndex] || ''}
                          onChange={(e) => handleAnswerSelect(questionIndex, e.target.value)}
                          className="min-h-[150px] font-mono text-sm"
                        />
                      </div>
                    ) : (
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
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button 
                  onClick={resetQuiz} 
                  variant="outline"
                >
                  Reset
                </Button>
                <Button 
                  onClick={handleSubmitQuiz}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Submit Quiz ({Object.keys(answers).length}/{allQuestions.length} answered)
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
          <p className="text-xl text-gray-600">Complete the quiz with {allQuestions.length} questions from various subjects</p>
          <p className="text-lg text-purple-600 mt-2">⏰ Time Limit: 180 minutes (3 hours)</p>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="max-w-md mx-auto space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Name
              </label>
              <Input
                type="text"
                placeholder="Your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="text-center text-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />
              <Button 
                onClick={handleStartQuiz}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={!studentName.trim()}
              >
                Start Quiz ({allQuestions.length} Questions)
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Quiz Overview</h2>
            <Button onClick={() => setIsTeacherView(true)} variant="outline">
              Teacher View ({allResponses.length} responses)
            </Button>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                This quiz contains {allQuestions.length} questions covering the following subjects:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {Object.keys(quizData).map((subject) => (
                  <span key={subject} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {subject}
                  </span>
                ))}
              </div>
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Instructions:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• You have 180 minutes (3 hours) to complete the quiz</li>
                  <li>• It's not mandatory to answer all questions</li>
                  <li>• You can submit the quiz anytime before the timer ends</li>
                  <li>• The quiz will auto-submit when time runs out</li>
                  <li>• For coding questions, write your answer in the text area provided</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
