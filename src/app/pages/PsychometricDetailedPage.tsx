import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { motion } from 'motion/react';
import { ArrowLeft, Download, ChevronDown, TrendingUp, Award, Brain, Target, AlertCircle, Lightbulb } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

// Mock student data - comprehensive analysis
const studentProfile = {
  name: "Student Name",
  overallScore: 84,
  rank: "Top 15%",
  totalTime: "45 minutes",
  accuracy: "87%",
};

const skillsData = [
  { skill: 'Analytical', value: 85, benchmark: 70 },
  { skill: 'Creative', value: 72, benchmark: 65 },
  { skill: 'Technical', value: 88, benchmark: 75 },
  { skill: 'Leadership', value: 75, benchmark: 60 },
  { skill: 'Communication', value: 80, benchmark: 70 },
  { skill: 'Problem Solving', value: 90, benchmark: 72 },
];

const personalityTraits = [
  { trait: 'Extraversion', score: 68, description: 'Moderately outgoing and sociable' },
  { trait: 'Agreeableness', score: 82, description: 'Cooperative and compassionate' },
  { trait: 'Conscientiousness', score: 91, description: 'Highly organized and dependable' },
  { trait: 'Emotional Stability', score: 74, description: 'Generally calm under pressure' },
  { trait: 'Openness', score: 88, description: 'Very open to new experiences' },
];

const careerRecommendations = [
  { 
    title: 'Software Engineer', 
    match: 92, 
    reason: 'Strong technical and analytical skills align perfectly',
    skills: ['Technical', 'Problem Solving', 'Analytical']
  },
  { 
    title: 'Data Scientist', 
    match: 88, 
    reason: 'Excellent analytical thinking and technical aptitude',
    skills: ['Analytical', 'Technical', 'Problem Solving']
  },
  { 
    title: 'Product Manager', 
    match: 85, 
    reason: 'Good balance of technical and leadership abilities',
    skills: ['Leadership', 'Communication', 'Analytical']
  },
  { 
    title: 'UX Designer', 
    match: 78, 
    reason: 'Creative thinking with technical understanding',
    skills: ['Creative', 'Problem Solving', 'Communication']
  },
];

const learningStyle = {
  primary: 'Visual',
  secondary: 'Kinesthetic',
  recommendations: [
    'Use diagrams and flowcharts when learning',
    'Engage in hands-on practice and projects',
    'Watch video tutorials and demonstrations',
    'Create mind maps for complex concepts'
  ]
};

const strengthsWeaknesses = {
  strengths: [
    'Exceptional problem-solving abilities',
    'Strong technical aptitude',
    'High level of organization and planning',
    'Quick learner with adaptable mindset',
    'Good collaboration skills'
  ],
  weaknesses: [
    'Can be overly detail-oriented at times',
    'May benefit from more creative thinking exercises',
    'Time management under pressure can improve',
    'Public speaking confidence needs development'
  ],
  improvements: [
    'Practice brainstorming and creative exercises',
    'Join public speaking clubs like Toastmasters',
    'Use time management techniques like Pomodoro',
    'Seek feedback regularly from peers and mentors'
  ]
};

const levelDetails = [
  {
    level: 'Level 1: Basic Assessment',
    score: 85,
    accuracy: '8/10',
    time: '10 minutes',
    strengths: ['Logical reasoning', 'Pattern recognition', 'Numerical ability'],
    improvements: ['Verbal reasoning', 'Abstract thinking'],
    analysis: 'You demonstrated strong analytical skills with excellent pattern recognition. Your numerical aptitude is above average. Focus on enhancing verbal reasoning skills through regular reading and vocabulary building exercises.'
  },
  {
    level: 'Level 2: Intermediate Thinking',
    score: 80,
    accuracy: '9/10',
    time: '12 minutes',
    strengths: ['Complex problem solving', 'Logical sequences', 'Critical thinking'],
    improvements: ['Speed optimization', 'Multi-step reasoning'],
    analysis: 'Your critical thinking skills are well-developed with strong logical reasoning. You take time to analyze problems thoroughly. Practice solving problems under time constraints to improve speed without sacrificing accuracy.'
  },
  {
    level: 'Level 3: Advanced Reasoning',
    score: 82,
    accuracy: '10/10',
    time: '14 minutes',
    strengths: ['Strategic thinking', 'Complex analysis', 'Decision making'],
    improvements: ['Risk assessment', 'Probabilistic thinking'],
    analysis: 'Excellent strategic thinking and decision-making abilities. You excel at breaking down complex problems. Develop probabilistic thinking by studying game theory and decision science concepts.'
  },
  {
    level: 'Level 4: Skill & Technical',
    score: 90,
    accuracy: '8/10',
    time: '9 minutes',
    strengths: ['Technical aptitude', 'Coding logic', 'System thinking'],
    improvements: ['Algorithm optimization', 'Edge case handling'],
    analysis: 'Outstanding technical skills with strong coding fundamentals. Your system thinking approach is impressive. Focus on algorithm optimization and consider edge cases more carefully in your solutions.'
  },
];

const progressOverTime = [
  { level: 'L1', score: 85, timeSpent: 10 },
  { level: 'L2', score: 80, timeSpent: 12 },
  { level: 'L3', score: 82, timeSpent: 14 },
  { level: 'L4', score: 90, timeSpent: 9 },
];

export default function PsychometricDetailedPage() {
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBuildProfile = () => {
    navigate('/dashboard/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            variant="outline"
            className="gap-2 rounded-lg"
          >
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Overall Summary Card */}
          <Card className="p-8 rounded-2xl shadow-lg bg-gradient-to-r from-blue-600 to-teal-600 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl mb-2">
                  Detailed Performance Analysis
                </h1>
                <p className="text-blue-100 text-lg">
                  Comprehensive breakdown of your assessment results
                </p>
              </div>
              <div className="text-right">
                <div className="text-6xl mb-2">{studentProfile.overallScore}</div>
                <div className="text-blue-100">Overall Score</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div>
                <div className="text-blue-100 mb-1">Rank</div>
                <div className="text-2xl flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  {studentProfile.rank}
                </div>
              </div>
              <div>
                <div className="text-blue-100 mb-1">Total Time</div>
                <div className="text-2xl">{studentProfile.totalTime}</div>
              </div>
              <div>
                <div className="text-blue-100 mb-1">Accuracy</div>
                <div className="text-2xl flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  {studentProfile.accuracy}
                </div>
              </div>
            </div>
          </Card>

          {/* Skills Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                Skills Analysis
              </h2>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={skillsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Your Score"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Benchmark"
                    dataKey="benchmark"
                    stroke="#14b8a6"
                    fill="#14b8a6"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-teal-600" />
                Progress Over Levels
              </h2>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={progressOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="level" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Score"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="timeSpent"
                    stroke="#14b8a6"
                    strokeWidth={3}
                    name="Time (min)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Personality Traits */}
          <Card className="p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              Personality Assessment
            </h2>
            <div className="space-y-4">
              {personalityTraits.map((trait) => (
                <div key={trait.trait} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{trait.trait}</span>
                    <span className="text-sm text-gray-600">{trait.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${trait.score}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                  <p className="text-sm text-gray-600">{trait.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Level-by-Level Detailed Analysis */}
          <Card className="p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl mb-6">Level-by-Level Performance</h2>
            <div className="space-y-4">
              {levelDetails.map((level, index) => (
                <Collapsible
                  key={level.level}
                  open={expandedSections[level.level]}
                  onOpenChange={() => toggleSection(level.level)}
                >
                  <Card className="border-2 border-gray-200 overflow-hidden">
                    <CollapsibleTrigger className="w-full p-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                          index === 0 ? 'from-blue-500 to-blue-600' :
                          index === 1 ? 'from-teal-500 to-teal-600' :
                          index === 2 ? 'from-green-500 to-green-600' :
                          'from-purple-500 to-purple-600'
                        } flex items-center justify-center text-white font-bold`}>
                          L{index + 1}
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-medium">{level.level}</div>
                          <div className="text-sm text-gray-600">Score: {level.score}%</div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          expandedSections[level.level] ? 'rotate-180' : ''
                        }`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-6 border-t bg-gray-50">
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                          <div className="bg-white p-4 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Score</div>
                            <div className="text-3xl font-bold text-blue-600">{level.score}%</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Accuracy</div>
                            <div className="text-3xl font-bold text-teal-600">{level.accuracy}</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Time Spent</div>
                            <div className="text-3xl font-bold text-purple-600">{level.time}</div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="font-medium text-green-800 mb-2 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              Strengths
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                              {level.strengths.map((strength, i) => (
                                <li key={i}>{strength}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <div className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Areas for Improvement
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-sm text-amber-700">
                              {level.improvements.map((improvement, i) => (
                                <li key={i}>{improvement}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4" />
                              Detailed Analysis
                            </div>
                            <p className="text-sm text-blue-700 leading-relaxed">
                              {level.analysis}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </Card>

          {/* Strengths & Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Key Strengths
              </h3>
              <ul className="space-y-3">
                {strengthsWeaknesses.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-amber-700 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Growth Opportunities
              </h3>
              <ul className="space-y-3">
                {strengthsWeaknesses.weaknesses.map((weakness, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 text-sm font-bold">!</span>
                    </div>
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Learning Style */}
          <Card className="p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
              Your Learning Style
            </h2>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl mb-4">
              <div className="text-lg mb-2">
                Primary: <span className="font-bold text-yellow-700">{learningStyle.primary}</span>
                {' '} | Secondary: <span className="font-bold text-orange-700">{learningStyle.secondary}</span>
              </div>
            </div>
            <h3 className="font-semibold mb-3">Recommended Learning Strategies:</h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {learningStyle.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-lg border">
                  <span className="text-yellow-600 mt-0.5">→</span>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Career Recommendations */}
          <Card className="p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-indigo-600" />
              Top Career Matches
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {careerRecommendations.map((career, i) => (
                <motion.div
                  key={career.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border-2 border-indigo-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{career.title}</h3>
                    <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {career.match}%
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{career.reason}</p>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-white px-3 py-1 rounded-full text-xs text-indigo-700 border border-indigo-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Action Items */}
          <Card className="p-6 rounded-2xl shadow-lg border-2 border-purple-200 bg-purple-50">
            <h2 className="text-2xl mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              Recommended Action Items
            </h2>
            <div className="space-y-3">
              {strengthsWeaknesses.improvements.map((improvement, i) => (
                <div key={i} className="bg-white p-4 rounded-lg flex items-start gap-3 border border-purple-200">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">{i + 1}</span>
                  </div>
                  <span className="text-gray-700 pt-1">{improvement}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Terms & Conditions */}
          <Card className="p-6 rounded-2xl shadow-lg border-2 border-blue-200 bg-blue-50">
            <h2 className="text-xl mb-4">Terms & Conditions</h2>
            <div className="max-h-48 overflow-y-auto bg-white p-4 rounded-lg mb-4 text-sm text-gray-700 space-y-2">
              <p>
                <strong>1. Data Usage:</strong> Your assessment data will be used to generate personalized career recommendations.
              </p>
              <p>
                <strong>2. Privacy:</strong> We respect your privacy and will not share your personal information without consent.
              </p>
              <p>
                <strong>3. Accuracy:</strong> Results are based on your responses and are for guidance purposes only.
              </p>
              <p>
                <strong>4. Profile Building:</strong> By proceeding, you agree to build your comprehensive profile based on these results.
              </p>
              <p>
                <strong>5. Updates:</strong> You can retake assessments to update your profile at any time.
              </p>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              />
              <Label htmlFor="terms" className="cursor-pointer">
                I agree to the Terms & Conditions
              </Label>
            </div>

            <Button
              onClick={handleBuildProfile}
              disabled={!agreedToTerms}
              className={`w-full rounded-lg h-12 transition-all duration-300 ${
                agreedToTerms
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Build Profile
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}