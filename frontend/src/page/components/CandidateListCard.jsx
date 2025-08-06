import React from 'react'
import { selectedIcon, pendingIcon, registeredIcon, rejectedIcon, holdIcon } from '@/assets/images'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CandidateListCard({ clickhandler, contact, selectedCandidate }) {
    const isSelected = contact.id === selectedCandidate?.id
    const statusIcon = contact.status === 'accepted' ? selectedIcon : contact.status === 'pending' ? pendingIcon : contact.status === 'rejected' ? rejectedIcon : contact.status === 'registered' ? registeredIcon : contact.status === 'hold' ? holdIcon : null;
    return (
        <li
            className={`flex items-center p-4 rounded-lg shadow-sm transition-transform overflow-hidden duration-300 ease-in-out ${isSelected
                ? "bg-[#2B2A29] "
                :
                "bg-white"}`}
            onClick={() => clickhandler(contact)}
        >
            <div className="relative w-12 h-12 mr-4">
                <Avatar className="w-full h-full">
                    <AvatarImage src={contact.profile_photo} alt={contact.name} />
                    <AvatarFallback>
                        {contact.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                {/* {contact.status === "accepted" && (
                    <BadgeCheck className="absolute -bottom-1 -right-1 text-green-500 w-5 h-5 bg-white rounded-full" />
                )}
                {contact.status === "rejected" && (
                    <X className="absolute -bottom-1 -right-1 text-white w-5 h-5 bg-[#FF0000] rounded-full" />
                )}
                {contact.status === "pending" && (
                    <Clock className="absolute -bottom-1 -right-1 text-yellow-500 w-5 h-5 bg-white rounded-full" />
                )}
                {contact.status === "registered" && (
                    <FileSearch className="absolute -bottom-1 -right-1 text-blue-500 w-5 h-5 bg-white rounded-full" />
                )}
                {contact.status === "hold" && (
                    <LoaderCircle className="absolute -bottom-1 -right-1 text-blue-500 w-5 h-5 bg-white rounded-full" />
                )} */}
            </div>
            <div className='flex items-center w-full justify-between'>
                <div>
                    <h3 className={`font-medium ${isSelected ? 'text-white' : 'text-black'} text-sm`}>
                        {contact.name}
                    </h3>
                    <p className={`text-xs ${isSelected ? 'text-white' : 'text-black'} truncate`}>
                        {contact.email}
                    </p>
                </div>
                <div className=''>
                    <img src={statusIcon} alt={contact.status} />
                </div>
            </div>
        </li>
    )
}
