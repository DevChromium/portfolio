interface ProgressBarProps {
    value: number
}

export const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="w-full bg-zinc-200 rounded-full h-2 5">
      <div
        className="bg-rose-400 h-2 5 rounded-full"
        style={{
          width: `${value}%`,
        }}
      ></div>
    </div>
  );
}
