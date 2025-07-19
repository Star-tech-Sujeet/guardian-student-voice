import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { value: 'harassment', label: 'Harassment' },
  { value: 'bullying', label: 'Bullying' },
  { value: 'ragging', label: 'Ragging' },
  { value: 'discrimination', label: 'Discrimination' },
  { value: 'mental-health', label: 'Mental Health Concerns' },
  { value: 'safety', label: 'Safety Issues' },
  { value: 'academic', label: 'Academic Misconduct' },
  { value: 'other', label: 'Other' }
];

export function ReportSubmission() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const generateTrackingId = () => {
    return 'SR' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in the category and description fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const trackingId = generateTrackingId();
    
    toast({
      title: "Report Submitted Successfully",
      description: `Your tracking ID is: ${trackingId}. Please save this for future reference.`,
    });

    // Reset form
    setCategory('');
    setDescription('');
    setLocation('');
    setDateTime('');
    setFiles(null);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-trust mr-3" />
            <h1 className="text-3xl font-bold text-trust">SafeVoice</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Anonymous & Secure Reporting Platform
          </p>
        </div>

        {/* Privacy Notice */}
        <Card className="mb-6 border-safe/20 bg-safe-light/10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-safe mt-0.5" />
              <div>
                <h3 className="font-semibold text-safe mb-2">Your Privacy is Protected</h3>
                <p className="text-sm text-foreground/80">
                  This form is completely anonymous. We do not track your IP address, browser information, 
                  or any personally identifiable data. Your report will be assigned a tracking ID for follow-up purposes only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Form */}
        <Card className="shadow-[var(--shadow-elevated)]">
          <CardHeader>
            <CardTitle className="text-trust">Submit Anonymous Report</CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help us address your concern effectively.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category">Category of Concern *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe what happened, including any relevant details such as who was involved, what was said or done, and how it affected you..."
                  className="min-h-32"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location (optional)</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where did this incident occur? (e.g., Library, Dormitory, Classroom)"
                />
              </div>

              {/* Date/Time */}
              <div className="space-y-2">
                <Label htmlFor="datetime">Date & Time (optional)</Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="files">Supporting Evidence (optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <Input
                    id="files"
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    onChange={(e) => setFiles(e.target.files)}
                    className="hidden"
                  />
                  <Label htmlFor="files" className="cursor-pointer">
                    <p className="text-sm text-foreground">
                      Click to upload screenshots, documents, or other evidence
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports: JPG, PNG, PDF, DOC (max 10MB per file)
                    </p>
                  </Label>
                  {files && files.length > 0 && (
                    <div className="mt-2 text-sm text-safe">
                      {files.length} file(s) selected
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[var(--gradient-primary)] hover:bg-trust-light"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Securely...' : 'Submit Anonymous Report'}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By submitting this report, you acknowledge that the information provided is accurate to the best of your knowledge.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}