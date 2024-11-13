import * as React from 'react';
import { cn } from '../../utils/reactUtils';


const TextInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="text"
        className={cn(
          'bg-surface-low mb-2 outline-none focus:ring-4 focus:ring-outline-low placeholder-outline-medium text-solid-high p-2 border-[2px] rounded-md border-solid-light w-full',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
TextInput.displayName = 'TextInput';

export { TextInput };