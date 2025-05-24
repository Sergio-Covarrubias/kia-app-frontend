import { ChevronDown } from "lucide-react";

type NameSelectorProps = {
  dataIndex: number | undefined;
  data: string[];
  onChage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const NameSelector = (props: NameSelectorProps) => {
  return (
    <div className="relative flex justify-center items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none">
      <select
        className="text-sm cursor-pointer py-3 pl-3 pr-9 max-w-[15rem] md:max-w-[30rem]"
        value={props.dataIndex || undefined}
        onChange={props.onChage}
      >
        <option value={undefined}>-- Agregar Entrada --</option>
        
        {
          props.data.map((element, index: number) => <option key={index} value={index}>{element}</option>)
        }
      </select>
      <ChevronDown className="size-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
};

export default NameSelector;
