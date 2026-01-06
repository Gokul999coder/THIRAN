// Resume Assessment Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Progress } from '../../components/ui/progress';

const skillQuestions = [
  { q: 'Rate your proficiency in JavaScript', options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
  { q: 'How comfortable are you with Python?', options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
  { q: 'Your experience with React', options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
  { q: 'Database management skills', options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
  { q: 'Project management experience', options: ['None', 'Some', 'Moderate', 'Extensive'] },
  { q: 'Communication skills rating', options: ['Fair', 'Good', 'Very Good', 'Excellent'] },
  { q: 'Leadership experience', options: ['None', 'Some', 'Moderate', 'Extensive'] },
  { q: 'Problem solving ability', options: ['Fair', 'Good', 'Very Good', 'Excellent'] },
  { q: 'Teamwork skills', options: ['Fair', 'Good', 'Very Good', 'Excellent'] },
  { q: 'Adaptability to change', options: ['Fair', 'Good', 'Very Good', 'Excellent'] },
];

export default function ResumeAssessmentPage() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleNext = () => {
    if (currentQ < skillQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      navigate('/dashboard/resume-summary');
    }
  };

  const progress = ((currentQ + 1) / skillQuestions.length) * 100;

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 rounded-2xl shadow-lg">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Question {currentQ + 1} / {skillQuestions.length}</span>
              <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Skill Assessment</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <h2 className="text-2xl mb-6">{skillQuestions[currentQ].q}</h2>

          <RadioGroup value={answers[currentQ]} onValueChange={(v) => setAnswers({ ...answers, [currentQ]: v })}>
            <div className="space-y-3">
              {skillQuestions[currentQ].options.map((opt, i) => (
                <div key={i} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-blue-400 transition-colors">
                  <RadioGroupItem value={opt} id={`opt-${i}`} />
                  <Label htmlFor={`opt-${i}`} className="flex-1 cursor-pointer">{opt}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <Button
            onClick={handleNext}
            disabled={!answers[currentQ]}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-teal-600"
          >
            {currentQ < skillQuestions.length - 1 ? 'Next' : 'Complete'}
          </Button>
        </Card>
      </div>
    </div>
  );
}
