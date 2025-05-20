import { Suit } from "@/types/types";
import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "lucide-react";
import { FC } from "react";

interface GameCardProps {
  value: string;
  suit: Suit;
  hidden?: boolean;
}

const GameCard: FC<GameCardProps> = ({ value, suit, hidden = false }) => {
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

  function renderValue() {
    switch (suit) {
      case 'diamonds':
        return <span className="text-red-500">{value}</span>;
      case 'hearts':
        return <span className="text-red-500">{value}</span>;
      default:
        return <span>{value}</span>;
    }
  }

  if (hidden) {
    return (
      <div className="w-24 h-32 p-2 border shadow-md bg-background">
        <div className="h-full grid justify-center items-center font-bold">
          Hokm
        </div>
      </div>
    );
  }

  return (
    <div className="w-24 p-2 border shadow-md bg-background transition-all duration-300 cursor-pointer hover:scale-105">
      <div className="grid grid-cols-2 gap-5 font-bold">
        <div>{renderValue()}</div>
        <div className="ms-auto">{renderValue()}</div>
        <div className="col-span-2 mx-auto">
          {renderSuitIcon()}
        </div>
        <div>{renderValue()}</div>
        <div className="ms-auto">{renderValue()}</div>
      </div>
    </div>
  );
};

export default GameCard;