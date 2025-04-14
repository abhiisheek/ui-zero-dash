export const getInputProps = (meta: any) => ({
  label: meta?.label,
  id: meta?.key,
  defaultValue: meta?.defaultValue,
  placeholder: meta?.placeholder,
  className: "w-full",
});

export const getSelectProps = (meta: any) => ({
  label: meta?.label,
  id: meta?.key,
  defaultValue: meta?.defaultValue,
  placeholder: meta?.placeholder,
  mode: meta?.multiple && "multiple",
});

export const getBooleanProps = (meta: any) => ({
  label: meta?.label,
  id: meta?.key,
  defaultValue: meta?.defaultValue,
});

export const getTableColumnFieldProps = (meta: any) => ({
  id: meta?.key,
});
