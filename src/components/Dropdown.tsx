import { ChangeEvent } from "react";

export type DropdownOption<VALUE> = {
  label: string;
  value: VALUE | null;
};

type DropdownProps<VALUE> = {
  id: string;
  options: DropdownOption<VALUE>[];
  value: DropdownOption<VALUE>["value"];
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
};

export function Dropdown<VALUE>(props: DropdownProps<VALUE>) {
  return (
    <div className="flex-shrink-0">
      <select
        id={props.id}
        onChange={(value) => props.onChange(value)}
        className="w-36 bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
      >
        {props.options.map((option, index) => (
          <option
            key={`Option${index}`}
            value={(option.value ?? "").toString()}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
