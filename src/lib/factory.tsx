import { Slot } from "@radix-ui/react-slot";
import { forwardRef, useCallback } from "react";

type ButtonProps = React.ComponentProps<"button"> & { asChild?: boolean };

export function createContextButton<C, P>(
  useCtx: () => C,
  getHandler: (ctx: C, props: P) => React.MouseEventHandler<HTMLButtonElement>,
  displayName: string
) {
  const Component = forwardRef<HTMLButtonElement, ButtonProps & P>(
    ({ asChild, onClick, ...props }, ref) => {
      const context = useCtx();
      const handleAction = getHandler(context, props as P);

      const Comp = asChild ? Slot : "button";

      const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
          handleAction(e);
          onClick?.(e);
        },
        [handleAction, onClick]
      );

      return <Comp ref={ref} onClick={handleClick} {...props} />;
    }
  );

  Component.displayName = displayName;
  return Component;
}
