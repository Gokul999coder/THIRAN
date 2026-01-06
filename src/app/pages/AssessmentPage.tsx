import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { motion } from 'motion/react';

// Mock questions for all levels
const generateQuestions = (level: number) => {
  const templates: Record<number, string[]> = {
    1: [
      'What is 15% of 200?',
      'If all roses are flowers and some flowers fade quickly, then:',
      'I prefer working in a team rather than alone',
      'Which activity interests you most?',
      'Complete the sequence: 2, 4, 8, 16, __',
      'I enjoy analyzing data and finding patterns',
      'Choose your preferred work environment',
      'What motivates you most in your career?',
      'I am comfortable with public speaking',
      'Which describes you best?',
    ],
    2: [
      'A train travels 60km/h for 2 hours, then 90km/h for 3 hours. Total distance?',
      'If A is taller than B, and C is shorter than B, who is shortest?',
      'In a sequence 3, 9, 27, 81, what comes next?',
      'Choose the odd one out: Dog, Cat, Table, Horse',
      'If today is Monday, what day was it 100 days ago?',
      'What is 25% of 80% of 400?',
      'A>B, B>C, C>D. Who is greatest?',
      'Complete: ACE, BDF, CEG, __',
      'If 5 machines make 5 widgets in 5 minutes, how long for 100 machines to make 100 widgets?',
      'Choose the logical conclusion from: All X are Y, All Y are Z',
    ],
    3: [
      'You discover a critical bug before launch. What do you do?',
      'How would you prioritize conflicting urgent tasks?',
      'A team member disagrees with your approach. Your response?',
      'You receive negative feedback from a client. How do you handle it?',
      'Two projects need you simultaneously. How do you decide?',
      'Your manager asks for an impossible deadline. Your action?',
      'You notice a more efficient process. What do you do?',
      'A colleague takes credit for your work. How do you respond?',
      'You must choose between quality and speed. Which factors matter?',
      'How do you handle stress during peak workload?',
    ],
    4: [
      'What will this code output: for(i=0; i<3; i++) print(i)?',
      'Which data structure is best for fast search operations?',
      'Explain the difference between GET and POST requests',
      'What is the time complexity of binary search?',
      'Which design pattern would you use for object creation?',
      'How would you optimize a slow database query?',
      'What is the purpose of version control systems?',
      'Explain RESTful API principles',
      'What is the difference between SQL and NoSQL?',
      'How would you debug a production issue?',
    ],
  };

  const options: Record<number, string[][]> = {
    1: [
      ['30', '20', '25', '15'],
      ['All roses fade quickly', 'Some roses fade quickly', 'No conclusion', 'All flowers are roses'],
      ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'],
      ['Creative Arts', 'Data Analysis', 'Leadership', 'Technical Work'],
      ['20', '24', '32', '28'],
      ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'],
      ['Office', 'Remote', 'Hybrid', 'Field Work'],
      ['Money', 'Impact', 'Growth', 'Work-Life Balance'],
      ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'],
      ['Analytical', 'Creative', 'Practical', 'Social'],
    ],
    2: [
      ['390km', '420km', '450km', '480km'],
      ['A', 'B', 'C', 'Cannot determine'],
      ['243', '162', '729', '108'],
      ['Table', 'Dog', 'Cat', 'Horse'],
      ['Monday', 'Tuesday', 'Saturday', 'Sunday'],
      ['80', '64', '100', '50'],
      ['A', 'B', 'C', 'D'],
      ['DFH', 'CFG', 'DEG', 'DFG'],
      ['5 minutes', '100 minutes', '20 minutes', '50 minutes'],
      ['All X are Z', 'Some X are Z', 'All Z are X', 'No conclusion'],
    ],
    3: [
      ['Report immediately', 'Fix it quickly', 'Ignore if minor', 'Delay the launch'],
      ['Urgent first', 'Important first', 'Discuss with team', 'Delegate'],
      ['Listen and discuss', 'Insist on my way', 'Escalate to manager', 'Compromise'],
      ['Apologize and improve', 'Defend your work', 'Ignore it', 'Ask for specifics'],
      ['By deadline', 'By importance', 'By interest', 'Flip a coin'],
      ['Negotiate timeline', 'Accept and try', 'Refuse directly', 'Quit'],
      ['Implement immediately', 'Propose to team', 'Keep to myself', 'Wait for problems'],
      ['Confront them', 'Report to HR', 'Let it go', 'Clarify to others'],
      ['Quality always', 'Speed always', 'Balance both', 'Depends on context'],
      ['Take breaks', 'Work harder', 'Seek help', 'Prioritize tasks'],
    ],
    4: [
      ['0 1 2', '1 2 3', '0 1 2 3', 'Error'],
      ['Array', 'Hash Table', 'Linked List', 'Stack'],
      ['GET retrieves, POST submits', 'No difference', 'POST is faster', 'GET is secure'],
      ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'],
      ['Factory', 'Observer', 'Strategy', 'Decorator'],
      ['Add indexes', 'Remove indexes', 'Add more data', 'Use loops'],
      ['Backup code', 'Track changes', 'Share files', 'Compile code'],
      ['Use HTTP methods', 'Stateless', 'Resource-based', 'All of above'],
      ['SQL is relational', 'NoSQL is faster', 'SQL uses tables', 'All of above'],
      ['Read logs', 'Reproduce locally', 'Rollback', 'All of above'],
    ],
  };

  return templates[level].map((q, i) => ({
    question: q,
    options: options[level][i],
  }));
};

export default function AssessmentPage() {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const levelNum = parseInt(level || '1');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questions] = useState(generateQuestions(levelNum));

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate based on level completion
      if (levelNum === 1) {
        navigate('/level2-popup');
      } else if (levelNum === 4) {
        navigate('/psychometric-summary');
      } else {
        navigate(`/assessment/${levelNum + 1}`);
      }
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="p-8 rounded-2xl shadow-xl bg-white">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} / {questions.length}
                </span>
                <span className="text-sm bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 py-1 rounded-full">
                  Level {levelNum}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl mb-6">{questions[currentQuestion].question}</h2>

              <RadioGroup
                value={answers[currentQuestion]}
                onValueChange={(value) => setAnswers({ ...answers, [currentQuestion]: value })}
              >
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </motion.div>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 px-8 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
              >
                {currentQuestion < questions.length - 1 ? 'Next' : 'Complete'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
