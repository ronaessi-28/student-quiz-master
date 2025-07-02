
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  email: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  quizType: 'theory' | 'aptitude' | 'coding';
  score: number;
  totalQuestions: number;
  completedAt: string;
  answers: Record<string, any>;
}

export interface Quiz {
  id: string;
  title: string;
  type: 'theory' | 'aptitude' | 'coding';
  status: 'active' | 'pending' | 'completed';
  createdBy: string;
  assignedTo: string[];
  dueDate: string;
  questions: any[];
  createdAt: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  quizAttempts: QuizAttempt[];
  quizzes: Quiz[];
  addQuizAttempt: (attempt: QuizAttempt) => void;
  addQuiz: (quiz: Quiz) => void;
  updateQuizStatus: (quizId: string, status: Quiz['status']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    // Load data from localStorage on mount
    const savedUser = localStorage.getItem('currentUser');
    const savedAttempts = localStorage.getItem('quizAttempts');
    const savedQuizzes = localStorage.getItem('quizzes');

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedAttempts) {
      setQuizAttempts(JSON.parse(savedAttempts));
    }
    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes));
    }
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const addQuizAttempt = (attempt: QuizAttempt) => {
    const updatedAttempts = [...quizAttempts, attempt];
    setQuizAttempts(updatedAttempts);
    localStorage.setItem('quizAttempts', JSON.stringify(updatedAttempts));
  };

  const addQuiz = (quiz: Quiz) => {
    const updatedQuizzes = [...quizzes, quiz];
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };

  const updateQuizStatus = (quizId: string, status: Quiz['status']) => {
    const updatedQuizzes = quizzes.map(quiz => 
      quiz.id === quizId ? { ...quiz, status } : quiz
    );
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      quizAttempts,
      quizzes,
      addQuizAttempt,
      addQuiz,
      updateQuizStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};
