'use client';

import GameBoard from "@/components/layout/game-board";

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('/background/rug-1.jpg')] bg-cover">
      <GameBoard />
    </main>
  );
}
