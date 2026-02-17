import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Briefcase, GraduationCap, Code, Award, FolderGit2 } from 'lucide-react';
import type { CVFormData } from '../../pages/CVBuilderPage';

interface CVPreviewProps {
  formData: CVFormData;
}

export default function CVPreview({ formData }: CVPreviewProps) {
  const photoUrl = formData.photo?.getDirectURL();

  return (
    <Card className="cv-preview bg-white text-black print:shadow-none print:border-0 overflow-hidden">
      <div className="cv-content">
        {/* Header Section */}
        <div className="cv-header">
          <div className="flex items-start gap-8">
            {photoUrl && (
              <div className="flex-shrink-0">
                <div className="cv-photo-frame">
                  <img
                    src={photoUrl}
                    alt={formData.name || 'Profile'}
                    className="cv-photo"
                  />
                </div>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="cv-name">
                {formData.name || 'Your Name'}
              </h1>
              <div className="cv-contact-info">
                {formData.email && (
                  <div className="cv-contact-item">
                    <Mail className="cv-contact-icon" />
                    <span>{formData.email}</span>
                  </div>
                )}
                {formData.phone && (
                  <div className="cv-contact-item">
                    <Phone className="cv-contact-icon" />
                    <span>{formData.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {formData.summary && (
          <div className="cv-section">
            <div className="cv-section-header-simple">
              <h2 className="cv-section-title">Professional Summary</h2>
            </div>
            <p className="cv-summary-text">{formData.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {formData.workExperience.length > 0 && (
          <div className="cv-section">
            <div className="cv-section-header">
              <Briefcase className="cv-section-icon" />
              <h2 className="cv-section-title">Work Experience</h2>
            </div>
            <div className="cv-entries">
              {formData.workExperience.map((exp, index) => (
                <div key={exp.id} className="cv-entry">
                  <div className="cv-entry-header">
                    <div className="cv-entry-main">
                      <h3 className="cv-entry-title">{exp.title}</h3>
                      <p className="cv-entry-subtitle">{exp.company}</p>
                    </div>
                    <span className="cv-entry-period">{exp.period}</span>
                  </div>
                  {exp.description && (
                    <p className="cv-entry-description">{exp.description}</p>
                  )}
                  {index < formData.workExperience.length - 1 && (
                    <div className="cv-entry-divider" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {formData.education.length > 0 && (
          <div className="cv-section">
            <div className="cv-section-header">
              <GraduationCap className="cv-section-icon" />
              <h2 className="cv-section-title">Education</h2>
            </div>
            <div className="cv-entries">
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="cv-entry">
                  <div className="cv-entry-header">
                    <div className="cv-entry-main">
                      <h3 className="cv-entry-title">{edu.degree}</h3>
                      <p className="cv-entry-subtitle">{edu.institution}</p>
                    </div>
                    <span className="cv-entry-period">{edu.period}</span>
                  </div>
                  {edu.description && (
                    <p className="cv-entry-description">{edu.description}</p>
                  )}
                  {index < formData.education.length - 1 && (
                    <div className="cv-entry-divider" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {formData.skills.length > 0 && (
          <div className="cv-section">
            <div className="cv-section-header">
              <Code className="cv-section-icon" />
              <h2 className="cv-section-title">Skills</h2>
            </div>
            <div className="cv-skills-grid">
              {formData.skills.map((skill) => (
                <span key={skill} className="cv-skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {formData.projects.length > 0 && (
          <div className="cv-section">
            <div className="cv-section-header">
              <FolderGit2 className="cv-section-icon" />
              <h2 className="cv-section-title">Projects</h2>
            </div>
            <div className="cv-entries">
              {formData.projects.map((project, index) => (
                <div key={project.id} className="cv-entry">
                  <h3 className="cv-entry-title">{project.name}</h3>
                  {project.description && (
                    <p className="cv-entry-description">{project.description}</p>
                  )}
                  {project.technologies && (
                    <p className="cv-project-tech">
                      <span className="font-semibold">Technologies:</span> {project.technologies}
                    </p>
                  )}
                  {index < formData.projects.length - 1 && (
                    <div className="cv-entry-divider" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {formData.certifications.length > 0 && (
          <div className="cv-section">
            <div className="cv-section-header">
              <Award className="cv-section-icon" />
              <h2 className="cv-section-title">Certifications & Awards</h2>
            </div>
            <div className="cv-entries">
              {formData.certifications.map((cert, index) => (
                <div key={cert.id} className="cv-entry">
                  <div className="cv-entry-header">
                    <div className="cv-entry-main">
                      <h3 className="cv-entry-title">{cert.name}</h3>
                      <p className="cv-entry-subtitle">{cert.issuer}</p>
                    </div>
                    <span className="cv-entry-period">{cert.date}</span>
                  </div>
                  {index < formData.certifications.length - 1 && (
                    <div className="cv-entry-divider" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
