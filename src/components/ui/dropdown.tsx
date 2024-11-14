import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React, { forwardRef } from "react";
import { cn } from "../../utils/reactUtils";

const DropdownRoot = DropdownMenuPrimitive.Root;
const DropdownTrigger = DropdownMenuPrimitive.Trigger;
const DropdownPortal = DropdownMenuPrimitive.Portal;

const DropdownContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownPortal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50',
        className,
      )}
      {...props}
    />
  </DropdownPortal>
));
DropdownContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      '',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));
DropdownItem.displayName = DropdownMenuPrimitive.Item.displayName;

export {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownItem,
    DropdownContent
}