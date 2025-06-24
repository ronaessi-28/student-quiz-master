
import * as React from "react"
import { cn } from "@/lib/utils"

export interface CodingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const CodingTextarea = React.forwardRef<HTMLTextAreaElement, CodingTextareaProps>(
  ({ className, ...props }, ref) => {
    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      console.log("Paste operation blocked for coding question");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Block Ctrl+V and Cmd+V
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        console.log("Paste shortcut blocked for coding question");
      }
      
      // Pass through other key events
      if (props.onKeyDown) {
        props.onKeyDown(e);
      }
    };

    return (
      <textarea
        className={cn(
          "flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
          className
        )}
        ref={ref}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        {...props}
      />
    )
  }
)
CodingTextarea.displayName = "CodingTextarea"

export { CodingTextarea }
