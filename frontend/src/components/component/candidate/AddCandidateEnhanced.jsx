/* eslint-disable react/prop-types */
"use client";

import { useContext, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CandidatesContext } from "../candidate/CandidatesContext";
import { Loader, Upload, FileText, Users, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const candidateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true; // Empty is allowed
      const digitsOnly = val.replace(/\D/g, ''); // Remove non-digits
      return digitsOnly.length === 10; // Must be exactly 10 digits
    }, { message: "Phone number must be exactly 10 digits" }),
  profilePic: z.any().optional(),
  resume: z.any().optional(),
});

// Job data is passed so that , we can create a JobMatchingResume row for this candidate, 
// if Job data is passed , that means it is created from the job details page , otherwise it is invoked from candidates page
const AddCandidate = ({ children, jobData, onCloseCb }) => {
  const { candidates, setCandidates } = useContext(CandidatesContext);
  
  // Tab and loading states
  const [activeTab, setActiveTab] = useState("manual");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  // Manual entry states
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  // Resume upload states
  const [extracting, setExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  
  // Bulk upload states
  const [bulkFiles, setBulkFiles] = useState([]);
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [bulkResults, setBulkResults] = useState([]);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });
  
  // Async upload tracking
  const [asyncUpload, setAsyncUpload] = useState(null); // { batchJobId, type, candidate }
  const [pollingInterval, setPollingInterval] = useState(null);

  const form = useForm({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      profilePic: undefined,
      resume: undefined,
    },
  });

  const uploadFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  const uploadPhoto = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);
    setExtracting(true);
    
    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/candidates/extract-resume-data/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setExtractedData(result.data);
        // Pre-fill form with extracted data
        form.setValue("name", result.data.name || "");
        form.setValue("email", result.data.email || "");
        
        // Clean phone number - ensure only last 10 digits
        let phone = result.data.phone || "";
        
        // Remove all non-digits and get last 10 digits
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.length >= 10) {
          phone = digitsOnly.slice(-10); // Get last 10 digits
        } else if (digitsOnly.length === 8 || digitsOnly.length === 9) {
          phone = ""; // Invalid length, clear it
        } else {
          phone = digitsOnly; // Keep as is for other cases
        }
        
        console.log("Phone extraction:", {
          original: result.data.phone,
          digitsOnly: digitsOnly,
          final: phone,
          length: phone.length
        });
        
        form.setValue("phone", phone);
        
        toast.success("Resume data extracted successfully!");
      } else {
        toast.error("Failed to extract resume data");
      }
    } catch (error) {
      console.error("Error extracting resume:", error);
      toast.error("Error processing resume");
    } finally {
      setExtracting(false);
    }
  };

  const handleBulkFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file count
    if (files.length > 100) {
      toast.error("Maximum 100 files allowed");
      e.target.value = ""; // Reset input
      return;
    }
    
    // Validate file types
    const invalidFiles = files.filter(file => !file.type.includes('pdf'));
    if (invalidFiles.length > 0) {
      toast.error(`${invalidFiles.length} non-PDF files detected. Only PDF files are allowed.`);
      e.target.value = ""; // Reset input
      return;
    }
    
    setBulkFiles(files);
    setBulkResults([]);
    setBulkProgress({ current: 0, total: files.length });
  };

  const processBulkUpload = async () => {
    // Close dialog immediately when processing starts
    setOpen(false);
    if (onCloseCb) onCloseCb();
    
    // Reset bulk upload state in dialog
    setBulkFiles([]);
    setBulkProgress({ current: 0, total: 0 });
    
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"][multiple]');
    if (fileInput) fileInput.value = '';
    
    // Show initial progress toast
    const progressToastId = toast.loading(`Processing 0/${bulkFiles.length} resumes...`, {
      duration: Infinity,
    });
    
    try {
      const formData = new FormData();
      
      // Append all files
      bulkFiles.forEach(file => {
        formData.append('resumes', file);
      });
      
      // Add job ID if available
      if (jobData?.id) {
        formData.append('job_id', jobData.id);
      }
      
      const token = localStorage.getItem("authToken");
      
      // Create a custom fetch with progress tracking
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/candidates/bulk-upload/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
      
      // Dismiss the progress toast
      toast.dismiss(progressToastId);
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.batch_job_id) {
          // New async bulk upload with tracking
          toast.success(
            `🚀 Bulk Upload Started!`,
            {
              description: `Processing ${result.processing_details.total_files} resumes in the background. You'll receive notifications as they complete.`,
              duration: 5000,
            }
          );
          
          // Start polling for bulk upload status
          startBulkPolling(result.batch_job_id, result.processing_details.total_files);
        } else {
          toast.error(result.error || "Bulk upload failed");
        }
      } else {
        const result = await response.json();
        
        // Handle old format response or error
        if (result.success) {
          setBulkResults(result.results);
          
          // Update candidates list with successful uploads
          const successfulCandidates = result.results
            .filter(r => r.status === "success")
            .map(r => ({
              id: r.candidate_id,
              name: r.extracted_data.name,
              email: r.extracted_data.email,
              phone_number: r.extracted_data.phone || ""
            }));
          
          if (successfulCandidates.length > 0) {
            setCandidates(prev => {
              const currentCandidates = Array.isArray(prev) ? prev : [];
              return [...currentCandidates, ...successfulCandidates];
            });
          }
          
          // Show final summary toast
          const { successful, failed, skipped = 0 } = result.summary;
          
          if (successful > 0 && failed === 0 && skipped === 0) {
            toast.success(`🎉 Successfully added ${successful} candidates!`);
          } else if (successful > 0 && skipped > 0 && failed === 0) {
            toast.success(`✅ Added ${successful} candidates, ⏭️ ${skipped} skipped (duplicates)`);
          } else if (successful > 0 && failed > 0 && skipped === 0) {
            toast.success(`✅ Added ${successful} candidates, ⚠️ ${failed} failed`);
          } else if (successful > 0 && failed > 0 && skipped > 0) {
            toast.success(`✅ Added ${successful} candidates, ⏭️ ${skipped} skipped, ⚠️ ${failed} failed`);
          } else if (skipped > 0 && failed === 0) {
            toast.warning(`⏭️ All ${skipped} candidates already exist - skipped duplicates`);
          } else if (failed > 0 && skipped > 0) {
            toast.warning(`⏭️ ${skipped} skipped (duplicates), ⚠️ ${failed} failed`);
          } else if (failed > 0) {
            toast.error(`❌ All ${failed} files failed to process`);
          }
        } else {
          toast.error(result.error || "Bulk upload failed");
        }
      }
    } catch (error) {
      console.error("Bulk upload error:", error);
      toast.error("Network error during bulk upload");
    }
    // Note: No finally block needed since dialog is already closed
  };

  const onSubmit = async (data) => {
    setLoading(true);
    
    const currentSelectedFile = activeTab === "resume" ? resumeFile : selectedFile;
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone || "");
    selectedPhoto && formData.append("profile_photo", selectedPhoto);
    currentSelectedFile && formData.append("resume", currentSelectedFile);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/candidates/${jobData?.id ? `?job_id=${jobData.id}` : ''}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        
        // Ensure candidates is always an array before spreading
        const currentCandidates = Array.isArray(candidates) ? candidates : [];
        setCandidates([...currentCandidates, result]);
        
        // Check if this is an async upload (has batch_job_id and is_async)
        const isAsync = result.processing_details?.is_async;
        const batchJobId = result.batch_job_id;
        
        if (isAsync && batchJobId) {
          // Async upload - start polling for completion
          toast.loading(`Processing resume for ${result.name}... This may take a moment.`, {
            duration: 4000,
          });
          
          startPolling(batchJobId, result);
        } else {
          // Sync upload - show success immediately
          toast.success(`✅ Candidate ${result.name} added successfully!`);
        }
        
        // Reset form and close dialog
        form.reset();
        setSelectedFile(null);
        setSelectedPhoto(null);
        setResumeFile(null);
        setExtractedData(null);
        setOpen(false);
        
        if (onCloseCb) onCloseCb();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to add candidate: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error adding candidate:", error);
      toast.error("An error occurred while adding the candidate");
    } finally {
      setLoading(false);
    }
  };

  // Poll upload status for async operations
  const pollUploadStatus = async (batchJobId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload-tracker/status/${batchJobId}/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const statusData = await response.json();
        return statusData;
      }
    } catch (error) {
      console.error("Error polling upload status:", error);
    }
    return null;
  };
  
  // Start polling for async upload completion
  const startPolling = (batchJobId, candidateData) => {
    setAsyncUpload({ batchJobId, type: 'single_resume', candidate: candidateData });
    
    const interval = setInterval(async () => {
      const status = await pollUploadStatus(batchJobId);
      
      if (status) {
        if (status.status === 'completed') {
          // Upload completed successfully
          clearInterval(interval);
          setPollingInterval(null);
          setAsyncUpload(null);
          
          toast.success(`🎉 Resume processed! Embedding generated for ${candidateData.name}`);
        } else if (status.status === 'failed') {
          // Upload failed
          clearInterval(interval);
          setPollingInterval(null);
          setAsyncUpload(null);
          
          toast.error(`❌ Resume processing failed: ${status.error_message || 'Unknown error'}`);
        }
        // Continue polling for 'pending' or 'processing' status
      }
    }, 2000); // Poll every 2 seconds
    
    setPollingInterval(interval);
    
    // Auto-stop polling after 5 minutes
    setTimeout(() => {
      if (interval) {
        clearInterval(interval);
        setPollingInterval(null);
        setAsyncUpload(null);
        toast.warning("⏰ Resume processing is taking longer than expected");
      }
    }, 300000);
  };

  // Start polling for bulk upload completion
  const startBulkPolling = (batchJobId, totalFiles) => {
    setAsyncUpload({ batchJobId, type: 'bulk', totalFiles });
    
    let progressToastId = null;
    
    const interval = setInterval(async () => {
      const status = await pollUploadStatus(batchJobId);
      
      if (status) {
        // Update progress
        if (status.progress_percentage !== undefined) {
          setBulkProgress({ current: status.processed_files, total: totalFiles });
        }
        
        if (status.status === 'completed') {
          // Bulk upload completed successfully
          clearInterval(interval);
          setPollingInterval(null);
          setAsyncUpload(null);
          setBulkProgress({ current: 0, total: 0 });
          
          // Dismiss progress toast
          if (progressToastId) {
            toast.dismiss(progressToastId);
          }
          
          // Check if AI processing had issues
          const aiIssues = status.has_ai_errors ? 
            ` AI analysis failed for ${status.ai_failed_files} resume(s) due to API limitations.` : '';
          
          toast.success(
            `🎉 Bulk Upload Complete!`,
            {
              description: `Successfully processed ${status.successful_files} out of ${totalFiles} resumes.${aiIssues}`,
              duration: 8000,
            }
          );
          
          // Refresh candidates list to show new candidates
          window.location.reload();
        } else if (status.status === 'failed') {
          // Bulk upload failed
          clearInterval(interval);
          setPollingInterval(null);
          setAsyncUpload(null);
          setBulkProgress({ current: 0, total: 0 });
          
          // Dismiss progress toast
          if (progressToastId) {
            toast.dismiss(progressToastId);
          }
          
          toast.error(
            `❌ Bulk Upload Failed`,
            {
              description: status.error_message || 'An unexpected error occurred during processing. Please try again.',
              duration: 8000,
            }
          );
        } else if (status.status === 'partially_failed') {
          // Some files failed
          clearInterval(interval);
          setPollingInterval(null);
          setAsyncUpload(null);
          setBulkProgress({ current: 0, total: 0 });
          
          // Dismiss progress toast
          if (progressToastId) {
            toast.dismiss(progressToastId);
          }
          
          // Distinguish between file upload failures and AI failures
          const fileFailures = status.failed_files > 0 ? 
            `${status.failed_files} file(s) could not be uploaded. ` : '';
          const aiFailures = status.has_ai_errors ? 
            `AI analysis failed for ${status.ai_failed_files} resume(s) due to API limitations.` : '';
          
          toast.warning(
            `⚠️ Bulk Upload Completed with Issues`,
            {
              description: `Successfully processed ${status.successful_files} out of ${totalFiles} resumes. ${fileFailures}${aiFailures}`,
              duration: 10000,
            }
          );
          
          // Refresh candidates list to show successful candidates
          window.location.reload();
        } else if (status.status === 'processing') {
          // Show detailed progress for both file upload and AI processing
          const fileProgress = `Files: ${status.processed_files}/${totalFiles}`;
          const aiProgress = status.ai_processed_files > 0 ? 
            ` | AI: ${status.ai_processed_files}/${status.successful_files}` : '';
          
          if (progressToastId) {
            toast.dismiss(progressToastId);
          }
          progressToastId = toast.loading(
            `Processing resumes... ${fileProgress}${aiProgress} (${status.progress_percentage.toFixed(1)}%)`,
            {
              id: `bulk-progress-${batchJobId}`,
              duration: Infinity,
            }
          );
        }
        // Continue polling for 'pending' or 'processing' status
      }
    }, 3000); // Poll every 3 seconds for bulk (slower than single)
    
    setPollingInterval(interval);
    
    // Auto-stop polling after 10 minutes (longer for bulk)
    setTimeout(() => {
      if (interval) {
        clearInterval(interval);
        setPollingInterval(null);
        setAsyncUpload(null);
        setBulkProgress({ current: 0, total: 0 });
        toast.warning("⏰ Bulk upload processing is taking longer than expected");
      }
    }, 600000);
  };

  const resetAllStates = () => {
    form.reset();
    setSelectedFile(null);
    setSelectedPhoto(null);
    setResumeFile(null);
    setExtractedData(null);
    setBulkFiles([]);
    setBulkResults([]);
    setBulkProgress({ current: 0, total: 0 });
    setAsyncUpload(null);
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    setActiveTab("manual");
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset all states when dialog closes
      resetAllStates();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Candidate{jobData ? ` to ${jobData.title}` : ''}</DialogTitle>
          {asyncUpload && (
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded-md">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Processing resume for {asyncUpload.candidate?.name}...</span>
            </div>
          )}
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Manual Entry
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Resume
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Bulk Upload
            </TabsTrigger>
          </TabsList>

          {/* Manual Entry Tab */}
          <TabsContent value="manual">
            <div className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="profilePic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Picture</FormLabel>
                          <FormControl>
                            <Input type="file" {...field} onChange={uploadPhoto} accept="image/*" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resume</FormLabel>
                          <FormControl>
                            <Input type="file" onChange={uploadFile} accept=".pdf,.doc" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" disabled={loading}>
                    {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    Add Candidate
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>

          {/* Resume Upload Tab */}
          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle>Upload Resume</CardTitle>
                <CardDescription>Upload a resume and we&apos;ll extract the candidate information automatically</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Resume File</label>
                    <Input 
                      type="file" 
                      accept=".pdf" 
                      onChange={handleResumeUpload}
                      disabled={extracting}
                    />
                    {extracting && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Loader className="w-4 h-4 animate-spin" />
                        Extracting data from resume...
                      </div>
                    )}
                  </div>

                  {extractedData && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Extracted data: {extractedData.name && `Name: ${extractedData.name}`}
                        {extractedData.email && `, Email: ${extractedData.email}`}
                        {extractedData.phone && `, Phone: ${extractedData.phone}`}
                      </AlertDescription>
                    </Alert>
                  )}

                  {resumeFile && (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter candidate name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter email address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter 10-digit phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div>
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Profile Photo (Optional)</label>
                          <Input type="file" accept="image/*" onChange={uploadPhoto} />
                        </div>
                        
                        <Button type="submit" disabled={loading} className="w-full">
                          {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                          Add Candidate with Resume
                        </Button>
                      </form>
                    </Form>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bulk Upload Tab */}
          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Upload</CardTitle>
                <CardDescription>Upload multiple resume files (up to 100). We&apos;ll extract data and create candidates automatically.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Resume Files</label>
                    <Input 
                      type="file" 
                      accept=".pdf" 
                      multiple
                      onChange={handleBulkFileUpload}
                      disabled={bulkProcessing}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Select multiple PDF files (max 100)
                    </p>
                  </div>

                  {bulkFiles.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Selected Files: {bulkFiles.length}</p>
                      </div>
                      
                      <div className="max-h-32 overflow-y-auto bg-gray-50 p-2 rounded">
                        {bulkFiles.map((file, index) => (
                          <div key={index} className="text-xs text-muted-foreground py-1 border-b last:border-b-0">
                            📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={processBulkUpload}
                        className="w-full mt-4"
                        size="lg"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Process {bulkFiles.length} Files
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddCandidate;