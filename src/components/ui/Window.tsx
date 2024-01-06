"use client"

type WindowProps = React.ComponentProps<"div"> & {
    title: string
}

export const Window = ({ title, children, className }: WindowProps) => {
    return (
      <div className={className}>
        <section className="h-full w-full bg-zinc-900/25 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-zinc-900/95 flex flex-col gap-4 max-w-4xl">
          <div className="w-full bg-zinc-950/95 flex items-center justify-between py-2 px-4 rounded-t-md">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-zinc-100 text-sm font-bold">{title}</div>
            <div></div>
          </div>

          <div className="space-y-4">{children}</div>
        </section>
      </div>
    );
};
