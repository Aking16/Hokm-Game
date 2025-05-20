import { Card, GameState, GameAction, Suit, Rank } from '../types/types';

const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  return shuffleDeck(deck);
}

function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function createInitialGameState(playerNames: string[]): GameState {
  const players = playerNames.map((name, index) => ({
    id: `player-${index}`,
    name,
    hand: [],
    tricks: [],
  }));

  return {
    players,
    currentPlayerIndex: 0,
    trumpSuit: null,
    currentTrick: [],
    deck: createDeck(),
    gamePhase: 'پخش کارت',
    dealerIndex: 0,
    currentBidderIndex: 1, // Player to the left of dealer starts bidding
    bids: {},
  };
}

export function dealCards(state: GameState): GameState {
  const deck = [...state.deck];
  const players = state.players.map(player => ({
    ...player,
    hand: deck.splice(0, 13), // Each player gets 13 cards
  }));

  return {
    ...state,
    players,
    deck,
    gamePhase: 'تعیین حکم',
  };
}

export function canPlayCard(card: Card, playerHand: Card[], currentTrick: Card[]): boolean {
  if (currentTrick.length === 0) return true;

  const leadingSuit = currentTrick[0].suit;
  const hasLeadingSuit = playerHand.some(c => c.suit === leadingSuit);

  if (hasLeadingSuit) {
    return card.suit === leadingSuit;
  }

  return true;
}

export function getCardValue(card: Card, trumpSuit: Suit): number {
  const rankValues: { [key in Rank]: number } = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };

  if (card.suit === trumpSuit) {
    return rankValues[card.rank] + 100; // Trump cards are always higher
  }
  return rankValues[card.rank];
}

export function determineTrickWinner(trick: Card[], trumpSuit: Suit): number {
  let winningCardIndex = 0;
  let highestValue = getCardValue(trick[0], trumpSuit);

  for (let i = 1; i < trick.length; i++) {
    const currentValue = getCardValue(trick[i], trumpSuit);
    if (currentValue > highestValue) {
      highestValue = currentValue;
      winningCardIndex = i;
    }
  }

  return winningCardIndex;
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'DEAL_CARDS':
      return dealCards(state);

    case 'SET_TRUMP':
      return {
        ...state,
        trumpSuit: action.suit,
        gamePhase: 'بازی',
      };

    case 'PLAY_CARD': {
      const currentPlayer = state.players[state.currentPlayerIndex];
      const cardIndex = currentPlayer.hand.findIndex(
        c => c.suit === action.card.suit && c.rank === action.card.rank
      );

      if (cardIndex === -1 || !canPlayCard(action.card, currentPlayer.hand, state.currentTrick)) {
        return state;
      }

      const updatedHand = [...currentPlayer.hand];
      updatedHand.splice(cardIndex, 1);

      const updatedPlayers = [...state.players];
      updatedPlayers[state.currentPlayerIndex] = {
        ...currentPlayer,
        hand: updatedHand,
      };

      const newTrick = [...state.currentTrick, action.card];

      // If the trick is complete (4 cards played)
      if (newTrick.length === 4) {
        const winningIndex = determineTrickWinner(newTrick, state.trumpSuit!);
        const winningPlayerIndex = (state.currentPlayerIndex - 3 + winningIndex) % 4;

        // Add the trick to the winning player's tricks
        updatedPlayers[winningPlayerIndex].tricks.push(newTrick);

        return {
          ...state,
          players: updatedPlayers,
          currentTrick: [],
          currentPlayerIndex: winningPlayerIndex,
        };
      }

      return {
        ...state,
        players: updatedPlayers,
        currentTrick: newTrick,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % 4,
      };
    }

    case 'PASS': {
      const nextBidderIndex = (state.currentBidderIndex + 1) % 4;
      return {
        ...state,
        currentBidderIndex: nextBidderIndex,
        bids: {
          ...state.bids,
          [state.players[state.currentBidderIndex].id]: 'pass',
        },
      };
    }

    case 'START_NEW_TRICK':
      return {
        ...state,
        currentTrick: [],
      };

    default:
      return state;
  }
} 