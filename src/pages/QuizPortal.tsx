import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { LogOut, BookOpen, Award } from 'lucide-react';
import QuizTaking from '@/components/quiz/QuizTaking';
import QuizResults from '@/components/quiz/QuizResults';

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  time_limit: number;
  max_daily_attempts: number;
}

export default function QuizPortal() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string>('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [canTakeQuiz, setCanTakeQuiz] = useState(true);
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (selectedQuizId && userId) {
      checkAttemptLimit();
    }
  }, [selectedQuizId, userId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    setUserId(session.user.id);

    // Check if user is admin
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .single();

    setIsAdmin(!!roles);
    
    // Fetch quizzes
    const { data: quizzesData } = await supabase
      .from('quizzes')
      .select('*')
      .order('created_at', { ascending: false });

    setQuizzes(quizzesData || []);
    
    // Get quiz ID from URL or use first quiz
    const quizParam = searchParams.get('quiz');
    if (quizParam) {
      setSelectedQuizId(quizParam);
    } else if (quizzesData && quizzesData.length > 0) {
      setSelectedQuizId(quizzesData[0].id);
    }

    setLoading(false);
  };

  const checkAttemptLimit = async () => {
    const { data, error } = await supabase.rpc('check_daily_attempt_limit', {
      p_user_id: userId,
      p_quiz_id: selectedQuizId
    });

    if (!error) {
      setCanTakeQuiz(data);
      
      // Count today's attempts
      const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('id')
        .eq('user_id', userId)
        .eq('quiz_id', selectedQuizId)
        .gte('started_at', new Date(new Date().setHours(0,0,0,0)).toISOString());

      const selectedQuiz = quizzes.find(q => q.id === selectedQuizId);
      if (selectedQuiz && attempts) {
        setAttemptsLeft(selectedQuiz.max_daily_attempts - attempts.length);
      }
    }
  };

  const handleStartQuiz = () => {
    if (!canTakeQuiz) {
      toast({
        title: 'Daily Limit Reached',
        description: 'You have reached your daily attempt limit for this quiz',
        variant: 'destructive'
      });
      return;
    }

    setQuizStarted(true);
  };

  const handleQuizComplete = (newAttemptId: string) => {
    setAttemptId(newAttemptId);
    setQuizStarted(false);
    setShowResults(true);
    checkAttemptLimit();
  };

  const handleResetQuiz = () => {
    setQuizStarted(false);
    setShowResults(false);
    setAttemptId(null);
    checkAttemptLimit();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
  };

  const handleViewResults = () => {
    navigate('/my-results');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (quizStarted) {
    return <QuizTaking quizId={selectedQuizId} userId={userId} onComplete={handleQuizComplete} />;
  }

  if (showResults && attemptId) {
    return <QuizResults attemptId={attemptId} onReset={handleResetQuiz} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Quiz Portal</h1>
            <p className="text-muted-foreground">Select a quiz to get started</p>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Button onClick={handleAdminDashboard} variant="outline">
                Admin Dashboard
              </Button>
            )}
            <Button onClick={handleViewResults} variant="outline">
              <Award className="mr-2 h-4 w-4" />
              My Results
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Available Quizzes</label>
              <Select value={selectedQuizId} onValueChange={setSelectedQuizId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a quiz" />
                </SelectTrigger>
                <SelectContent>
                  {quizzes.map((quiz) => (
                    <SelectItem key={quiz.id} value={quiz.id}>
                      {quiz.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedQuizId && (() => {
              const quiz = quizzes.find(q => q.id === selectedQuizId);
              return quiz ? (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h3 className="font-semibold">{quiz.title}</h3>
                    <p className="text-sm text-muted-foreground">{quiz.description}</p>
                    <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
                      <div>
                        <p className="font-medium">Time Limit</p>
                        <p className="text-muted-foreground">{quiz.time_limit} minutes</p>
                      </div>
                      <div>
                        <p className="font-medium">Attempts Today</p>
                        <p className="text-muted-foreground">{attemptsLeft} remaining</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleStartQuiz} 
                    className="w-full" 
                    size="lg"
                    disabled={!canTakeQuiz}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    {canTakeQuiz ? 'Start Quiz' : 'Daily Limit Reached'}
                  </Button>
                </div>
              ) : null;
            })()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
