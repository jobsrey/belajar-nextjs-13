import { Input } from "antd";

interface IProps {
  onChangeFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const TableFilter = ({ onChangeFilter }: IProps) => {
  return (
    <tr className="border-b dark:border-neutral-500">
      <td className="whitespace-nowrap border-r px-2 py-2 text-left font-medium dark:border-neutral-500">
        <Input
          name="genSysId"
          size="small"
          onChange={onChangeFilter}
          style={{ paddingBlock: 5}}
        />
      </td>
      <td className="whitespace-nowrap border-r px-2 py-2 text-left font-medium dark:border-neutral-500">
        <Input name="genCosId" size="small" onChange={onChangeFilter} style={{ paddingBlock: 5}} />
      </td>
      <td className="whitespace-nowrap border-r px-2 py-2 text-left font-medium dark:border-neutral-500">
        <Input name="name" size="small" onChange={onChangeFilter} style={{ paddingBlock: 5}}/>
      </td>
      <td className="whitespace-nowrap border-r px-2 py-2 text-left font-medium dark:border-neutral-500">
        <Input name="description" size="small" onChange={onChangeFilter} style={{ paddingBlock: 5}}/>
      </td>
    </tr>
  );
};

export default TableFilter;
