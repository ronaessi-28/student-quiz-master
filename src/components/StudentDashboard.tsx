
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Trophy, Clock, BookOpen, Brain, Code, AlertTriangle, Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const { currentUser, quizAttempts, quizzes, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  const [missedQuizAlert, setMissedQuizAlert] = useState<string | null>(null);

  useEffect(() => {
    checkForMissedQuizzes();
    calculateStreak();
  }, [quizAttempts, quizzes]);

  const checkForMissedQuizzes = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const missedQuiz = quizzes.find(quiz => {
      const dueDate = new Date(quiz.dueDate).toISOString().split('T')[0];
      const wasAttempted = quizAttempts.some(attempt => 
        attempt.quizId === quiz.id && attempt.userId === currentUser?.id
      );
      return dueDate === yesterdayStr && !wasAttempted && quiz.assignedTo.includes(currentUser?.id || '');
    });

    if (missedQuiz) {
      setMissedQuizAlert(missedQuiz.title);
      toast({
        title: "Missed Quiz Alert!",
        description: `You missed the quiz: ${missedQuiz.title} yesterday`,
        variant: "destructive"
      });
    }
  };

  const calculateStreak = () => {
    const userAttempts = quizAttempts
      .filter(attempt => attempt.userId === currentUser?.id)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

    let currentStreak = 0;
    let currentDate = new Date();
    
    for (let i = 0; i < userAttempts.length; i++) {
      const attemptDate = new Date(userAttempts[i].completedAt);
      const diffTime = currentDate.getTime() - attemptDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === currentStreak + 1) {
        currentStreak++;
        currentDate = attemptDate;
      } else {
        break;
      }
    }
    
    setStreak(currentStreak);
  };

  const getTimelineColor = (date: string, attempts: number) => {
    if (attempts === 0) return 'bg-red-500';
    if (attempts <= 2) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const getUserQuizzes = (status: 'active' | 'pending' | 'completed') => {
    return quizzes.filter(quiz => 
      quiz.assignedTo.includes(currentUser?.id || '') && 
      quiz.status === status
    );
  };

  const startQuiz = (type: 'theory' | 'aptitude' | 'coding') => {
    navigate(`/quiz/${type}`);
  };

  const renderTimeline = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return (
      <div className="grid grid-cols-10 gap-1">
        {last30Days.map(date => {
          const attemptsOnDate = quizAttempts.filter(attempt => 
            attempt.userId === currentUser?.id && 
            attempt.completedAt.split('T')[0] === date
          ).length;
          
          return (
            <div
              key={date}
              className={`w-4 h-4 rounded-sm ${getTimelineColor(date, attemptsOnDate)}`}
              title={`${date}: ${attemptsOnDate} quizzes`}
            />
          );
        })}
      </div>
    );
  };

  const userAttempts = quizAttempts.filter(attempt => attempt.userId === currentUser?.id);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>
            <p className="text-gray-600">Let's continue your learning journey</p>
          </div>
          <Button onClick={logout} variant="outline">Logout</Button>
        </div>

        {missedQuizAlert && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="flex items-center gap-3 pt-6">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <p className="text-red-700">You missed the quiz: {missedQuizAlert}</p>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setMissedQuizAlert(null)}
              >
                Dismiss
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quizzes Taken</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userAttempts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{streak} days</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userAttempts.length > 0 
                  ? Math.round(userAttempts.reduce((acc, attempt) => acc + (attempt.score / attempt.totalQuestions) * 100, 0) / userAttempts.length)
                  : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Activity Timeline (Last 30 Days)
            </CardTitle>
            <CardDescription>
              Track your daily quiz activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderTimeline()}
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                <span>No quiz</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <span>1-2 quizzes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span>3+ quizzes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Quiz</CardTitle>
              <CardDescription>Choose a quiz type to begin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => startQuiz('theory')} 
                className="w-full justify-start"
                variant="outline"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Theory Concepts (Q1-110)
              </Button>
              <Button 
                onClick={() => startQuiz('aptitude')} 
                className="w-full justify-start"
                variant="outline"
              >
                <Brain className="mr-2 h-4 w-4" />
                Aptitude Section (Q111-176)
              </Button>
              <Button 
                onClick={() => startQuiz('coding')} 
                className="w-full justify-start"
                variant="outline"
              >
                <Code className="mr-2 h-4 w-4" />
                Coding Section (Q177-184)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quiz Status</CardTitle>
              <CardDescription>Your assigned quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Active Quizzes</span>
                  <Badge variant="default">{getUserQuizzes('active').length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pending Quizzes</span>
                  <Badge variant="secondary">{getUserQuizzes('pending').length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Completed Quizzes</span>
                  <Badge variant="outline">{getUserQuizzes('completed').length}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
