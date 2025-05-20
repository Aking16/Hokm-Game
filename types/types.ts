export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  rank: Rank;
}

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  tricks: Card[][];
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  trumpSuit: Suit | null;
  currentTrick: Card[];
  deck: Card[];
  gamePhase: 'پخش کارت' | 'تعیین حکم' | 'بازی' | 'پایان بازی';
  dealerIndex: number;
  currentBidderIndex: number;
  bids: { [playerId: string]: Suit | 'pass'; };
}

export type GameAction =
  | { type: 'DEAL_CARDS'; }
  | { type: 'SET_TRUMP'; suit: Suit; }
  | { type: 'PLAY_CARD'; card: Card; }
  | { type: 'PASS'; }
  | { type: 'START_NEW_TRICK'; }; 