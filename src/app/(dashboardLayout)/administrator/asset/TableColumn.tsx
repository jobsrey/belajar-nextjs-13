import IndeterminateCheckbox from "@/components/table/checkbox/IndeterminateCheckbox";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import TableColumnAction from "./TableColumnAction";
import { IAsset } from "@/types/Asset";

interface IColumn {
  startNumber: number;
}

export const useTableColumnHook = ({ startNumber }: IColumn) => {
  const columns= useMemo<
    ColumnDef<IAsset, any>[]
  >(
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
        maxSize: 50,
        cell: ({ row }) => row.index + startNumber,
        enableSorting: false,
      },
      {
        header: "ID System",
        accessorKey: "genSysId",
      },
      {
        header: "Nomor Aset",
        accessorKey: "genCosId",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Action",
        accessorKey: "actionColumn",
        enableSorting: false,
        cell: ({ row }) => {
          return <TableColumnAction row={row} />;
        },
      },
    ],
    [startNumber]
  );

  return { columns };
};
