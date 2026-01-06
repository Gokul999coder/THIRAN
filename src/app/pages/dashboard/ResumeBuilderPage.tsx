import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';

export default function ResumeBuilderPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });

  const handleCreate = () => {
    navigate('/dashboard/home');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-8">Resume Builder</h1>
      <Card className="p-6 rounded-2xl shadow-lg max-w-3xl">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Professional Summary</Label>
            <Textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Experience</Label>
            <Textarea
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Education</Label>
            <Textarea
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <Textarea
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              rows={3}
            />
          </div>

          <Button
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
          >
            Create Resume
          </Button>
        </div>
      </Card>
    </div>
  );
}
