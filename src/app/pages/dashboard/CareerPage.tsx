import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Brain, FileText, Target, TrendingUp, CheckCircle2 } from 'lucide-react';

const assessmentProfile = {
  personality: ['Analytical', 'Detail-Oriented', 'Team Player'],
  aptitude: ['Logical Reasoning: 85%', 'Problem Solving: 88%', 'Numerical: 82%'],
  interests: ['Technology', 'Innovation', 'Data Analysis'],
  careers: ['Software Developer', 'Data Scientist', 'Technical Lead'],
  confidence: 85,
};

const resumeProfile = {
  skills: ['JavaScript', 'Python', 'React', 'Node.js'],
  verified: ['JavaScript: 85%', 'Python: 75%', 'React: 90%'],
  gaps: ['Cloud Architecture', 'DevOps', 'System Design'],
  readiness: 82,
};

export default function CareerPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl mb-8 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
        Career Profile Comparison
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Assessment-Based Profile */}
        <Card className="p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl">Assessment-Based Profile</h2>
          </div>

          <div className="space-y-6 max-h-[600px] overflow-y-auto">
            <div>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Personality Traits
              </h3>
              <div className="flex flex-wrap gap-2">
                {assessmentProfile.personality.map((trait, i) => (
                  <Badge key={i} className="bg-blue-100 text-blue-700">{trait}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-3">Aptitude Strengths</h3>
              <div className="space-y-2">
                {assessmentProfile.aptitude.map((apt, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {apt}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {assessmentProfile.interests.map((interest, i) => (
                  <Badge key={i} variant="outline">{interest}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-3">Suggested Career Domains</h3>
              <div className="space-y-2">
                {assessmentProfile.careers.map((career, i) => (
                  <div key={i} className="p-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg">
                    {career}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-2">Career Confidence</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-teal-600 h-3 rounded-full"
                    style={{ width: `${assessmentProfile.confidence}%` }}
                  />
                </div>
                <span className="text-lg">{assessmentProfile.confidence}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Resume-Based Profile */}
        <Card className="p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl">Resume-Based Profile</h2>
          </div>

          <div className="space-y-6 max-h-[600px] overflow-y-auto">
            <div>
              <h3 className="text-lg mb-3">Verified Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resumeProfile.skills.map((skill, i) => (
                  <Badge key={i} className="bg-purple-100 text-purple-700">{skill}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-3">Skill Confidence Levels</h3>
              <div className="space-y-2">
                {resumeProfile.verified.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-3">Skill Gaps</h3>
              <div className="space-y-2">
                {resumeProfile.gaps.map((gap, i) => (
                  <div key={i} className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    {gap}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-2">Job Readiness Score</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                    style={{ width: `${resumeProfile.readiness}%` }}
                  />
                </div>
                <span className="text-lg">{resumeProfile.readiness}%</span>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Recommendation:</strong> Focus on cloud and DevOps skills to improve readiness
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
