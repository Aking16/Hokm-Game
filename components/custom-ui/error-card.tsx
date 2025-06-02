import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { FC } from "react";

interface ErrorCardProps {
  message?: string;
  className?: string;
}

const ErrorCard: FC<ErrorCardProps> = ({ message, className }) => {
  if (!message) return;

  return (
    <div className={cn("flex items-center text-destructive-foreground bg-destructive/20 border border-destructive space-x-2 px-4 py-2 rounded-lg", className)}>
      <CircleX />
      <p>{message}</p>
    </div>
  );
};

export default ErrorCard;