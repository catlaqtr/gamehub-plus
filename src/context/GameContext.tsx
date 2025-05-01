import { createContext, useReducer, useContext, ReactNode } from "react";
type GameContextType = {
  state: Game[];
  dispatch: React.Dispatch<GameAction>;
};
const GameContext = createContext<GameContextType | undefined>(undefined);

type GameProviderProps = {
  children: ReactNode;
};

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

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
type GameAction =
  | { type: "SET_GAMES"; payload: Game[] }
  | { type: "ADD_GAME"; payload: Game };

const initialState: Game[] = [];

function gameReducer(state: Game[], action: GameAction): Game[] {
  switch (action.type) {
    case "SET_GAMES":
      return action.payload;
    case "ADD_GAME":
      return [...state, action.payload];
    default:
      return state;
  }
}
export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
export type { Game };
