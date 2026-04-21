import { useRef, useState } from "react";
import { Upload as UploadIcon, CheckCircle2, ImageIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  PROGRESS_INTERVAL_MS,
  PROGRESS_STEP,
  REDIRECT_DELAY_MS,
} from "../libs/contants";

interface UploadProps {
  onComplete?: (base64: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSignedIn = !!user;

  const processFile = (selected: File) => {
    if (!isSignedIn) return;

    setFile(selected);
    setProgress(0);

    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = e.target?.result as string;

      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + PROGRESS_STEP;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete?.(base64);
            }, REDIRECT_DELAY_MS);
            return 100;
          }
          return next;
        });
      }, PROGRESS_INTERVAL_MS);
    };

    reader.readAsDataURL(selected);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) processFile(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isSignedIn) return;
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) processFile(dropped);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isSignedIn) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleClick = () => {
    if (isSignedIn) inputRef.current?.click();
  };

  return (
    <div className="upload">
      {!file ? (
        <div
          className={`dropzone ${isDragging ? "is-dragging" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <input
            ref={inputRef}
            type="file"
            className="drop-input"
            accept=".jpg,.jpeg,.png"
            disabled={!isSignedIn}
            onChange={handleChange}
          />

          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>
            <div className="drop-text">
              <p>{isSignedIn ? "Click to upload or drag and drop" : "Sign in to upload"}</p>
              <span className="help">JPG, PNG up to 50MB</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress === 100 ? (
                <CheckCircle2 className="check" />
              ) : (
                <ImageIcon />
              )}
            </div>

            <h3>{file.name}</h3>

            <div className="progress">
              <div className="bar" style={{ width: `${progress}%` }} />
            </div>

            <span className="status-text">
              {progress < 100 ? "Analyzing Floor Plan..." : "Redirecting..."}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
