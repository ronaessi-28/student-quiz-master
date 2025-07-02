import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Timer, BookOpen, Brain, Code, AlertTriangle } from 'lucide-react';
import { quizData } from '@/data/quizData';

const Index: React.FC = () => {
  const { type } = useParams<{ type: 'theory' | 'aptitude' | 'coding' }>();
  const navigate = useNavigate();
  const { currentUser, addQuizAttempt } = useAuth();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(true);

  const visibilityRef = useRef(true);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/');
      return;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && visibilityRef.current) {
        setWarningCount(prevCount => prevCount + 1);
        visibilityRef.current = false;
        toast({
          title: "Warning!",
          description: "Switching tabs or minimizing the window is not allowed. This is your warning " + (warningCount + 1) + "/3",
          variant: "destructive"
        });
      } else if (document.visibilityState === 'visible') {
        visibilityRef.current = true;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    if (warningCount >= 3) {
      handleSubmit();
      toast({
        title: "Quiz Auto-Submitted!",
        description: "You have exceeded the maximum number of warnings. Quiz has been auto-submitted.",
        variant: "destructive"
      });
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(timerId);
    };
  }, [navigate, currentUser, warningCount, toast, handleSubmit]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      toast({
        title: "Time's Up!",
        description: "The quiz has been auto-submitted.",
        variant: "destructive"
      });
    }
  }, [timeLeft, handleSubmit, toast]);

  if (!currentUser || currentUser.role !== 'student') {
    navigate('/');
    return null;
  }

  const getQuizQuestions = () => {
    if (!type) return [];
    
    switch (type) {
      case 'theory':
        return quizData.slice(0, 110); // Questions 1-110
      case 'aptitude':
        return quizData.slice(110, 176); // Questions 111-176
      case 'coding':
        return quizData.slice(176, 184); // Questions 177-184
      default:
        return [];
    }
  };

  const questions = getQuizQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  const getQuizIcon = () => {
    switch (type) {
      case 'theory': return <BookOpen className="h-5 w-5" />;
      case 'aptitude': return <Brain className="h-5 w-5" />;
      case 'coding': return <Code className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getQuizTitle = () => {
    switch (type) {
      case 'theory': return 'Theory Concepts Quiz';
      case 'aptitude': return 'Aptitude Section Quiz';
      case 'coding': return 'Coding Section Quiz';
      default: return 'Quiz';
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (index: number, value: any) => {
    if (!isQuizActive) return;
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleNextQuestion = () => {
    if (!isQuizActive) return;
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (!isQuizActive) return;
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmit = () => {
    if (!isQuizActive) return;

    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (question.type === 'multiple-choice' && answers[index] === question.correctAnswer) {
        correctAnswers++;
      } else if (question.type === 'coding' && answers[index]) {
        // For coding questions, we'll assume they're correct if answered
        correctAnswers++;
      }
    });

    const quizAttempt = {
      id: `attempt-${Date.now()}`,
      userId: currentUser.id,
      quizId: `${type}-quiz`,
      quizType: type!,
      score: correctAnswers,
      totalQuestions: questions.length,
      completedAt: new Date().toISOString(),
      answers: answers
    };

    addQuizAttempt(quizAttempt);
    setIsSubmitted(true);
    setIsQuizActive(false);

    toast({
      title: "Quiz Submitted!",
      description: `You scored ${correctAnswers}/${questions.length} (${Math.round((correctAnswers/questions.length)*100)}%)`
    });
  };

  if (isSubmitted) {
    const score = Object.keys(answers).filter(key => {
      const question = questions[parseInt(key)];
      return question.type === 'multiple-choice' && answers[parseInt(key)] === question.correctAnswer;
    }).length;

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {getQuizIcon()}
              </div>
              <CardTitle>Quiz Completed!</CardTitle>
              <CardDescription>{getQuizTitle()}</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl font-bold text-green-600">
                {Math.round((score/questions.length)*100)}%
              </div>
              <p className="text-gray-600">
                You scored {score} out of {questions.length} questions correctly
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Quiz Type: <span className="font-medium capitalize">{type}</span></p>
                <p className="text-sm text-gray-500">
                  Questions Range: {type === 'theory' ? '1-110' : type === 'aptitude' ? '111-176' : '177-184'}
                </p>
              </div>
              <Button onClick={() => navigate('/')} className="mt-6">
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-600 mb-4">No questions available for this quiz type.</p>
              <Button onClick={() => navigate('/')}>
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {getQuizIcon()}
              <span className="font-medium">{getQuizTitle()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Timer className="h-4 w-4" />
              <span className="font-mono">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
              <div className="text-sm text-gray-500">
                Range: {type === 'theory' ? '1-110' : type === 'aptitude' ? '111-176' : '177-184'}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose max-w-none">
              <h3 className="text-lg font-medium mb-4">{currentQuestion?.question}</h3>
            </div>

            {currentQuestion?.type === 'multiple-choice' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option: string, index: number) => (
                  <label
                    key={index}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={index}
                      checked={answers[currentQuestionIndex] === index}
                      onChange={() => handleAnswerChange(currentQuestionIndex, index)}
                      className="mr-3"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion?.type === 'coding' && (
              <div className="space-y-4">
                <textarea
                  className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
                  placeholder="Write your code here..."
                  value={answers[currentQuestionIndex] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
                />
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>

              <div className="flex gap-2">
                {currentQuestionIndex < questions.length - 1 ? (
                  <Button
                    onClick={handleNextQuestion}
                  >
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                    Submit Quiz
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-10 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`h-8 text-xs rounded ${
                index === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : answers[index] !== undefined
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
