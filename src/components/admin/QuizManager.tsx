import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  time_limit: number;
  max_daily_attempts: number;
  created_at: string;
}

export default function QuizManager() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time_limit: 180,
    max_daily_attempts: 5
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load quizzes',
        variant: 'destructive'
      });
    } else {
      setQuizzes(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    if (editingQuiz) {
      const { error } = await supabase
        .from('quizzes')
        .update(formData)
        .eq('id', editingQuiz.id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update quiz',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: 'Quiz updated successfully'
        });
        fetchQuizzes();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('quizzes')
        .insert([{ ...formData, created_by: session.user.id }]);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create quiz',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: 'Quiz created successfully'
        });
        fetchQuizzes();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quiz? This will also delete all associated questions and attempts.')) {
      return;
    }

    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete quiz',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Quiz deleted successfully'
      });
      fetchQuizzes();
    }
  };

  const handleEdit = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setFormData({
      title: quiz.title,
      description: quiz.description || '',
      time_limit: quiz.time_limit,
      max_daily_attempts: quiz.max_daily_attempts
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      time_limit: 180,
      max_daily_attempts: 5
    });
    setEditingQuiz(null);
    setDialogOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quiz Management</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Time Limit (minutes)</label>
                <Input
                  type="number"
                  value={formData.time_limit}
                  onChange={(e) => setFormData({ ...formData, time_limit: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Max Daily Attempts</label>
                <Input
                  type="number"
                  value={formData.max_daily_attempts}
                  onChange={(e) => setFormData({ ...formData, max_daily_attempts: parseInt(e.target.value) })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{quiz.description}</p>
              <div className="text-sm">
                <p>Time Limit: {quiz.time_limit} minutes</p>
                <p>Max Attempts: {quiz.max_daily_attempts}/day</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleEdit(quiz)} variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button onClick={() => handleDelete(quiz.id)} variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
