import { CircleCheck } from "lucide-react";
import { FC } from "react";

interface SuccessCardProps {
  message?: string;
}

const SuccessCard: FC<SuccessCardProps> = ({ message }) => {
  if (!message) return;

  return (
    <div className="flex items-center bg-emerald-500 border border-emerald-800 space-x-2 px-4 py-2 rounded-lg">
      <CircleCheck />
      <p>{message}</p>
    </div>
  );
};

export default SuccessCard;