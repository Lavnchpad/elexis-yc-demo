import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import MultiSelect from '@/components/ui/MultiSelect';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { set, z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkBox';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { interviewLanguages } from '@/lib/utils';
import { toast } from 'sonner';
import axios from 'axioss';

const jobSchema = z.object({
    job_name: z.string().min(1, { message: "Job name is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    min_ctc: z.string().min(1, { message: "Min CTC is required" }),
    max_ctc: z.string().min(1, { message: "Max CTC is required" }),
    job_description: z.string().min(1, { message: "Description is required" }),
    ask_for_ctc_info: z.boolean().default(true),
    ask_for_reason_for_leaving_previous_job: z.boolean().default(true),
});
export default function EditJobForm({ children, jobDetails, setJobDetails }) {
    const [editJobModalOpen, setEditJobModalOpen] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState(() => jobDetails?.allowed_interview_languages?.split(',') || []);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            job_name: jobDetails?.job_name || "",
            location: jobDetails?.location || "",
            min_ctc: jobDetails?.min_ctc || "",
            max_ctc: jobDetails?.max_ctc || "",
            job_description: jobDetails?.job_description || "",
            ask_for_ctc_info: jobDetails?.ask_for_ctc_info || true,
            allowed_interview_languages: selectedLanguages.join(","),
            ask_for_reason_for_leaving_previous_job: jobDetails?.ask_for_reason_for_leaving_previous_job || true,
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            // Here you would typically send the data to your API
            console.log("Submitted Data:", data);
            const response = await axios.patch(`/jobs/${jobDetails?.id}/`, {
                // job_name: data.job_name,
                location: data.location,
                min_ctc: data.min_ctc,
                max_ctc: data.max_ctc,
                job_description: data.job_description,
                ask_for_ctc_info: data.ask_for_ctc_info,
                ask_for_reason_for_leaving_previous_job: data.ask_for_reason_for_leaving_previous_job,
                allowed_interview_languages: selectedLanguages.join(","),
            });
            toast.success("Job details edited successfully!");
            setJobDetails(response.data);
            setEditJobModalOpen(false);
        } catch (error) {
            console.error("Error editing job details:", error);
            toast.error("Failed to edit job details.");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Dialog open={editJobModalOpen} onOpenChange={setEditJobModalOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Job Details</DialogTitle>
                    <DialogDescription>{jobDetails?.job_name}</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[95%] overflow-y-scroll">


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="job_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter job name" {...field} disabled />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter job location" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="min_ctc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Min CTC</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter minimum CTC" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="max_ctc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max CTC</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter maximum CTC" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="job_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter Job Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Select Job Interview Languages */}
                        <div className="flex justify-between">
                            <div>
                                {
                                    selectedLanguages?.map((lang, index) => (
                                        <span key={index} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mr-2 mb-2">
                                            {lang}
                                            <button type="button" className="ml-1 text-blue-500 hover:text-blue-700" onClick={() => setSelectedLanguages(selectedLanguages.filter((l) => l !== lang))}>
                                                &times;
                                            </button>
                                        </span>
                                    ))
                                }
                                <MultiSelect actionTitle={"Languages"} values={interviewLanguages} selectedItems={selectedLanguages} setSelectedItems={setSelectedLanguages} dropdownLabel={"Interview Languages"} />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="ask_for_ctc_info"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                className="flex flex-row items-center gap-2"
                                            >
                                                <FormLabel className="text-sm font-normal mt-2">
                                                    Ask CTC Info
                                                </FormLabel>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="ask_for_reason_for_leaving_previous_job"
                                    render={({ field }) => {

                                        return (
                                            <FormItem
                                                className="flex flex-row items-center gap-2"
                                            >
                                                <FormLabel className="text-sm font-normal mt-2">
                                                    {/* {item.label} */}
                                                    Ask Reason for leaving previous job
                                                </FormLabel>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )
                                    }}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" >
                                {loading ? (
                                    <Loader className="animate-spin mr-2" size={16} />
                                ) : (
                                    "Edit Job"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form >
            </DialogContent>
        </Dialog>

    )
}
