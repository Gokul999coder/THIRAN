import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { motion } from 'motion/react';
import { FileText, Plus } from 'lucide-react';

export default function ProfileOptionPage() {
  const navigate = useNavigate();

  const options = [
    {
      icon: FileText,
      title: 'Continue with Existing Profile',
      description: 'Resume from where you left off',
      onClick: () => navigate('/levels-overview'),
    },
    {
      icon: Plus,
      title: 'Create New Profile',
      description: 'Start fresh with a new assessment',
      onClick: () => navigate('/levels-overview'),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 p-4">
      <div className="max-w-4xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl text-center mb-12 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
        >
          Choose Your Path
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                className="p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-2xl"
                onClick={option.onClick}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center">
                    <option.icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-2xl">{option.title}</h2>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
