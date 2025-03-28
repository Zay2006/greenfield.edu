'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, File, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type Document = {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
};

const documents: Document[] = [
  {
    id: '1',
    name: 'Transcript.pdf',
    type: 'application/pdf',
    size: 1024576, // 1MB
    uploadDate: '2025-03-28',
    status: 'approved',
  },
  {
    id: '2',
    name: 'ID_Card.jpg',
    type: 'image/jpeg',
    size: 512000, // 500KB
    uploadDate: '2025-03-27',
    status: 'pending',
  },
];

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function DocumentsPage() {
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [savedDocuments, setSavedDocuments] = useState<Document[]>(documents);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadingFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleUpload = async () => {
    try {
      // Simulate upload
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: 'Uploading documents...',
          success: 'Documents uploaded successfully!',
          error: 'Failed to upload documents',
        }
      );

      // Add uploaded files to saved documents
      const newDocuments: Document[] = uploadingFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending',
      }));

      setSavedDocuments((prev) => [...prev, ...newDocuments]);
      setUploadingFiles([]);
    } catch (error) {
      toast.error('Failed to upload documents');
    }
  };

  const removeUploadingFile = (index: number) => {
    setUploadingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteDocument = (id: string) => {
    setSavedDocuments((prev) => prev.filter((doc) => doc.id !== id));
    toast.success('Document deleted successfully');
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, JPG, or PNG (max. 10MB)
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {uploadingFiles.length > 0 && (
            <div className="mt-6">
              <div className="space-y-2">
                {uploadingFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <File className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUploadingFile(index)}
                    >
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button onClick={handleUpload}>
                  Upload {uploadingFiles.length} file
                  {uploadingFiles.length === 1 ? '' : 's'}
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">
              Uploaded Documents
            </h3>
            <div className="mt-4 space-y-4">
              {savedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <File className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {doc.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-500">
                          {formatFileSize(doc.size)}
                        </p>
                        <span className="text-gray-300">•</span>
                        <p className="text-sm text-gray-500">
                          {doc.uploadDate}
                        </p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColors[doc.status]
                          }`}
                        >
                          {doc.status.charAt(0).toUpperCase() +
                            doc.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteDocument(doc.id)}
                  >
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </Button>
                </div>
              ))}
              {savedDocuments.length === 0 && (
                <p className="text-center text-gray-500">
                  No documents uploaded yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
