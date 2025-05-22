import { Suit } from "@/types/types";
import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "lucide-react";
import { FC } from "react";

interface SuitCardProps {
  suit: Suit;
  onClick: () => void;
}

const SuitCard: FC<SuitCardProps> = ({ suit, onClick }) => {
  function renderSuitIcon() {
    switch (suit) {
      case 'spades':
        return <SpadeIcon fill="black" className="size-10" />;
      case 'diamonds':
        return <DiamondIcon fill="red" className="text-red-500 size-10" />;
      case 'clubs':
        return <ClubIcon fill="black" className="size-10" />;
      case 'hearts':
        return <HeartIcon fill="red" className="text-red-500 size-10" />;
      default:
        return null;
    }
  }

  return (
    <div className="w-24 p-2 border shadow-md bg-background transition-all duration-300 cursor-pointer hover:scale-105" onClick={onClick}>
      <div className="grid grid-cols-2 gap-5 font-bold">
        <div className="col-span-2 mx-auto">
          {renderSuitIcon()}
        </div>
      </div>
    </div>
  );
};

export default SuitCard;