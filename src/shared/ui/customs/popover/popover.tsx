import { Popover, PopoverProps } from "@mui/material";
import { ReactNode, RefObject } from "react";

interface PopoverComponentProps extends PopoverProps {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  anchorEl: HTMLElement | null;
  className?: string;
  inputRef: RefObject<HTMLInputElement>;
  disabled?: boolean;
  identifier: string;
}

export const PopoverComponent = (props: PopoverComponentProps) => {
  const { children, open, className, onClose, anchorEl, inputRef, disabled = false, identifier, ...restProps } = props;

  return (
    <>
      <Popover
        className={className}
        data-test-id={`popover-${identifier}`}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={onClose}
        TransitionProps={{
          timeout: 10,
          easing: "easeOut",
          onEntered: () => {
            if (!disabled) inputRef?.current?.focus();
          },
        }}
        {...restProps}
      >
        {children}
      </Popover>
    </>
  );
};
