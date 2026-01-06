import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { motion } from 'motion/react';
import { Lock, CheckCircle2, Brain, Target, Lightbulb, Code } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

export default function LevelsOverviewPage() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const levels = [
    {
      level: 1,
      title: 'Level 1 - Basic Assessment',
      description: 'Aptitude, logical reasoning, personality & interests',
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      tooltip: '10 questions covering basic aptitude and personality traits',
    },
    {
      level: 2,
      title: 'Levels 2 & 3 - Intermediate & Advanced',
      description: 'Logic games, reasoning & decision-making',
      icon: Target,
      color: 'from-teal-500 to-teal-600',
      tooltip: '20 questions testing logical thinking and analytical skills',
    },
    {
      level: 4,
      title: 'Level 4 - Skill & Technical',
      description: 'Technical skills and problem-solving',
      icon: Code,
      color: 'from-purple-500 to-purple-600',
      tooltip: '10 questions based on your identified interests',
    },
  ];

  const handleLevelClick = (level: number) => {
    if (level === 1 || completedLevels.includes(level - 1)) {
      navigate(`/assessment/${level}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Psychometric Assessment Levels
          </h1>
          <p className="text-gray-600 text-lg">Complete all levels to unlock your full profile</p>
        </motion.div>

        <div className="space-y-6">
          {levels.map((levelData, index) => {
            const isLocked = levelData.level > 1 && !completedLevels.includes(levelData.level - 1);
            const isCompleted = completedLevels.includes(levelData.level);

            return (
              <motion.div
                key={levelData.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card
                        className={`p-6 cursor-pointer transition-all duration-300 rounded-2xl ${
                          isLocked
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:shadow-2xl hover:-translate-y-1'
                        }`}
                        onClick={() => !isLocked && handleLevelClick(levelData.level)}
                      >
                        <div className="flex items-center gap-6">
                          <div
                            className={`w-16 h-16 rounded-xl bg-gradient-to-r ${levelData.color} flex items-center justify-center relative`}
                          >
                            {isLocked ? (
                              <Lock className="w-8 h-8 text-white" />
                            ) : isCompleted ? (
                              <CheckCircle2 className="w-8 h-8 text-white" />
                            ) : (
                              <levelData.icon className="w-8 h-8 text-white" />
                            )}
                          </div>

                          <div className="flex-1">
                            <h3 className="text-2xl mb-1">{levelData.title}</h3>
                            <p className="text-gray-600">{levelData.description}</p>
                          </div>

                          {isCompleted && (
                            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                              Completed
                            </div>
                          )}
                        </div>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{levelData.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
