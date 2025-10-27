import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
}

interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  subject: string;
}

export default function QuestionManager() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    quiz_id: '',
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 'A',
    subject: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (selectedQuizId) {
      fetchQuestions();
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

  const fetchQuestions = async () => {
    if (!selectedQuizId) return;

    const { data } = await supabase
      .from('questions')
      .select('*')
      .eq('quiz_id', selectedQuizId)
      .order('created_at', { ascending: false });

    setQuestions(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingQuestion) {
      const { error } = await supabase
        .from('questions')
        .update(formData)
        .eq('id', editingQuestion.id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update question',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: 'Question updated successfully'
        });
        fetchQuestions();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('questions')
        .insert([{ ...formData, quiz_id: selectedQuizId }]);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create question',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: 'Question created successfully'
        });
        fetchQuestions();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return;
    }

    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete question',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Question deleted successfully'
      });
      fetchQuestions();
    }
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      quiz_id: question.quiz_id,
      question_text: question.question_text,
      option_a: question.option_a,
      option_b: question.option_b,
      option_c: question.option_c,
      option_d: question.option_d,
      correct_answer: question.correct_answer,
      subject: question.subject
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      quiz_id: selectedQuizId,
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: 'A',
      subject: ''
    });
    setEditingQuestion(null);
    setDialogOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 max-w-xs">
          <label className="text-sm font-medium">Select Quiz</label>
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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} disabled={!selectedQuizId}>
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingQuestion ? 'Edit Question' : 'Add New Question'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Question Text</label>
                <Textarea
                  value={formData.question_text}
                  onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Option A</label>
                <Input
                  value={formData.option_a}
                  onChange={(e) => setFormData({ ...formData, option_a: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Option B</label>
                <Input
                  value={formData.option_b}
                  onChange={(e) => setFormData({ ...formData, option_b: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Option C</label>
                <Input
                  value={formData.option_c}
                  onChange={(e) => setFormData({ ...formData, option_c: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Option D</label>
                <Input
                  value={formData.option_d}
                  onChange={(e) => setFormData({ ...formData, option_d: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Correct Answer</label>
                <Select value={formData.correct_answer} onValueChange={(value) => setFormData({ ...formData, correct_answer: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                {editingQuestion ? 'Update Question' : 'Add Question'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-lg">Q{index + 1}: {question.question_text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <p>A) {question.option_a}</p>
                <p>B) {question.option_b}</p>
                <p>C) {question.option_c}</p>
                <p>D) {question.option_d}</p>
                <p className="font-bold text-green-600">Correct: {question.correct_answer}</p>
                <p className="text-muted-foreground">Subject: {question.subject}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleEdit(question)} variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button onClick={() => handleDelete(question.id)} variant="destructive" size="sm">
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
