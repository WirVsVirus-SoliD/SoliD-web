import { FieldHookConfig, useField } from "formik";

type Props<T> = string | FieldHookConfig<T>;

export function useFormField<T = any>(props: Props<T>) {
  const [field, meta, helpers] = useField<T>(props);
  const hasError = Boolean(meta.touched && meta.error);

  return [field, { ...meta, hasError }, helpers] as [
    typeof field,
    typeof meta & { hasError: boolean },
    typeof helpers
  ];
}
