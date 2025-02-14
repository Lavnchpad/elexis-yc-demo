import DataTable from '@/components/table/DataTable'
import React from 'react'
import {memberColumns} from "../profile/memberTable/MemberColumn"

const MyTeam = () => {

    const data = [
        { srNo: 1, name: 'Narayan das', email: 'narayan@elexis.com', accessDetails: 'Click Here' },
        { srNo: 2, name: 'Supriya', email: 'supriya@elexis.com', accessDetails: 'Click Here' },
        { srNo: 3, name: 'Vijaya Karpe', email: 'vijaya@elexis.com', accessDetails: 'Click Here' },
        { srNo: 4, name: 'Dummy User 3', email: 'dummy1@elexis.com', accessDetails: 'Click Here' },
        { srNo: 5, name: 'Dummy User 3', email: 'dummy3@elexis.com', accessDetails: 'Click Here' },
        { srNo: 6, name: 'Dummy User 2', email: 'dummy2@elexis.com', accessDetails: 'Click Here' },
      ];

  return (
    <div>
    <DataTable hasClick={false} hasPagination={false} columns={memberColumns} data={data} />
    </div>
  )
}

export default MyTeam
