
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, X, ArrowLeft } from 'lucide-react';
import { correctAnswers } from '@/data/quizData';

interface Question {
  question: string;
  options: string[];
  type: string;
  subject: string;
}

interface AnswerCheckerProps {
  questions: Question[];
  userAnswers: Record<number, string>;
  studentName: string;
  onBack: () => void;
}

const AnswerChecker: React.FC<AnswerCheckerProps> = ({
  questions,
  userAnswers,
  studentName,
  onBack
}) => {
  const getCorrectAnswer = (questionIndex: number, subject: string): string => {
    const subjectAnswers = correctAnswers[subject];
    if (!subjectAnswers) return "Answer not available";
    
    // Find the index within the subject
    const subjectQuestions = questions.filter(q => q.subject === subject);
    const questionInSubject = questions[questionIndex];
    const indexInSubject = subjectQuestions.findIndex(q => q.question === questionInSubject.question);
    
    return subjectAnswers[indexInSubject] || "Answer not available";
  };

  const isCorrect = (questionIndex: number): boolean => {
    const userAnswer = userAnswers[questionIndex];
    const correctAnswer = getCorrectAnswer(questionIndex, questions[questionIndex].subject);
    return userAnswer === correctAnswer;
  };

  const calculateScore = (): { correct: number; answered: number; total: number; percentage: number } => {
    const answeredQuestions = Object.keys(userAnswers).length;
    const correctCount = Object.keys(userAnswers).filter(key => 
      isCorrect(parseInt(key))
    ).length;
    const totalQuestions = questions.length;
    
    return {
      correct: correctCount,
      answered: answeredQuestions,
      total: totalQuestions,
      percentage: totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0
    };
  };

  const score = calculateScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Answer Review - {studentName}</h1>
          <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Score Summary */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6" />
              Score Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{score.correct}</p>
                <p className="text-gray-600">Correct</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{score.answered - score.correct}</p>
                <p className="text-gray-600">Incorrect</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">{score.total - score.answered}</p>
                <p className="text-gray-600">Unanswered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{score.percentage}%</p>
                <p className="text-gray-600">Overall Score</p>
              </div>
            </div>
            <div className="mt-4 text-center text-gray-600">
              <p className="text-sm">
                {score.correct} correct out of {score.total} total questions 
                ({score.answered} answered, {score.total - score.answered} unanswered)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Questions and Answers */}
        <div className="space-y-6">
          {Object.entries(userAnswers).map(([questionIndex, userAnswer]) => {
            const qIndex = parseInt(questionIndex);
            const question = questions[qIndex];
            const correctAnswer = getCorrectAnswer(qIndex, question.subject);
            const correct = isCorrect(qIndex);

            return (
              <Card key={questionIndex} className="shadow-lg">
                <CardHeader className={`${correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        {correct ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <X className="h-5 w-5 text-red-600" />
                        )}
                        Q{qIndex + 1}: {question.question}
                      </CardTitle>
                    </div>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {question.subject}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* User's Answer */}
                    <div className={`p-4 rounded-lg border-2 ${
                      correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}>
                      <p className="font-medium text-gray-700 mb-2">Your Answer:</p>
                      {question.type === 'coding' ? (
                        <pre className="text-sm bg-gray-100 p-3 rounded whitespace-pre-wrap font-mono">
                          {userAnswer}
                        </pre>
                      ) : (
                        <p className={`font-medium ${correct ? 'text-green-700' : 'text-red-700'}`}>
                          {userAnswer}
                        </p>
                      )}
                    </div>

                    {/* Correct Answer (if user was wrong) */}
                    {!correct && question.type !== 'coding' && (
                      <div className="p-4 rounded-lg border-2 bg-green-50 border-green-200">
                        <p className="font-medium text-gray-700 mb-2">Correct Answer:</p>
                        <p className="font-medium text-green-700">{correctAnswer}</p>
                      </div>
                    )}

                    {/* For coding questions, just show it's a coding question */}
                    {question.type === 'coding' && (
                      <div className="p-4 rounded-lg border-2 bg-blue-50 border-blue-200">
                        <p className="text-blue-700 font-medium">
                          This is a coding question. Please review your solution with the expected approach.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Unanswered Questions */}
        {Object.keys(userAnswers).length < questions.length && (
          <Card className="mt-6 shadow-lg">
            <CardHeader className="bg-yellow-50 border-yellow-200">
              <CardTitle className="text-yellow-800">
                Unanswered Questions ({questions.length - Object.keys(userAnswers).length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-yellow-700">
                You didn't answer {questions.length - Object.keys(userAnswers).length} out of {questions.length} questions.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AnswerChecker;
