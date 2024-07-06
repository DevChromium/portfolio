type ProgressBarProps = React.ComponentProps<"div"> & {
  value: number;
};

export const ProgressBar = ({ value, className }: ProgressBarProps) => {
  return (
    <div className="5 h-2 w-full rounded-full bg-zinc-200/95 dark:bg-zinc-900/95">
      <div
        className={`${className} 5 h-2 rounded-full`}
        style={{
          width: `${value}%`,
          transition: "width 0.2s ease-in-out",
        }}
      ></div>
    </div>
  );
};
