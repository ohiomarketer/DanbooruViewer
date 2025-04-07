// src/components/ui/button.jsx
import * as React from "react";

export const Button = React.forwardRef(
  ({ className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-700 disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";