import { jobColumns } from '@/components/component/jobs/jobsTable/JobsColumn';
import ManageJobs from '@/components/component/jobs/ManageJobs';
import DataTable from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useEffect, useState } from 'react';
import axios from '../utils/api';

const JobsPage = () => {
  const [data, setData] = useState([]); // State to store fetched job data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedLocation, setSelectedLocation] = useState('all'); // State for location filter

  const fetchJobs = async () => {
    try {
      setLoading(true); // Show loader
      const response = await axios.get(`/jobs/`);
      setData(response.data); // Set fetched data
    } catch (err) {
      setError('Failed to load jobs data. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

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
      setLoading(true); // Show loader during deletion
      await axios.delete(`/jobs/${jobId}/`);
      alert('Job deleted successfully.');
      fetchJobs(); // Refresh the job list
    } catch (error) {
      console.error(error);
      alert('Failed to delete the job. Please try again.');
    } finally {
      setLoading(false); // Stop loader after deletion
    }
  };

  const filteredData = data.filter((job) => {
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
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Jobs</h1>
          <ManageJobs onJobCreated={fetchJobs}>
            <Button className="bg-black hover:bg-gray-800">+ Create Job</Button>
          </ManageJobs>
        </div>
        <div className="flex items-center gap-4 p-2 bg-[#D1D1D1]">
          <Input
            placeholder="Search for Jobs"
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Pune">Pune</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DataTable
          hasClick={false}
          hasPagination={false}
          columns={jobColumns(deleteJob)}
          data={filteredData} // Use filtered data
        />
      </div>
    </div>
  );
};

export default JobsPage;
