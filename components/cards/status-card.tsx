import { SUITS_FA } from "@/constants/suits";
import { GameState } from "@/types/types";
import { FC } from "react";

interface StatusCardProps {
  gameState: GameState;
}

const StatusCard: FC<StatusCardProps> = ({ gameState }) => {
  return (
    <div className="absolute bottom-4 right-4 p-4 bg-background/80 rounded-lg">
      <p className="text-lg">وضعیت بازی: {gameState.gamePhase}</p>
      {gameState.trumpSuit && (
        <p className="text-lg">حکم: {SUITS_FA[gameState.trumpSuit]}</p>
      )}
    </div>
  );
};

export default StatusCard;