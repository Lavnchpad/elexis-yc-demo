
export const memberColumns = [
    {
        accessorKey: 'srNo',
        header: 'Sr No.',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'adminRights',
        header: 'Admin Rights',
      },
      {
        accessorKey: 'accessDetails',
        header: 'Access Details',
        // cell: () => (
        //   <Button variant="link" className="text-black hover:text-gray-700">
        //     Click Here
        //   </Button>
        // ),
      },
    // {
    //     accessorKey: "adminRights",
    //     header: "Admin Rights",
    //     cell: ({ row }) => {
    //         const member = row.original
    //         return member.adminRights ? <p>YES</p> : <p>NO</p>
    //     }
    // },
    // {
    //     id: "details",
    //     header: "Access Details",
    //     cell: ({ row }) => {

    //         const member = row.original
    //         return <MemberDetails memberId={member.id} />
    //     }
    // },
]