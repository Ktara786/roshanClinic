import { cn } from "@/lib/cn";

export default function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-container px-5 sm:px-8", className)}>
      {children}
    </Tag>
  );
}
