import { Suit } from "@/types/types";
import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "lucide-react";
import { FC } from "react";

interface PlayerDeckProps {
  value: string;
  suit: Suit;
  totalCards: number;
  cardIndex: number;
  onClick: () => void;
  hidden?: boolean;
}

const PlayerDeck: FC<PlayerDeckProps> = ({ value, suit, onClick, totalCards, cardIndex, hidden = false }) => {
  const angle = ((totalCards - 1 - cardIndex) / totalCards) * 125 + 210;
  const radius = 200;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius - 50;

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
    <div
      className="absolute w-24 p-2 border shadow-md bg-background transition-all duration-300 cursor-pointer hover:scale-105"
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
        transformOrigin: 'center center',
        zIndex: totalCards - cardIndex - 1,
      }}
      onMouseEnter={e => (e.currentTarget.style.zIndex = "9999")}
      onMouseLeave={e => (e.currentTarget.style.zIndex = String(totalCards - cardIndex - 1))}
      onClick={onClick}
    >
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

export default PlayerDeck;