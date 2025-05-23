import { positions, rotations } from "@/constants/card-settings";
import { sortHandBySuit } from "@/lib/game";
import { cn } from "@/lib/utils";
import { Card, GameAction, GameState } from "@/types/types";
import { Dispatch } from "react";
import PlayerDeck from "../cards/player-deck";

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
              "absolute space-y-2",
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
            <div className="flex justify-center relative">
              {sortHandBySuit(player.hand, gameState.trumpSuit ?? "hearts")
                .map((card, cardIndex) =>
                  <PlayerDeck
                    key={cardIndex}
                    value={card.rank}
                    suit={card.suit}
                    onClick={() => handleCardClick(card)}
                    totalCards={player.hand.length}
                    cardIndex={cardIndex}
                  />
                )}
            </div>
            <div className="text-center">
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