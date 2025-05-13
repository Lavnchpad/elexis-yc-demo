
import { ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "../../../utils/api"
import { useEffect, useState } from "react"
import ToggleButton from "../resuable/ToggleButton"

export default function MyProfile() {
  const [personalDetails, setPersonalDetails] = useState(); // the logged in recruiter
  useEffect(() => {
    (async () => {
      try {
        const userDetailsFromLocalStorage = JSON.parse(localStorage.getItem("user"))
        if (!userDetailsFromLocalStorage?.id) {
          window.location.href = '/login'
          return;
        }
        const userDetails = await getRecriterDetails(userDetailsFromLocalStorage?.id);
        setPersonalDetails(userDetails)
        console.log({ userDetails })
      } catch (error) {

      }
    })()
  }, [])
  return (
    <div className="min-h-screen">
      <header className="flex items-center gap-4 p-4 ">
        <h1 className="text-2xl font-bold">My Account</h1>
      </header>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full h-auto flex">
          <TabsTrigger
            value="personal"
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4"
          >
            Personal Info
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4"
          >
            Account Settings
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4"
          >
            Sign in & Security
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4"
          >
            Privacy
          </TabsTrigger>
          <TabsTrigger
            value="terms"
           className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4"
          >
            Terms & Conditions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="p-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-8">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-26%20210158-aas6Sj54wxCPUkE0t3L9Ua0YBT6o69.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>DU</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{personalDetails?.company_name || ""}</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="">
                    Name:
                  </Label>
                  <Input disabled id="name" className="border-gray-200 shadow-sm" value={personalDetails?.name || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="">
                    Email:
                  </Label>
                  <Input disabled id="email" type="email" className="border-gray-200 shadow-sm" value={personalDetails?.email || ""} />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="phone" className="">
                    Phone number:
                  </Label>
                  <Input id="phone" type="tel"  className="border-gray-200 shadow-sm" value={userDetails?.phone} />
                </div> */}

                {/* <div className="space-y-2">
                  <Label htmlFor="dob" className="">
                    Date of birth:
                  </Label>
                  <Input id="dob" type="date"  className="border-gray-200 shadow-sm" />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="recovery" className="">
                    Recovery email:
                  </Label>
                  <Input
                    disabled
                    id="recovery"
                    type="email"
                    className="border-gray-200 shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-2 mt-2">

                <ToggleButton
                  handleToggleChange={(e) => { }}
                  label={"Modify Users"}
                  isChecked={personalDetails?.can_manage_users}
                  disabled={true} // Toggle is disabled if the current user is not an admin
                />
                <ToggleButton
                  handleToggleChange={(e) => { }}
                  label={"Modify Jobs"}
                  isChecked={personalDetails?.can_manage_jobs}
                  disabled={true} // Toggle is disabled if the current user is not an admin
                />
              </div>

              <div className="mt-8 flex justify-end">
                <Button className=" text-white px-8">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="p-4">
          {/* Account Settings content here */}
        </TabsContent>
        <TabsContent value="security" className="p-4">
          {/* Security content here */}
        </TabsContent>
        <TabsContent value="privacy" className="p-4">
          {/* Privacy content here */}
        </TabsContent>
        <TabsContent value="terms" className="p-4">
          {/* Terms & Conditions content here */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

async function getRecriterDetails(id) {
  try {
    const response = await axios.get(`/recruiters/${id}/`)
    return response.data;
  } catch (error) {
    console.log('Error fetching recriter details')
  }
}
