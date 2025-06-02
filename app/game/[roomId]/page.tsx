'use client';

import StatusCard from "@/components/cards/status-card";
import GameBoard from "@/components/layout/game-board";
import GameCenter from "@/components/layout/game-center";
import axiosInstance from "@/lib/axios";
import { useParams } from "next/navigation";

export default function Home() {
  const params: { roomId: string; } = useParams();

  axiosInstance(`/room/${params.roomId}`)
    .then(data => console.log(data));

  return (
    <main className="min-h-screen bg-[url('/background/rug-1.jpg')] bg-cover">
      {/* <GameBoard gameState={gameState} dispatch={dispatch} />
      <GameCenter gameState={gameState} dispatch={dispatch} />
      <StatusCard gameState={gameState} /> */}
    </main>
  );
}
