import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useUserProfile';
import { useGetCV, useSaveCV } from '../hooks/useCVData';
import AuthStatus from '../components/auth/AuthStatus';
import CVForm from '../components/cv/CVForm';
import CVPreview from '../components/cv/CVPreview';
import { Button } from '@/components/ui/button';
import { Printer, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { CVData } from '../backend';
import { ExternalBlob } from '../backend';

export interface CVFormData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  workExperience: Array<{
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    period: string;
    description: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
  photo?: ExternalBlob;
}

const defaultFormData: CVFormData = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
};

export default function CVBuilderPage() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: savedCV, isLoading: cvLoading } = useGetCV();
  const saveCVMutation = useSaveCV();

  const [formData, setFormData] = useState<CVFormData>(defaultFormData);
  const [hasLoadedCV, setHasLoadedCV] = useState(false);

  // Load saved CV data when available
  useEffect(() => {
    if (savedCV && !hasLoadedCV) {
      // Deserialize backend CVData to form structure
      const workExp = savedCV.workExperience.map((exp, idx) => ({
        id: `work-${idx}`,
        title: exp.split('|')[0] || '',
        company: exp.split('|')[1] || '',
        period: exp.split('|')[2] || '',
        description: exp.split('|')[3] || '',
      }));

      const edu = savedCV.education.map((ed, idx) => ({
        id: `edu-${idx}`,
        degree: ed.split('|')[0] || '',
        institution: ed.split('|')[1] || '',
        period: ed.split('|')[2] || '',
        description: ed.split('|')[3] || '',
      }));

      setFormData({
        name: savedCV.name || '',
        email: savedCV.email || '',
        phone: savedCV.phone || '',
        summary: '',
        workExperience: workExp,
        education: edu,
        skills: savedCV.skills || [],
        projects: [],
        certifications: [],
        photo: savedCV.photo,
      });
      setHasLoadedCV(true);
    }
  }, [savedCV, hasLoadedCV]);

  const handleSave = async () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      toast.error('Please provide at least one contact method (email or phone)');
      return;
    }

    // Serialize form data to backend format
    const cvData: CVData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      workExperience: formData.workExperience.map(
        (exp) => `${exp.title}|${exp.company}|${exp.period}|${exp.description}`
      ),
      education: formData.education.map(
        (ed) => `${ed.degree}|${ed.institution}|${ed.period}|${ed.description}`
      ),
      skills: formData.skills,
      photo: formData.photo,
    };

    try {
      await saveCVMutation.mutateAsync(cvData);
      toast.success('CV saved successfully!');
    } catch (error) {
      toast.error('Failed to save CV. Please try again.');
      console.error('Save error:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (cvLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="mt-4 text-muted-foreground">Loading your CV...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card print:hidden sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Pro CV Maker</h1>
              {userProfile && (
                <p className="text-sm text-muted-foreground">Welcome, {userProfile.name}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleSave} disabled={saveCVMutation.isPending} variant="default">
                {saveCVMutation.isPending ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save CV
                  </>
                )}
              </Button>
              <Button onClick={handlePrint} variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Print / Save as PDF
              </Button>
              <AuthStatus />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="print:hidden">
            <CVForm formData={formData} setFormData={setFormData} />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <CVPreview formData={formData} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 print:hidden">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Pro CV Maker. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'pro-cv-maker'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
