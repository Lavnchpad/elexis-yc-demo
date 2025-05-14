"use client";

import React, { useEffect, useContext, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { JobsContext } from "../jobs/JobsContext";
import { Loader } from "lucide-react";

const candidateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" })
    .optional(),
  profilePic: z.any().optional(),
  resume: z.any().optional(),
});

const AddCandidate = ({ children }) => {
  const { candidates, setCandidates } = useContext(CandidatesContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { jobs, fetchJobs } = useContext(JobsContext);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

  // useEffect(() => {
  //   fetchJobs();
  // }, []);

  const uploadFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const uploadPhoto = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data)
    const currentSelectedFile = selectedFile;
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone || "");
    // if (data.profilePic?.[0]) formData.append("profile_picture", data.profilePic[0]);
    selectedPhoto && formData.append("profile_photo", selectedPhoto);
    formData.append("resume", currentSelectedFile);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/candidates/`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const newCandidate = await response.json();
        // const avatarResponse = await fetch("https://mighty.tools/mockmind-api/?category=popular&nocache=1736359714029");
        // const avatarData = await avatarResponse.json();
        // const avatarUrl = avatarData.data[1];
        // const candidateWithAvatar = { ...newCandidate, avatar: '' };
        // setCandidates([...candidates, candidateWithAvatar]);
        setCandidates([...candidates, newCandidate])
        toast.success("Candidate added successfully!");
        form.reset();
  
      } else {
        toast.error("Failed to add candidate.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Candidate</DialogTitle>
        </DialogHeader>
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
              {loading ? <Loader className="animate-spin mr-2" size={16} /> : "Add Candidate"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCandidate;
