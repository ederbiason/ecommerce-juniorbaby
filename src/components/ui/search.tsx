export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;
import * as React from "react"
import { cn } from "@/lib/utils"
import { Search as SearchIcon } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-input bg-white p-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          className,
        )}
      >
        <input
          {...props}
          type="search"
          ref={ref}
          className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <SearchIcon className="h-[16px] w-[16px]" />
      </div>
    );
  },
);

Search.displayName = "Search";

export { Search };