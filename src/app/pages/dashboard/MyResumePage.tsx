import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { motion } from 'motion/react';
import { FileText, Download, Eye, Calendar, CheckCircle } from 'lucide-react';

// Mock stored resumes
const storedResumes = [
  {
    id: 1,
    type: 'uploaded',
    name: 'John_Doe_Resume.pdf',
    uploadedDate: '2026-01-05',
    analyzed: true,
    status: 'Analyzed',
  },
  {
    id: 2,
    type: 'created',
    name: 'Created_Resume_V1',
    createdDate: '2026-01-04',
    analyzed: true,
    status: 'Analyzed',
  },
];

export default function MyResumePage() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            My Resumes
          </h1>
        </div>

        {storedResumes.length === 0 ? (
          <Card className="p-12 rounded-2xl shadow-lg text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl mb-2 text-gray-600">No Resumes Yet</h3>
            <p className="text-gray-500">
              Upload or create a resume from the Home page to get started
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {storedResumes.map((resume) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: resume.id * 0.1 }}
              >
                <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${
                        resume.type === 'uploaded' 
                          ? 'from-blue-500 to-teal-500' 
                          : 'from-purple-500 to-pink-500'
                      } flex items-center justify-center`}>
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="text-xl mb-1">{resume.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {resume.type === 'uploaded' ? resume.uploadedDate : resume.createdDate}
                          </div>
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                            resume.analyzed 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {resume.analyzed && <CheckCircle className="w-4 h-4" />}
                            {resume.status}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            resume.type === 'uploaded'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {resume.type === 'uploaded' ? 'Uploaded' : 'Created'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="gap-2 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2 rounded-lg"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>

                  {resume.analyzed && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">Readiness Score</div>
                          <div className="text-2xl font-bold text-blue-600">82%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">Skills Matched</div>
                          <div className="text-2xl font-bold text-teal-600">15/20</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">Questions Answered</div>
                          <div className="text-2xl font-bold text-purple-600">10/10</div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
