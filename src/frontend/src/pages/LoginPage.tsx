import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Zap } from 'lucide-react';

export default function LoginPage() {
  const { login, loginStatus } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-4">Pro CV Maker</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create professional CVs instantly with our intuitive builder. Your data stays secure and private.
            </p>
          </div>

          {/* Main Login Card */}
          <Card className="max-w-md mx-auto shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Get Started</CardTitle>
              <CardDescription>
                Sign in securely to create and manage your professional CV
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={login}
                disabled={isLoggingIn}
                size="lg"
                className="w-full text-lg h-12"
              >
                {isLoggingIn ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Secure authentication powered by Internet Identity</p>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3 mx-auto">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Instant Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  See your CV update in real-time as you type. No waiting, no delays.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3 mx-auto">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and stored securely. Only you have access.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3 mx-auto">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Professional Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Clean, modern layouts designed to impress recruiters and employers.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-sm text-muted-foreground">
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
          </footer>
        </div>
      </div>
    </div>
  );
}
