// import { Icons } from "../../../utils/icons"
// import navigateBack from "../../../utils/backNavigateUtil"
// import { Icon } from "../../ui/icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import logo from "../../../../assets/images/logo.png"

const JobDetails = () => {


    const navigate = useNavigate()
    const navigateBack = (navigate) => {
      navigate(-1)
  }
    return (
        <>
        <div className="relative">
            <div className="flex items-center cursor-pointer hover:bg-primaryButtonColor/90 justify-center absolute -top-2 -left-4 w-10 h-10 rounded-full bg-primaryButtonColor p-2">
                {/* <Icon onClick={() => navigateBack(navigate)} icon={logo} className="text-lightColor w-5 h-5" /> */}
            </div>
            <div className="shadow-lg rounded-lg px-6 py-6 border">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold">title</h1>
                    
                        location
                    
                </div>
            </div>
        </div>
         <div className="mt-6 drive-details">
         <Tabs defaultValue="job-details">
           <TabsList className="py-4 px-0">
             <TabsTrigger className="py-2 px-6 text-base  bg-accentColor text-lightColor rounded-none rounded-tl-xl" value="job-details">Job Details</TabsTrigger>
             {/* <TabsTrigger className="py-2 px-6 text-base  bg-accentColor text-lightColor rounded-none rounded-tr-xl" value="applicants">Applicants</TabsTrigger> */}
   
           </TabsList>
           <TabsContent className="mt-0" value="job-details">
           <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
      <div className="grid grid-cols-8 gap-x-8">
        <div className="shadow-lg px-4 col-span-5 py-4 flex flex-col gap-y-4 rounded-md border">
          <div className="flex flex-col gap-y-2">
            <h1 className="font-semibold text-primaryButtonColor text-lg">Job Description</h1>
            <p className="">desc</p>
          </div>
          <div className="flex flex-col gap-y-2 ">
            <h1 className="font-semibold text-primaryButtonColor text-lg">Eligibilty Criteria</h1>
            <p className="">elgi</p>
          </div>
        </div>
        <div className="shadow-lg col-span-3 px-4 py-4 flex flex-col gap-y-4 rounded-md border">
          <h1 className="font-semibold text-primaryButtonColor text-lg">Key Information</h1>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 justify-items-stretch">
            <div>
              <p className="text-base font-semibold text-primaryButtonColor">CTC Range</p>
              <p className="font-medium">ctc</p>
            </div>
          </div>
        </div>

      </div>
    </div>
           </TabsContent>
         </Tabs>
   
       </div>
       </>
    )
}
export default JobDetails