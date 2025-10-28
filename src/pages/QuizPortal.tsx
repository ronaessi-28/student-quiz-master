import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Trophy, Clock, TrendingUp, Code, Brain, FileText, BookOpen, Zap } from 'lucide-react';
import QuizTaking from '@/components/quiz/QuizTaking';
import QuizResults from '@/components/quiz/QuizResults';

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  time_limit: number;
  max_daily_attempts: number;
  quiz_type?: string;
}

export default function QuizPortal() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [studentName, setStudentName] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [attemptId, setAttemptId] = useState<string>('');
  const [dailyAttempts, setDailyAttempts] = useState(0);
  const [userId, setUserId] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchQuizzes();
    checkDailyAttempts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    setUserId(session.user.id);
  };

  const fetchQuizzes = async () => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load quizzes',
        variant: 'destructive'
      });
    } else {
      setQuizzes(data || []);
    }
  };

  const checkDailyAttempts = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const today = new Date().toISOString().split('T')[0];
    const { count } = await supabase
      .from('quiz_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
      .gte('started_at', `${today}T00:00:00`)
      .lte('started_at', `${today}T23:59:59`);

    setDailyAttempts(count || 0);
  };

  const handleStartQuiz = async (quiz: Quiz) => {
    if (!studentName.trim()) {
      toast({
        title: 'Name Required',
        description: 'Please enter your name to start',
        variant: 'destructive'
      });
      return;
    }

    if (dailyAttempts >= 5) {
      toast({
        title: 'Daily Limit Reached',
        description: 'You have reached the maximum of 5 quiz attempts for today. Please try again tomorrow.',
        variant: 'destructive'
      });
      return;
    }

    setSelectedQuiz(quiz);
    setQuizStarted(true);
  };

  const handleQuizComplete = (completedAttemptId: string) => {
    setAttemptId(completedAttemptId);
    setQuizStarted(false);
    checkDailyAttempts();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const resetQuiz = () => {
    setAttemptId('');
    setSelectedQuiz(null);
    setStudentName('');
    checkDailyAttempts();
  };

  const getQuizIcon = (quiz: Quiz) => {
    switch (quiz.quiz_type) {
      case 'coding': return <Code className="h-8 w-8" />;
      case 'technical': return <Brain className="h-8 w-8" />;
      case 'writing': return <FileText className="h-8 w-8" />;
      case 'vocabulary': return <BookOpen className="h-8 w-8" />;
      default: return <Zap className="h-8 w-8" />;
    }
  };

  const getQuizColor = (quiz: Quiz) => {
    switch (quiz.quiz_type) {
      case 'coding': return 'from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30';
      case 'technical': return 'from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30';
      case 'writing': return 'from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30';
      case 'vocabulary': return 'from-orange-500/20 to-yellow-500/20 hover:from-orange-500/30 hover:to-yellow-500/30';
      default: return 'from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30';
    }
  };

  if (quizStarted && selectedQuiz) {
    return <QuizTaking quizId={selectedQuiz.id} userId={userId} onComplete={handleQuizComplete} />;
  }

  if (attemptId) {
    return <QuizResults attemptId={attemptId} onReset={resetQuiz} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Quiz Portal
            </h1>
            <p className="text-muted-foreground">
              Choose your assessment round • Daily Attempts: {dailyAttempts}/5
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/my-results')} variant="outline">
              <Trophy className="mr-2 h-4 w-4" />
              My Results
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-xl">
                  {studentName.trim() ? studentName.charAt(0).toUpperCase() : '?'}
                </div>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Enter Your Full Name</label>
                <Input
                  placeholder="e.g., John Doe"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="text-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Available Assessment Rounds</h2>
          <p className="text-muted-foreground mb-6">
            Each round tests different skills. Complete all rounds to get a comprehensive evaluation. 
            ⚠️ Tab switching is monitored - 2 switches will auto-submit your quiz.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <Card 
              key={quiz.id} 
              className={`hover:shadow-xl transition-all duration-300 border-2 bg-gradient-to-br ${getQuizColor(quiz)}`}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-background/80 backdrop-blur-sm">
                    {getQuizIcon(quiz)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{quiz.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1 uppercase font-semibold">
                      {quiz.quiz_type || 'General'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{quiz.description}</p>
                <div className="space-y-2 text-sm bg-background/60 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Duration</span>
                    </div>
                    <span className="font-bold">{quiz.time_limit} min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Daily Limit</span>
                    </div>
                    <span className="font-bold">{quiz.max_daily_attempts} attempts</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleStartQuiz(quiz)} 
                  className="w-full font-semibold"
                  disabled={!studentName.trim() || dailyAttempts >= 5}
                  size="lg"
                >
                  {dailyAttempts >= 5 ? 'Daily Limit Reached' : 'Start Quiz'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
