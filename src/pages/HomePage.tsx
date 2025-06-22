import {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
  useReducer,
} from "react";
import GameCard from "../components/GameCard";
import { useGameContext } from "../context/GameContext";
import { useLocation, useSearchParams } from "react-router-dom";
import useFetchGames from "../hooks/useFetchGames";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";

type FilterState = {
  playtime: number;
};

type FilterAction = {
  type: "SET_PLAYTIME";
  payload: number;
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_PLAYTIME":
      return { ...state, playtime: action.payload };
    default:
      return state;
  }
}

function HomePage() {
  const {
    state: { games, isLoading },
  } = useGameContext();
  const location = useLocation();
  const success = location.state?.success;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterState, dispatchFilter] = useReducer(filterReducer, {
    playtime: Number(searchParams.get("playtime") || 0),
  });

  const playTimeChangeCount = useRef(0);
  const [showSuccess, setShowSuccess] = useState(success);

  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useFetchGames();

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timeout = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [success]);

  const filteredGames = useMemo(
    () =>
      games.filter(
        (game) =>
          game.playtime === undefined || game.playtime <= filterState.playtime
      ),
    [games, filterState.playtime]
  );

  const handlePlaytimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      playTimeChangeCount.current += 1;
      setSearchParams({ playtime: value.toString() });
      dispatchFilter({ type: "SET_PLAYTIME", payload: value });
    },
    [setSearchParams]
  );

  const handleViewDescription = useCallback((description?: string) => {
    setModalContent(<p>{description || "No description available."}</p>);
    setIsModalOpen(true);
  }, []);

  return (
    <section className="pt-6 pb-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-white">
      {showSuccess && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded dark:bg-green-800 dark:text-green-100 text-center">
          Game added successfully!
        </div>
      )}
      <label className="block mb-2 font-semibold">
        Max Playtime: {filterState.playtime} hrs
      </label>
      <input
        type="range"
        min={0}
        max={300}
        step={10}
        value={filterState.playtime}
        onChange={handlePlaytimeChange}
        className="dark:bg-gray-700 dark:focus:ring-blue-500 w-full mb-6"
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              genre={game.genre}
              image={game.image}
              id={game.id}
              description={game.description}
              onViewDescription={() => handleViewDescription(game.description)}
            />
          ))}
        </div>
      )}
      {isModalOpen && modalContent && (
        <Modal onClose={() => setIsModalOpen(false)} title="Game Description">
          {modalContent}
        </Modal>
      )}
    </section>
  );
}

export default HomePage;
