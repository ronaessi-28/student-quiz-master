
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, Quiz } from '@/contexts/AuthContext';
import { BookOpen, Brain, Code, Plus, Users, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TeacherDashboard: React.FC = () => {
  const { currentUser, quizzes, addQuiz, logout, quizAttempts } = useAuth();
  const { toast } = useToast();
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    type: 'theory' as 'theory' | 'aptitude' | 'coding',
    dueDate: '',
  });

  const generateQuizWithAI = async (type: 'theory' | 'aptitude' | 'coding') => {
    // Simulate AI quiz generation
    const questionRanges = {
      theory: { start: 1, end: 110 },
      aptitude: { start: 111, end: 176 },
      coding: { start: 177, end: 184 }
    };

    const range = questionRanges[type];
    const questions = [];
    
    for (let i = range.start; i <= range.end; i++) {
      if (type === 'coding') {
        questions.push({
          id: i,
          type: 'coding',
          question: `Coding Problem ${i - range.start + 1}: Write a function to solve this problem`,
          difficulty: 'medium'
        });
      } else {
        questions.push({
          id: i,
          type: 'multiple-choice',
          question: `${type === 'theory' ? 'Theory' : 'Aptitude'} Question ${i}`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0
        });
      }
    }

    return questions;
  };

  const handleCreateQuiz = async () => {
    if (!newQuiz.title || !newQuiz.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsCreatingQuiz(true);
    
    try {
      const questions = await generateQuizWithAI(newQuiz.type);
      
      const quiz: Quiz = {
        id: `quiz-${Date.now()}`,
        title: newQuiz.title,
        type: newQuiz.type,
        status: 'active',
        createdBy: currentUser?.id || '',
        assignedTo: ['raman-001'], // Assign to Raman by default
        dueDate: newQuiz.dueDate,
        questions,
        createdAt: new Date().toISOString()
      };

      addQuiz(quiz);
      
      toast({
        title: "Success",
        description: `${newQuiz.type} quiz created successfully with AI-generated questions!`
      });

      setNewQuiz({ title: '', type: 'theory', dueDate: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create quiz",
        variant: "destructive"
      });
    } finally {
      setIsCreatingQuiz(false);
    }
  };

  const getQuizIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="h-4 w-4" />;
      case 'aptitude': return <Brain className="h-4 w-4" />;
      case 'coding': return <Code className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getStudentStats = () => {
    const ramanAttempts = quizAttempts.filter(attempt => attempt.userId === 'raman-001');
    const totalQuizzes = quizzes.filter(quiz => quiz.assignedTo.includes('raman-001')).length;
    const completedQuizzes = ramanAttempts.length;
    const averageScore = ramanAttempts.length > 0 
      ? Math.round(ramanAttempts.reduce((acc, attempt) => acc + (attempt.score / attempt.totalQuestions) * 100, 0) / ramanAttempts.length)
      : 0;

    return { totalQuizzes, completedQuizzes, averageScore };
  };

  const stats = getStudentStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
            <p className="text-gray-600">Welcome, {currentUser?.name}</p>
          </div>
          <Button onClick={logout} variant="outline">Logout</Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quizzes Created</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quizzes.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Student Progress</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedQuizzes}/{stats.totalQuizzes}</div>
              <p className="text-xs text-muted-foreground">Quizzes completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">Student average</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList>
            <TabsTrigger value="create">Create Quiz</TabsTrigger>
            <TabsTrigger value="manage">Manage Quizzes</TabsTrigger>
            <TabsTrigger value="analytics">Student Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Quiz with AI
                </CardTitle>
                <CardDescription>
                  Generate quizzes automatically using AI for different subjects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Quiz Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter quiz title"
                      value={newQuiz.title}
                      onChange={(e) => setNewQuiz(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newQuiz.dueDate}
                      onChange={(e) => setNewQuiz(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Quiz Type</Label>
                  <Select 
                    value={newQuiz.type} 
                    onValueChange={(value: 'theory' | 'aptitude' | 'coding') => 
                      setNewQuiz(prev => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theory">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Theory Concepts (Questions 1-110)
                        </div>
                      </SelectItem>
                      <SelectItem value="aptitude">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Aptitude Section (Questions 111-176)
                        </div>
                      </SelectItem>
                      <SelectItem value="coding">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          Coding Section (Questions 177-184)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleCreateQuiz} 
                  disabled={isCreatingQuiz}
                  className="w-full"
                >
                  {isCreatingQuiz ? 'Generating Quiz...' : 'Create Quiz with AI'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Management</CardTitle>
                <CardDescription>Manage all created quizzes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizzes.map(quiz => (
                    <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getQuizIcon(quiz.type)}
                        <div>
                          <h3 className="font-medium">{quiz.title}</h3>
                          <p className="text-sm text-gray-500">
                            {quiz.type} • Due: {new Date(quiz.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          quiz.status === 'active' ? 'bg-green-100 text-green-800' :
                          quiz.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {quiz.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {quizzes.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No quizzes created yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Student Analytics</CardTitle>
                <CardDescription>Raman's performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{stats.totalQuizzes}</div>
                      <div className="text-sm text-gray-500">Total Assigned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{stats.completedQuizzes}</div>
                      <div className="text-sm text-gray-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{stats.averageScore}%</div>
                      <div className="text-sm text-gray-500">Average Score</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Quiz Attempts</h4>
                    {quizAttempts
                      .filter(attempt => attempt.userId === 'raman-001')
                      .slice(0, 5)
                      .map(attempt => (
                        <div key={attempt.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <span className="font-medium">{attempt.quizType} Quiz</span>
                            <p className="text-sm text-gray-500">
                              {new Date(attempt.completedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-bold">
                              {Math-round((attempt.score / attempt.totalQuestions) * 100)}%
                            </span>
                            <p className="text-sm text-gray-500">
                              {attempt.score}/{attempt.totalQuestions}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
