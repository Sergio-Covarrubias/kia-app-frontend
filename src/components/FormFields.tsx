import { Controller, Control, FieldValues, Path } from "react-hook-form";

type BaseFormFieldProps<T extends FieldValues> = {
  control: Control<T, any, T>;
  fieldName: Path<T>;

  label: string;
  error?: string;
};

type TextFormFieldProps<T extends FieldValues> = BaseFormFieldProps<T> & { required: string; };
export const TextFormField = <T extends FieldValues,>(props: TextFormFieldProps<T>) => {
  return (
    <Controller
      control={props.control}
      name={props.fieldName}
      rules={{ required: props.required }}
      render={({ field }) => (
        <div className="relative w-full mb-2">
          <label htmlFor={props.fieldName} className="text-sm mb-2">{props.label}</label>
          <input
            {...field}
            type="text"
            className="w-full p-2 text-md border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />

          {props.error && <span className="absolute left-0 -bottom-6 text-red-500 text-sm">{props.error}</span>}
        </div>
      )}
    />
  );
};

type BooleanFormFieldProps<T extends FieldValues> = BaseFormFieldProps<T>;
export const BooleanFormField = <T extends FieldValues,>(props: BooleanFormFieldProps<T>) => {
  return (
    <Controller
      control={props.control}
      name={props.fieldName}
      render={({ field }) => (
        <div className="flex gap-x-3 items-center">
          <label htmlFor={props.fieldName} className="text-sm cursor-pointer">{props.label}</label>
          <input
            id={props.fieldName}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            type="checkbox"
            className="accent-black size-3.5 cursor-pointer"
          />

          {props.error && <span className="absolute left-0 -bottom-6 text-red-500 text-sm">{props.error}</span>}
        </div>
      )}
    />
  );
};
