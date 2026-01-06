import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { TrendingUp, AlertCircle, Target } from 'lucide-react';

const skillGaps = [
  { skill: 'Cloud Architecture', priority: 'high', progress: 20 },
  { skill: 'DevOps', priority: 'high', progress: 35 },
  { skill: 'System Design', priority: 'medium', progress: 50 },
  { skill: 'Microservices', priority: 'medium', progress: 45 },
  { skill: 'Container Orchestration', priority: 'low', progress: 10 },
];

export default function CareerGuidancePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl mb-8">Career Guidance</h1>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 rounded-2xl shadow-lg">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <svg className="transform -rotate-90" width="128" height="128">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.82)}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">82%</span>
              </div>
            </div>
            <h3 className="text-lg">Career Readiness</h3>
            <p className="text-sm text-gray-600">Good progress, keep learning!</p>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg mb-4">Priority Actions</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Target className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p>Complete Cloud Architecture course</p>
                <p className="text-sm text-gray-600">Est. 2 weeks • High Impact</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-teal-600 mt-1" />
              <div>
                <p>Build 2 portfolio projects</p>
                <p className="text-sm text-gray-600">Est. 4 weeks • Career Boost</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl mb-4">Skill Gap Analysis</h3>
        <div className="space-y-4">
          {skillGaps.map((gap, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span>{gap.skill}</span>
                  <Badge
                    className={
                      gap.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : gap.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }
                  >
                    {gap.priority}
                  </Badge>
                </div>
                <span className="text-sm text-gray-600">{gap.progress}%</span>
              </div>
              <Progress value={gap.progress} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
            Start Learning
          </Button>
          <Button variant="outline">View Recommendations</Button>
        </div>
      </Card>
    </div>
  );
}
