import React from 'react';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '../ui/table';
import {
  useReactTable,
  getPaginationRowModel,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import './DataTable.css'

const DataTable = ({
  columns,
  hasClick,
  data,
  onClickRoute,
  pagination,
  setPagination,
  hasPagination = true,
}) => {
  const table = useReactTable({
    data: data.results || data.result || data, // Handle multiple data formats
    columns,
    manualPagination: hasPagination,
    pageCount:
      data.count && data.limit
        ? Math.ceil(data.count / data.limit)
        : 1, // Calculate total pages for pagination
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: hasPagination ? getPaginationRowModel() : undefined,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <Table className="data-table">
        {/* Table Header */}
        <TableHeader className="bg-black rounded-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : undefined}
                onClick={() => hasClick && onClickRoute && onClickRoute(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
