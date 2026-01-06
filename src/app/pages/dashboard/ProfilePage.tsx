import { Card } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Edit, Award, TrendingUp, Target, Brain, ChevronDown } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible';

// Comparison data between Assessment and Resume
const skillsComparison = [
  { skill: 'Analytical', assessment: 85, resume: 88 },
  { skill: 'Creative', assessment: 72, resume: 65 },
  { skill: 'Technical', assessment: 88, resume: 88 },
  { skill: 'Leadership', assessment: 75, resume: 70 },
  { skill: 'Communication', assessment: 80, resume: 80 },
  { skill: 'Problem Solving', assessment: 90, resume: 85 },
];

const overallComparison = [
  { category: 'Assessment', score: 84 },
  { category: 'Resume', score: 82 },
  { category: 'Combined', score: 86 },
];

const detailedMetrics = [
  {
    category: 'Technical Proficiency',
    assessment: 88,
    resume: 88,
    alignment: 'Perfect Match',
    recommendation: 'Your assessment results perfectly align with your resume. Continue building on this strong foundation.'
  },
  {
    category: 'Soft Skills',
    assessment: 80,
    resume: 80,
    alignment: 'Excellent Alignment',
    recommendation: 'Strong consistency between demonstrated and claimed soft skills. Keep developing these abilities.'
  },
  {
    category: 'Creative Thinking',
    assessment: 72,
    resume: 65,
    alignment: 'Assessment Higher',
    recommendation: 'Your creative potential exceeds what\'s shown in your resume. Consider adding creative projects to showcase this strength.'
  },
  {
    category: 'Leadership',
    assessment: 75,
    resume: 70,
    alignment: 'Good Alignment',
    recommendation: 'Leadership capabilities are evident. Seek opportunities to demonstrate this in professional settings.'
  },
];

const careerRecommendations = [
  {
    title: 'Software Engineer',
    matchScore: 92,
    assessmentFit: 92,
    resumeFit: 90,
    reason: 'Strong technical skills validated by both assessment and experience'
  },
  {
    title: 'Technical Lead',
    matchScore: 88,
    assessmentFit: 85,
    resumeFit: 85,
    reason: 'Leadership and technical abilities align well with role requirements'
  },
  {
    title: 'Data Scientist',
    matchScore: 86,
    assessmentFit: 88,
    resumeFit: 82,
    reason: 'Analytical skills are exceptional, experience can be strengthened'
  },
];

const strengthsInsights = {
  validated: [
    'Technical aptitude confirmed by both assessment and resume',
    'Problem-solving abilities consistently high across evaluations',
    'Communication skills match professional experience',
  ],
  hidden: [
    'Creative thinking potential not fully reflected in resume',
    'Analytical capabilities exceed current role requirements',
  ],
  opportunities: [
    'Leverage creative skills in projects and showcase them',
    'Pursue leadership roles to match demonstrated potential',
    'Consider roles that fully utilize analytical strengths',
  ]
};

export default function ProfilePage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl mb-8 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          Comprehensive Profile Analysis
        </h1>

        {/* Personal Info Card */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src="" />
                <AvatarFallback className="text-3xl bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl">John Doe</h2>
              <Button variant="outline" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </Card>

          <Card className="lg:col-span-2 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl mb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p>John Doe</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p>john.doe@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p>New York, USA</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Overall Scores Comparison */}
        <Card className="p-8 rounded-2xl shadow-lg mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-3xl mb-6">Overall Profile Score</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-lg mb-2 text-blue-100">Psychometric Assessment</div>
              <div className="text-5xl font-bold mb-2">84</div>
              <div className="text-sm text-blue-100">Top 15%</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-lg mb-2 text-purple-100">Resume Analysis</div>
              <div className="text-5xl font-bold mb-2">82</div>
              <div className="text-sm text-purple-100">Top 20%</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-lg mb-2 text-teal-100">Combined Score</div>
              <div className="text-5xl font-bold mb-2">86</div>
              <div className="text-sm text-teal-100">Top 12%</div>
            </div>
          </div>
        </Card>

        {/* Skills Comparison Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-600" />
              Skills Comparison
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={skillsComparison}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Assessment"
                  dataKey="assessment"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.5}
                />
                <Radar
                  name="Resume"
                  dataKey="resume"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.5}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              Overall Comparison
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={overallComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Detailed Metrics Comparison */}
        <Card className="p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-600" />
            Detailed Metrics Analysis
          </h2>
          <div className="space-y-4">
            {detailedMetrics.map((metric, index) => (
              <Collapsible
                key={metric.category}
                open={expandedSections[metric.category]}
                onOpenChange={() => toggleSection(metric.category)}
              >
                <Card className="border-2 border-gray-200 overflow-hidden">
                  <CollapsibleTrigger className="w-full p-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                        index === 0 ? 'from-blue-500 to-blue-600' :
                        index === 1 ? 'from-teal-500 to-teal-600' :
                        index === 2 ? 'from-purple-500 to-purple-600' :
                        'from-pink-500 to-pink-600'
                      } flex items-center justify-center text-white font-bold`}>
                        {index + 1}
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-lg font-medium">{metric.category}</div>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>Assessment: {metric.assessment}%</span>
                          <span>Resume: {metric.resume}%</span>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        metric.alignment === 'Perfect Match' ? 'bg-green-100 text-green-700' :
                        metric.alignment === 'Excellent Alignment' ? 'bg-blue-100 text-blue-700' :
                        metric.alignment === 'Good Alignment' ? 'bg-teal-100 text-teal-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {metric.alignment}
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 ml-4 transition-transform ${
                        expandedSections[metric.category] ? 'rotate-180' : ''
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-6 border-t bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="bg-white p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Assessment Score</div>
                          <div className="text-3xl font-bold text-blue-600">{metric.assessment}%</div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-full bg-blue-600 rounded-full" 
                              style={{ width: `${metric.assessment}%` }}
                            />
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Resume Score</div>
                          <div className="text-3xl font-bold text-purple-600">{metric.resume}%</div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-full bg-purple-600 rounded-full" 
                              style={{ width: `${metric.resume}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="font-medium text-blue-800 mb-2">Recommendation</div>
                        <p className="text-sm text-blue-700">{metric.recommendation}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </Card>

        {/* Career Recommendations Based on Combined Analysis */}
        <Card className="p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-indigo-600" />
            Career Recommendations (Combined Analysis)
          </h2>
          <div className="space-y-4">
            {careerRecommendations.map((career, i) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{career.title}</h3>
                    <p className="text-sm text-gray-600">{career.reason}</p>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold">
                    {career.matchScore}% Match
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <div className="text-xs text-gray-600 mb-1">Assessment Fit</div>
                    <div className="text-2xl font-bold text-blue-600">{career.assessmentFit}%</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <div className="text-xs text-gray-600 mb-1">Resume Fit</div>
                    <div className="text-2xl font-bold text-purple-600">{career.resumeFit}%</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Strengths & Insights */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Validated Strengths
            </h3>
            <ul className="space-y-3">
              {strengthsInsights.validated.map((strength, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Hidden Potential
            </h3>
            <ul className="space-y-3">
              {strengthsInsights.hidden.map((potential, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-purple-600 mt-0.5">★</span>
                  <span className="text-gray-700">{potential}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Growth Opportunities
            </h3>
            <ul className="space-y-3">
              {strengthsInsights.opportunities.map((opportunity, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span className="text-gray-700">{opportunity}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
