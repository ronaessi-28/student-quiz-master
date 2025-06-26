import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CodingTextarea } from '@/components/ui/coding-textarea';
import { CheckCircle, User, Award, Clock, Download, FileText, Share2 } from 'lucide-react';
import { quizData, correctAnswers } from '@/data/quizData';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import AnswerChecker from '@/components/AnswerChecker';

interface StudentResponse {
  studentName: string;
  answers: Record<number, string>;
  completedAt: Date;
  timeSpent: number;
  id: string;
}

const Index = () => {
  const [studentName, setStudentName] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [allResponses, setAllResponses] = useState<StudentResponse[]>([]);
  const [isTeacherView, setIsTeacherView] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180 * 60);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showAnswerChecker, setShowAnswerChecker] = useState(false);
  const [quizId, setQuizId] = useState<string>('');
  const { toast } = useToast();

  // Generate or get quiz ID from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let currentQuizId = urlParams.get('quiz');
    
    if (!currentQuizId) {
      currentQuizId = 'quiz_' + Date.now().toString();
      setQuizId(currentQuizId);
      // Update URL without refreshing
      const newUrl = `${window.location.pathname}?quiz=${currentQuizId}`;
      window.history.replaceState({}, '', newUrl);
    } else {
      setQuizId(currentQuizId);
    }
  }, []);

  // Load responses from localStorage and URL sharing
  useEffect(() => {
    if (!quizId) return;

    const savedResponses = localStorage.getItem(`quizResponses_${quizId}`);
    if (savedResponses) {
      try {
        const parsed = JSON.parse(savedResponses);
        const responsesWithDates = parsed.map((response: any) => ({
          ...response,
          completedAt: new Date(response.completedAt)
        }));
        setAllResponses(responsesWithDates);
      } catch (error) {
        console.error('Error parsing saved responses:', error);
      }
    }

    // Check for shared response in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedResponse = urlParams.get('response');
    if (sharedResponse) {
      try {
        const decoded = JSON.parse(decodeURIComponent(sharedResponse));
        const responseWithDate = {
          ...decoded,
          completedAt: new Date(decoded.completedAt)
        };
        setAllResponses(prev => {
          const exists = prev.find(r => r.id === responseWithDate.id);
          if (!exists) {
            const updated = [...prev, responseWithDate];
            localStorage.setItem(`quizResponses_${quizId}`, JSON.stringify(updated));
            return updated;
          }
          return prev;
        });
      } catch (error) {
        console.error('Error parsing shared response:', error);
      }
    }
  }, [quizId]);

  // Save responses to localStorage whenever allResponses changes
  useEffect(() => {
    if (allResponses.length > 0 && quizId) {
      localStorage.setItem(`quizResponses_${quizId}`, JSON.stringify(allResponses));
    }
  }, [allResponses, quizId]);

  // Flatten all questions from all subjects into one array
  const allQuestions = Object.entries(quizData).flatMap(([subject, questions]) => 
    questions.map(question => ({ 
      ...question, 
      subject,
      type: (question.type || 'multiple-choice') as 'multiple-choice' | 'coding'
    }))
  );

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (quizStarted && !showResults && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [quizStarted, showResults, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    if (!studentName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name before starting the quiz.",
        variant: "destructive"
      });
      return;
    }
    setAnswers({});
    setShowResults(false);
    setQuizStarted(true);
    setStartTime(new Date());
    setTimeRemaining(180 * 60);
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleAutoSubmit = () => {
    if (!startTime) return;
    
    const timeSpent = Math.round((new Date().getTime() - startTime.getTime()) / 1000);
    
    const response: StudentResponse = {
      studentName,
      answers,
      completedAt: new Date(),
      timeSpent,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };

    setAllResponses(prev => [...prev, response]);
    setShowResults(true);
    setQuizStarted(false);
    
    // Share response via URL
    shareResponse(response);
    
    toast({
      title: "Time's Up!",
      description: "Your quiz has been automatically submitted and saved.",
      variant: "destructive"
    });
  };

  const handleSubmitQuiz = () => {
    if (!startTime) return;
    
    const timeSpent = Math.round((new Date().getTime() - startTime.getTime()) / 1000);
    
    const response: StudentResponse = {
      studentName,
      answers,
      completedAt: new Date(),
      timeSpent,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };

    setAllResponses(prev => [...prev, response]);
    setShowResults(true);
    setQuizStarted(false);
    
    // Share response via URL
    shareResponse(response);
    
    toast({
      title: "Quiz Submitted!",
      description: "Your responses have been recorded and saved successfully.",
    });
  };

  const shareResponse = (response: StudentResponse) => {
    const responseData = encodeURIComponent(JSON.stringify(response));
    const shareUrl = `${window.location.origin}${window.location.pathname}?quiz=${quizId}&response=${responseData}`;
    
    // Open in new tab to share the response
    window.open(shareUrl, '_blank');
  };

  const getShareableUrl = () => {
    return `${window.location.origin}${window.location.pathname}?quiz=${quizId}`;
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(getShareableUrl());
    toast({
      title: "Link Copied!",
      description: "Share this link with students to collect their responses.",
    });
  };

  const getCorrectAnswer = (questionIndex: number, subject: string): string => {
    const subjectAnswers = correctAnswers[subject];
    if (!subjectAnswers) return "Answer not available";
    
    const subjectQuestions = allQuestions.filter(q => q.subject === subject);
    const questionInSubject = allQuestions[questionIndex];
    const indexInSubject = subjectQuestions.findIndex(q => q.question === questionInSubject.question);
    
    return subjectAnswers[indexInSubject] || "Answer not available";
  };

  const isAnswerCorrect = (questionIndex: number, userAnswer: string): boolean => {
    const question = allQuestions[questionIndex];
    const correctAnswer = getCorrectAnswer(questionIndex, question.subject);
    return userAnswer === correctAnswer;
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
    setStudentName('');
    setQuizStarted(false);
    setTimeRemaining(180 * 60);
    setStartTime(null);
  };

  const exportResponses = () => {
    const dataStr = JSON.stringify(allResponses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz-responses-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearAllResponses = () => {
    if (confirm('Are you sure you want to clear all responses? This action cannot be undone.')) {
      setAllResponses([]);
      localStorage.removeItem(`quizResponses_${quizId}`);
      toast({
        title: "Responses Cleared",
        description: "All quiz responses have been cleared.",
      });
    }
  };

  const exportResponsesAsPDF = (response: StudentResponse) => {
    const pdf = new jsPDF();
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    let yPosition = 20;
    
    // Title
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Quiz Response Report', 20, yPosition);
    yPosition += 25;
    
    // Student info
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Student Name: ${response.studentName}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Completed: ${response.completedAt.toLocaleString()}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Time Spent: ${formatTime(response.timeSpent)}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Questions Answered: ${Object.keys(response.answers).length}/${allQuestions.length}`, 20, yPosition);
    yPosition += 15;
    
    // Calculate score
    const answeredQuestions = Object.keys(response.answers);
    const correctCount = answeredQuestions.filter(key => 
      isAnswerCorrect(parseInt(key), response.answers[parseInt(key)])
    ).length;
    const percentage = answeredQuestions.length > 0 ? Math.round((correctCount / answeredQuestions.length) * 100) : 0;
    
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Score: ${correctCount}/${answeredQuestions.length} (${percentage}%)`, 20, yPosition);
    yPosition += 20;
    
    // Questions and answers
    Object.entries(response.answers).forEach(([questionIndex, userAnswer]) => {
      const qIndex = parseInt(questionIndex);
      const question = allQuestions[qIndex];
      const correctAnswer = getCorrectAnswer(qIndex, question.subject);
      const isCorrect = isAnswerCorrect(qIndex, userAnswer);
      
      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      }
      
      // Question number and text
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      const questionText = `Q${qIndex + 1}: ${question.question}`;
      const questionLines = pdf.splitTextToSize(questionText, pageWidth - 40);
      pdf.text(questionLines, 20, yPosition);
      yPosition += questionLines.length * 6 + 5;
      
      // Subject
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Subject: ${question.subject}`, 20, yPosition);
      yPosition += 10;
      
      // User's Answer
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);
      
      const questionType = question.type as 'multiple-choice' | 'coding';
      
      if (questionType === 'coding') {
        pdf.text('Your Code Answer:', 20, yPosition);
        yPosition += 6;
        pdf.setFont('courier', 'normal');
        pdf.setFontSize(9);
        const codeLines = pdf.splitTextToSize(userAnswer, pageWidth - 40);
        pdf.text(codeLines, 25, yPosition);
        yPosition += codeLines.length * 4 + 8;
      } else {
        // Show user answer with color coding
        if (isCorrect) {
          pdf.setTextColor(0, 128, 0); // Green
          pdf.text('✓ Your Answer: ' + userAnswer, 20, yPosition);
        } else {
          pdf.setTextColor(255, 0, 0); // Red
          pdf.text('✗ Your Answer: ' + userAnswer, 20, yPosition);
        }
        yPosition += 8;
        
        // Show correct answer if wrong
        if (!isCorrect && questionType !== 'coding') {
          pdf.setTextColor(0, 128, 0); // Green
          pdf.text('✓ Correct Answer: ' + correctAnswer, 20, yPosition);
          yPosition += 8;
        }
      }
      
      pdf.setTextColor(0, 0, 0); // Reset to black
      yPosition += 10;
    });
    
    // Save the PDF
    pdf.save(`${response.studentName}_quiz_response.pdf`);
  };

  if (isTeacherView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Student Responses ({allResponses.length})</h1>
            <div className="flex gap-3">
              <Button onClick={copyShareLink} variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Copy Share Link
              </Button>
              {allResponses.length > 0 && (
                <>
                  <Button onClick={exportResponses} variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export JSON
                  </Button>
                  <Button onClick={clearAllResponses} variant="destructive">
                    Clear All
                  </Button>
                </>
              )}
              <Button onClick={() => setIsTeacherView(false)} variant="outline">
                Back to Quiz
              </Button>
            </div>
          </div>
          
          {allResponses.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 mb-4">No responses yet. Share the quiz link with students to start collecting responses.</p>
                <p className="text-sm text-gray-400 mb-4">Quiz URL: {getShareableUrl()}</p>
                <Button onClick={copyShareLink} className="flex items-center gap-2 mx-auto">
                  <Share2 className="h-4 w-4" />
                  Copy Share Link
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {allResponses.map((response) => (
                <Card key={response.id} className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          {response.studentName}
                        </CardTitle>
                        <p className="text-blue-100">
                          Completed: {response.completedAt.toLocaleString()} | Time Spent: {formatTime(response.timeSpent)} | Questions Answered: {Object.keys(response.answers).length}/{allQuestions.length}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => {
                            setStudentName(response.studentName);
                            setAnswers(response.answers);
                            setShowAnswerChecker(true);
                            setIsTeacherView(false);
                          }}
                          variant="secondary"
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        >
                          Check Answers
                        </Button>
                        <Button 
                          onClick={() => exportResponsesAsPDF(response)}
                          variant="secondary"
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Export PDF
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {Object.entries(response.answers).map(([questionIndex, answer]) => {
                        const question = allQuestions[parseInt(questionIndex)];
                        const questionType = question.type as 'multiple-choice' | 'coding';
                        return (
                          <div key={questionIndex} className="border-l-4 border-blue-500 pl-4">
                            <p className="font-medium text-gray-800 mb-2">
                              Q{parseInt(questionIndex) + 1}: {question.question}
                            </p>
                            {questionType === 'coding' ? (
                              <div className="bg-gray-100 p-3 rounded">
                                <p className="text-sm text-gray-600 mb-2">Code Answer:</p>
                                <pre className="text-blue-600 font-mono text-sm whitespace-pre-wrap">{answer}</pre>
                              </div>
                            ) : (
                              <p className="text-blue-600 font-medium">Answer: {answer}</p>
                            )}
                            <p className="text-sm text-gray-500">Subject: {question.subject}</p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showAnswerChecker) {
    return (
      <AnswerChecker
        questions={allQuestions}
        userAnswers={answers}
        studentName={studentName}
        onBack={() => setShowAnswerChecker(false)}
      />
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Award className="h-8 w-8" />
              Quiz Completed!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Great job, {studentName}!
            </h2>
            <p className="text-gray-600 mb-8">
              You have successfully completed the quiz with {Object.keys(answers).length} out of {allQuestions.length} questions answered. Your responses have been submitted and saved.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                onClick={() => setShowAnswerChecker(true)} 
                className="bg-purple-600 hover:bg-purple-700"
              >
                Check Answers
              </Button>
              <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700">
                Take Quiz Again
              </Button>
              <Button onClick={() => setIsTeacherView(true)} variant="outline">
                View All Responses
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizStarted && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6 select-none">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Quiz - {studentName}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
                  <Clock className="h-5 w-5 text-red-500" />
                  <span className={`font-mono text-lg ${timeRemaining < 600 ? 'text-red-600' : 'text-gray-800'}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <div className="text-gray-600">
                  Answered: {Object.keys(answers).length}/{allQuestions.length}
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-xl mb-6">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              <CardTitle>All Questions ({allQuestions.length} Total)</CardTitle>
            </CardHeader>
            <CardContent className="p-8 select-none">
              <div className="space-y-8">
                {allQuestions.map((question, questionIndex) => {
                  const questionType = question.type as 'multiple-choice' | 'coding';
                  return (
                    <div key={questionIndex} className="border-b border-gray-200 pb-6 last:border-b-0 select-none">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 select-none">
                          Q{questionIndex + 1}: {question.question}
                        </h3>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded select-none">
                          {question.subject}
                        </span>
                      </div>
                      
                      {questionType === 'coding' ? (
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700 select-none">
                            Write your code here:
                          </label>
                          <CodingTextarea
                            placeholder="Enter your code here... (Paste is disabled for coding questions)"
                            value={answers[questionIndex] || ''}
                            onChange={(e) => handleAnswerSelect(questionIndex, e.target.value)}
                            className="min-h-[200px] font-mono text-sm"
                          />
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {question.options.map((option, optionIndex) => (
                            <label key={optionIndex} className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors select-none">
                              <input
                                type="radio"
                                name={`question-${questionIndex}`}
                                value={option}
                                checked={answers[questionIndex] === option}
                                onChange={(e) => handleAnswerSelect(questionIndex, e.target.value)}
                                className="mr-3 h-4 w-4 text-purple-600"
                              />
                              <span className="text-gray-700 select-none">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button 
                  onClick={resetQuiz} 
                  variant="outline"
                >
                  Reset
                </Button>
                <Button 
                  onClick={handleSubmitQuiz}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Submit Quiz ({Object.keys(answers).length}/{allQuestions.length} answered)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Student Quiz Portal</h1>
          <p className="text-xl text-gray-600">Complete the quiz with {allQuestions.length} questions from various subjects</p>
          <p className="text-lg text-purple-600 mt-2">⏰ Time Limit: 180 minutes (3 hours)</p>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="max-w-md mx-auto space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Name
              </label>
              <Input
                type="text"
                placeholder="Your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="text-center text-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleStartQuiz();
                  }
                }}
              />
              <Button 
                onClick={handleStartQuiz}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={!studentName.trim()}
              >
                Start Quiz ({allQuestions.length} Questions)
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Quiz Overview</h2>
            <div className="flex gap-3">
              <Button onClick={copyShareLink} variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Quiz
              </Button>
              <Button onClick={() => setIsTeacherView(true)} variant="outline">
                Teacher View ({allResponses.length} responses)
              </Button>
            </div>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                This quiz contains {allQuestions.length} questions covering the following subjects:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {Object.keys(quizData).map((subject) => (
                  <span key={subject} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {subject}
                  </span>
                ))}
              </div>
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Instructions:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• You have 180 minutes (3 hours) to complete the quiz</li>
                  <li>• It's not mandatory to answer all questions</li>
                  <li>• You can submit the quiz anytime before the timer ends</li>
                  <li>• The quiz will auto-submit when time runs out</li>
                  <li>• For coding questions, write your answer in the text area provided</li>
                  <li>• Copy-paste is disabled for coding questions to ensure authenticity</li>
                  <li>• Your responses are automatically shared and can be viewed by the teacher</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
