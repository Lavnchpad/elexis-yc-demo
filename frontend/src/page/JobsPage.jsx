
import {jobColumns}  from '@/components/component/jobs/jobsTable/JobsColumn'
import ManageJobs from '@/components/component/jobs/ManageJobs'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const JobsPage = () => {
    const data = [
  {
    id: "1",
    title: "Fabrication Engineer",
    openings: 4,
    filled: 0,
    location: "Bilimora",
    ctc: 250000,
    applications: 2,
    isDisabled: false,
  },
  {
    id: "2",
    title: "Frontend developer",
    openings: 10,
    filled: 0,
    location: "Mumbai",
    ctc: 25000,
    applications: 0,
    isDisabled: false,
  },
  {
    id: "3",
    title: "Backend developer",
    openings: 25,
    filled: 0,
    location: "Bangalore",
    ctc: 30000,
    applications: 0,
    isDisabled: false,
  },
  {
    id: "4",
    title: "Data Analyst",
    openings: 5,
    filled: 0,
    location: "Gurgaon",
    ctc: 60000,
    applications: 0,
    isDisabled: false,
  },
  {
    id: "5",
    title: "Machine Learning",
    openings: 3,
    filled: 0,
    location: "Bangalore",
    ctc: 200000,
    applications: 0,
    isDisabled: false,
  },
]


  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Jobs Databases</h1>
         <ManageJobs><Button className="bg-black hover:bg-gray-800">+ Create Job</Button></ManageJobs> 
        </div>
        <div className="flex items-center gap-4 p-2 bg-[#D1D1D1]">
        <Input
          placeholder="Search for Jobs"
        //   value={filterValue}
        //   onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <Select>
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
        <DataTable hasClick={false} hasPagination={false} columns={jobColumns} data={data} />
      </div>
    </div>
  )
}

export default JobsPage
