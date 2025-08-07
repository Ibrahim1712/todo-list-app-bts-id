import * as React from "react";
import { cn } from "@/lib/utils";

interface InputWithIconProps extends React.ComponentProps<"input"> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  (
    { className, type, leftIcon, rightIcon, onRightIconClick, ...props },
    ref
  ) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border bg-transparent py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-[11px]",
            leftIcon ? "pl-10" : "px-3",
            rightIcon ? "pr-10" : "px-3",
            leftIcon && rightIcon ? "px-10" : "",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div
            className={cn(
              "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground",
              onRightIconClick && "cursor-pointer hover:text-foreground"
            )}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
