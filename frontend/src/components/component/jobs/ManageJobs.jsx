import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import axios from "../../../utils/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { interviewLanguages } from "@/lib/utils";
import { Delete, Loader } from "lucide-react";
import MultiSelect from "@/components/ui/MultiSelect";
import { Checkbox } from "@/components/ui/checkBox";

// Validation schema
const jobSchema = z.object({
  job_name: z.string().min(1, { message: "Job name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  min_ctc: z.string().min(1, { message: "Min CTC is required" }),
  max_ctc: z.string().min(1, { message: "Max CTC is required" }),
  job_description: z.string().min(1, { message: "Description is required" }),
  ask_for_ctc_info: z.boolean().default(true),
  ask_for_reason_for_leaving_previous_job: z.boolean().default(true),
  topics: z.array(
    z.object({
      requirement: z.string().nonempty("Topic is required"),
      weightage: z.string().nonempty("weight is required"),
    })
  ),

  // additional_data: z.string().optional(),
});

const ManageJobs = ({ onJobCreated, children }) => {
  const [selectedLanguages, setSelectedLanguages] = useState(['english']);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [pageNumber, setpageNumber] = useState(1);
  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      job_name: "",
      location: "",
      min_ctc: "",
      max_ctc: "",
      job_description: "",
      ask_for_ctc_info: true,
      ask_for_reason_for_leaving_previous_job: true,
      topics: [{ requirement: "", weightage: "" }]
      // additional_data: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "topics" // This must match the defaultValues key
  });

  // Check permissions from localStorage
  // TODO : call the API and get the response
  const authUser = JSON.parse(localStorage.getItem("user"));
  const canManageJobs = authUser?.can_manage_jobs || authUser?.is_admin;
  const onSubmit = async (data) => {
    console.log({ data })
    if (!canManageJobs) {
      alert("You do not have permission to manage jobs.");
      return;
    }
    setLoading(true);
    try {
      const { job_name, location, min_ctc, max_ctc, job_description, ask_for_reason_for_leaving_previous_job, ask_for_ctc_info } = data;
      await axios.post(`/jobs/`, {
        job_name,
        location,
        min_ctc,
        max_ctc, job_description,
        requirements: data.topics,
        ask_for_reason_for_leaving_previous_job,
        ask_for_ctc_info,
        allowed_interview_languages: selectedLanguages,
      },
      );
        if (onJobCreated) {
          onJobCreated();
        }
        form.reset();
        setOpen(false);

    } catch (error) {
      console.error("Error creating job:", error);
      throw new Error("Failed to create job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
            <DialogDescription>
              {
                pageNumber === 1 ?
                  "Fill in the job details below. Click save when you're done."
                  :
                  "Add must know topics and their weightage"
              } 
            </DialogDescription>
          </DialogHeader>
          {!canManageJobs ? (
            <div className="text-red-500 text-center">You do not have permission to manage jobs.</div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {pageNumber === 1 ?
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="job_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter job name" {...field} />
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
                              <Input placeholder="Enter Job Description" {...field} />
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
                        <MultiSelect actionTitle={"Language"} values={interviewLanguages} selectedItems={selectedLanguages} setSelectedItems={setSelectedLanguages} dropdownLabel={"Interview Languages"} />
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

                    </>
                    :
                    <>
                      {fields.map((field, i) => (
                        <div
                          key={field.id}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end group"
                        >
                          <FormField
                            control={form.control}
                            name={`topics.${i}.requirement`}
                            rules={{ required: "Topic is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Topic</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter topic" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex items-center justify-end w-full gap-2">

                            <FormField
                              control={form.control}
                              name={`topics.${i}.weightage`}
                              rules={{
                                required: "Weight is required",
                                min: { value: 0, message: "Minimum is 0" },
                                max: { value: 5, message: "Maximum is 5" }
                              }}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormLabel>Weightage</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter weight"
                                      type="number"
                                      min={0}
                                      max={5}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Delete className={`w-auto mt-8 cursor-pointer`} onClick={() => remove(i)}></Delete>
                          </div>

                        </div>
                      ))}

                      <Button className="self-end" variant='destructive' disabled={fields.length === 5} onClick={() => append({ topic: "", weight: "" })}>Add another topic +</Button>
                    </>
                  }
                <DialogFooter>
                    {pageNumber === 1 ?
                      <Button type="button" onClick={() => setpageNumber(prev => prev + 1)}>
                        Next Page
                      </Button>
                      :
                      <div className="space-x-2">
                        <Button type="button" onClick={() => setpageNumber(prev => prev - 1)} variant="outline">
                          Previous Page
                        </Button>
                        <Button type="submit" disabled={loading}>
                    {loading ? (
                      <Loader className="animate-spin mr-2" size={16} />
                    ) : (
                      "Create Job"
                    )}
                  </Button>
                      </div>
                    }

                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageJobs;
