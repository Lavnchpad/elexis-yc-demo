import { jobColumns } from '@/components/component/jobs/jobsTable/JobsColumn';
import ManageJobs from '@/components/component/jobs/ManageJobs';
import DataTable from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useContext, useEffect, useState } from 'react';
import axios from '../utils/api';
import { JobsContext } from '@/components/component/jobs/JobsContext';

const JobsPage = () => {
  const [error, setError] = useState(null); // Error state
  const { jobs, fetchJobs, loading } = useContext(JobsContext)
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedLocation, setSelectedLocation] = useState('all'); // State for location filter


  const deleteJob = async (jobId, jobCreatedBy) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const isAdmin = currentUser.is_admin === true; // Check if the user is an admin
    const isJobCreator = currentUser.id === jobCreatedBy; // Check if the user created the job

    if (!isAdmin && !isJobCreator) {
      alert('You are not authorized to delete this job.');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this job?');
    if (!confirmed) return;

    try {
      await axios.delete(`/jobs/${jobId}/`);
      alert('Job deleted successfully.');
      fetchJobs(); // Refresh the job list
    } catch (error) {
      console.error(error);
      alert('Failed to delete the job. Please try again.');
    } finally {
    }
  };

  const filteredData = jobs?.data?.filter((job) => {
    const matchesSearch = job.job_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      selectedLocation === 'all' ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });
  

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold">Jobs</h1> */}
        {/* <ManageJobs onJobCreated={fetchJobs}>
            <Button className="bg-black hover:bg-gray-800">+ Create Job</Button>
          </ManageJobs> */}
        </div>
      <div className="flex items-center gap-4 p-2 bg-black text-white rounded-t-lg">
          <Input
            placeholder="Search for Jobs"
          className="max-w-sm text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        <Select value={selectedLocation} onValueChange={setSelectedLocation} className="color-black">
          <SelectTrigger className="w-[180px] text-muted-foreground">
            <SelectValue placeholder="Filter by Location" className='text-black' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Pune">Pune</SelectItem>
            </SelectContent>
          </Select>
        </div>
      {filteredData &&
        <DataTable
          hasClick={false}
          hasPagination={false}
          columns={jobColumns(deleteJob)}
          data={filteredData} // Use filtered data
      />
      }
    </div>
  );
};

export default JobsPage;
