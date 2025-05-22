import React, { Dispatch, FC } from 'react';
import SuitCard from '../cards/suit-card';
import GameCard from '../cards/game-card';
import { GameAction, GameState } from '@/types/types';
import { Suit } from '@/types/types';
import { SUITS } from '@/constants/suits';

interface GameCenterProps {
  gameState: GameState;
  dispatch: Dispatch<GameAction>;
}

const GameCenter: FC<GameCenterProps> = ({ gameState, dispatch }) => {
  const handleTrumpSelect = (suit: Suit) => {
    dispatch({ type: 'SET_TRUMP', suit });
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
      {gameState.gamePhase === 'تعیین حکم' ?
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg text-center font-semibold bg-background/80 px-4 py-2 rounded-lg">انتخاب حکم</h2>
          <div className="grid grid-cols-2 gap-4">
            {SUITS.map((suit) => (
              <SuitCard
                key={suit}
                onClick={() => handleTrumpSelect(suit)}
                suit={suit} />
            ))}
          </div>
        </div>
        :
        <div className="grid grid-cols-2 gap-4">
          {gameState.currentTrick.map((card, index) => (
            <GameCard key={index} value={card.rank} suit={card.suit} />
          ))}
        </div>
      }
    </div>
  );
};

export default GameCenter;