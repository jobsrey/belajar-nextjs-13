import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Session } from "next-auth";
import React, { useEffect, useMemo, useState } from "react";

import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import TableFilter from "./TableFilter";
import { BtnBulkDelete, ContainerBtnBulk } from "./BtnBulkTable";
import { useTableColumnHook } from "./TableColumn";
import { IAsset, IAssetCollaction } from "@/types/Asset";

type PTable = {
  apiResource: IAssetCollaction;
  page: number;
  setSortDataServe: (value: any) => void;
  setFilterField: (value: any) => void;
  setPage: (value: any) => void;
  session: Session;
};

const TableData = ({
  apiResource,
  page,
  session,
  setFilterField,
  setSortDataServe,
  setPage,
}: PTable) => {
  const data = useMemo<IAsset[]>(
    () => apiResource.data,
    [apiResource]
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  //sorting effect
  useEffect(() => {
    if (sorting.length) {
      sorting.map((s) =>
        setSortDataServe({
          sortColumnName: s.id,
          sortDirection: s.desc ? "desc" : "asc",
        })
      );
    } else {
      setSortDataServe({});
    }
  }, [sorting, setSortDataServe]);

  //selection effect ketika pindah pagination
  useEffect(() => {
    setRowSelection({});
  }, [apiResource]);

  const startNumber = apiResource.meta.from ?? 0;

  const { columns } = useTableColumnHook({ startNumber });

  //search action
  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setFilterField((prev: any) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  //core of table
  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    manualSorting: true,
    enableRowSelection: true,
  });

  return (
    <>
      <table className="w-full border text-center text-sm font-light dark:border-neutral-500">
        {tableInstance.getHeaderGroups().map((headerGroup, i) => (
          <tr key={i} className="border-b font-medium dark:border-neutral-500">
            {headerGroup.headers.map((header, j) => (
              <td
                key={j}
                
                scope="col"
                className={`border-r px-6 py-2 dark:border-neutral-500`}
                rowSpan={j < 2 || j == 6 ? 2 : undefined}
              >
                <span
                  className={`${
                    header.column.getCanSort()
                      ? "cursor-pointer select-none "
                      : ""
                  } flex items-center text-blue-600 text-sm`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <AiOutlineSortAscending size={14} />,
                    desc: <AiOutlineSortDescending size={14} />,
                  }[header.column.getIsSorted() as string] ?? null}
                </span>
              </td>
            ))}
          </tr>
        ))}
        <TableFilter onChangeFilter={onChangeFilter} />
        {tableInstance.getRowModel().rows.map((row, i) => (
          <tr
            key={i}
            className={`border-b dark:border-neutral-500 ${
              row.getIsSelected() && "bg-red-200"
            }`}
          >
            {row.getVisibleCells().map((cell, j) => (
              <td
                key={j}
                className="break-words border-r px-2 py-2 text-left font-medium dark:border-neutral-500"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </table>
      {/* btn hapus */}
      {tableInstance.getSelectedRowModel().rows.length !== 0 && (
        <ContainerBtnBulk>
          <BtnBulkDelete rowsData={tableInstance.getSelectedRowModel()} />
        </ContainerBtnBulk>
      )}
    </>
  );
};

export default TableData;
