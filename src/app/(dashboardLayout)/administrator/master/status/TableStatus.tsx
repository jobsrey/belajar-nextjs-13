import ConfirmationDialog from "@/components/dialog/ConfirmationDialog";
import { useMutationDataStatus } from "@/query/StatusQuery";
import { Status, StatusCollaction } from "@/types/MasterStatus";
import { TextField } from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState, HTMLProps } from "react";

import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { BsTrash } from "react-icons/bs";


type PTableStatus = {
  apiResource: StatusCollaction;
  page: number;
  setSortDataServe: (value: any) => void;
  setFilterField: (value: any) => void;
  setPage: (value: any) => void;
};

const IndeterminateCheckbox = ({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
};


//component
const TableStatus = ({
  apiResource,
  setSortDataServe,
  setFilterField,
  setPage,
}: PTableStatus) => {
  const data = useMemo<Status[]>(() => apiResource.data, [apiResource]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dataId, setDataId] = useState<string>("");
  const session = useSession();

  const { handleDelete } = useMutationDataStatus({
    token: session.data?.user.token,
  });

  const startNumber = apiResource.meta.from ?? 0;

  const openDialogDelete = (id: string) => {
    setDataId(id);
    setIsOpenDialog(true);
  };
  
  const closeDialogDelete = () => {
    setIsOpenDialog(false);
  };

  const confirmDeleteData = (callbackId:string) => {
    handleDelete(callbackId);
  }

  const columns = useMemo<ColumnDef<Status, any>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        header: "#",
        accessorKey: "serialNumber",
        cell: ({ row }) => row.index + startNumber,
        enableSorting: false,
      },
      {
        header: "Kode",
        accessorKey: "kode",
        footer: "Kode",
      },
      {
        header: "Name",
        accessorKey: "name",
        footer: "Name",
      },
      {
        header: "Description",
        accessorKey: "description",
        footer: "Description",
      },
      {
        header: "Action",
        accessorKey: "id",
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <div className="flex justify-center items-center">
              <span
                className="cursor-pointer"
                onClick={() => openDialogDelete(row.getValue('id'))}
              >
                <BsTrash />
              </span>
            </div>
          );
        },
      },
    ],
    [startNumber]
  );

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
  const table = useReactTable({
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
      <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
        {table.getHeaderGroups().map((headerGroup, i) => (
          <tr key={i} className="border-b font-medium dark:border-neutral-500">
            {headerGroup.headers.map((header, j) => (
              <td
                key={j}
                scope="col"
                className={`border-r px-6 py-4 dark:border-neutral-500 `}
                rowSpan={j < 2 || j === 5 ? 2 : undefined}
              >
                <span
                  className={`${
                    header.column.getCanSort()
                      ? "cursor-pointer select-none "
                      : ""
                  } flex items-center text-blue-600 text-base`}
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
        <tr className="border-b dark:border-neutral-500">
          <td className="whitespace-nowrap border-r px-2 py-2 text-left font-medium dark:border-neutral-500">
            <TextField
              name="kode"
              fullWidth
              size="small"
              onChange={onChangeFilter}
            />
          </td>
          <td className="whitespace-nowrap border-r px-2 py-2 text-left font-medium dark:border-neutral-500">
            <TextField
              name="name"
              fullWidth
              size="small"
              onChange={onChangeFilter}
            />
          </td>
          <td className="whitespace-nowrap border-r px-2 py-2 text-left font-medium dark:border-neutral-500">
            <TextField
              name="description"
              fullWidth
              size="small"
              onChange={onChangeFilter}
            />
          </td>
        </tr>
        {table.getRowModel().rows.map((row, i) => (
          <tr key={i} className="border-b dark:border-neutral-500">
            {row.getVisibleCells().map((cell, j) => (
              <td
                key={j}
                className="whitespace-nowrap border-r px-2 py-2 text-left font-medium dark:border-neutral-500"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </table>
      <ConfirmationDialog
        dataId={dataId}
        open={isOpenDialog}
        title="Apakah anda yakin"
        message="Apakah anda yakin ingin menghapus data ini?"
        onClose={closeDialogDelete}
        onConfirmation={confirmDeleteData}
      />
    </>
  );
};

export default TableStatus;
