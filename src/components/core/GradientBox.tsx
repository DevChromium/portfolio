import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface GradientBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

export default function GradientBox({ className, children }: GradientBoxProps) {
  return (
    <div className="group relative">
      <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-amber-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
      <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-amber-600 opacity-50 transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
      <span
        className={`relative flex items-center rounded-lg bg-white leading-none dark:bg-zinc-950 ${cn(className)}`}
      >
        <span className="flex items-center space-x-5">
          <span className="text-zinc-950 dark:text-zinc-100">{children}</span>
        </span>
      </span>
    </div>
  );
}
