import DataTable from '@/components/table/DataTable'
import React from 'react'
import {memberColumns} from "../profile/memberTable/MemberColumn"

const MyTeam = () => {

    const data = [
        { srNo: 1, name: 'Narayan das', adminRights: 'NO', accessDetails: 'Click Here' },
        { srNo: 2, name: 'Supriya', adminRights: 'YES', accessDetails: 'Click Here' },
        { srNo: 3, name: 'Vijaya Karpe', adminRights: 'YES', accessDetails: 'Click Here' },
        { srNo: 4, name: 'Today Member', adminRights: 'NO', accessDetails: 'Click Here' },
        { srNo: 5, name: 'Dummy User 3', adminRights: 'NO', accessDetails: 'Click Here' },
        { srNo: 6, name: 'Dummy User 2', adminRights: 'NO', accessDetails: 'Click Here' },
        { srNo: 7, name: 'Wjfkjfj', adminRights: 'NO', accessDetails: 'Click Here' },
      ];

  return (
    <div>
    <DataTable hasClick={false} hasPagination={false} columns={memberColumns} data={data} />
    </div>
  )
}

export default MyTeam
