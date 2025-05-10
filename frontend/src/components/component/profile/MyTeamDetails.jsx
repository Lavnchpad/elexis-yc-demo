import { Button } from "@/components/ui/button";
import InputFormField from "../resuable/InputFormField";
import ToggleButton from "../resuable/ToggleButton";
import { Form } from "@/components/ui/form";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from "axios";

const formSchema = z.object({
  name: z.string(),
});

const MyTeamDetails = () => {
  const { memberId } = useParams(); // Get ID from URL params
  const [loading, setLoading] = useState(false);
  const [modifyUsers, setModifyUsers] = useState(false);
  const [modifyJobs, setModifyJobs] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { reset } = form;

  // Fetch current user data and recruiter details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch current user from localStorage
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (currentUser && currentUser.is_admin) {
          setIsCurrentUserAdmin(true);
        }
        console.log(isCurrentUserAdmin)

        // Fetch recruiter details
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/recruiters/${memberId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const {
          email,
          name,
          can_manage_users: canManageUsers,
          can_manage_jobs: canManageJobs,
        } = response.data;

        // Update states and form with fetched data
        setEmail(email);
        setUsername(email.split("@")[0]); // Extract username from email
        reset({
          name,
        });
        setModifyUsers(canManageUsers);
        setModifyJobs(canManageJobs);
      } catch (error) {
        console.error("Error fetching recruiter details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memberId, reset]);

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      const token = localStorage.getItem("authToken");

      const payload = {
        email:email,
        name: values.name,
        can_manage_users: modifyUsers,
        can_manage_jobs: modifyJobs,
      };

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/recruiters/${memberId}/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Recruiter details updated successfully!");
    } catch (error) {
      console.error("Error updating recruiter details:", error);
      alert("Failed to update recruiter details. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-y-4 mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <h2 className="font-semibold">System Details</h2>
          <hr />
          <div className="flex items-center justify-between gap-x-10">
            <InputFormField
              disabled={true} // Username is always disabled
              className={"w-1/2"}
              name="username"
              value={username}
              control={form.control}
              placeholder={"Enter your Username"}
              label={"Username"}
              type={"text"}
            />
            <InputFormField
              disabled={true} // Email is always disabled
              className={"w-1/2"}
              name="email"
              value={email}
              control={form.control}
              placeholder={"Enter your Email"}
              label={"Email"}
              type={"text"}
            />
          </div>

          <h2 className="font-semibold">Personal Details</h2>
          <hr />
          <div className="flex items-center justify-between gap-x-10">
            <InputFormField
              disabled={false} // Only name is editable
              className={"w-1/2"}
              name="name"
              control={form.control}
              placeholder={"Enter Name"}
              label={"Name"}
              type={"text"}
            />
            <InputFormField
              disabled={true} // Admin field is always disabled
              className={"w-1/2"}
              name="admin"
              control={form.control}
              placeholder={modifyUsers ? "Yes" : "No"} // Display Yes/No based on the response
              label={"Admin"}
              type={"text"}
            />
          </div>

          <h2 className="font-semibold">Permissions</h2>
          <hr />
          <ToggleButton
            handleToggleChange={(e) => setModifyUsers(e.target.checked)}
            label={"Modify Users"}
            isChecked={modifyUsers}
            disabled={!isCurrentUserAdmin} // Toggle is disabled if the current user is not an admin
          />
          <ToggleButton
            handleToggleChange={(e) => setModifyJobs(e.target.checked)}
            label={"Modify Jobs"}
            isChecked={modifyJobs}
            disabled={!isCurrentUserAdmin} // Toggle is disabled if the current user is not an admin
          />

          <div className="flex justify-end w-full">
            <Button
              type="submit"
              className="rounded-3xl text-lg px-8 py-4 shadow-md"
              variant="primary"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MyTeamDetails;
