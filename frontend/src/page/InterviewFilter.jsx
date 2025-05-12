import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../utils/api";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/table/DataTable";
import { InterviewColumn } from "@/components/component/interviewData/InterviewColumn";

const InterviewFilter = () => {
  const location = useLocation();
  const { jobId, status } = location.state || {}; // Retrieve passed state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(data)

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        console.log("Interview Filter API Called:::")
        const token = localStorage.getItem("authToken"); // Get token from local storage
        const response = await axios.get(
          `/interviews/`, 
          {
            // headers: {
            //   Authorization: `Bearer ${token}`, // Pass token in the headers
            // },
            params: {
              job: jobId,
              status: status,
            },
          }
        );
        setData(response.data); // Update the table data
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId && status) {
      fetchInterviews();
    }
  }, [jobId, status]);

  

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p> {/* Add a spinner or custom loading indicator if preferred */}
        </div>
      ) : (
        <DataTable hasClick={false} hasPagination={false} columns={InterviewColumn} data={data} />
      )}
    </div>
  );
};

export default InterviewFilter;
