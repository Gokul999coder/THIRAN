import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { Progress } from '../../components/ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FilePlus, CheckCircle2, FileText, TrendingUp, Award, Brain, Target, AlertCircle, Lightbulb, ChevronDown } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible';

// Resume-based questions
const resumeQuestions = [
  { 
    q: 'How many years of experience do you have in your primary field?', 
    options: ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'] 
  },
  { 
    q: 'Rate your proficiency in the main programming language mentioned in your resume', 
    options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] 
  },
  { 
    q: 'How comfortable are you with team collaboration?', 
    options: ['Somewhat comfortable', 'Comfortable', 'Very comfortable', 'Highly experienced'] 
  },
  { 
    q: 'Your experience with project leadership', 
    options: ['None', 'Limited', 'Moderate', 'Extensive'] 
  },
  { 
    q: 'Rate your problem-solving approach', 
    options: ['Reactive', 'Balanced', 'Proactive', 'Innovative'] 
  },
  { 
    q: 'How do you handle tight deadlines?', 
    options: ['With difficulty', 'Adequately', 'Well', 'Excellently'] 
  },
  { 
    q: 'Your communication skills in professional settings', 
    options: ['Fair', 'Good', 'Very Good', 'Excellent'] 
  },
  { 
    q: 'Experience with stakeholder management', 
    options: ['None', 'Some', 'Moderate', 'Extensive'] 
  },
  { 
    q: 'How quickly do you adapt to new technologies?', 
    options: ['Slowly', 'Moderately', 'Quickly', 'Very quickly'] 
  },
  { 
    q: 'Rate your attention to detail', 
    options: ['Fair', 'Good', 'Very Good', 'Excellent'] 
  },
];

// Mock resume analysis data
const resumeAnalysisData = {
  overallScore: 82,
  rank: "Top 20%",
  totalTime: "12 minutes",
  accuracy: "90%",
};

const skillsData = [
  { skill: 'Technical', value: 88, benchmark: 75 },
  { skill: 'Communication', value: 80, benchmark: 70 },
  { skill: 'Leadership', value: 70, benchmark: 65 },
  { skill: 'Problem Solving', value: 85, benchmark: 72 },
  { skill: 'Teamwork', value: 82, benchmark: 68 },
  { skill: 'Adaptability', value: 78, benchmark: 70 },
];

const personalityTraits = [
  { trait: 'Professional Maturity', score: 85, description: 'Demonstrates strong professional conduct' },
  { trait: 'Technical Aptitude', score: 88, description: 'Excellent technical understanding' },
  { trait: 'Collaboration', score: 80, description: 'Works well in team environments' },
  { trait: 'Leadership Potential', score: 75, description: 'Shows good leadership qualities' },
  { trait: 'Learning Agility', score: 90, description: 'Quick to adapt and learn new skills' },
];

const careerMatches = [
  { 
    title: 'Senior Software Engineer', 
    match: 90, 
    reason: 'Strong technical skills and experience align perfectly',
    skills: ['Technical', 'Problem Solving', 'Adaptability']
  },
  { 
    title: 'Technical Lead', 
    match: 85, 
    reason: 'Leadership potential combined with technical expertise',
    skills: ['Leadership', 'Technical', 'Communication']
  },
  { 
    title: 'Solutions Architect', 
    match: 82, 
    reason: 'Problem-solving abilities and technical depth',
    skills: ['Technical', 'Problem Solving', 'Communication']
  },
  { 
    title: 'Engineering Manager', 
    match: 78, 
    reason: 'Good balance of technical and people skills',
    skills: ['Leadership', 'Communication', 'Teamwork']
  },
];

const strengthsWeaknesses = {
  strengths: [
    'Strong technical background with diverse experience',
    'Excellent problem-solving capabilities',
    'Quick learner with adaptability',
    'Good team collaboration skills',
    'Professional communication abilities'
  ],
  weaknesses: [
    'Leadership experience could be expanded',
    'Stakeholder management skills need development',
    'Public presentation skills can improve',
    'Strategic planning experience is limited'
  ],
  improvements: [
    'Take on leadership roles in projects',
    'Attend workshops on stakeholder management',
    'Join public speaking groups',
    'Pursue strategic planning certifications'
  ]
};

const levelDetails = [
  {
    category: 'Technical Proficiency',
    score: 88,
    accuracy: '9/10',
    strengths: ['Strong coding skills', 'System design understanding', 'Best practices knowledge'],
    improvements: ['Advanced architecture patterns', 'Performance optimization'],
    analysis: 'Your technical skills are impressive with strong fundamentals. You demonstrate excellent understanding of core concepts. Focus on advanced architectural patterns and performance optimization techniques to reach expert level.'
  },
  {
    category: 'Professional Experience',
    score: 75,
    accuracy: '8/10',
    strengths: ['Relevant work history', 'Progressive responsibility', 'Diverse projects'],
    improvements: ['Leadership roles', 'Cross-functional experience'],
    analysis: 'Your professional journey shows good progression with increasing responsibilities. To advance further, seek opportunities to lead teams and work on cross-functional projects that broaden your scope.'
  },
  {
    category: 'Soft Skills',
    score: 80,
    accuracy: '9/10',
    strengths: ['Team collaboration', 'Communication', 'Adaptability'],
    improvements: ['Conflict resolution', 'Negotiation skills'],
    analysis: 'You possess strong interpersonal skills with good team dynamics. Developing conflict resolution and negotiation abilities will significantly enhance your leadership potential.'
  },
];

const progressData = [
  { category: 'Tech', score: 88 },
  { category: 'Exp', score: 75 },
  { category: 'Soft Skills', score: 80 },
  { category: 'Overall', score: 82 },
];

type FlowStep = 'initial' | 'questions' | 'report' | 'detailed';

export default function HomePage() {
  const navigate = useNavigate();
  const [flowStep, setFlowStep] = useState<FlowStep>('initial');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeCreated, setResumeCreated] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const canAnalyze = resumeUploaded || resumeCreated;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeUploaded(true);
    }
  };

  const handleCreateResume = () => {
    navigate('/dashboard/resume-builder');
    // After returning, we'll mark it as created
    setTimeout(() => setResumeCreated(true), 100);
  };

  const handleAnalyze = () => {
    setFlowStep('questions');
  };

  const handleNextQuestion = () => {
    if (currentQuestion < resumeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFlowStep('report');
    }
  };

  const handleViewDetailed = () => {
    setFlowStep('detailed');
  };

  const handleBuildProfile = () => {
    navigate('/dashboard/profile');
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const progress = ((currentQuestion + 1) / resumeQuestions.length) * 100;

  return (
    <div className="p-8">
      <AnimatePresence mode="wait">
        {flowStep === 'initial' && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h1 className="text-4xl mb-8 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Welcome to Your Dashboard
            </h1>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className={`p-8 rounded-2xl shadow-lg transition-all duration-300 ${
                resumeUploaded ? 'border-2 border-green-500' : 'hover:shadow-2xl'
              }`}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center relative">
                    <Upload className="w-10 h-10 text-blue-600" />
                    {resumeUploaded && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl">Upload Resume</h2>
                  <p className="text-gray-600">
                    Upload your existing resume for analysis
                  </p>
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <Button
                    onClick={() => document.getElementById('resume-upload')?.click()}
                    className={`rounded-lg px-8 ${
                      resumeUploaded 
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700'
                    }`}
                  >
                    {resumeUploaded ? 'Uploaded ✓' : 'Upload Resume'}
                  </Button>
                </div>
              </Card>

              <Card className={`p-8 rounded-2xl shadow-lg transition-all duration-300 ${
                resumeCreated ? 'border-2 border-green-500' : 'hover:shadow-2xl'
              }`}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center relative">
                    <FilePlus className="w-10 h-10 text-purple-600" />
                    {resumeCreated && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl">Create Resume</h2>
                  <p className="text-gray-600">
                    Build a professional resume from scratch
                  </p>
                  <Button
                    onClick={handleCreateResume}
                    className={`rounded-lg px-8 ${
                      resumeCreated
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {resumeCreated ? 'Created ✓' : 'Create Resume'}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Analyze Resume Button */}
            <Card className={`p-8 rounded-2xl shadow-lg transition-all duration-300 ${
              canAnalyze ? 'hover:shadow-2xl' : 'opacity-50'
            }`}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center ${
                  !canAnalyze && 'opacity-50'
                }`}>
                  <Brain className="w-10 h-10 text-indigo-600" />
                </div>
                <h2 className="text-2xl">Analyze Resume</h2>
                <p className="text-gray-600">
                  {canAnalyze 
                    ? 'Ready to analyze your resume and evaluate your skills'
                    : 'Upload or create a resume first to enable analysis'
                  }
                </p>
                <Button
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  className={`rounded-lg px-12 h-12 transition-all duration-300 ${
                    canAnalyze
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  Analyze Resume
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {flowStep === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-8 rounded-2xl shadow-lg">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Question {currentQuestion + 1} / {resumeQuestions.length}
                  </span>
                  <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                    Resume Evaluation
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <h2 className="text-2xl mb-6">{resumeQuestions[currentQuestion].q}</h2>

              <RadioGroup
                value={answers[currentQuestion]}
                onValueChange={(v) => setAnswers({ ...answers, [currentQuestion]: v })}
              >
                <div className="space-y-3">
                  {resumeQuestions[currentQuestion].options.map((opt, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-indigo-400 transition-colors"
                    >
                      <RadioGroupItem value={opt} id={`opt-${i}`} />
                      <Label htmlFor={`opt-${i}`} className="flex-1 cursor-pointer">
                        {opt}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <Button
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestion]}
                className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg h-12"
              >
                {currentQuestion < resumeQuestions.length - 1 ? 'Next Question' : 'Complete Evaluation'}
              </Button>
            </Card>
          </motion.div>
        )}

        {flowStep === 'report' && (
          <motion.div
            key="report"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-4xl mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Resume Analysis Complete!
            </h1>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl mb-4">Category-wise Scores</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl mb-4">Skill Radar</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={skillsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Your Score"
                      dataKey="value"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Benchmark"
                      dataKey="benchmark"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.3}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  setFlowStep('initial');
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
                variant="outline"
                className="rounded-lg px-8"
              >
                Retake
              </Button>
              <Button
                onClick={handleViewDetailed}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg px-8 transition-all duration-300 hover:shadow-lg"
              >
                View Detailed Analysis
              </Button>
            </div>
          </motion.div>
        )}

        {flowStep === 'detailed' && (
          <motion.div
            key="detailed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto space-y-6"
          >
            {/* Overall Summary Card */}
            <Card className="p-8 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl mb-2">Resume Analysis Report</h1>
                  <p className="text-indigo-100 text-lg">
                    Comprehensive evaluation of your professional profile
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-6xl mb-2">{resumeAnalysisData.overallScore}</div>
                  <div className="text-indigo-100">Readiness Score</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div>
                  <div className="text-indigo-100 mb-1">Rank</div>
                  <div className="text-2xl flex items-center gap-2">
                    <Award className="w-6 h-6" />
                    {resumeAnalysisData.rank}
                  </div>
                </div>
                <div>
                  <div className="text-indigo-100 mb-1">Evaluation Time</div>
                  <div className="text-2xl">{resumeAnalysisData.totalTime}</div>
                </div>
                <div>
                  <div className="text-indigo-100 mb-1">Accuracy</div>
                  <div className="text-2xl flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    {resumeAnalysisData.accuracy}
                  </div>
                </div>
              </div>
            </Card>

            {/* Skills Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl mb-4 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-indigo-600" />
                  Skills Assessment
                </h2>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={skillsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Your Score"
                      dataKey="value"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Industry Benchmark"
                      dataKey="benchmark"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.3}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-600" />
                  Professional Traits
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
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{trait.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Category Analysis */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl mb-6">Category-wise Analysis</h2>
              <div className="space-y-4">
                {levelDetails.map((category, index) => (
                  <Collapsible
                    key={category.category}
                    open={expandedSections[category.category]}
                    onOpenChange={() => toggleSection(category.category)}
                  >
                    <Card className="border-2 border-gray-200 overflow-hidden">
                      <CollapsibleTrigger className="w-full p-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                            index === 0 ? 'from-indigo-500 to-indigo-600' :
                            index === 1 ? 'from-purple-500 to-purple-600' :
                            'from-pink-500 to-pink-600'
                          } flex items-center justify-center text-white font-bold`}>
                            {index + 1}
                          </div>
                          <div className="text-left">
                            <div className="text-lg font-medium">{category.category}</div>
                            <div className="text-sm text-gray-600">Score: {category.score}%</div>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            expandedSections[category.category] ? 'rotate-180' : ''
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-6 border-t bg-gray-50">
                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white p-4 rounded-lg">
                              <div className="text-sm text-gray-600 mb-1">Score</div>
                              <div className="text-3xl font-bold text-indigo-600">{category.score}%</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                              <div className="text-sm text-gray-600 mb-1">Accuracy</div>
                              <div className="text-3xl font-bold text-purple-600">{category.accuracy}</div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="font-medium text-green-800 mb-2 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Strengths
                              </div>
                              <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                                {category.strengths.map((strength, i) => (
                                  <li key={i}>{strength}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                              <div className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                Areas for Growth
                              </div>
                              <ul className="list-disc list-inside space-y-1 text-sm text-amber-700">
                                {category.improvements.map((improvement, i) => (
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
                                {category.analysis}
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

            {/* Career Matches */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-indigo-600" />
                Top Career Matches
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {careerMatches.map((career, i) => (
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
            <Card className="p-6 rounded-2xl shadow-lg border-2 border-indigo-200 bg-indigo-50">
              <h2 className="text-xl mb-4">Terms & Conditions</h2>
              <div className="max-h-48 overflow-y-auto bg-white p-4 rounded-lg mb-4 text-sm text-gray-700 space-y-2">
                <p>
                  <strong>1. Data Usage:</strong> Your resume data will be stored and used to generate personalized career recommendations.
                </p>
                <p>
                  <strong>2. Privacy:</strong> We respect your privacy and will not share your personal information without consent.
                </p>
                <p>
                  <strong>3. Accuracy:</strong> Analysis results are based on your responses and resume content, for guidance purposes only.
                </p>
                <p>
                  <strong>4. Profile Building:</strong> By proceeding, you agree to build your comprehensive profile based on these results.
                </p>
                <p>
                  <strong>5. Updates:</strong> You can update your resume and retake evaluations at any time.
                </p>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <Checkbox
                  id="resume-terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                />
                <Label htmlFor="resume-terms" className="cursor-pointer">
                  I agree to the Terms & Conditions and want to save this analysis to My Resume
                </Label>
              </div>

              <Button
                onClick={handleBuildProfile}
                disabled={!agreedToTerms}
                className={`w-full rounded-lg h-12 transition-all duration-300 ${
                  agreedToTerms
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Build Profile
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
