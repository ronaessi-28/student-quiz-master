import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Users, Target, Clock } from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
}

interface Analytics {
  totalAttempts: number;
  averageScore: number;
  averageTime: number;
  uniqueStudents: number;
}

export default function AnalyticsDashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string>('');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (selectedQuizId) {
      fetchAnalytics();
    }
  }, [selectedQuizId]);

  const fetchQuizzes = async () => {
    const { data } = await supabase
      .from('quizzes')
      .select('id, title')
      .order('created_at', { ascending: false });

    setQuizzes(data || []);
    if (data && data.length > 0) {
      setSelectedQuizId(data[0].id);
    }
    setLoading(false);
  };

  const fetchAnalytics = async () => {
    if (!selectedQuizId) return;

    const { data: attempts } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('quiz_id', selectedQuizId)
      .not('completed_at', 'is', null);

    if (attempts && attempts.length > 0) {
      const totalScore = attempts.reduce((sum, a) => sum + a.score, 0);
      const totalTime = attempts.reduce((sum, a) => sum + (a.time_taken || 0), 0);
      const uniqueUsers = new Set(attempts.map(a => a.user_id)).size;

      setAnalytics({
        totalAttempts: attempts.length,
        averageScore: Math.round((totalScore / attempts.length / attempts[0].total_questions) * 100),
        averageTime: Math.round(totalTime / attempts.length / 60),
        uniqueStudents: uniqueUsers
      });
    } else {
      setAnalytics({
        totalAttempts: 0,
        averageScore: 0,
        averageTime: 0,
        uniqueStudents: 0
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="w-64">
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
      </div>

      {analytics && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalAttempts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.uniqueStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.averageScore}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.averageTime} min</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
