import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface GradientBoxProps extends React.HTMLAttributes<HTMLDivElement>, PropsWithChildren {
    
}


export default function GradientBox({ className, children }: GradientBoxProps) {
    return <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-amber-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <span className={`relative bg-zinc-950 rounded-lg leading-none flex items-center ${cn(className)}`}>
        <span className="flex items-center space-x-5">
          <span className="text-gray-100">{children}</span>
        </span>
      </span>
    </div>;
  }
  