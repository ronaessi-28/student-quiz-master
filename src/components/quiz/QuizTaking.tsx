import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Clock, Shield, Flag, CheckCircle2 } from 'lucide-react';
import CodingQuestion from './CodingQuestion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  subject: string;
  question_type?: string;
}

interface QuizTakingProps {
  quizId: string;
  userId: string;
  onComplete: (attemptId: string) => void;
}

export default function QuizTaking({ quizId, userId, onComplete }: QuizTakingProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [attemptId, setAttemptId] = useState<string>('');
  const [startTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState(180 * 60);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [hasWarned, setHasWarned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    initializeQuiz();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prevent copy-paste
  useEffect(() => {
    const preventCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      toast({
        title: 'Action Blocked',
        description: 'Copy/paste is not allowed during the quiz',
        variant: 'destructive'
      });
    };

    document.addEventListener('copy', preventCopyPaste);
    document.addEventListener('paste', preventCopyPaste);
    document.addEventListener('cut', preventCopyPaste);

    return () => {
      document.removeEventListener('copy', preventCopyPaste);
      document.removeEventListener('paste', preventCopyPaste);
      document.removeEventListener('cut', preventCopyPaste);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => prev + 1);
        if (!hasWarned) {
          setHasWarned(true);
          toast({
            title: '⚠️ Warning: Tab Switch Detected',
            description: 'Next tab switch will auto-submit your quiz!',
            variant: 'destructive',
            duration: 5000
          });
        } else {
          toast({
            title: 'Quiz Auto-Submitted',
            description: 'You switched tabs twice. Quiz has been submitted automatically.',
            variant: 'destructive'
          });
          handleSubmit(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [hasWarned]);

  const initializeQuiz = async () => {
    // Fetch quiz questions
    const { data: questionsData } = await supabase
      .from('questions')
      .select('*')
      .eq('quiz_id', quizId);

    setQuestions(questionsData || []);

    // Create quiz attempt
    const { data: attemptData } = await supabase
      .from('quiz_attempts')
      .insert([{
        user_id: userId,
        quiz_id: quizId,
        student_name: 'Student',
        total_questions: questionsData?.length || 0
      }])
      .select()
      .single();

    if (attemptData) {
      setAttemptId(attemptData.id);
    }

    setLoading(false);
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const toggleMarkForReview = () => {
    const questionId = questions[currentQuestionIndex].id;
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getQuestionStatus = (questionId: string) => {
    if (markedForReview.has(questionId)) return 'review';
    if (answers[questionId]) return 'answered';
    return 'unanswered';
  };

  const handleSubmit = async (autoSubmit = false) => {
    const timeSpent = Math.round((new Date().getTime() - startTime.getTime()) / 1000);
    
    // Calculate score
    let score = 0;
    const userAnswers = [];

    for (const question of questions) {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correct_answer;
      if (isCorrect) score++;

      if (userAnswer) {
        userAnswers.push({
          attempt_id: attemptId,
          question_id: question.id,
          selected_answer: userAnswer,
          is_correct: isCorrect
        });
      }
    }

    // Update attempt
    await supabase
      .from('quiz_attempts')
      .update({
        score,
        time_taken: timeSpent,
        completed_at: new Date().toISOString(),
        tab_switches: tabSwitchCount
      })
      .eq('id', attemptId);

    // Save answers
    if (userAnswers.length > 0) {
      await supabase
        .from('user_answers')
        .insert(userAnswers);
    }

    toast({
      title: autoSubmit ? 'Quiz Auto-Submitted' : 'Quiz Submitted',
      description: `You scored ${score}/${questions.length}`
    });

    onComplete(attemptId);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isCodingQuestion = currentQuestion?.question_type === 'coding';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg border-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-lg font-mono font-bold">{formatTime(timeRemaining)}</span>
              </div>
              {tabSwitchCount > 0 && (
                <div className="flex items-center gap-2 bg-destructive/10 px-4 py-2 rounded-lg border-2 border-destructive/50">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span className="font-medium text-destructive">Warnings: {tabSwitchCount}/2</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowQuitConfirm(true)}>
                Quit Quiz
              </Button>
              <div className="flex items-center gap-2 text-sm bg-background px-3 py-2 rounded-lg border">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Copy/Paste Disabled</span>
              </div>
              <div className="text-sm text-muted-foreground bg-background px-4 py-2 rounded-lg border font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Question Navigation Panel */}
          <div className="col-span-3">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-sm">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => {
                    const status = getQuestionStatus(q.id);
                    return (
                      <Button
                        key={q.id}
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={cn(
                          "h-10 w-10 p-0",
                          currentQuestionIndex === idx && "ring-2 ring-primary",
                          status === 'answered' && "bg-green-500/20 border-green-500/50",
                          status === 'review' && "bg-yellow-500/20 border-yellow-500/50",
                          status === 'unanswered' && "bg-muted"
                        )}
                      >
                        {idx + 1}
                      </Button>
                    );
                  })}
                </div>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-green-500/20 border border-green-500/50" />
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-yellow-500/20 border border-yellow-500/50" />
                    <span>Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-muted border" />
                    <span>Not Answered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Content */}
          <div className="col-span-9 space-y-4">

            {isCodingQuestion ? (
              <CodingQuestion
                question={currentQuestion.question_text}
                subject={currentQuestion.subject}
                onAnswer={handleAnswerSelect}
                selectedAnswer={answers[currentQuestion.id]}
              />
            ) : (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">{currentQuestion?.question_text}</CardTitle>
                  <p className="text-sm text-muted-foreground">Subject: {currentQuestion?.subject}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {['A', 'B', 'C', 'D'].map((option) => {
                      const optionText = currentQuestion?.[`option_${option.toLowerCase()}` as keyof Question];
                      const isSelected = answers[currentQuestion?.id] === option;

                      return (
                        <Button
                          key={option}
                          variant={isSelected ? 'default' : 'outline'}
                          className="w-full justify-start text-left h-auto p-4 text-base transition-all hover:scale-[1.02]"
                          onClick={() => handleAnswerSelect(option)}
                        >
                          <span className="font-bold mr-3 text-lg">{option}.</span>
                          <span>{optionText}</span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-2">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  size="lg"
                >
                  ← Previous
                </Button>
                <Button
                  onClick={toggleMarkForReview}
                  variant={markedForReview.has(currentQuestion.id) ? 'default' : 'outline'}
                  size="lg"
                >
                  <Flag className="mr-2 h-4 w-4" />
                  {markedForReview.has(currentQuestion.id) ? 'Marked' : 'Mark for Review'}
                </Button>
              </div>
              
              {currentQuestionIndex === questions.length - 1 ? (
                <Button onClick={() => handleSubmit(false)} size="lg" className="font-semibold">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Submit Quiz →
                </Button>
              ) : (
                <Button onClick={handleNext} size="lg">
                  Next →
                </Button>
              )}
            </div>
          </div>
        </div>

        <AlertDialog open={showQuitConfirm} onOpenChange={setShowQuitConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Quit Quiz?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to quit? Your progress will be lost and this will count as an attempt.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continue Quiz</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleSubmit(true)} className="bg-destructive text-destructive-foreground">
                Quit & Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
