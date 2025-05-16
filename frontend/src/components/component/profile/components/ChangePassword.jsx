import React, { useState, useTransition } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from '../../../../utils/api';
import { toast } from 'sonner';

export const changePasswordSchema = z.object({
    oldpassword: z.string().min(1, "Old password is required"),
    newpassword1: z.string().min(8, "New password must be at least 8 characters"),
    newpassword2: z.string().min(8, "Please confirm your new password"),
}).refine((data) => data.newpassword1 === data.newpassword2, {
    message: "Passwords do not match",
    path: ["newpassword2"],
}).refine((data) => data.oldpassword !== data.newpassword1, {
    message: "New password must be different from old password",
    path: ["newpassword1"],
});

export default function Changepassword() {
    const [isPending, setIsPending] = useState(false)
    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldpassword: "",
            newpassword1: "",
            newpassword2: "",
        },
    });

    const onSubmit = async (data) => {
        setIsPending(true)
        try {
            await axios.post("/recruiters/change_password/", {
                old_password: data?.oldpassword,
                new_password: data?.newpassword1
            })
            toast.success("Password changed successfully!")
            form.reset();
            return;
        } catch (error) {
            toast.error("Something went wrong! Please contact the Administrator.")
        } finally {
            setIsPending(false)
        }
    }
    return (
        <div className='space-y-2'>
            <h2 className='text-xl font-bold text-center'>Change Password</h2>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="oldpassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Old Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Old Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newpassword1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="New Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newpassword2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Old Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disable={isPending}>Save Changes</Button>
            </form>
        </Form>
        </div>
    )
}
