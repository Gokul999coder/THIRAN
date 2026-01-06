import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { MapPin, DollarSign, Briefcase, BookmarkPlus, Send } from 'lucide-react';

const jobs = {
  recommended: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      salary: '$120k - $180k',
      match: 92,
      skills: ['JavaScript', 'React', 'Node.js'],
      why: 'Your strong JavaScript and React skills align perfectly with this role',
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      location: 'Remote',
      salary: '$100k - $150k',
      match: 88,
      skills: ['Python', 'React', 'AWS'],
      why: 'Your full-stack experience matches their technology stack',
    },
    {
      title: 'Frontend Lead',
      company: 'Design Studio',
      location: 'New York, NY',
      salary: '$110k - $160k',
      match: 85,
      skills: ['React', 'TypeScript', 'CSS'],
      why: 'Leadership potential and frontend expertise are a great fit',
    },
  ],
  entryLevel: [
    {
      title: 'Junior Developer',
      company: 'Code Academy',
      location: 'Boston, MA',
      salary: '$60k - $80k',
      match: 78,
      skills: ['JavaScript', 'HTML', 'CSS'],
      why: 'Perfect starting position to grow your career',
    },
  ],
  internships: [
    {
      title: 'Software Engineering Intern',
      company: 'Big Tech Co',
      location: 'Seattle, WA',
      salary: '$30/hr',
      match: 75,
      skills: ['Python', 'Git', 'Agile'],
      why: 'Great opportunity to gain industry experience',
    },
  ],
};

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState('recommended');

  const renderJobCard = (job: any, index: number) => (
    <Card key={index} className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl mb-1">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl mb-1 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            {job.match}%
          </div>
          <p className="text-xs text-gray-600">Match</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          {job.salary}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm mb-2">Required Skills:</p>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill: string, i: number) => (
            <Badge key={i} variant="outline">{skill}</Badge>
          ))}
        </div>
      </div>

      <div className="p-3 bg-blue-50 rounded-lg mb-4">
        <p className="text-sm text-blue-700">
          <strong>Why this match?</strong> {job.why}
        </p>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 gap-2">
          <Send className="w-4 h-4" />
          Apply
        </Button>
        <Button variant="outline" className="gap-2">
          <BookmarkPlus className="w-4 h-4" />
          Save
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          Jobs Matching Your Profile
        </h1>
        <p className="text-gray-600">Find opportunities that align with your skills and career goals</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="entryLevel">Entry-Level</TabsTrigger>
          <TabsTrigger value="internships">Internships</TabsTrigger>
          <TabsTrigger value="fullTime">Full-Time</TabsTrigger>
          <TabsTrigger value="future">Future-Ready</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-6">
          {jobs.recommended.map((job, i) => renderJobCard(job, i))}
        </TabsContent>

        <TabsContent value="entryLevel" className="space-y-6">
          {jobs.entryLevel.map((job, i) => renderJobCard(job, i))}
        </TabsContent>

        <TabsContent value="internships" className="space-y-6">
          {jobs.internships.map((job, i) => renderJobCard(job, i))}
        </TabsContent>

        <TabsContent value="fullTime" className="space-y-6">
          <div className="text-center py-12 text-gray-600">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p>Full-time opportunities coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="future" className="space-y-6">
          <div className="text-center py-12 text-gray-600">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p>Future-ready positions coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
