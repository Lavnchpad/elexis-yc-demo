import React, { useEffect, useState } from 'react';
import DataTable from '@/components/table/DataTable';
import { memberColumns } from "../profile/memberTable/MemberColumn";
import { useUser } from '../recruiter/UserContext';
import axios from 'axios';

const MyTeam = () => {
  const { user } = useUser(); // Get user data from context
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  console.log(data)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true); // Start loading
        const token = localStorage.getItem('authToken'); // Get token from local storage

        // API call to fetch team members
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/recruiters/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the headers
          },
        });

        setData(response.data); // Set fetched data
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p> {/* Add a spinner or custom loading indicator if preferred */}
        </div>
      ) : (
        <DataTable hasClick={false} hasPagination={false} columns={memberColumns} data={data} />
      )}
    </div>
  );
};

export default MyTeam;
