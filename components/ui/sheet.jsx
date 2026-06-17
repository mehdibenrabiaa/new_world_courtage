import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;
const SheetPortal = Dialog.Portal;

function SheetOverlay({ className, ...props }) {
  return (
    <Dialog.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}

function SheetContent({ className, children, side = "left", ...props }) {
  const sides = {
    left:  "inset-y-0 left-0 h-full w-[min(480px,100vw)] data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
    right: "inset-y-0 right-0 h-full w-[min(480px,100vw)] data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
    top:   "inset-x-0 top-0 data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
    bottom:"inset-x-0 bottom-0 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
  };
  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Content
        className={cn(
          "fixed z-50 bg-white shadow-2xl flex flex-col overflow-hidden transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-300",
          sides[side],
          className
        )}
        {...props}
      >
        {children}
      </Dialog.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }) {
  return <div className={cn("flex items-center justify-between shrink-0", className)} {...props} />;
}

function SheetTitle({ className, ...props }) {
  return <Dialog.Title className={cn("text-base font-semibold text-[#131212]", className)} {...props} />;
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle };
