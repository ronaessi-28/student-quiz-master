import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Play, CheckCircle, XCircle, Code } from 'lucide-react';

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
}

export default function CodingQuestion({
  question,
  subject,
  onAnswer,
  selectedAnswer
}: CodingQuestionProps) {
  const [code, setCode] = useState(selectedAnswer || '');
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Sample test cases - in a real app, these would come from the question data
  const testCases: TestCase[] = [
    { input: '5', expectedOutput: '120' },
    { input: '0', expectedOutput: '1' },
    { input: '3', expectedOutput: '6' },
  ];

  const handleRunCode = () => {
    setIsRunning(true);
    
    // Simulate running code - in a real app, this would use a code execution API
    setTimeout(() => {
      const results = testCases.map(tc => ({
        ...tc,
        passed: Math.random() > 0.3 // Simulate pass/fail
      }));
      setTestResults(results);
      setIsRunning(false);
    }, 1000);
  };

  const handleSubmit = () => {
    onAnswer(code);
  };

  const passedTests = testResults.filter(t => t.passed).length;
  const totalTests = testResults.length;

  return (
    <div className="space-y-4">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
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
            <h4 className="font-semibold mb-2">Example:</h4>
            <div className="bg-muted p-3 rounded font-mono text-sm">
              <div>Input: {testCases[0].input}</div>
              <div>Output: {testCases[0].expectedOutput}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Code Editor</CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={handleRunCode}
                  variant="outline"
                  size="sm"
                  disabled={isRunning || !code.trim()}
                >
                  <Play className="h-4 w-4 mr-1" />
                  {isRunning ? 'Running...' : 'Run'}
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="sm"
                  disabled={!code.trim()}
                >
                  Submit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Write your code here&#10;function solution(input) {&#10;  // Your code&#10;  return result;&#10;}"
              className="font-mono text-sm min-h-[400px] resize-none"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg">Test Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {testResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Code className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Click "Run" to test your code</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-semibold">Test Results</span>
                  <Badge variant={passedTests === totalTests ? 'default' : 'destructive'}>
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
