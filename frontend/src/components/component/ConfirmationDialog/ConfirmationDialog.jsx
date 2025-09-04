import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import LoadingButton from '../LoadingButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { getRoundedFutureTime } from '@/lib/utils';
export default function ConfirmationDialog({ isOpen, loading, isDisabled = false, cancelHandler, confirmationHandler, onOpenChange, title = 'Confirm Action', description = 'Are you sure?' }) {
    return (
        <Dialog open={isOpen} onOpenChange={loading ? null : onOpenChange}>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={cancelHandler} disabled={loading}>Cancel</Button>
                    <LoadingButton loading={loading} disabled={isDisabled || loading} onClick={confirmationHandler} >Confirm</LoadingButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}
const scheduleSchema = z
    .object({
        date: z.string().min(1, "Date is required"),
        time: z.string().min(1, "Time is required"),
        jobId: z.string().optional(),
        // preferredLanguage: z.string().optional(),
        interview: z.string().optional(),
    })
    .refine(
        (data) => data.jobId || data.interview,
        {
            message: "Either jobId or interview is required",
            path: ["jobId"], // You can also point to 'interview' or use both
        }
    ).refine(
    (data) => {
      const selectedDateTime = new Date(`${data.date}T${data.time}:00`);
      const minValidDateTime = new Date(Date.now() + 30 * 60 * 1000);
      return selectedDateTime > minValidDateTime;
    },
    {
      message: "The scheduled time must be at least 30 minutes in the future.",
      path: ["time"],
    }
  );;
export function ScheduleInterviewFromJobsPage({ job, applicantdetails, isOpen, confirmationHandler, onOpenChange, isReschedule = false }) {
    const [loading, setLoading] = useState(false);
    const defaultTime = applicantdetails?.interviews?.[0]?.time?.split(":").slice(0, 2).join(":") || getRoundedFutureTime();
    const defaultDate = applicantdetails?.interview?.[0]?.date || new Date().toISOString().split('T')[0];
    console.log({ defaultTime });
    const form = useForm({
        resolver: zodResolver(scheduleSchema),
        defaultValues: {
            // isReschedule ? applicantdetails?.interview?.[0]?.date :
            date: defaultDate,
            time: defaultTime,
            interview: "",
            jobId: job.job_name,
        },
    });
    form.watch('interview')
    const onSubmit = async (data) => {
        setLoading(true);
        const payload = {
            date: data.date,
            time: data.time,
            job_id: job.id,
            candidate_id: applicantdetails.candidate.id,
            language: data.preferredLanguage || "english",
            ...(isReschedule ? { interviewId: applicantdetails.interviews?.[0]?.id } : null),
        };

        try {
            await confirmationHandler({ application: applicantdetails, payload, isReschedule })
            toast.success("Schedule saved successfully!");
            form.reset();
        } catch (error) {
            console.error("Error:", error);
            toast.error('Something went wrong while saving the schedule. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle>{isReschedule ? "Reschedule Drive" : "Schedule Drive"}</DialogTitle>
                <DialogDescription>
                    {isReschedule
                        ? "Please provide the new date and time for the interview below."
                        : "Please provide the date, time, and job role for the drive."}
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Input Fields in a Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Date Field */}
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" placeholder="Select a date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Time Field */}
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a time" />
                                            </SelectTrigger>
                                            <SelectContent
                                                className="max-h-60 overflow-y-auto">
                                                {Array.from({ length: 24 }, (_, i) => i).flatMap((hour) => [(
                                                    <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                                                        {`${hour.toString().padStart(2, "0")}:00`}
                                                    </SelectItem>
                                                ), (
                                                    <SelectItem key={`${hour}:30`} value={`${hour.toString().padStart(2, "0")}:30`}>
                                                        {`${hour.toString().padStart(2, "0")}:30`}
                                                    </SelectItem>
                                                )])}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Job Role Field */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Schedule Interview */}
                        <FormField
                            control={form.control}
                            name="jobId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Role</FormLabel>
                                    <FormControl>
                                        <Input {...field} readOnly />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="additionalField"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Field</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Additional Field" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    {/* Save Schedule Button */}
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader className="animate-spin mr-2" size={16} /> : isReschedule ? "Reschedule" : "Save Schedule"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>

        </DialogContent>
    </Dialog>
}


