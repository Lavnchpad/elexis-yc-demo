import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

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
        accessorKey: 'email',
        header: 'Email',
      },
      {
        id: "actions",
        cell: ({ row }) => {
            const memberId = row.original.id
            return <Link to={`/team-details/${memberId}`}>
                <Button size="sm">
                    View Details
                </Button>
            </Link>
        }
    },
]