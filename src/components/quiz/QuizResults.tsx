import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Award, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuizResultsProps {
  attemptId: string;
  onReset: () => void;
}

interface QuizAttempt {
  score: number;
  total_questions: number;
  time_taken: number;
  completed_at: string;
  tab_switches: number;
}

interface UserAnswer {
  question_id: string;
  selected_answer: string;
  is_correct: boolean;
  questions: {
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: string;
    subject: string;
  };
}

export default function QuizResults({ attemptId, onReset }: QuizResultsProps) {
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchResults();
  }, [attemptId]);

  const fetchResults = async () => {
    // Fetch attempt details
    const { data: attemptData } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('id', attemptId)
      .single();

    setAttempt(attemptData);

    // Fetch user answers with question details
    const { data: answersData } = await supabase
      .from('user_answers')
      .select(`
        *,
        questions (
          question_text,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_answer,
          subject
        )
      `)
      .eq('attempt_id', attemptId);

    setAnswers(answersData || []);
    setLoading(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const handleExportCSV = () => {
    const csv = [
      ['Question', 'Subject', 'Your Answer', 'Correct Answer', 'Result'],
      ...answers.map((answer, idx) => [
        `Q${idx + 1}: ${answer.questions.question_text}`,
        answer.questions.subject,
        `${answer.selected_answer}. ${answer.questions[`option_${answer.selected_answer.toLowerCase()}` as keyof typeof answer.questions]}`,
        `${answer.questions.correct_answer}. ${answer.questions[`option_${answer.questions.correct_answer.toLowerCase()}` as keyof typeof answer.questions]}`,
        answer.is_correct ? 'Correct' : 'Incorrect'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-results-${attemptId}.csv`;
    a.click();
    
    toast({
      title: 'Export Successful',
      description: 'Results exported as CSV'
    });
  };

  if (loading || !attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const percentage = Math.round((attempt.score / attempt.total_questions) * 100);
  const subjectScores = answers.reduce((acc, answer) => {
    const subject = answer.questions.subject;
    if (!acc[subject]) {
      acc[subject] = { correct: 0, total: 0 };
    }
    acc[subject].total++;
    if (answer.is_correct) {
      acc[subject].correct++;
    }
    return acc;
  }, {} as Record<string, { correct: number; total: number }>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="container mx-auto max-w-4xl space-y-6">
        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`rounded-full p-4 ${percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                <Award className={`h-12 w-12 ${percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`} />
              </div>
            </div>
            <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
            <p className="text-4xl font-bold mt-4">{percentage}%</p>
            <p className="text-muted-foreground">
              {attempt.score} out of {attempt.total_questions} correct
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Time Taken</p>
                <p className="text-lg font-bold">{formatTime(attempt.time_taken || 0)}</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Award className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Score</p>
                <p className="text-lg font-bold">{attempt.score}/{attempt.total_questions}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Subject-wise Performance</h3>
              <div className="space-y-2">
                {Object.entries(subjectScores).map(([subject, scores]) => (
                  <div key={subject} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">{subject}</span>
                    <Badge variant={scores.correct === scores.total ? 'default' : 'secondary'}>
                      {scores.correct}/{scores.total}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleExportCSV} variant="outline" size="lg" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button onClick={onReset} size="lg" className="flex-1">
                Take Another Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Answer Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {answers.map((answer, index) => (
              <div key={answer.question_id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  {answer.is_correct ? (
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1 space-y-2">
                    <p className="font-medium">Q{index + 1}: {answer.questions.question_text}</p>
                    <p className="text-sm text-muted-foreground">Subject: {answer.questions.subject}</p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Your Answer:</span>{' '}
                        <span className={answer.is_correct ? 'text-green-600' : 'text-red-600'}>
                          {answer.selected_answer}. {answer.questions[`option_${answer.selected_answer.toLowerCase()}` as keyof typeof answer.questions]}
                        </span>
                      </p>
                      {!answer.is_correct && (
                        <p>
                          <span className="font-medium">Correct Answer:</span>{' '}
                          <span className="text-green-600">
                            {answer.questions.correct_answer}. {answer.questions[`option_${answer.questions.correct_answer.toLowerCase()}` as keyof typeof answer.questions]}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
