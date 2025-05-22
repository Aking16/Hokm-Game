'use client';

import StatusCard from "@/components/cards/status-card";
import GameBoard from "@/components/layout/game-board";
import GameCenter from "@/components/layout/game-center";
import { createInitialGameState, gameReducer } from "@/lib/game";
import { useEffect, useReducer } from "react";

export default function Home() {
  const [gameState, dispatch] = useReducer(gameReducer, createInitialGameState(['بازیکن 1', 'بازیکن 2', 'بازیکن 3', 'بازیکن 4',]));

  useEffect(() => {
    dispatch({ type: 'DEAL_CARDS' });
  }, []);

  return (
    <main className="min-h-screen bg-[url('/background/rug-1.jpg')] bg-cover">
      <GameBoard gameState={gameState} dispatch={dispatch} />
      <GameCenter gameState={gameState} dispatch={dispatch} />
      <StatusCard gameState={gameState} />
    </main>
  );
}
