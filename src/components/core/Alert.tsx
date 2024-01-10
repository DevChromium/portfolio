import { VariantProps, cva, cx } from "class-variance-authority"

export type AlertProps = VariantProps<typeof alert> & React.ComponentProps<"div"> & {
    text: string
}

export const alert = cva("border rounded-md text-center font-bold py-6 px-4", {
  variants: {
    intent: {
      primary: "bg-rose-950/65 border-rose-900/90",
      success: "bg-green-950/65 border-green-900/90",
      warning: "bg-amber-950/65 border-amber-900/90",
      danger: "bg-red-950/65 border-red-900/90",
      info: "bg-sky-950/65 border-sky-900/50"
    }
  },
  defaultVariants: {
    intent: "primary"
  }
});

export function Alert({ intent, text, className }: AlertProps) {
    return <div className={cx([alert({ intent }), className])}>{text}</div>;
}
