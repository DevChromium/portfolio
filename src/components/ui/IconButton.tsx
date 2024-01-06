
import { LucideProps } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"
import dynamic from "next/dynamic";

interface IconButtonProps extends LucideProps {
    href: string
    name: keyof typeof dynamicIconImports;
}

export const IconButton = ({name, href, ...props}: IconButtonProps) => {
    const LucideIcon = dynamic(dynamicIconImports[name])

    return (
      <a
        className="bg-rose-400 hover:bg-rose-400/90 h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors ease-in-out"
        href={href}
        target="_blank"
      >
        <LucideIcon  {...props}/>
      </a>
    );
}