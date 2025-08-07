import { cn } from "@/lib/utils";

interface FormErrorProps {
  message?: string;
  show?: boolean;
  className?: string;
}

export const FormError = ({
  message,
  show = true,
  className,
}: FormErrorProps) => {
  if (!message || !show) return null;

  return (
    <div className={cn("mt-1 flex items-center", className)}>
      <span className="text-sm text-red-600">{message}</span>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField = ({
  label,
  error,
  touched = false,
  required = false,
  children,
  className,
}: FormFieldProps) => {
  const hasError = touched && !!error;

  return (
    <div className={cn("space-y-1", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      <FormError message={error} show={hasError} />
    </div>
  );
};
