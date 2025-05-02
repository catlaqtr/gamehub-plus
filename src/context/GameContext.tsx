import { createContext, useReducer, useContext, ReactNode } from "react";

type Game = {
  id: number;
  title: string;
  image: string;
  genre: string;
  description: string;
  released: string;
  rating: number;
  playtime: number;
};

type GameState = {
  games: Game[];
  isLoading: boolean;
};

type GameAction =
  | { type: "SET_GAMES"; payload: Game[] }
  | { type: "ADD_GAME"; payload: Game }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: GameState = {
  games: [],
  isLoading: true,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_GAMES":
      return { ...state, games: action.payload, isLoading: false };
    case "ADD_GAME":
      return { ...state, games: [...state.games, action.payload] };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}

export type { Game };
