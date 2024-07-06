import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";

interface IconButtonProps extends LucideProps {
  href: string;
  name: keyof typeof dynamicIconImports;
}

export const IconButton = ({ name, href, ...props }: IconButtonProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return (
    <a
      className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md bg-rose-500 text-sm transition-colors ease-in-out hover:bg-rose-500/90"
      href={href}
      target="_blank"
    >
      <LucideIcon {...props} />
    </a>
  );
};
