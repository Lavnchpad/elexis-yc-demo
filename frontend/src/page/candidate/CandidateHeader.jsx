import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {

  Mail,
  Phone,
  Copy,
  Calendar,
  SatelliteDishIcon,
} from "lucide-react";
import { InterviewStatus } from "@/utils/StatusButton";

export const CandidateHeader = ({ candidate, interview }) => {
    return <div className=" p-6 rounded-xl shadow mb-6 flex text-white bg-[#2B2A29] flex-wrap items-center">
        <div className="flex items-center space-x-6 w-full">
            <Avatar className="w-24 h-24 rounded-full">
                <AvatarImage
                    src={candidate.profile_photo}
                    alt={candidate.name}
                />
                <AvatarFallback className='text-black'>
                    {candidate.name.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <div className="flex justify-between w-full">
                <div>
                    <h1 className="text-2xl font-bold text-primary-foreground">
                        {candidate.name}
                    </h1>
                    <div className="flex items-center gap-2 font-light">
                        <p className=" flex items-center mt-2">
                            <Mail className="mr-2 w-5 h-5" />
                            {candidate.email}
                        </p>
                        <p className="flex items-center mt-2">
                            <Phone className="mr-2 w-5 h-5" />
                            {candidate.phone_number}
                        </p>
                    </div>
                    {interview?.link && interview?.status !== InterviewStatus.ENDED &&
                        <>
                            <p className="mt-2 flex items-center ">
                                <Copy className="mr-2 w-5 h-5 cursor-pointer" onClick={() => copyLink(interview?.link)} />
                                Interview Link
                            </p>
                        </>
                    }
                </div>
                {interview && (
                    <div className="">
                        <p className="mt-2 flex items-center">
                            <Calendar className="mr-2 w-5 h-5" />
                            {interview?.date} @{interview?.time}
                        </p>
                        <p className="mt-2 flex items-center">
                            <SatelliteDishIcon className="mr-2 w-5 h-5" />
                            {interview?.status}
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
}