import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { motion } from 'motion/react';

export default function Level2PopupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    childhoodAim: '',
    currentAim: '',
    expectedSalary: '',
  });

  const handleContinue = () => {
    navigate('/assessment/2');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-white">
          <h2 className="text-2xl mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent text-center">
            Before We Continue...
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="childhoodAim">Childhood Aim</Label>
              <Input
                id="childhoodAim"
                placeholder="What did you want to be as a child?"
                value={formData.childhoodAim}
                onChange={(e) => setFormData({ ...formData, childhoodAim: e.target.value })}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAim">Current Aim</Label>
              <Input
                id="currentAim"
                placeholder="What is your current career goal?"
                value={formData.currentAim}
                onChange={(e) => setFormData({ ...formData, currentAim: e.target.value })}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedSalary">Expected Salary</Label>
              <Input
                id="expectedSalary"
                placeholder="Your salary expectation"
                value={formData.expectedSalary}
                onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                className="rounded-lg"
              />
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-lg h-12 transition-all duration-300 hover:shadow-lg"
          >
            Continue to Level 2
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
