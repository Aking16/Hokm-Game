import { positions, rotations } from "@/constants/card-settings";
import { sortHandBySuit } from "@/lib/game";
import { cn } from "@/lib/utils";
import { Card, GameAction, GameState } from "@/types/types";
import { Dispatch } from "react";
import GameCard from "../cards/game-card";

interface GameBoardProps {
  gameState: GameState;
  dispatch: Dispatch<GameAction>;
}

const GameBoard = ({ gameState, dispatch }: GameBoardProps) => {
  const handleCardClick = (card: Card) => {
    if (gameState.gamePhase === 'بازی') {
      dispatch({ type: 'PLAY_CARD', card });
    }
  };

  return (
    <div className="relative w-full h-screen">
      {gameState.players.map((player, index) => {
        return (
          <div
            key={player.id}
            className={cn(
              "absolute space-y-4",
              positions[index],
              rotations[index]
            )}
          >
            <h3 className={cn(
              "text-lg font-semibold bg-background/80 px-4 py-2 rounded-lg",
              index === gameState.currentPlayerIndex && "ring-2 ring-primary"
            )}>
              {player.name}
              {index === gameState.currentPlayerIndex && ' (فعلی)'}
            </h3>
            <div className="flex">
              {sortHandBySuit(player.hand, gameState.trumpSuit ?? "hearts")
                .map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    onClick={() => handleCardClick(card)}
                    className="cursor-pointer transition-transform -ms-16 hover:scale-105 !hover:z-50 first:ms-0"
                  >
                    <GameCard value={card.rank} suit={card.suit} />
                  </div>
                ))}
            </div>
            <div className="mt-2 text-center">
              <p className="bg-background/80 px-4 py-2 rounded-lg">
                دست های برنده شده: {player.tricks.length}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;