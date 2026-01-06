import { Card } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { BookOpen, Clock, TrendingUp, Award } from 'lucide-react';

const courses = [
  { name: 'Cloud Architecture Fundamentals', progress: 45, effort: 'Medium', completion: '3 weeks', impact: '+15% job matches' },
  { name: 'DevOps Essentials', progress: 30, effort: 'High', completion: '4 weeks', impact: '+20% skill rating' },
  { name: 'System Design Patterns', progress: 60, effort: 'Medium', completion: '2 weeks', impact: '+10% readiness' },
  { name: 'Advanced JavaScript', progress: 85, effort: 'Low', completion: '1 week', impact: '+5% confidence' },
];

export default function LearningPage() {
  const overallProgress = 55;

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-8">Learning Progress</h1>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Overall Progress</p>
              <p className="text-2xl">{overallProgress}%</p>
            </div>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </Card>

        <Card className="p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-2xl">4</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl">12</p>
            </div>
          </div>
        </Card>
      </div>

      <h2 className="text-xl mb-4">Current Courses</h2>
      <div className="grid gap-6">
        {courses.map((course, i) => (
          <Card key={i} className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg mb-2">{course.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Clock className="w-3 h-3" />
                    {course.completion}
                  </Badge>
                  <Badge className={
                    course.effort === 'High' ? 'bg-red-100 text-red-700' :
                    course.effort === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }>
                    {course.effort} Effort
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl mb-1">{course.progress}%</p>
              </div>
            </div>

            <Progress value={course.progress} className="mb-4 h-2" />

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Impact:</strong> {course.impact}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
