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
      const timeout = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
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

  const handleViewDescription = useCallback((description: string) => {
    setModalContent(<p>{description}</p>);
    setIsModalOpen(true);
  }, []);

  return (
    <section className="pt-6 pb-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-white">
      <div>Home Page</div>
      {showSuccess && (
        <p className="text-green-600 font-semibold mb-4 dark:text-green-400">
          Game added successfully!
        </p>
      )}

      <input
        type="range"
        min={0}
        max={300}
        step={10}
        value={filterState.playtime}
        onChange={handlePlaytimeChange}
        className="dark:bg-gray-700 dark:focus:ring-blue-500"
      />

      <p className="mb-2 font-medium dark:text-gray-200">
        Showing games under {filterState.playtime} hours of playtime
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        You've adjusted the filter {playTimeChangeCount.current} times
      </p>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              {...game}
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
