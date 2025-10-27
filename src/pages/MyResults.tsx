import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Award } from 'lucide-react';

interface QuizAttempt {
  id: string;
  score: number;
  total_questions: number;
  time_taken: number;
  completed_at: string;
  quizzes: {
    title: string;
  };
}

export default function MyResults() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data } = await supabase
      .from('quiz_attempts')
      .select(`
        *,
        quizzes (title)
      `)
      .eq('user_id', session.user.id)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false });

    setAttempts(data || []);
    setLoading(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button onClick={() => navigate('/')} variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold">My Quiz Results</h1>
            <p className="text-muted-foreground">View your quiz attempt history</p>
          </div>
        </div>

        {attempts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Quiz Attempts Yet</h3>
              <p className="text-muted-foreground mb-4">Start taking quizzes to see your results here</p>
              <Button onClick={() => navigate('/')}>Go to Quiz Portal</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {attempts.map((attempt) => {
              const percentage = Math.round((attempt.score / attempt.total_questions) * 100);
              return (
                <Card key={attempt.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{attempt.quizzes.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(attempt.completed_at)}
                        </div>
                      </div>
                      <Badge variant={percentage >= 70 ? 'default' : percentage >= 50 ? 'secondary' : 'destructive'}>
                        {percentage}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Score</p>
                          <p className="font-semibold">{attempt.score}/{attempt.total_questions}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Time</p>
                          <p className="font-semibold">{formatTime(attempt.time_taken || 0)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                        <div>
                          <p className="text-sm text-muted-foreground">Grade</p>
                          <p className="font-semibold">
                            {percentage >= 70 ? 'Pass' : percentage >= 50 ? 'Average' : 'Needs Improvement'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
