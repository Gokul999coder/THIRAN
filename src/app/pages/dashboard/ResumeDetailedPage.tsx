import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function ResumeDetailedPage() {
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <h1 className="text-3xl mb-8">Detailed Resume Analysis</h1>

        <Card className="p-6 rounded-2xl shadow-lg mb-6">
          <h2 className="text-xl mb-4">Skill-wise Accuracy</h2>
          <div className="space-y-4">
            {['JavaScript: 85%', 'Python: 75%', 'React: 90%', 'Communication: 80%', 'Leadership: 70%'].map((skill, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{skill}</span>
                <div className="w-1/2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full"
                    style={{ width: skill.split(': ')[1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 rounded-2xl shadow-lg border-2 border-blue-200 bg-blue-50">
          <h2 className="text-xl mb-4">Terms & Conditions</h2>
          <div className="max-h-48 overflow-y-auto bg-white p-4 rounded-lg mb-4 text-sm">
            <p className="mb-2"><strong>1. Data Privacy:</strong> Your resume data is securely stored.</p>
            <p className="mb-2"><strong>2. Career Matching:</strong> We use your data for job matching.</p>
            <p className="mb-2"><strong>3. Profile Updates:</strong> You can update your resume anytime.</p>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
            />
            <Label htmlFor="terms">I agree to Terms & Conditions</Label>
          </div>

          <Button
            onClick={() => navigate('/dashboard/career')}
            disabled={!agreedToTerms}
            className={`w-full ${agreedToTerms ? 'bg-gradient-to-r from-blue-600 to-teal-600' : 'bg-gray-300'}`}
          >
            Build Profile
          </Button>
        </Card>
      </div>
    </div>
  );
}
