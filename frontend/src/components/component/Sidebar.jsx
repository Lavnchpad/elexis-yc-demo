import React, { useContext, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, X, Clock, FileSearch } from "lucide-react";
import Filter from "./Filter";
import { CandidatesContext } from "./candidate/CandidatesContext";
import CandidateLoader from "./Loader/CandidateLoader";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setSelectedCandidate,onNaviagte }) => {
  const { candidates, loading, error } = useContext(CandidatesContext);
  const [filteredCandidates, setFilteredCandidates] = useState(candidates || []);

  // Handle search input
  const handleSearch = (searchValue) => {
    const searchTerm = searchValue.toLowerCase();
    const filtered = candidates.filter((candidate) =>
      candidate.name.toLowerCase().includes(searchTerm) ||
      candidate.email.toLowerCase().includes(searchTerm) // Include email in search
    );
    setFilteredCandidates(filtered);
  };
  const navigate = useNavigate()
  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate); // Update the context state
    navigate("/");
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Filter Component */}
      <Filter onSearch={handleSearch} />

      {/* Contact List */}
      <ScrollArea className="mt-4 max-h-full overflow-y-auto">
        <ul className="space-y-2 cursor-pointer">
        {loading
            ? <CandidateLoader/>
            : filteredCandidates.map((contact) => {
              return (
            <li
              key={contact.id}
              className={`flex items-center p-4 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out ${
                contact.status === "accepted"
                  ? "bg-[#E5F2E6]"
                  : contact.status === "rejected"
                  ? "bg-[#FFE5E5]"
                  : contact.status === "pending"
                  ? "bg-[#FFFFE5]"
                    : contact.status === "hold"
                      ? "bg-yellow-800"
                  : "bg-[#E5E5FF]"
              }`}
              onClick={() => handleCandidateClick(contact)} 
            >
              {/* Avatar + Status Icon */}
              <div className="relative w-12 h-12 mr-4">
                <Avatar className="w-full h-full">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {contact.status === "accepted" && (
                  <BadgeCheck className="absolute -bottom-1 -right-1 text-green-500 w-5 h-5 bg-white rounded-full" />
                )}
                {contact.status === "rejected" && (
                  <X className="absolute -bottom-1 -right-1 text-white w-5 h-5 bg-[#FF0000] rounded-full" />
                )}
                {contact.status === "pending" && (
                  <Clock className="absolute -bottom-1 -right-1 text-yellow-500 w-5 h-5 bg-white rounded-full" />
                )}
                {contact.status === "review" && (
                  <FileSearch className="absolute -bottom-1 -right-1 text-blue-500 w-5 h-5 bg-white rounded-full" />
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-medium text-gray-800 text-sm">{contact.name}</h3>
                <p className="text-xs text-gray-500 truncate">{contact.email}</p>
              </div>
            </li>
              )
            })}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
