import GameCard from "../cards/game-card";
import { createInitialGameState, gameReducer } from "@/lib/game";
import { useEffect, useReducer } from "react";
import { Card } from "@/types/types";
import { cn } from "@/lib/utils";

const GameBoard = () => {
  const [gameState, dispatch] = useReducer(gameReducer, createInitialGameState(['بازیکن 1', 'بازیکن 2', 'بازیکن 3', 'بازیکن 4',]));

  useEffect(() => {
    dispatch({ type: 'DEAL_CARDS' });
  }, []);

  const handleCardClick = (card: Card) => {
    if (gameState.gamePhase === 'بازی') {
      dispatch({ type: 'PLAY_CARD', card });
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Center area for current trick */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
        <h2 className="text-lg text-center font-semibold bg-background/80 px-4 py-2 rounded-lg">حکم</h2>
        <div className="grid grid-cols-2 gap-4">
          {gameState.currentTrick.map((card, index) => (
            <GameCard key={index} value={card.rank} suit={card.suit} />
          ))}
        </div>
      </div>

      {/* Player hands positioned around the board */}
      {gameState.players.map((player, index) => {
        const positions = [
          "bottom-4 left-1/2 -translate-x-1/2", // Player 1 (bottom)
          "top-4 left-1/2 -translate-x-1/2",    // Player 2 (top)
          "left-4 top-1/2 -translate-y-1/2",    // Player 3 (left)
          "right-4 top-1/2 -translate-y-1/2",   // Player 4 (right)
        ];

        const rotations = [
          "",           // Player 1 (bottom)
          "rotate-180", // Player 2 (top)
          "rotate-90",  // Player 3 (left)
          "-rotate-90", // Player 4 (right)
        ];

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
              {player.hand.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  onClick={() => handleCardClick(card)}
                  className="cursor-pointer transition-transform -ms-16 hover:scale-105 !hover:z-50 first:ms-0"
                >
                  <GameCard value={card.rank} suit={card.suit} hidden={index !== 0} />
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

      {/* Game phase and controls */}
      <div className="absolute bottom-4 right-4 p-4 bg-background/80 rounded-lg">
        <p className="text-lg">وضعیت بازی: {gameState.gamePhase}</p>
        {gameState.trumpSuit && (
          <p className="text-lg"> : {gameState.trumpSuit}</p>
        )}
      </div>
    </div>
  );
};

export default GameBoard;