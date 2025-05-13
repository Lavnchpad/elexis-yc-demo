import React, { useEffect, useState } from 'react';
import DataTable from '@/components/table/DataTable';
import { memberColumns } from "../profile/memberTable/MemberColumn";
import { useUser } from '../recruiter/UserContext';
import axios from '../../../utils/api';

const MyTeam = () => {
  const { user } = useUser(); // Get user data from context
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  console.log(data)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true); // Start loading
        // API call to fetch team members
        const response = await axios.get(`/recruiters/`);
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
