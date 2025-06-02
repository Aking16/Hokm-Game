'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSocket } from '@/lib/socket';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Lobby() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const socket = getSocket();

  useEffect(() => {
    // Connect once
    socket.on('connect', () => {
      console.log('🔌 Connected to WebSocket:', socket.id);
    });

    // Listen for room creation
    socket.on('room-created', (id) => {
      console.log('✅ Room created:', id);
      setRoomId(id);
    });

    socket.on('player-joined', (player) => {
      console.log('✅ Player joined:', player);
    });

    socket.on('choose-trump', (id) => {
      console.log('✅ Choose trump:', id);
    });

    // Handle errors
    socket.on('error', (err) => {
      console.error('❌ Error:', err);
      setError(err);
    });

    return () => {
      socket.off('connect');
      socket.off('room-created');
      socket.off('player-joined');
      socket.off('error');
    };
  }, []);

  useEffect(() => {
    if (roomId) router.push(`/game/${roomId}`);
  }, [roomId]);

  const createRoom = () => {
    console.log(socket);
    socket.emit('create-room', { playerName: name });
  };

  const joinRoom = () => {
    socket.emit('join-room', {
      roomId: roomId,
      playerName: name
    });
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4 container mx-auto">
      <Input
        type="text"
        placeholder="نام خود را انتخاب کنید!"
        onKeyUp={e => setName(e.currentTarget.value)} />

      <Button disabled={!name} onClick={createRoom}>
        Create Room
      </Button>
      <Button disabled={!name} onClick={joinRoom}>
        Join Room
      </Button>

      {roomId && <p className="mt-2">Room ID: {roomId}</p>}
      {error && <p className="mt-2 text-red-500">Error: {error}</p>}
    </div>
  );
}