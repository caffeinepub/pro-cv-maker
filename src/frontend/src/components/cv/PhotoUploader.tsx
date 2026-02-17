import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, X } from 'lucide-react';
import { ExternalBlob } from '../../backend';
import { toast } from 'sonner';

interface PhotoUploaderProps {
  photo?: ExternalBlob;
  onPhotoChange: (photo?: ExternalBlob) => void;
}

export default function PhotoUploader({ photo, onPhotoChange }: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      onPhotoChange(blob);
      toast.success('Photo uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload photo. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onPhotoChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const photoUrl = photo?.getDirectURL();

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-24 w-24">
        {photoUrl ? (
          <AvatarImage src={photoUrl} alt="Profile photo" />
        ) : (
          <AvatarFallback className="bg-muted">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </AvatarFallback>
        )}
      </Avatar>

      <div className="flex-1 space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                Uploading... {uploadProgress}%
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                {photo ? 'Change Photo' : 'Upload Photo'}
              </>
            )}
          </Button>

          {photo && !isUploading && (
            <Button type="button" variant="ghost" size="sm" onClick={handleRemove}>
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Recommended: Square image, max 5MB (PNG, JPG)
        </p>
      </div>
    </div>
  );
}
