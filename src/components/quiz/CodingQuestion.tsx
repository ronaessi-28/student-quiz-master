import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CodingTextarea } from '@/components/ui/coding-textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, CheckCircle, XCircle, Code, Send } from 'lucide-react';

interface TestCase {
  input: string;
  expectedOutput: string;
  passed?: boolean;
}

interface CodingQuestionProps {
  question: string;
  subject: string;
  onAnswer: (code: string) => void;
  selectedAnswer?: string;
  testCases?: TestCase[];
}

export default function CodingQuestion({
  question,
  subject,
  onAnswer,
  selectedAnswer,
  testCases = [
    { input: '5', expectedOutput: '120' },
    { input: '0', expectedOutput: '1' },
    { input: '3', expectedOutput: '6' },
  ]
}: CodingQuestionProps) {
  const [code, setCode] = useState(selectedAnswer || '');
  const [language, setLanguage] = useState('python3');
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setHasRun(true);
    
    // Simulate running code - in a real app, this would use a code execution API
    setTimeout(() => {
      const results = testCases.map(tc => ({
        ...tc,
        passed: Math.random() > 0.3 // Simulate pass/fail
      }));
      setTestResults(results);
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    onAnswer(JSON.stringify({ code, language }));
  };

  const passedTests = testResults.filter(t => t.passed).length;
  const totalTests = testResults.length;
  const allTestsPassed = hasRun && passedTests === totalTests;

  return (
    <div className="space-y-4">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{question}</CardTitle>
              <Badge variant="secondary">{subject}</Badge>
            </div>
            <Code className="h-6 w-6 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Problem Description:</h4>
            <p className="text-sm text-muted-foreground">
              Write a function that solves the given problem. Your solution should handle all edge cases
              and work efficiently for the given constraints.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Examples:</h4>
            <div className="space-y-2">
              {testCases.slice(0, 2).map((tc, idx) => (
                <div key={idx} className="bg-muted p-3 rounded font-mono text-sm">
                  <div><span className="text-muted-foreground">Input:</span> {tc.input}</div>
                  <div><span className="text-muted-foreground">Output:</span> {tc.expectedOutput}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-lg">Code Editor</CardTitle>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python3">Python3</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodingTextarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Write your code here&#10;function solution(input) {&#10;  // Your code&#10;  return result;&#10;}"
              className="font-mono text-sm min-h-[350px] resize-none"
              spellCheck={false}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleRunCode}
                variant="outline"
                size="sm"
                disabled={isRunning || !code.trim()}
                className="flex-1"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
              <Button
                onClick={handleSubmit}
                size="sm"
                disabled={!allTestsPassed}
                className="flex-1"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>
            {!allTestsPassed && hasRun && (
              <p className="text-sm text-destructive">
                All test cases must pass before submitting
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg">Test Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!hasRun ? (
              <>
                <div className="text-sm text-muted-foreground mb-3">
                  Click "Run Code" to test against these cases
                </div>
                {testCases.map((tc, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border-2 border-border bg-muted/30"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Test Case {index + 1}</span>
                    </div>
                    <div className="text-sm space-y-1 font-mono">
                      <div>
                        <span className="text-muted-foreground">Input:</span> {tc.input}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected Output:</span> {tc.expectedOutput}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-semibold">Test Results</span>
                  <Badge variant={allTestsPassed ? 'default' : 'destructive'}>
                    {passedTests}/{totalTests} Passed
                  </Badge>
                </div>
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 ${
                      result.passed
                        ? 'border-green-500/50 bg-green-500/10'
                        : 'border-red-500/50 bg-red-500/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className="font-medium">Test Case {index + 1}</span>
                    </div>
                    <div className="text-sm space-y-1 font-mono">
                      <div>
                        <span className="text-muted-foreground">Input:</span> {result.input}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected:</span> {result.expectedOutput}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
