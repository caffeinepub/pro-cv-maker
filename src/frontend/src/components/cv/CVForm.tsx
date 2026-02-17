import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import PhotoUploader from './PhotoUploader';
import RepeatableListEditor from './RepeatableListEditor';
import type { CVFormData } from '../../pages/CVBuilderPage';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useState } from 'react';

interface CVFormProps {
  formData: CVFormData;
  setFormData: (data: CVFormData) => void;
}

export default function CVForm({ formData, setFormData }: CVFormProps) {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="photo">Profile Photo</Label>
            <PhotoUploader
              photo={formData.photo}
              onPhotoChange={(photo) => setFormData({ ...formData, photo })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            * At least one contact method (email or phone) is required
          </p>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="A brief overview of your professional background, key skills, and career objectives..."
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <RepeatableListEditor
            items={formData.workExperience}
            onChange={(items) => setFormData({ ...formData, workExperience: items })}
            renderItem={(item, onChange) => (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input
                    placeholder="Senior Software Engineer"
                    value={item.title}
                    onChange={(e) => onChange({ ...item, title: e.target.value })}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      placeholder="Tech Corp"
                      value={item.company}
                      onChange={(e) => onChange({ ...item, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Input
                      placeholder="Jan 2020 - Present"
                      value={item.period}
                      onChange={(e) => onChange({ ...item, period: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Key responsibilities and achievements..."
                    value={item.description}
                    onChange={(e) => onChange({ ...item, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}
            createNew={() => ({
              id: `work-${Date.now()}`,
              title: '',
              company: '',
              period: '',
              description: '',
            })}
            emptyMessage="No work experience added yet. Click 'Add Work Experience' to get started."
          />
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          <RepeatableListEditor
            items={formData.education}
            onChange={(items) => setFormData({ ...formData, education: items })}
            renderItem={(item, onChange) => (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    placeholder="Bachelor of Science in Computer Science"
                    value={item.degree}
                    onChange={(e) => onChange({ ...item, degree: e.target.value })}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      placeholder="University Name"
                      value={item.institution}
                      onChange={(e) => onChange({ ...item, institution: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Input
                      placeholder="2016 - 2020"
                      value={item.period}
                      onChange={(e) => onChange({ ...item, period: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Textarea
                    placeholder="Honors, relevant coursework, activities..."
                    value={item.description}
                    onChange={(e) => onChange({ ...item, description: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
            )}
            createNew={() => ({
              id: `edu-${Date.now()}`,
              degree: '',
              institution: '',
              period: '',
              description: '',
            })}
            emptyMessage="No education added yet. Click 'Add Education' to get started."
          />
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skill-input">Add Skills</Label>
            <div className="flex gap-2">
              <Input
                id="skill-input"
                placeholder="e.g., JavaScript, Project Management"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
              />
            </div>
            <p className="text-xs text-muted-foreground">Press Enter to add a skill</p>
          </div>

          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Projects (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <RepeatableListEditor
            items={formData.projects}
            onChange={(items) => setFormData({ ...formData, projects: items })}
            renderItem={(item, onChange) => (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    placeholder="E-commerce Platform"
                    value={item.name}
                    onChange={(e) => onChange({ ...item, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Brief description of the project and your role..."
                    value={item.description}
                    onChange={(e) => onChange({ ...item, description: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Technologies Used</Label>
                  <Input
                    placeholder="React, Node.js, MongoDB"
                    value={item.technologies}
                    onChange={(e) => onChange({ ...item, technologies: e.target.value })}
                  />
                </div>
              </div>
            )}
            createNew={() => ({
              id: `project-${Date.now()}`,
              name: '',
              description: '',
              technologies: '',
            })}
            emptyMessage="No projects added yet. Click 'Add Project' to showcase your work."
          />
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle>Certifications & Awards (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <RepeatableListEditor
            items={formData.certifications}
            onChange={(items) => setFormData({ ...formData, certifications: items })}
            renderItem={(item, onChange) => (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Certification/Award Name</Label>
                  <Input
                    placeholder="AWS Certified Solutions Architect"
                    value={item.name}
                    onChange={(e) => onChange({ ...item, name: e.target.value })}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Issuing Organization</Label>
                    <Input
                      placeholder="Amazon Web Services"
                      value={item.issuer}
                      onChange={(e) => onChange({ ...item, issuer: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      placeholder="June 2023"
                      value={item.date}
                      onChange={(e) => onChange({ ...item, date: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
            createNew={() => ({
              id: `cert-${Date.now()}`,
              name: '',
              issuer: '',
              date: '',
            })}
            emptyMessage="No certifications or awards added yet. Click 'Add Certification' to highlight your achievements."
          />
        </CardContent>
      </Card>
    </div>
  );
}
