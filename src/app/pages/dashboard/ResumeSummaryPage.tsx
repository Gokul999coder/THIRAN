import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const skillData = [
  { skill: 'JavaScript', confidence: 85 },
  { skill: 'Python', confidence: 75 },
  { skill: 'React', confidence: 90 },
  { skill: 'Communication', confidence: 80 },
  { skill: 'Leadership', confidence: 70 },
];

export default function ResumeSummaryPage() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-8">Resume Assessment Summary</h1>

        <Card className="p-6 rounded-2xl shadow-lg mb-6">
          <h2 className="text-xl mb-4">Skill Confidence Levels</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="confidence" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 rounded-2xl shadow-lg mb-6">
          <h2 className="text-xl mb-4">Resume Readiness Score</h2>
          <div className="text-center">
            <div className="text-6xl mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">82%</div>
            <p className="text-gray-600">Your resume is well-prepared with room for improvement</p>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button
            onClick={() => navigate('/dashboard/resume-assessment')}
            variant="outline"
            className="flex-1"
          >
            Retake
          </Button>
          <Button
            onClick={() => navigate('/dashboard/resume-detailed')}
            className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600"
          >
            View Detailed Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}
