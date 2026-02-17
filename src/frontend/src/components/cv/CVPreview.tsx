import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Briefcase, GraduationCap, Code, Award } from 'lucide-react';
import type { CVFormData } from '../../pages/CVBuilderPage';

interface CVPreviewProps {
  formData: CVFormData;
}

export default function CVPreview({ formData }: CVPreviewProps) {
  const photoUrl = formData.photo?.getDirectURL();

  return (
    <Card className="cv-preview bg-white text-black print:shadow-none print:border-0">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-6">
          {photoUrl && (
            <div className="flex-shrink-0">
              <img
                src={photoUrl}
                alt={formData.name || 'Profile'}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {formData.name || 'Your Name'}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {formData.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{formData.email}</span>
                </div>
              )}
              {formData.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{formData.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {formData.summary && (
          <>
            <Separator className="bg-gray-300" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{formData.summary}</p>
            </div>
          </>
        )}

        {/* Work Experience */}
        {formData.workExperience.length > 0 && (
          <>
            <Separator className="bg-gray-300" />
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
              </div>
              <div className="space-y-4">
                {formData.workExperience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <span className="text-sm text-gray-600">{exp.period}</span>
                    </div>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                    {exp.description && (
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Education */}
        {formData.education.length > 0 && (
          <>
            <Separator className="bg-gray-300" />
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Education</h2>
              </div>
              <div className="space-y-4">
                {formData.education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <span className="text-sm text-gray-600">{edu.period}</span>
                    </div>
                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Skills */}
        {formData.skills.length > 0 && (
          <>
            <Separator className="bg-gray-300" />
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-gray-200 text-gray-800 hover:bg-gray-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Projects */}
        {formData.projects.length > 0 && (
          <>
            <Separator className="bg-gray-300" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
              <div className="space-y-4">
                {formData.projects.map((project) => (
                  <div key={project.id} className="space-y-1">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {project.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                    )}
                    {project.technologies && (
                      <p className="text-gray-500 text-sm">
                        <span className="font-medium">Technologies:</span> {project.technologies}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Certifications */}
        {formData.certifications.length > 0 && (
          <>
            <Separator className="bg-gray-300" />
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Certifications & Awards</h2>
              </div>
              <div className="space-y-3">
                {formData.certifications.map((cert) => (
                  <div key={cert.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <span className="text-sm text-gray-600">{cert.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
