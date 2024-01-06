type ProgressBarProps = React.ComponentProps<"div"> & {
  value: number
}

export const ProgressBar = ({ value, className }: ProgressBarProps) => {
  return (
    <div className="w-full bg-zinc-900/95 rounded-full h-2 5">
      <div
        className={`${className} h-2 5 rounded-full`}
        style={{
          width: `${value}%`,
          transition: "width 0.2s ease-in-out"
        }}
      ></div>
    </div>
  );
}
