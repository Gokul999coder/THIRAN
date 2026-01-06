import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const levelScores = [
  { level: 'Level 1', score: 85 },
  { level: 'Level 2', score: 78 },
  { level: 'Level 3', score: 82 },
  { level: 'Level 4', score: 90 },
];

const skillData = [
  { skill: 'Analytical', value: 85 },
  { skill: 'Creative', value: 72 },
  { skill: 'Technical', value: 88 },
  { skill: 'Leadership', value: 75 },
  { skill: 'Communication', value: 80 },
];

export default function PsychometricSummaryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl mb-8 text-center bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Assessment Complete!
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl mb-4">Level-wise Scores</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={levelScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl mb-4">Skill Radar</h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate('/levels-overview')}
              variant="outline"
              className="rounded-lg px-8"
            >
              Retake
            </Button>
            <Button
              onClick={() => navigate('/psychometric-detailed')}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-lg px-8 transition-all duration-300 hover:shadow-lg"
            >
              View Detailed Analysis
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
